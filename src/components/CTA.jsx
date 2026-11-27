import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
import { attachMagneticEffect, trackEvent } from "../utils/analytics.js";

export default function CTA({
  compact = false,
  eyebrow = "Ready when you are",
  title = "Get a free estimate now.",
  description = "Call or tell us a little about your project online.",
}) {
  const primaryBtnRef = useRef(null);

  useEffect(() => {
    return attachMagneticEffect(primaryBtnRef.current, 0.16);
  }, []);

  return (
    <section className={`cta-band${compact ? " cta-band-compact" : ""}`}>
      <div className="page-wrap cta-inner" data-reveal="">
        <div className="cta-copy">
          <span className="eyebrow eyebrow-gold">
            <span className="eyebrow-dot" /> {eyebrow}
          </span>
          <h2>{title}</h2>
          <p>{description} Call {site.phone} for a straightforward conversation.</p>
        </div>
        <div className="cta-actions">
          <a
            ref={primaryBtnRef}
            className="button button-white button-large"
            href={site.phoneLink}
            onClick={() => trackEvent("click_to_call", { source: "closing_cta" })}
          >
            <Icon name="phone" size={18} /> Call {site.phone}
          </a>
          <Link
            className="button button-outline-light button-large"
            to="/contact"
            onClick={() => trackEvent("quote_click", { source: "closing_cta" })}
          >
            Get a Free Quote <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
