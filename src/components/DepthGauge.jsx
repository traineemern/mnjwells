import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../motion/reveal.js";

/* Signature Moment #1: Fixed vertical drilling depth gauge along left gutter */
const TICKS = ["0 FT", "100 FT", "200 FT"];

export default function DepthGauge() {
  const fillRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return undefined;

    if (prefersReducedMotion()) {
      fill.style.transform = "scaleY(1)";
      return undefined;
    }

    let rafId = 0;
    const sync = () => {
      rafId = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0.04, window.scrollY / docHeight)) : 1;
      fill.style.transform = `scaleY(${progress.toFixed(4)})`;
      document.documentElement.style.setProperty("--soil-depth", progress.toFixed(3));
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <aside className="depth-gauge" aria-hidden="true">
      <div className="depth-gauge-ticks">
        {TICKS.map((label) => (
          <span key={label} className="depth-tick-label mono-label">{label}</span>
        ))}
      </div>
      <div className="depth-gauge-rail">
        <div ref={fillRef} className="depth-gauge-fill" />
      </div>
    </aside>
  );
}
