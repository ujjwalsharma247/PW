// Ujjwal Sharma portfolio — plain JavaScript
const $ = (s) => document.querySelector(s);
setTimeout(() => $("#loader").classList.add("loader-done"), 820);

// Reveal on scroll
const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((n) => io.observe(n));

// Scramble text on hover
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
document.querySelectorAll(".scramble").forEach((el) => {
  let t = null;
  el.addEventListener("mouseenter", () => {
    const text = el.dataset.text; let i = 0; clearInterval(t);
    t = setInterval(() => {
      el.textContent = text.split("").map((c, k) => (k < i ? c : chars[Math.floor(Math.random() * chars.length)])).join("");
      i += 0.55;
      if (i >= text.length) { clearInterval(t); el.textContent = text; }
    }, 32);
  });
});

// Custom cursor
const cursor = $("#cursor");
window.addEventListener("mousemove", (e) => { cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`; });
document.addEventListener("mouseover", (e) => {
  const on = e.target.closest("a, button, .project");
  cursor.classList.toggle("cursor-active", !!on);
  cursor.textContent = e.target.closest(".project") ? "VIEW" : "";
});

// Modals
const caseBox = $("#caseBackdrop"), palette = $("#paletteBackdrop");
const lock = () => { document.body.style.overflow = caseBox.hidden && palette.hidden ? "" : "hidden"; };
const titles = { 1: "AI-GENERATED TEXT DETECTION", 2: "REAL-TIME FACE MASK DETECTION" };
function openCase(n) {
  $("#caseLabel").textContent = "CASE STUDY / 0" + n;
  $("#case-title").textContent = titles[n];
  $("#case1").hidden = n != 1; $("#case2").hidden = n != 2;
  caseBox.hidden = false; lock();
}
const closeCase = () => { caseBox.hidden = true; lock(); };
const setPalette = (open) => { palette.hidden = !open; lock(); };

document.querySelectorAll("[data-case]").forEach((p) => {
  p.addEventListener("click", () => openCase(p.dataset.case));
  p.addEventListener("keydown", (e) => e.key === "Enter" && openCase(p.dataset.case));
});
$("#caseClose").addEventListener("click", closeCase);
caseBox.addEventListener("mousedown", (e) => e.target === caseBox && closeCase());
$("#cmdKey").addEventListener("click", () => setPalette(true));
$("#paletteClose").addEventListener("click", () => setPalette(false));
palette.addEventListener("mousedown", (e) => e.target === palette && setPalette(false));
document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => {
  setPalette(false); $(b.dataset.go).scrollIntoView({ behavior: "smooth" });
}));
window.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette(palette.hidden); }
  if (e.key === "Escape") { setPalette(false); closeCase(); }
});
