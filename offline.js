(() => {
  'use strict';
  if (window.self !== window.top || window.__portfolioOffline) return;
  window.__portfolioOffline = true;
  const base = new URL('.', document.currentScript.src);
  const toolsEnabled = new URLSearchParams(location.search).get('offline') === '1';
  if (toolsEnabled) document.documentElement.setAttribute('data-offline-tools', '');
  let registration, latest, opening = toolsEnabled;
  const launcher = document.createElement('button');
  launcher.type = 'button'; launcher.className = 'portfolio-offline-button';
  launcher.textContent = '离线浏览'; launcher.setAttribute('aria-haspopup', 'dialog');
  const header = document.querySelector('.header, .detail-header');
  const endLink = header?.querySelector('.resume-link, .detail-back');
  if (toolsEnabled && endLink) {
    const actions = document.createElement('div'); actions.className = 'portfolio-header-actions';
    endLink.replaceWith(actions); actions.append(launcher, endLink);
  } else if (toolsEnabled) { launcher.classList.add('portfolio-offline-standalone'); document.body.append(launcher); }

  const dialog = document.createElement('dialog');
  dialog.className = 'portfolio-offline-dialog'; dialog.setAttribute('aria-labelledby', 'offline-title');
  dialog.innerHTML = `<form method="dialog"><button class="offline-close" aria-label="关闭离线浏览面板">×</button></form>
    <p class="offline-eyebrow">TAKE YOUR WORK WITH YOU</p><h2 id="offline-title">让作品，随时可看。</h2>
    <p class="offline-intro">把完整作品集保存在这台设备上。断网后，页面、图片、视频和交互大屏依然可用。</p>
    <div class="offline-status" role="status" aria-live="polite">正在检查离线内容…</div>
    <progress class="offline-progress" max="100" value="0" aria-label="离线保存进度"></progress>
    <p class="offline-detail"></p><p class="offline-note">请使用同一浏览器打开网站。Figma 外部内容需要联网。</p>
    <div class="offline-actions"><button type="button" class="offline-save">保存全部内容</button><button type="button" class="offline-pause" hidden>暂停</button></div>`;
  document.body.append(dialog);
  const message = dialog.querySelector('.offline-status');
  const detail = dialog.querySelector('.offline-detail');
  const progress = dialog.querySelector('progress');
  const saveButton = dialog.querySelector('.offline-save');
  const pauseButton = dialog.querySelector('.offline-pause');
  const mb = n => (n / 1024 / 1024).toFixed(1);
  function render(value) {
    latest = value;
    progress.max = Math.max(1, value.totalBytes); progress.value = value.bytes;
    launcher.textContent = value.ready ? (navigator.onLine ? '已可离线' : '离线浏览中') : '离线浏览';
    saveButton.disabled = value.running || !navigator.onLine;
    pauseButton.hidden = !value.running;
    const errors = { STORAGE_FULL: '设备剩余空间不足。释放一些空间后可继续保存。', VERSION_CHANGED: '网站刚刚有更新，请刷新页面后继续保存。', DOWNLOAD_FAILED: '下载暂时中断，已保存的内容会保留。联网后可以继续。' };
    message.textContent = value.running ? '正在保存完整作品集，请保持页面打开…' : value.currentReady ? '已完整保存，可以断网浏览。' : value.error ? errors[value.error] || errors.DOWNLOAD_FAILED : value.ready ? '上一版已可离线浏览，可以保存最新内容。' : value.done ? '已保存部分内容，可以继续下载。' : '提前保存一次，之后断网也能看。';
    detail.textContent = `${mb(value.bytes)} / ${mb(value.totalBytes)} MB · ${value.done} / ${value.total} 项`;
    saveButton.textContent = value.currentReady ? '检查保存内容' : value.ready ? '更新离线内容' : value.done ? '继续保存' : `保存全部内容 · 约 ${Math.ceil(value.totalBytes / 1024 / 1024)} MB`;
  }
  async function request(type) {
    const worker = registration?.active;
    if (!worker) throw Error('NOT_READY');
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      const timeout = setTimeout(() => { channel.port1.close(); reject(Error('TIMEOUT')); }, 15000);
      channel.port1.onmessage = event => { clearTimeout(timeout); channel.port1.close(); resolve(event.data); };
      worker.postMessage({ type }, [channel.port2]);
    });
  }
  async function refresh() {
    if (registration?.active) render(await request('GET_OFFLINE_STATUS'));
  }
  async function open() {
    if (!dialog.open) { opening = true; dialog.showModal(); }
    if (!('serviceWorker' in navigator) || !window.isSecureContext) {
      message.textContent = '这个浏览器暂不支持离线保存，请使用 Chrome、Edge 或 Safari 打开网站。'; saveButton.disabled = true; return;
    }
    if (!registration) { message.textContent = '离线功能正在准备，请稍等片刻…'; return; }
    try { await refresh(); } catch { message.textContent = '暂时无法检查离线内容，请刷新后重试。'; }
  }
  launcher.addEventListener('click', open);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { opening = false; if (launcher.isConnected) launcher.focus(); });
  pauseButton.addEventListener('click', async () => {
    pauseButton.disabled = true; message.textContent = '正在暂停，已保存的内容会保留…';
    try { await request('PAUSE_OFFLINE_SAVE'); } finally { pauseButton.disabled = false; }
  });
  saveButton.addEventListener('click', async () => {
    saveButton.disabled = true;
    try {
      if (!navigator.onLine) throw Error('OFFLINE');
      const estimate = await navigator.storage?.estimate?.();
      if (estimate?.quota && latest && estimate.quota - estimate.usage < latest.totalBytes - latest.bytes + 8 * 1024 * 1024) {
        message.textContent = '设备剩余空间不足，请释放一些空间后重试。'; saveButton.disabled = false; return;
      }
      // The browser decides whether this site is eligible for persistent storage.
      navigator.storage?.persist?.().catch(() => {});
      await request('SAVE_OFFLINE'); await refresh();
    } catch { message.textContent = '请连接网络后继续保存。'; saveButton.disabled = false; }
  });
  const linked = new WeakSet();
  function figmaLinks(doc) {
    if (linked.has(doc)) return;
    linked.add(doc);
    doc.addEventListener('click', event => {
      const link = event.target.closest?.('a[href]');
      if (!link || navigator.onLine) return;
      let url; try { url = new URL(link.href); } catch { return; }
      if (url.hostname === 'figma.com' || url.hostname.endsWith('.figma.com')) {
        event.preventDefault(); event.stopPropagation();
        open().then(() => { message.textContent = 'Figma 源文件需要联网。作品集里的其他内容仍可离线查看。'; });
      }
    }, true);
    for (const frame of doc.querySelectorAll('iframe')) {
      const connect = () => {
        try { if (frame.contentDocument && frame.contentDocument.URL !== 'about:blank') figmaLinks(frame.contentDocument); } catch { /* External frames stay online-only. */ }
      };
      frame.addEventListener('load', connect); connect();
    }
  }
  figmaLinks(document);
  window.addEventListener('online', () => { refresh().catch(() => {}); });
  window.addEventListener('offline', () => { if (latest) render(latest); });
  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      navigator.serviceWorker.ready.then(value => { registration = value; return refresh(); }).catch(() => {});
    });
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data?.type === 'PORTFOLIO_OFFLINE_STATUS') render(event.data);
    });
    navigator.serviceWorker.register(new URL('sw.js', base), { scope: base.pathname, updateViaCache: 'none' })
      .then(() => navigator.serviceWorker.ready)
      .then(async value => { registration = value; await refresh(); if (opening) await open(); })
      .catch(() => { message.textContent = '离线功能暂时未准备好，请联网刷新后重试。'; saveButton.disabled = true; });
  }
})();
