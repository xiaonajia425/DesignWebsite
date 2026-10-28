const observedSections = [...document.querySelectorAll(".observe-section")];
const navLinks = [...document.querySelectorAll("[data-nav]")];
const pageNumber = document.querySelector(".page-counter strong");
const progressBar = document.querySelector(".progress span");

const visibility = new Map();
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => visibility.set(entry.target,entry.intersectionRatio));
  const active = [...visibility.entries()].sort((a,b) => b[1] - a[1])[0]?.[0];
  if (!active) return;
  const chapter = active.dataset.chapter;
  const page = Number(active.dataset.page || 1);
  navLinks.forEach((link) => link.classList.toggle("is-active",link.dataset.nav === chapter));
  pageNumber.textContent = String(page).padStart(2,"0");
}, { threshold: [0,.2,.45,.7], rootMargin: "-12% 0px -12% 0px" });
observedSections.forEach((section) => sectionObserver.observe(section));

function updateProgress() {
  const root = document.documentElement;
  const max = root.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1,Math.max(0,window.scrollY / max)) : 0;
  progressBar.style.width = `${ratio * 100}%`;
}
window.addEventListener("scroll",updateProgress,{ passive: true });
window.addEventListener("resize",updateProgress);
updateProgress();

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".lightbox-close");
const previousButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");
const lightboxCount = lightbox.querySelector(".lightbox-count");
let returnFocus;
let currentIndex = -1;
const galleryStages = [...document.querySelectorAll("[data-lightbox]")];

function showLightboxImage(index) {
  currentIndex = (index + galleryStages.length) % galleryStages.length;
  const stage = galleryStages[currentIndex];
  lightboxImage.src = stage.dataset.lightbox;
  lightboxImage.alt = stage.querySelector("img")?.alt || "案例大图";
  lightboxCount.textContent = `${currentIndex + 1} / ${galleryStages.length}`;
  lightboxImage.animate([{opacity:.28,transform:"scale(.985)"},{opacity:1,transform:"scale(1)"}],{duration:220,easing:"ease-out"});
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  lightboxImage.removeAttribute("src");
  returnFocus?.focus();
  currentIndex = -1;
}

galleryStages.forEach((stage, index) => {
  stage.addEventListener("click", () => {
    returnFocus = stage;
    showLightboxImage(index);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  });
});
previousButton.addEventListener("click",() => showLightboxImage(currentIndex - 1));
nextButton.addEventListener("click",() => showLightboxImage(currentIndex + 1));
closeButton.addEventListener("click",closeLightbox);
lightbox.addEventListener("click",(event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown",(event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showLightboxImage(currentIndex - 1);
  if (event.key === "ArrowRight") showLightboxImage(currentIndex + 1);
});
