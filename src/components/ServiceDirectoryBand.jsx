import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
import PictureAsset from "./PictureAsset.jsx";
import { DevBadge } from "./GuardContent.jsx";
import { trackEvent } from "../utils/analytics.js";

/* Signature Moment #5: Typographic Service Index (hover preview on desktop, tap expand inline on touch) */
const PREVIEW_BASES = [
  "process-step-2",
  "process-step-3",
  "process-step-4",
  "process-step-1",
  "truck",
  "process-step-3",
  "process-step-1",
  "warehouse",
  "service-trucks",
  "west-michigan-farm",
];

export default function ServiceDirectoryBand({ compact = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [expandedTouchIndex, setExpandedTouchIndex] = useState(0);

  const currentService = site.services[hoveredIndex] || site.services[0];
  const currentBase = PREVIEW_BASES[hoveredIndex] || PREVIEW_BASES[0];

  return (
    <section className="service-dir-section section-pad" aria-label="Services index">
      <div className="page-wrap">
        {compact ? (
          <div className="section-heading">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> What we do
            </span>
            <h2>Well drilling &amp; water services.</h2>
            <p>Hover any row on desktop or tap on mobile to inspect scope and connect directly with our crew.</p>
          </div>
        ) : null}

        <div className="service-dir-split">
          <div>
            <div className="service-typographic-list" role="list">
              {site.services.map((service, index) => {
                const isActive = hoveredIndex === index;
                const isExpanded = expandedTouchIndex === index;
                const base = PREVIEW_BASES[index] || PREVIEW_BASES[0];
                const panelId = `service-inline-panel-${index}`;

                return (
                  <div
                    key={service.title}
                    role="listitem"
                    className={`service-type-row${isActive ? " is-active" : ""}${isExpanded ? " is-expanded" : ""}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                  >
                    <button
                      type="button"
                      className="service-row-trigger"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onFocus={() => setHoveredIndex(index)}
                      onClick={() => {
                        setHoveredIndex(index);
                        setExpandedTouchIndex(isExpanded ? -1 : index);
                      }}
                    >
                      <span className="service-type-num mono-label tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="service-type-copy">
                        <h2>
                          {service.title}
                          <DevBadge tag={service.tag} />
                        </h2>
                        <p>{service.description}</p>
                      </div>
                      <Link
                        to="/contact"
                        className="service-type-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackEvent("quote_click", { source: "service_index", service: service.title });
                        }}
                      >
                        Inquire <Icon name="arrowRight" size={16} />
                      </Link>
                    </button>

                    {/* Touch / Mobile inline expanded image + CTA */}
                    <div id={panelId} className="service-touch-inline" hidden={!isExpanded}>
                      <div className="service-touch-thumb">
                        <PictureAsset
                          base={base}
                          alt={service.title}
                          width={480}
                          height={320}
                          loading="lazy"
                        />
                      </div>
                      <Link
                        to="/contact"
                        className="text-link"
                        onClick={() => trackEvent("quote_click", { source: "service_touch_inline", service: service.title })}
                      >
                        Ask about {service.title.toLowerCase()} <Icon name="arrowRight" size={15} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="service-end-cta-line">
              <p>
                <strong>Not sure which setup your property needs?</strong> Call {site.phone} or ask about our 5-year pump &amp; pressure tank warranty.
              </p>
              <a
                className="text-link"
                href={site.phoneLink}
                onClick={() => trackEvent("click_to_call", { source: "service_directory_footer" })}
              >
                Call {site.phone} <Icon name="arrowRight" size={16} />
              </a>
            </div>
          </div>

          <aside className="service-preview-sticky" aria-hidden="true">
            <div className="service-preview-media">
              <PictureAsset
                key={currentBase}
                base={currentBase}
                alt=""
                width={600}
                height={450}
                loading="lazy"
              />
            </div>
            <div className="service-preview-caption">
              <span className="mono-label tabular-nums">
                SERVICE {String(hoveredIndex + 1).padStart(2, "0")} // {currentService.title}
              </span>
              <p>{currentService.description}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
