import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
import PictureAsset from "./PictureAsset.jsx";
import { DevBadge } from "./GuardContent.jsx";
import { trackEvent } from "../utils/analytics.js";

/* Signature Moment #3: Asymmetric 5/7 sticky machinery & capability showcase */
export default function MachineryStickyStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef([]);

  useEffect(() => {
    const nodes = chapterRefs.current.filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-chapter-idx"));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        }
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0.01 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const current = site.machineryStages[activeIndex] || site.machineryStages[0];

  return (
    <section className="machinery-sticky-section" aria-label="Machinery and well drilling capabilities">
      <div className="machinery-sticky-left">
        <PictureAsset
          key={current.imageBase}
          base={current.imageBase}
          alt={current.alt}
          width={800}
          height={600}
          loading="lazy"
          className="machinery-stage-img"
        />
        <div className="machinery-sticky-caption">
          <span className="mono-label">
            {current.caption}
            <DevBadge tag={current.tag} />
          </span>
          <strong>{current.title}</strong>
        </div>
      </div>

      <div className="machinery-scroll-right">
        <div className="machinery-scroll-head">
          <span className="eyebrow eyebrow-gold">
            <span className="eyebrow-dot" /> Machinery &amp; expertise
          </span>
          <h2>Heavy iron sized for West Michigan ground.</h2>
        </div>

        {site.machineryStages.map((stage, index) => {
          const isCurrent = activeIndex === index;
          return (
            <article
              key={stage.code}
              ref={(el) => {
                chapterRefs.current[index] = el;
              }}
              data-chapter-idx={index}
              className={`machinery-chapter${isCurrent ? " is-active" : ""}`}
            >
              <div className="machinery-mobile-media">
                <PictureAsset
                  base={stage.imageBase}
                  alt={stage.alt}
                  width={600}
                  height={400}
                  loading="lazy"
                />
              </div>
              <span className="mono-label">
                {stage.code}
                <DevBadge tag={stage.tag} />
              </span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </article>
          );
        })}

        <div className="split-cta-row">
          <a
            className="button button-primary button-large"
            href={site.phoneLink}
            onClick={() => trackEvent("click_to_call", { source: "machinery_stage" })}
          >
            <Icon name="phone" size={18} /> Call {site.phone}
          </a>
          <Link
            className="text-link text-link-light"
            to="/services"
            onClick={() => trackEvent("quote_click", { source: "machinery_stage_services" })}
          >
            Explore all services <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
