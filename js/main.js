// ==========================================================================
// Annepeace Alwala — site script
// Each numbered block below turns on one library or one small piece of
// behavior. Read them independently — nothing here depends on order except
// that it must run after the library <script> tags in index.html.
// ==========================================================================

// -------- 1. Footer year --------
document.getElementById("year").textContent = new Date().getFullYear();

// -------- 2. Lucide icons --------
// Swaps every <i data-lucide="..."> tag for a real SVG icon.
lucide.createIcons();

// -------- 3. Utility bar live clock --------
// Updates the small date/time in the thin bar above the navbar (desktop only).
function updateClock() {
  const el = document.getElementById("utilityClock");
  if (!el) return;
  const now = new Date();
  const datePart = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timePart = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  el.textContent = `${datePart}  ·  ${timePart}`;
}
updateClock();
setInterval(updateClock, 30 * 1000); // refresh every 30 seconds

// -------- 4. Mobile navigation toggle --------
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");

navToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("hidden") === false;
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuIcon.classList.toggle("hidden", isOpen);
  closeIcon.classList.toggle("hidden", !isOpen);
});

// -------- 5. Navbar liquid-glass state on scroll --------
// The navbar stays glass the whole time; scrolling just deepens the tint
// slightly (via the .is-scrolled class) instead of swapping to a solid color.
const header = document.getElementById("site-header");
window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  },
  { passive: true }
);

// -------- 6. AOS (Animate On Scroll) --------
// Elements with data-aos="fade-up" (etc.) fade/slide into view once, the
// first time they scroll into the viewport.
AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
});

// -------- 7. Swiper: "Moments" gallery --------
// Autoplay, loop, no visible arrows/dots (hidden in style.css) to keep it minimal.
new Swiper(".momentsSwiper", {
  effect: "fade",
  fadeEffect: { crossFade: true },
  autoplay: { delay: 4500, disableOnInteraction: false },
  loop: true,
});

// -------- 8. Lenis smooth scroll --------
// Intercepts scroll input and animates it for the smooth, weighted feel
// used across apple.com and similar sites.
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cubic
  smoothWheel: true,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);