import { useEffect, useRef, useState } from "react";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
import PictureAsset from "./PictureAsset.jsx";
import { DevBadge, GuardContent } from "./GuardContent.jsx";
import { prefersReducedMotion } from "../motion/reveal.js";
import { trackEvent } from "../utils/analytics.js";

/* Signature Moment #4: 5-step Cutaway Process with animated connecting hairline (tagged dummy until owner sign-off) */
export default function WellProcessSection() {
  const sectionRef = useRef(null);
  const [lineDrawn, setLineDrawn] = useState(prefersReducedMotion);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || lineDrawn || typeof IntersectionObserver === "undefined") {
      setLineDrawn(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLineDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lineDrawn]);

  return (
    <GuardContent tag="dummy">
      <section
        ref={sectionRef}
        className={`process-section section-pad${lineDrawn ? " is-drawn" : ""}`}
        aria-label="How it works"
      >
        <div className="page-wrap process-header-left">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> How it works
              <DevBadge tag="dummy" label="dummy 5-step flow" />
            </span>
            <h2>Five clear steps from first call to clean water.</h2>
          </div>
          <p className="process-sub">
            From evaluating well depth and setbacks to final pressure testing, here is the standard flow for a new West Michigan installation.
          </p>
        </div>

        <div className="page-wrap process-hairline-stage">
          <div className="process-spine-track" aria-hidden="true">
            <div className="process-spine-fill" />
          </div>

          <div className="process-five-grid" role="list">
            {site.processSteps.map((item, index) => {
              const isCurrent = activeStep === index;
              return (
                <article
                  key={item.step}
                  role="listitem"
                  className={`process-five-step${isCurrent ? " is-current" : ""}`}
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  tabIndex={0}
                >
                  <div className="process-node-head">
                    <span className="process-node-num mono-label tabular-nums">{item.step}</span>
                    <DevBadge tag={item.tag} />
                  </div>

                  <div className="process-cutaway-thumb">
                    <PictureAsset
                      base={item.imageBase}
                      alt={item.alt}
                      width={260}
                      height={200}
                      loading="lazy"
                      className="process-cutaway-img"
                    />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="page-wrap process-inline-cta">
          <p>
            <strong>Ready to start a site assessment?</strong> Talk directly with Mark, Julie, and the crew.
          </p>
          <a
            className="text-link"
            href={site.phoneLink}
            onClick={() => trackEvent("click_to_call", { source: "how_it_works" })}
          >
            Call {site.phone} <Icon name="arrowRight" size={16} />
          </a>
        </div>
      </section>
    </GuardContent>
  );
}
