const topbar = document.getElementById('topbar');
const progress = document.getElementById('scrollProgress');
const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');
const navItems = [...document.querySelectorAll('[data-nav]')];
const sections = [...document.querySelectorAll('[data-section]')];

function updateScrollUI() {
  const y = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  topbar.classList.toggle('scrolled', y > 18);
  progress.style.width = `${total > 0 ? (y / total) * 100 : 0}%`;
}

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const id = visible.target.dataset.section;
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.nav === id));
}, { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.1, 0.35] });

sections.forEach((section) => observer.observe(section));
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

mobileNav.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});

document.addEventListener('click', (event) => {
  if (!mobileNav.classList.contains('open')) return;
  if (mobileNav.contains(event.target) || menuButton.contains(event.target)) return;
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});

document.querySelectorAll('code').forEach((code) => {
  if (!code.textContent.includes('/')) return;
  code.title = '点击复制 Token';
  code.tabIndex = 0;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      const original = code.textContent;
      code.textContent = '已复制';
      window.setTimeout(() => { code.textContent = original; }, 900);
    } catch (_) {
      // Clipboard permissions may be unavailable in local previews.
    }
  };
  code.addEventListener('click', copy);
  code.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') copy();
  });
});

(() => {
  const cover = document.querySelector('.cover');
  const canvas = document.getElementById('cursorGrid');
  const finePointer = window.matchMedia('(pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!cover || !canvas || !finePointer.matches || reducedMotion.matches) return;

  const context = canvas.getContext('2d');
  const cell = 72;
  const radius = 144;
  const hold = 320;
  const fade = 620;
  const lineWidth = .7;
  const maxOpacity = .3;
  const color = '35,97,255';
  const pulses = [];
  let pointer = null;
  let leftAt = 0;
  let frame = 0;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  const resize = () => {
    const bounds = cover.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const localPoint = (event) => {
    const bounds = cover.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const wake = () => {
    if (!frame) frame = requestAnimationFrame(draw);
  };

  const enter = (event) => {
    pointer = localPoint(event);
    leftAt = 0;
    wake();
  };

  const move = (event) => {
    pointer = localPoint(event);
    leftAt = 0;
    wake();
  };

  const leave = () => {
    leftAt = performance.now();
    wake();
  };

  const pulse = (event) => {
    const point = localPoint(event);
    pulses.push({ x: point.x, y: point.y, startedAt: performance.now() });
    wake();
  };

  function draw(now) {
    frame = 0;
    context.clearRect(0, 0, width, height);
    const elapsed = leftAt ? now - leftAt : 0;
    const pointerOpacity = !leftAt ? 1 : elapsed <= hold ? 1 : Math.max(0, 1 - (elapsed - hold) / fade);
    const activePulses = pulses.filter((item) => now - item.startedAt < 1450);
    pulses.length = 0;
    pulses.push(...activePulses);

    const startX = 0;
    const startY = 0;
    for (let x = startX; x <= width + cell; x += cell) {
      for (let y = startY; y <= height + cell; y += cell) {
        const centerX = x + cell / 2;
        const centerY = y + cell / 2;
        let opacity = 0;

        if (pointer && pointerOpacity > 0) {
          const distance = Math.hypot(centerX - pointer.x, centerY - pointer.y);
          if (distance < radius) {
            const influence = 1 - distance / radius;
            opacity = Math.max(opacity, influence * influence * maxOpacity * pointerOpacity);
          }
        }

        for (const item of activePulses) {
          const age = (now - item.startedAt) / 1000;
          const waveRadius = age * 520;
          const distance = Math.hypot(centerX - item.x, centerY - item.y);
          const ring = Math.max(0, 1 - Math.abs(distance - waveRadius) / 58);
          opacity = Math.max(opacity, ring * ring * maxOpacity * Math.max(0, 1 - age / 1.45));
        }

        if (opacity <= .006) continue;
        context.strokeStyle = `rgba(${color},${opacity})`;
        context.lineWidth = lineWidth;
        context.strokeRect(x + .5, y + .5, cell - 1, cell - 1);
      }
    }

    if (pointerOpacity > 0 || activePulses.length) frame = requestAnimationFrame(draw);
  }

  const resizeObserver = new ResizeObserver(() => {
    resize();
    wake();
  });
  resizeObserver.observe(cover);
  cover.addEventListener('pointerenter', enter, { passive: true });
  cover.addEventListener('pointermove', move, { passive: true });
  cover.addEventListener('pointerleave', leave, { passive: true });
  cover.addEventListener('pointerdown', pulse, { passive: true });
  resize();
})();
