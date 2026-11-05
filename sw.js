/* Full, verified offline copies. A previous complete copy survives interrupted updates. */
importScripts('./offline-manifest.js');
const manifest = self.PORTFOLIO_OFFLINE_MANIFEST;
const base = new URL('./', self.location.href);
const prefix = `lidan-offline:${base.pathname}:`;
const cacheName = prefix + manifest.version;
const stateKey = new URL('__offline_state__.json', base).href;
const assets = new Map(manifest.assets.map(a => [new URL(a.url, base).pathname, a]));
let job = null;
let pause = false;

function keyFor(input) {
  const url = new URL(typeof input === 'string' ? input : input.url, base);
  url.search = ''; url.hash = '';
  if (url.pathname.endsWith('/')) url.pathname += 'index.html';
  else if (!assets.has(url.pathname) && assets.has(url.pathname + '.html')) url.pathname += '.html';
  return url.href;
}
async function state(cache) {
  const response = await cache.match(stateKey);
  try { return response ? await response.json() : { hashes: {}, complete: false }; }
  catch { return { hashes: {}, complete: false }; }
}
async function writeState(cache, value) {
  await cache.put(stateKey, new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } }));
}
async function orderedCaches() {
  const names = (await caches.keys()).filter(n => n.startsWith(prefix));
  const result = await Promise.all(names.map(async name => {
    const cache = await caches.open(name);
    return { name, cache, meta: await state(cache) };
  }));
  return result.sort((a, b) => Number(b.meta.complete) - Number(a.meta.complete) || Number(b.name === cacheName) - Number(a.name === cacheName));
}
async function status() {
  const cache = await caches.open(cacheName);
  const meta = await state(cache);
  const existing = new Set((await cache.keys()).map(r => r.url));
  const done = manifest.assets.filter(a => existing.has(keyFor(a.url)) && meta.hashes[a.url] === a.sha256);
  const currentReady = !!meta.complete && done.length === manifest.assets.length;
  const previous = (await orderedCaches()).find(c => c.name !== cacheName && c.meta.complete);
  return {
    type: 'PORTFOLIO_OFFLINE_STATUS', version: manifest.version,
    total: manifest.assets.length, totalBytes: manifest.totalBytes,
    done: done.length, bytes: done.reduce((sum, a) => sum + a.bytes, 0),
    ready: currentReady || !!previous, currentReady,
    running: !!job, error: meta.error || '', savedAt: meta.savedAt || previous?.meta.savedAt || null
  };
}
async function announce(extra = {}) {
  const value = { ...(await status()), ...extra };
  const tabs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const tab of tabs) if (tab.url.startsWith(base.href)) tab.postMessage(value);
  return value;
}
async function digest(response) {
  const body = await response.clone().arrayBuffer();
  const hash = await crypto.subtle.digest('SHA-256', body);
  return { bytes: body.byteLength, sha256: Array.from(new Uint8Array(hash), v => v.toString(16).padStart(2, '0')).join('') };
}
async function saveAll() {
  const cache = await caches.open(cacheName);
  const meta = await state(cache);
  meta.complete = false; meta.error = ''; meta.version = manifest.version;
  const copies = await orderedCaches();
  let failed = false, index = 0, completed = 0, completedBytes = 0, lastCheckpoint = 0;
  await writeState(cache, meta);
  async function save(asset) {
    const key = keyFor(asset.url);
    let response = await cache.match(key);
    let verified = !!response && meta.hashes[asset.url] === asset.sha256;
    if (!verified && response) {
      const check = await digest(response);
      verified = check.sha256 === asset.sha256 && check.bytes === asset.bytes;
    }
    if (!verified) {
      for (const copy of copies) {
        if (copy.name === cacheName || copy.meta.hashes[asset.url] !== asset.sha256) continue;
        const old = await copy.cache.match(key);
        if (old) { response = old; verified = true; break; }
      }
    }
    if (!verified) {
      const url = new URL(asset.url, base);
      url.searchParams.set('offline-revision', manifest.version);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);
      try {
        response = await fetch(url.href, { cache: 'reload', credentials: 'same-origin', signal: controller.signal });
        if (!response.ok || response.status !== 200 || new URL(response.url || url).origin !== base.origin) throw Error('DOWNLOAD_FAILED');
        const check = await digest(response);
        if (check.sha256 !== asset.sha256 || check.bytes !== asset.bytes) throw Error('VERSION_CHANGED');
      } finally { clearTimeout(timeout); }
    }
    await cache.put(key, response);
    meta.hashes[asset.url] = asset.sha256;
    completed++; completedBytes += asset.bytes;
    if (Date.now() - lastCheckpoint > 1500) {
      lastCheckpoint = Date.now();
      await writeState(cache, meta);
      await announce({ running: true, done: completed, bytes: completedBytes });
    }
  }
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (!pause && !failed && index < manifest.assets.length) {
      const asset = manifest.assets[index++];
      try { await save(asset); }
      catch (error) { failed = true; meta.error = error.message === 'QuotaExceededError' || error.name === 'QuotaExceededError' ? 'STORAGE_FULL' : error.message === 'VERSION_CHANGED' ? 'VERSION_CHANGED' : 'DOWNLOAD_FAILED'; }
    }
  }));
  meta.complete = !failed && !pause && completed === manifest.assets.length;
  if (meta.complete) meta.savedAt = new Date().toISOString();
  await writeState(cache, meta);
  if (meta.complete) {
    for (const name of await caches.keys()) if (name.startsWith(prefix) && name !== cacheName) await caches.delete(name);
  }
}

// Cached complete media must answer byte ranges for playback, seeking, and PDF viewers.
async function rangedResponse(request, response) {
  const range = request.headers.get('range');
  if (!range) return request.method === 'HEAD' ? new Response(null, { headers: response.headers }) : response;
  const body = await response.arrayBuffer();
  const length = body.byteLength;
  const parts = /^bytes=(\d*)-(\d*)$/i.exec(range.trim());
  let start, end;
  if (parts && (parts[1] || parts[2])) {
    start = parts[1] ? Number(parts[1]) : Math.max(0, length - Number(parts[2]));
    end = parts[1] && parts[2] ? Math.min(Number(parts[2]), length - 1) : length - 1;
  }
  const headers = new Headers(response.headers);
  headers.delete('Content-Encoding');
  headers.set('Accept-Ranges', 'bytes');
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= length || end < start) {
    headers.set('Content-Range', `bytes */${length}`); headers.set('Content-Length', '0');
    return new Response(null, { status: 416, headers });
  }
  headers.set('Content-Range', `bytes ${start}-${end}/${length}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(request.method === 'HEAD' ? null : body.slice(start, end + 1), { status: 206, headers });
}
async function serve(request) {
  const key = keyFor(request);
  const isDocument = request.mode === 'navigate' || new URL(key).pathname.endsWith('.html');
  const copies = await orderedCaches();
  let cached, current;
  for (const copy of copies) {
    const hit = await copy.cache.match(key);
    if (!hit) continue;
    cached ||= hit;
    const asset = assets.get(new URL(key).pathname);
    if (!current && (copy.name === cacheName || asset && copy.meta.hashes[asset.url] === asset.sha256)) current = hit;
  }
  // Never overwrite a verified offline copy with a newer deployment's response.
  async function remember(response) {
    const asset = assets.get(new URL(key).pathname);
    if (response.status !== 200 || request.method !== 'GET' || !asset) return;
    const cache = await caches.open(cacheName), meta = await state(cache);
    if (!meta.hashes[asset.url]) await cache.put(key, response.clone());
  }
  if (isDocument) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await remember(response);
        return response;
      }
      if (!cached) return response;
    } catch { /* Use the saved document below. */ }
  }
  if (!isDocument && current) return rangedResponse(request, current);
  if (isDocument && cached) return rangedResponse(request, cached);
  try {
    const response = await fetch(request);
    await remember(response);
    return response;
  } catch {
    if (cached) return rangedResponse(request, cached);
    if (isDocument) {
      for (const copy of copies) {
        const fallback = await copy.cache.match(keyFor('offline-fallback.html'));
        if (fallback) return new Response((await fallback.text()).replace('__HOME__', base.pathname), { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
    }
    return new Response('该内容尚未保存，请联网后完成离线下载。', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(cacheName);
  for (const path of ['index.html', 'detail.html', 'offline.js', 'offline.css', 'offline-fallback.html', 'offline-figma.html']) {
    const response = await fetch(new URL(path, base), { cache: 'reload' });
    if (!response.ok) throw Error('Offline shell unavailable');
    await cache.put(keyFor(path), response);
  }
  await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (!['GET', 'HEAD'].includes(event.request.method) || url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  if (['sw.js', 'offline-manifest.js'].includes(url.pathname.slice(base.pathname.length))) return;
  event.respondWith(serve(event.request));
});
self.addEventListener('message', event => {
  const reply = value => event.ports[0]?.postMessage(value);
  if (event.data?.type === 'GET_OFFLINE_STATUS') event.waitUntil(status().then(reply));
  if (event.data?.type === 'PAUSE_OFFLINE_SAVE') { pause = true; reply({ ok: true }); }
  if (event.data?.type === 'SAVE_OFFLINE') {
    if (!job) {
      pause = false;
      job = saveAll().catch(async () => {
        const cache = await caches.open(cacheName), meta = await state(cache);
        meta.error = 'DOWNLOAD_FAILED'; meta.complete = false; await writeState(cache, meta);
      }).finally(async () => { job = null; await announce(); });
    }
    reply({ ok: true }); event.waitUntil(job);
  }
});
