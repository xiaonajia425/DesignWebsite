const motionStages = [...document.querySelectorAll("[data-motion-stage]")];
const videos = [...document.querySelectorAll("video")];
const observedSections = [...document.querySelectorAll(".observe-section")];
const navLinks = [...document.querySelectorAll("[data-nav]")];
const pageNumber = document.querySelector(".page-counter strong");
const progressBar = document.querySelector(".progress span");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const coverCanvas = document.querySelector("[data-cover-canvas]");

if (coverCanvas && !reduceMotion.matches) {
  let pointerFrame;

  const updateCoverPointer = (event) => {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const rect = coverCanvas.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      const nx = x - .5;
      const ny = y - .5;
      coverCanvas.style.setProperty("--pointer-x", `${x * 100}%`);
      coverCanvas.style.setProperty("--pointer-y", `${y * 100}%`);
      coverCanvas.style.setProperty("--shift-x", `${nx * -16}px`);
      coverCanvas.style.setProperty("--shift-y", `${ny * -12}px`);
      coverCanvas.style.setProperty("--tilt-x", `${ny * -5}deg`);
      coverCanvas.style.setProperty("--tilt-y", `${nx * 7}deg`);
    });
  };

  const resetCoverPointer = () => {
    coverCanvas.style.setProperty("--pointer-x", "50%");
    coverCanvas.style.setProperty("--pointer-y", "50%");
    coverCanvas.style.setProperty("--shift-x", "0px");
    coverCanvas.style.setProperty("--shift-y", "0px");
    coverCanvas.style.setProperty("--tilt-x", "0deg");
    coverCanvas.style.setProperty("--tilt-y", "0deg");
  };

  coverCanvas.addEventListener("pointermove", updateCoverPointer, { passive: true });
  coverCanvas.addEventListener("pointerleave", resetCoverPointer);
}

function resetVideo(video) {
  video.pause();
  video.classList.remove("is-playing");
  try { video.currentTime = 0; } catch { /* Metadata is not ready. */ }
}

async function playVideo(video) {
  if (reduceMotion.matches) return;
  try {
    video.currentTime = 0;
    await video.play();
    video.classList.add("is-playing");
  } catch {
    video.classList.remove("is-playing");
  }
}

const motionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.querySelectorAll("video").forEach(entry.isIntersecting ? playVideo : resetVideo);
  });
}, { threshold: .58 });

motionStages.forEach((stage) => motionObserver.observe(stage));

const visibility = new Map();
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => visibility.set(entry.target, entry.intersectionRatio));
  const active = [...visibility.entries()].sort((a,b) => b[1] - a[1])[0]?.[0];
  if (!active) return;
  const chapter = active.dataset.chapter;
  const page = Number(active.dataset.page || 1);
  document.body.classList.toggle("has-nav", chapter !== "cover");
  navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.nav === chapter));
  pageNumber.textContent = String(page).padStart(2,"0");
}, { threshold: [0,.2,.45,.7], rootMargin: "-12% 0px -12% 0px" });

observedSections.forEach((section) => sectionObserver.observe(section));

function updateProgress() {
  const root = document.documentElement;
  const max = root.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  progressBar.style.width = `${ratio * 100}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
document.addEventListener("visibilitychange", () => { if (document.hidden) videos.forEach(resetVideo); });
reduceMotion.addEventListener?.("change", (event) => { if (event.matches) videos.forEach(resetVideo); });
updateProgress();

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const lightboxPrev = lightbox?.querySelector(".lightbox-prev");
const lightboxNext = lightbox?.querySelector(".lightbox-next");
const lightboxCount = lightbox?.querySelector(".lightbox-count");
let lightboxReturnFocus;
let lightboxIndex = -1;

function getStagePreview(stage) {
  const image = stage.querySelector(":scope > img") || stage.querySelector("img");
  const video = stage.querySelector("video[poster]");
  return {
    src: image?.currentSrc || image?.src || video?.poster || "",
    alt: image?.alt || video?.getAttribute("aria-label") || stage.closest("section")?.getAttribute("aria-label") || "案例大图"
  };
}

function closeLightbox() {
  if (!lightbox || lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
  lightboxImage?.removeAttribute("src");
  lightboxReturnFocus?.focus();
  lightboxIndex = -1;
}

if (lightbox && lightboxImage && lightboxClose && lightboxPrev && lightboxNext) {
  const galleryStages = [...document.querySelectorAll(".slide-section .stage")].filter((stage) => getStagePreview(stage).src);
  const showLightboxImage = (index) => {
    lightboxIndex = (index + galleryStages.length) % galleryStages.length;
    const preview = getStagePreview(galleryStages[lightboxIndex]);
    lightboxImage.src = preview.src;
    lightboxImage.alt = preview.alt;
    if (lightboxCount) lightboxCount.textContent = `${lightboxIndex + 1} / ${galleryStages.length}`;
    lightboxImage.animate([{opacity:.28,transform:"scale(.985)"},{opacity:1,transform:"scale(1)"}],{duration:220,easing:"ease-out"});
  };
  galleryStages.forEach((stage, index) => {
    stage.classList.add("is-zoomable");
    stage.tabIndex = 0;
    stage.setAttribute("role", "button");
    stage.setAttribute("aria-label", `放大查看${getStagePreview(stage).alt}`);
    const action = document.createElement("span");
    action.className = "stage-action";
    action.setAttribute("aria-hidden", "true");
    action.innerHTML = "全屏查看 <i>↗</i>";
    stage.append(action);

    const openLightbox = () => {
      lightboxReturnFocus = stage;
      showLightboxImage(index);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      lightboxClose.focus();
    };
    stage.addEventListener("click", openLightbox);
    stage.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openLightbox();
    });
  });
  lightboxPrev.addEventListener("click", () => showLightboxImage(lightboxIndex - 1));
  lightboxNext.addEventListener("click", () => showLightboxImage(lightboxIndex + 1));
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showLightboxImage(lightboxIndex - 1);
    if (event.key === "ArrowRight") showLightboxImage(lightboxIndex + 1);
  });
}
