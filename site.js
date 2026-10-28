const toast = document.querySelector('.toast');
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    notify('邮箱已复制，期待你的来信。');
  } catch {
    window.location.href = 'mailto:' + button.dataset.copy;
  }
}));
const wechat = document.querySelector('.wechat-wrap');
const wechatButton = document.querySelector('.wechat-button');
wechatButton.addEventListener('click', () => {
  const open = wechat.classList.toggle('is-open');
  wechatButton.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', event => {
  if (!wechat.contains(event.target)) {
    wechat.classList.remove('is-open');
    wechatButton.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    wechat.classList.remove('is-open');
    wechatButton.setAttribute('aria-expanded', 'false');
    wechatButton.blur();
  }
});
const lanyardRoot = document.querySelector('#lanyard-root');
const fallback = document.querySelector('.fallback-card');
// Keep the reserved stage empty unless the interactive badge cannot load.
document.querySelector('script[src*="lanyard-widget.js"]')?.addEventListener('error', () => {
  const stage = fallback.closest('.badge-stage');
  if (stage.classList.contains('has-webgl')) return;
  stage.dataset.badgeState = 'fallback';
  fallback.closest('.badge-fallback').hidden = false;
});
let back = false;
function updateSide(nextBack) {
  back = nextBack;
  fallback.querySelector('img').src = back ? './assets/card-back.svg?v=19' : './assets/card-front.svg?v=18';
  fallback.querySelector('img').alt = back ? 'Li Dan 工牌背面与微信二维码' : 'Li Dan 设计师工牌正面';
}
function flipBadge() {
  if (document.querySelector('.badge-stage').classList.contains('has-webgl')) {
    lanyardRoot.querySelector('.lanyard').dispatchEvent(new Event('lanyard-flip'));
  } else updateSide(!back);
}
fallback.addEventListener('click', flipBadge);
lanyardRoot.addEventListener('lanyard-sidechange', event => updateSide(event.detail.back));
const navLinks = [...document.querySelectorAll('.header nav a')];
const navObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting);
  if (visible.length) navLinks.forEach(link => link.classList.toggle('active', link.hash === '#' + visible[0].target.id));
}, {rootMargin: '-15% 0px -60% 0px', threshold: 0});
navLinks.forEach(link => navObserver.observe(document.querySelector(link.hash)));
const heroObserver = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) navLinks.forEach(link => link.classList.remove('active'));
}, {threshold: 0.3});
heroObserver.observe(document.querySelector('#top'));

