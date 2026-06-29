gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function splitIntoLetters(el) {
  const text = el.textContent;
  el.textContent = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = char;
    el.appendChild(span);
  });
  return el.querySelectorAll(".letter");
}

function runIntro() {
  const intro = document.getElementById("intro");

  if (prefersReducedMotion) {
    intro.style.display = "none";
    document.body.style.overflow = "";
    return;
  }

  document.body.style.overflow = "hidden";

  const line1 = document.getElementById("intro-line-1");
  const line2 = document.getElementById("intro-line-2");
  const letters1 = splitIntoLetters(line1);
  const letters2 = splitIntoLetters(line2);
  const mark = document.querySelector(".intro-mark");
  const coord = document.querySelector(".intro-coord");
  const panelLeft = document.querySelector(".intro-panel--left");
  const panelRight = document.querySelector(".intro-panel--right");

  const tl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = "";
      intro.style.pointerEvents = "none";
    },
  });

  tl.to([...letters1, ...letters2], {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power3.out",
    stagger: 0.045,
  })
    .to(
      mark,
      { opacity: 1, rotate: 90, duration: 0.5, ease: "power2.out" },
      "-=0.2",
    )
    .to(coord, { opacity: 1, duration: 0.4, ease: "power1.out" }, "-=0.2")
    .to({}, { duration: 0.35 })
    .to(
      panelLeft,
      { xPercent: -100, duration: 0.9, ease: "power3.inOut" },
      "+=0",
    )
    .to(panelRight, { xPercent: 100, duration: 0.9, ease: "power3.inOut" }, "<")
    .to(
      ".intro-content",
      { opacity: 0, duration: 0.5, ease: "power2.out" },
      "<",
    );
}

// NAV
function initNav() {
  const nav = document.getElementById("navbar");
  ScrollTrigger.create({
    start: 50,
    end: 99999,
    onUpdate: (self) => {
      nav.style.paddingTop = self.scroll() > 50 ? "0" : "0";
      nav.classList.toggle("is-scrolled", self.scroll() > 50);
    },
  });

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-open");
  });
  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () =>
      mobileMenu.classList.remove("is-open"),
    );
  });
}

// SCROLL REVEALS
function initReveals() {
  const ease = prefersReducedMotion ? "none" : "power2.out";
  const duration = prefersReducedMotion ? 0.01 : 0.7;

  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: prefersReducedMotion ? 0 : 28 },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        scrollTrigger: { trigger: el, start: "top 85%" },
      },
    );
  });

  gsap.utils.toArray(".program-grid, .pricing-grid").forEach((grid) => {
    const cards = grid.querySelectorAll(".program-card, .price-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: grid, start: "top 85%" },
      },
    );
  });
}

// HUD STAT COUNT-UP
function initCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        if (prefersReducedMotion) {
          el.textContent = target;
          return;
        }
        gsap.to(el, {
          textContent: target,
          duration: 1.4,
          ease: "power1.out",
          snap: { textContent: 1 },
        });
      },
    });
  });
}

// SCRUBBED ANIMATIONS
function initScrub() {
  if (prefersReducedMotion) return;

  const frame = document.querySelector(".hero-frame");
  if (frame) {
    gsap.to("#scan-line", {
      top: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  const fill = document.getElementById("about-fill");
  if (fill) {
    gsap.to(fill, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top 70%",
        end: "bottom 60%",
        scrub: true,
      },
    });
  }
}

// CTA FORM
function initForm() {
  const form = document.getElementById("cta-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    const original = btn.textContent;
    btn.textContent = "ENVOYÉ ✓";
    setTimeout(() => (btn.textContent = original), 2200);
    form.reset();
  });
}

// FOOTER YEAR
function initYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  runIntro();
  initNav();
  initReveals();
  initCounters();
  initScrub();
  initForm();
  initYear();
});
