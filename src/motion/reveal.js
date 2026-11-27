/* [NEW] Vanilla JS motion engine: IntersectionObserver reveals, View Transitions API helper, and will-change cleanup */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const STAGGER_STEP_MS = 70;
const REVEAL_CLEANUP_MS = 950;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function clearWillChange(element, fallbackMs) {
  if (!element) return;
  let cleaned = false;
  const finish = () => {
    if (cleaned) return;
    cleaned = true;
    element.style.willChange = "";
    element.removeEventListener("transitionend", onEnd);
    element.removeEventListener("animationend", onEnd);
  };
  const onEnd = (event) => {
    if (event.target === element) finish();
  };
  element.addEventListener("transitionend", onEnd);
  element.addEventListener("animationend", onEnd);
  window.setTimeout(finish, fallbackMs);
}

function revealElement(target) {
  if (target.hasAttribute("data-reveal-stagger")) {
    const items = target.querySelectorAll("[data-reveal-item]");
    items.forEach((item, index) => {
      const delay = index * STAGGER_STEP_MS;
      item.style.setProperty("--reveal-delay", `${delay}ms`);
      item.style.willChange = "transform, opacity";
      clearWillChange(item, REVEAL_CLEANUP_MS + delay);
    });
  } else {
    target.style.willChange = "transform, opacity";
    clearWillChange(target, REVEAL_CLEANUP_MS);
  }
  target.classList.add("is-revealed");
}

export function initRevealObserver(root = document) {
  const targets = Array.from(
    root.querySelectorAll("[data-reveal], [data-reveal-stagger]")
  );
  const heroAnimateNodes = Array.from(
    root.querySelectorAll("[data-hero-item], .mask-word")
  );

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return () => {};
  }

  heroAnimateNodes.forEach((node, index) => {
    node.style.willChange = "transform, opacity";
    clearWillChange(node, REVEAL_CLEANUP_MS + index * 55);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealElement(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );

  targets.forEach((el) => {
    if (!el.classList.contains("is-revealed")) {
      observer.observe(el);
    }
  });

  return () => observer.disconnect();
}

export function runViewTransition(callback) {
  if (!prefersReducedMotion() && typeof document.startViewTransition === "function") {
    document.startViewTransition(callback);
    return;
  }
  callback();
}
