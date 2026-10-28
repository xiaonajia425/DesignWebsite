const observedSections = [...document.querySelectorAll(".observe-section")];
const navLinks = [...document.querySelectorAll("[data-nav]")];
const pageNumber = document.querySelector(".page-counter strong");
const progressBar = document.querySelector(".progress span");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const coverCanvas = document.querySelector("[data-cover-canvas]");

if (coverCanvas && !reduceMotion.matches) {
  let pointerFrame;
  const updatePointer = (event) => {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const rect = coverCanvas.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      const nx = x - .5;
      const ny = y - .5;
      coverCanvas.style.setProperty("--pointer-x", `${x * 100}%`);
      coverCanvas.style.setProperty("--pointer-y", `${y * 100}%`);
      coverCanvas.style.setProperty("--shift-x", `${nx * -14}px`);
      coverCanvas.style.setProperty("--shift-y", `${ny * -10}px`);
      coverCanvas.style.setProperty("--tilt-x", `${ny * -4}deg`);
      coverCanvas.style.setProperty("--tilt-y", `${nx * 6}deg`);
    });
  };
  const resetPointer = () => ["--shift-x","--shift-y","--tilt-x","--tilt-y"].forEach((name) => coverCanvas.style.setProperty(name,name.includes("tilt") ? "0deg" : "0px"));
  coverCanvas.addEventListener("pointermove", updatePointer, { passive: true });
  coverCanvas.addEventListener("pointerleave", resetPointer);
}

const stepContent = {
  research: ["STEP 01 · RESEARCH","从业务理解到可分发调研方案","读取产品材料，提炼目标、对象与关键议题，生成结构化问卷并沉淀为可复用 Skill。"],
  demo: ["STEP 02 · PROTOTYPE","从设计方案到可验证交互 Demo","补齐地图下钻、数据联动与关键动效，让方案可体验、可沟通，并快速验证设计假设。"],
  audit: ["STEP 03 · REVIEW","从视觉比对到结构化质量闭环","对照设计稿与线上页面识别差异，生成带定位信息的问题清单并跟踪修复结果。"]
};
const label = document.querySelector("#agentLabel");
const title = document.querySelector("#agentTitle");
const text = document.querySelector("#agentText");
const status = document.querySelector("#agentStatus");
const capabilityItems = [...document.querySelectorAll("[data-capability]")];
document.querySelectorAll("[data-step]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-step]").forEach((item) => item.classList.toggle("is-active",item === button));
    capabilityItems.forEach((item) => item.classList.toggle("is-active",item.dataset.capability === button.dataset.step));
    const [nextLabel,nextTitle,nextText] = stepContent[button.dataset.step];
    title.animate([{opacity:0,transform:"translateY(5px)"},{opacity:1,transform:"translateY(0)"}],{duration:260,easing:"ease-out"});
    text.animate([{opacity:0},{opacity:1}],{duration:300});
    label.textContent = nextLabel;
    title.textContent = nextTitle;
    text.textContent = nextText;
    status.textContent = "FOCUSED";
  });
});

const visibility = new Map();
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => visibility.set(entry.target,entry.intersectionRatio));
  const active = [...visibility.entries()].sort((a,b) => b[1] - a[1])[0]?.[0];
  if (!active) return;
  const chapter = active.dataset.chapter;
  const page = Number(active.dataset.page || 1);
  document.body.classList.toggle("has-nav",chapter !== "cover");
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
