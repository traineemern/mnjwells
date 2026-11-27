import { useRef } from "react";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
import PictureAsset from "./PictureAsset.jsx";
import { DevBadge, GuardContent } from "./GuardContent.jsx";
import { prefersReducedMotion } from "../motion/reveal.js";
import { trackEvent } from "../utils/analytics.js";

/* Signature Moment #6: Full-bleed horizontal Projects Filmstrip with drag/swipe controls (tagged dummy) */
export default function ProjectsFilmstrip() {
  const railRef = useRef(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const nudge = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const step = Math.min(440, rail.clientWidth * 0.78);
    rail.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const onPointerDown = (event) => {
    const rail = railRef.current;
    if (!rail || event.pointerType === "touch") return;
    dragState.current = { active: true, startX: event.clientX, scrollLeft: rail.scrollLeft };
    rail.classList.add("is-dragging");
  };

  const onPointerMove = (event) => {
    const rail = railRef.current;
    if (!dragState.current.active || !rail) return;
    const walk = (event.clientX - dragState.current.startX) * 1.15;
    rail.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const stopDrag = () => {
    dragState.current.active = false;
    railRef.current?.classList.remove("is-dragging");
  };

  return (
    <GuardContent tag="dummy">
      <section className="filmstrip-section section-pad" aria-label="Fieldwork and representative projects">
        <div className="page-wrap filmstrip-header">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> On the job across West Michigan
              <DevBadge tag="dummy" label="dummy gallery" />
            </span>
            <h2>Fieldwork &amp; representative installations.</h2>
          </div>

          <div className="filmstrip-controls">
            <button
              type="button"
              className="filmstrip-btn"
              aria-label="Scroll projects left"
              onClick={() => nudge(-1)}
            >
              <Icon name="arrowLeft" size={18} />
            </button>
            <button
              type="button"
              className="filmstrip-btn"
              aria-label="Scroll projects right"
              onClick={() => nudge(1)}
            >
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="filmstrip-track"
          tabIndex={0}
          aria-label="Scrollable fieldwork gallery"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerLeave={stopDrag}
        >
          {site.projectsFilmstrip.map((item) => (
            <figure key={item.id} className="filmstrip-frame">
              <div className="filmstrip-media">
                <PictureAsset
                  base={item.imageBase}
                  alt={item.alt}
                  width={680}
                  height={440}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <figcaption>
                <span className="mono-label">
                  {item.code}
                  <DevBadge tag={item.tag} />
                </span>
                <strong>{item.title}</strong>
                <small>{item.location}</small>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="page-wrap process-inline-cta">
          <p>
            <strong>Planning a residential, farm, or commercial bore?</strong> Tell us about your site.
          </p>
          <a
            className="text-link"
            href={site.phoneLink}
            onClick={() => trackEvent("click_to_call", { source: "projects_filmstrip" })}
          >
            Call {site.phone} <Icon name="arrowRight" size={16} />
          </a>
        </div>
      </section>
    </GuardContent>
  );
}
