/* [UPDATED] Lazy-loaded GSAP + ScrollTrigger motion engine with IntersectionObserver fallback and will-change cleanup */
import { motionConfig } from "./config";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 800px)";
const REVEAL_CLEANUP_MS = 950;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function isLowPowerOrMobile() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia(MOBILE_QUERY).matches) return true;
  if (typeof navigator !== "undefined") {
    if (typeof navigator.deviceMemory === "number" && navigator.deviceMemory < 2) return true;
    if (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2) return true;
  }
  return false;
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

function initFallbackObserver(targets) {
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return () => {};
  }
  document.documentElement.classList.add("reveal-fallback");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (target.hasAttribute("data-reveal-stagger")) {
          target.querySelectorAll("[data-reveal-item]").forEach((item, index) => {
            const delay = index * (motionConfig.stagger.cards * 1000);
            item.style.setProperty("--reveal-delay", `${delay}ms`);
            item.style.willChange = "transform, opacity";
            clearWillChange(item, REVEAL_CLEANUP_MS + delay);
          });
        } else {
          target.style.willChange = "transform, opacity";
          clearWillChange(target, REVEAL_CLEANUP_MS);
        }
        target.classList.add("is-revealed");
        observer.unobserve(target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );

  targets.forEach((el) => {
    if (!el.classList.contains("is-revealed")) observer.observe(el);
  });

  return () => observer.disconnect();
}

export function initRevealObserver(root = document) {
  if (!root) return () => {};
  const targets = Array.from(root.querySelectorAll("[data-reveal], [data-reveal-stagger]"));
  const heroAnimateNodes = Array.from(root.querySelectorAll("[data-hero-item], .mask-word"));

  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return () => {};
  }

  heroAnimateNodes.forEach((node, index) => {
    node.style.willChange = "transform, opacity";
    clearWillChange(node, REVEAL_CLEANUP_MS + index * 55);
  });

  if (!targets.length) return () => {};

  let cancelled = false;
  let gsapContext = null;
  let disconnectFallback = null;

  Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
    .then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      gsapContext = gsap.context(() => {
        root.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: motionConfig.duration.reveal,
              ease: motionConfig.gsapEase,
              scrollTrigger: {
                trigger: el,
                start: "top 96%",
                once: true,
              },
              onStart: () => {
                el.style.willChange = "transform, opacity";
              },
              onComplete: () => {
                el.classList.add("is-revealed");
                gsap.set(el, { clearProps: "willChange,transform,opacity" });
              },
            }
          );
        });

        root.querySelectorAll("[data-reveal-stagger]:not(.is-revealed)").forEach((container) => {
          const items = Array.from(container.querySelectorAll("[data-reveal-item]"));
          if (!items.length) return;
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: motionConfig.duration.reveal,
              stagger: motionConfig.stagger.cards,
              ease: motionConfig.gsapEase,
              scrollTrigger: {
                trigger: container,
                start: "top 96%",
                once: true,
              },
              onStart: () => {
                items.forEach((item) => {
                  item.style.willChange = "transform, opacity";
                });
              },
              onComplete: () => {
                container.classList.add("is-revealed");
                items.forEach((item) => {
                  gsap.set(item, { clearProps: "willChange,transform,opacity" });
                });
              },
            }
          );
        });
      }, root);

      ScrollTrigger.refresh();
    })
    .catch(() => {
      if (!cancelled) {
        disconnectFallback = initFallbackObserver(targets);
      }
    });

  return () => {
    cancelled = true;
    gsapContext?.revert();
    disconnectFallback?.();
  };
}

export function initHeroParallax(triggerSelector, targetElement) {
  if (!targetElement || prefersReducedMotion() || isLowPowerOrMobile()) {
    return () => {};
  }

  let cancelled = false;
  let gsapContext = null;

  Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
    .then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapContext = gsap.context(() => {
        gsap.fromTo(
          targetElement,
          { y: -12 },
          {
            y: 24,
            ease: "none",
            scrollTrigger: {
              trigger: triggerSelector,
              start: "top top",
              end: "bottom top",
              scrub: true,
              onToggle: ({ isActive }) => {
                targetElement.style.willChange = isActive ? "transform" : "";
              },
            },
          }
        );
      });
    })
    .catch(() => {});

  return () => {
    cancelled = true;
    gsapContext?.revert();
    targetElement.style.willChange = "";
  };
}

export function runViewTransition(callback) {
  if (!prefersReducedMotion() && typeof document.startViewTransition === "function") {
    document.startViewTransition(callback);
    return;
  }
  callback();
}
