(() => {
  if (document.querySelector('.portfolio-pointer')) return;
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const cursor = document.createElement('div');
  cursor.className = 'portfolio-pointer';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<svg viewBox="0 0 30 38"><path d="M2 2l25 22-12 1-5 11z"/></svg><span>You</span>';
  document.body.append(cursor);
  const label = cursor.querySelector('span');
  let x = -100, y = -100, targetX = -100, targetY = -100, frame = 0;
  const enabled = () => fine.matches && !reduced.matches;
  const hide = () => {
    cursor.classList.remove('is-visible', 'is-pressed', 'is-badge');
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
  const syncPreference = () => {
    document.documentElement.classList.toggle('portfolio-cursor-enabled', enabled());
    hide();
  };
  const render = () => {
    frame = 0;
    x += (targetX - x) * .52;
    y += (targetY - y) * .52;
    cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
    if (Math.abs(targetX - x) + Math.abs(targetY - y) > .1) frame = requestAnimationFrame(render);
  };
  document.addEventListener('pointermove', event => {
    if (!enabled() || (event.pointerType && event.pointerType !== 'mouse')) return;
    if (event.target instanceof HTMLIFrameElement) { hide(); return; }
    targetX = event.clientX;
    targetY = event.clientY;
    if (!cursor.classList.contains('is-visible')) { x = targetX; y = targetY; }
    const badge = document.querySelector('#lanyard-root canvas');
    const isBadge = badge && ['grab', 'grabbing'].includes(badge.style.cursor);
    cursor.classList.toggle('is-badge', Boolean(isBadge));
    label.textContent = isBadge ? '拖动 / 翻面' : 'You';
    cursor.classList.add('is-visible');
    if (!frame) frame = requestAnimationFrame(render);
  }, { passive: true });
  document.addEventListener('pointerdown', () => { if (enabled()) cursor.classList.add('is-pressed'); }, { passive: true });
  const release = () => cursor.classList.remove('is-pressed');
  window.addEventListener('pointerup', release, { passive: true });
  window.addEventListener('pointercancel', release, { passive: true });
  document.documentElement.addEventListener('pointerleave', hide, { passive: true });
  document.addEventListener('mouseleave', hide);
  window.addEventListener('blur', hide);
  window.addEventListener('scroll', hide, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  document.addEventListener('click', event => { if (event.target.closest('a[href]')) hide(); });
  document.querySelectorAll('iframe').forEach(iframe => {
    iframe.addEventListener('pointerenter', hide);
    iframe.addEventListener('load', hide);
  });
  document.addEventListener('pointerover', event => { if (event.target instanceof HTMLIFrameElement) hide(); }, { passive: true });
  fine.addEventListener('change', syncPreference);
  reduced.addEventListener('change', syncPreference);
  window.addEventListener('pagehide', hide);
  syncPreference();
})();
