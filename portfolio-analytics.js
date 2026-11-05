(() => {
  'use strict';

  // Embedded project pages are measured by their parent to avoid double pageviews.
  if (window.self !== window.top || window.__portfolioAnalytics) return;
  window.__portfolioAnalytics = true;

  const websiteId = '30d51365-3771-4852-88e9-9170800a5a4f';
  const hostname = 'xiaonajia425.github.io';
  const base = new URL('.', document.currentScript.src);
  const projects = {
    'ops-agent': 'AI智能体平台',
    'security-ops': '启明星安全运维平台',
    'ai-workflow': 'AI设计交付流程',
    'other-projects': '其他项目',
    'attack-defense': '红蓝攻防态势大屏',
    'design-guidelines': 'B端设计规范',
    'figma-guidelines': 'Figma设计规范',
    'markdown-docs': 'Markdown文档中心',
    resume: '个人简历'
  };

  if (location.hostname !== hostname) return;
  const preference = new URLSearchParams(location.search).get('analytics');
  try {
    if (preference === 'off') localStorage.setItem('portfolio.analytics.disabled', '1');
    if (preference === 'on') localStorage.removeItem('portfolio.analytics.disabled');
    if (localStorage.getItem('portfolio.analytics.disabled') === '1') return;
  } catch {
    // Browsing and measurement still work when browser storage is unavailable.
  }
  if (preference === 'off' || navigator.doNotTrack === '1') return;

  function context(doc) {
    const url = new URL(doc.URL);
    const directProject = url.pathname.match(/\/projects\/([^/]+)\//);
    const candidate = url.searchParams.get('view') || (directProject && directProject[1]) || (url.pathname.endsWith('/resume-preview.html') ? 'resume' : null);
    const view = Object.prototype.hasOwnProperty.call(projects, candidate)
      ? candidate
      : url.pathname.endsWith('/detail.html') ? 'ops-agent' : null;
    const path = view ? `${base.pathname}detail.html?view=${view}` : base.pathname;
    const canonical = new URL(path, base);
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      if (url.searchParams.has(key)) canonical.searchParams.set(key, url.searchParams.get(key));
    }
    let referrer = '';
    try {
      const source = new URL(doc.referrer);
      if (['https:', 'http:'].includes(source.protocol)) referrer = source.origin + source.pathname;
    } catch { /* A direct visit has no referrer. */ }
    return { url: canonical.pathname + canonical.search, title: view ? projects[view] : '李丹作品集首页', referrer };
  }

  let ready = false;
  let trackerFailed = false;
  const pending = [];
  const queueKey = 'portfolio.analytics.offline-events';
  function readQueue() {
    try {
      const records = JSON.parse(localStorage.getItem(queueKey) || '[]');
      return Array.isArray(records) ? records.filter(r => r && r.page && r.timestamp > Date.now() / 1000 - 7 * 86400).slice(-200) : [];
    } catch { return []; }
  }
  function storeQueue(records) {
    try { localStorage.setItem(queueKey, JSON.stringify(records.slice(-200))); } catch { /* Analytics storage is optional. */ }
  }
  function enqueue(record) { storeQueue([...readQueue(), record]); }
  function record(name, data, doc) {
    return { id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`, name, data, page: context(doc), timestamp: Math.floor(Date.now() / 1000) };
  }
  let flushing = false;
  async function flushQueue() {
    if (!ready || flushing || navigator.onLine === false) return;
    flushing = true;
    const flush = async () => {
      for (const event of readQueue()) {
        if (navigator.onLine === false) break;
        try {
          await window.umami.track(props => ({ ...props, ...event.page, timestamp: event.timestamp, ...(event.name ? { name: event.name, data: event.data } : {}) }));
          if (navigator.onLine === false) break;
          storeQueue(readQueue().filter(r => r.id !== event.id));
        } catch { break; }
      }
    };
    try {
      if (navigator.locks?.request) await navigator.locks.request('portfolio-analytics-sync', flush);
      else await flush();
    } finally { flushing = false; }
  }
  function send(name, data, doc = document) {
    if (navigator.onLine === false || trackerFailed) { enqueue(record(name, data, doc)); return; }
    if (!ready) {
      if (name && pending.length < 20) pending.push([name, data, doc]);
      return;
    }
    try {
      const page = context(doc);
      const result = window.umami.track(props => ({
        ...props,
        ...page,
        ...(name ? { name, data } : {})
      }));
      if (result && typeof result.catch === 'function') result.catch(() => enqueue(record(name, data, doc)));
    } catch { /* Analytics must never interrupt the portfolio. */ }
  }

  const boundDocuments = new WeakSet();
  const boundFrames = new WeakSet();
  function bind(doc) {
    if (!doc || boundDocuments.has(doc) || !doc.URL.startsWith(base.href)) return;
    boundDocuments.add(doc);

    doc.addEventListener('click', event => {
      const target = event.target.closest && event.target.closest('a, button');
      if (!target) return;
      if (target.matches('[data-copy]')) return send('复制邮箱', {}, doc);
      if (target.matches('.wechat-button')) {
        if (target.getAttribute('aria-expanded') !== 'true') send('查看微信', { 入口: '联系按钮' }, doc);
        return;
      }
      const href = target.getAttribute('href');
      if (!href) return;
      let url;
      try { url = new URL(href, doc.URL); } catch { return; }
      if (url.protocol === 'mailto:') return send('邮件联系', {}, doc);
      if (url.protocol === 'tel:') return send('电话联系', {}, doc);
      if (url.hostname === 'www.figma.com' || url.hostname === 'figma.com') return send('打开Figma源文件', {}, doc);
      if (url.origin !== base.origin) return;
      const view = url.searchParams.get('view');
      if (view === 'resume') return send('查看简历', {}, doc);
      if (url.pathname.endsWith('.pdf')) return send(target.hasAttribute('download') ? '下载简历' : '查看简历', {}, doc);
      if (Object.prototype.hasOwnProperty.call(projects, view)) {
        return send('打开项目', { 项目: projects[view] }, doc);
      }
      if (url.pathname.endsWith('.md') || target.hasAttribute('download')) {
        const file = url.pathname.split('/').pop();
        send(target.hasAttribute('download') ? '下载文档' : '查看文档', { 文件: file }, doc);
      }
    }, true);

    doc.addEventListener('lanyard-sidechange', event => {
      if (event.detail && event.detail.back) send('查看微信', { 入口: '工牌背面' }, doc);
    });

    let readHalf = false;
    doc.addEventListener('scroll', () => {
      const page = doc.scrollingElement;
      if (!readHalf && page && page.scrollHeight > page.clientHeight * 1.5 && page.scrollTop > 0 &&
          (page.scrollTop + page.clientHeight) / page.scrollHeight >= 0.5) {
        readHalf = true;
        send('阅读过半', { 页面: context(doc).title }, doc);
      }
    }, { passive: true, capture: true });

    for (const frame of doc.querySelectorAll('iframe')) {
      if (boundFrames.has(frame)) continue;
      boundFrames.add(frame);
      const bindFrame = () => {
        try { bind(frame.contentDocument); } catch { /* External Figma/PDF frames are not inspected. */ }
      };
      frame.addEventListener('load', bindFrame);
      bindFrame();
    }
  }
  bind(document);

  let pageRecorded = false;
  function recordPage() { if (!pageRecorded) { pageRecorded = true; send(null, null); } }
  let loading = false;
  function loadTracker() {
  if (ready || loading || navigator.onLine === false) return;
  loading = true;
  const script = document.createElement('script');
  script.src = 'https://cloud.umami.is/script.js';
  script.async = true;
  script.dataset.websiteId = websiteId;
  script.dataset.autoTrack = 'false';
  script.dataset.domains = hostname;
  script.dataset.doNotTrack = 'true';
  script.onload = () => {
    ready = true; loading = false; trackerFailed = false;
    recordPage();
    for (const event of pending.splice(0)) send(...event);
    flushQueue().catch(() => {});
  };
  script.onerror = () => {
    loading = false; trackerFailed = true; recordPage();
    for (const event of pending.splice(0)) send(...event);
  };
  document.head.appendChild(script);
  }
  if (navigator.onLine === false) recordPage();
  else loadTracker();
  window.addEventListener('online', () => { if (ready) flushQueue().catch(() => {}); else loadTracker(); });
})();
