import { Link } from "react-router-dom";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";
import MaskedHeading from "../components/MaskedHeading.jsx";
import ServiceDirectoryBand from "../components/ServiceDirectoryBand.jsx";
import { DevBadge } from "../components/GuardContent.jsx";
import { trackEvent } from "../utils/analytics.js";

export default function Services() {
  return (
    <>
      <Seo
        {...pageMeta.services}
        path="/services"
        ogImage={pageMeta.services.ogImage}
        breadcrumbLabel="Services"
      />

      {/* Compact editorial header aligned left */}
      <header className="services-page-header">
        <div className="page-wrap">
          <div className="breadcrumb-dark" data-hero-item="" style={{ "--hero-index": 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>
          <span className="eyebrow" data-hero-item="" style={{ "--hero-index": 1 }}>
            <span className="eyebrow-dot" /> Residential · Commercial · Irrigation
          </span>
          <MaskedHeading
            lines={[
              [{ text: "Well drilling &" }],
              [{ text: "water services." }],
            ]}
          />
          <p data-hero-item="" style={{ "--hero-index": 2 }}>
            From 2-inch to 12-inch wells, submersible pumps, and constant-pressure tanks to repairs and testing across West Michigan.
          </p>
        </div>
      </header>

      {/* Typographic index with hover / touch previews */}
      <ServiceDirectoryBand />

      {/* Open capacity (2" to 12") & Weekend/Holiday dispatch note */}
      <section className="services-capacity-band" aria-label="Drilling capacity and weekend dispatch">
        <div className="page-wrap two-col-open-values">
          <div className="open-value-col">
            <span className="mono-label">
              DRILLING CAPACITY <DevBadge tag="verify" />
            </span>
            <strong>2&quot; to 10&quot; standard · up to 12&quot; wells</strong>
            <p>
              Drilling and service across residential 2-inch to 6-inch wells and 6-inch or larger commercial and irrigation bores, with capability to drill or replace up to 12 inches.
            </p>
          </div>
          <div className="open-value-col">
            <span className="mono-label">
              DISPATCH &amp; EMERGENCIES <DevBadge tag="verify" />
            </span>
            <strong>Weekend &amp; holiday service</strong>
            <p>
              {site.emergencyHours}. Call{" "}
              <a
                className="text-link"
                href={site.phoneLink}
                onClick={() => trackEvent("click_to_call", { source: "services_dispatch" })}
              >
                {site.phone} <Icon name="arrowRight" size={14} />
              </a>{" "}
              and leave a message if our crew is on site—we return calls promptly.
            </p>
          </div>
        </div>
      </section>

      <CTA
        compact
        eyebrow="Start with the right solution"
        title="Planning a water project?"
        description="Tell us what you're working on, and our Newaygo crew will help you determine the right next step."
      />
    </>
  );
}
