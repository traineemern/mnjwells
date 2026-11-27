/**
 * Privacy-respecting conversion analytics (zero cookies, zero third-party PII).
 * Emits `mj:analytics` CustomEvents on window and forwards to lightweight cookieless hooks if configured.
 */
export function trackEvent(eventName, detail = {}) {
  if (typeof window === "undefined") return;
  const payload = {
    event: eventName,
    path: window.location.pathname,
    timestamp: Date.now(),
    ...detail,
  };
  window.dispatchEvent(new CustomEvent("mj:analytics", { detail: payload }));
  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props: detail });
  }
  if (import.meta.env.DEV) {
    window.__mjAnalyticsLog = window.__mjAnalyticsLog || [];
    window.__mjAnalyticsLog.push(payload);
  }
}

/**
 * Subtle magnetic cursor pull for desktop primary CTAs (disabled on touch devices & reduced motion).
 */
export function attachMagneticEffect(element, strength = 0.18) {
  if (typeof window === "undefined" || !element) return () => {};
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isTouch || reduced) return () => {};

  const onMove = (e) => {
    const rect = element.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    element.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  };
  const onLeave = () => {
    element.style.transform = "";
  };
  element.addEventListener("mousemove", onMove);
  element.addEventListener("mouseleave", onLeave);
  return () => {
    element.removeEventListener("mousemove", onMove);
    element.removeEventListener("mouseleave", onLeave);
  };
}
