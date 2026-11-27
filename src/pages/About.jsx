import { Link } from "react-router-dom";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";
import MaskedHeading from "../components/MaskedHeading.jsx";
import PictureAsset from "../components/PictureAsset.jsx";
import { DevBadge } from "../components/GuardContent.jsx";
import { trackEvent } from "../utils/analytics.js";

export default function About() {
  return (
    <>
      <Seo
        {...pageMeta.about}
        path="/about"
        ogImage={pageMeta.about.ogImage}
        breadcrumbLabel="About"
      />

      {/* Editorial opening */}
      <header className="about-editorial-hero">
        <div className="page-wrap">
          <div className="breadcrumb-dark" data-hero-item="" style={{ "--hero-index": 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About</span>
          </div>
          <span className="eyebrow" data-hero-item="" style={{ "--hero-index": 1 }}>
            <span className="eyebrow-dot" /> Neighbors helping neighbors
          </span>
          <MaskedHeading lines={[[{ text: "Good work runs in the family." }]]} />
          <p className="about-editorial-lead" data-hero-item="" style={{ "--hero-index": 2 }}>
            M&amp;J Water Wells is a family-owned and operated contractor in Newaygo, Michigan—led by {site.owners[0]} and {site.owners[1]}<DevBadge tag="verify" /> and built on straightforward local service.
          </p>
        </div>
      </header>

      {/* Full-height edge-bleed split with company sign */}
      <section className="edge-split" aria-label="Our family story">
        <div className="edge-split-media" data-reveal="">
          <PictureAsset
            base="company-sign"
            alt={site.altText.sign}
            width={445}
            height={300}
            loading="lazy"
          />
          <span className="edge-media-caption">1038 STANTON AVE · NEWAYGO, MI</span>
        </div>

        <div className="edge-split-body" data-reveal="">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> A family-owned business
          </span>
          <h2>
            More than a well.<br />
            <span>A relationship you can trust.</span>
          </h2>
          <p className="lead">
            {site.owners[0]} and {site.owners[1]} and their crew are committed to serving Newaygo and surrounding West Michigan communities with care.
          </p>
          <p>
            From residential domestic wells to commercial and agricultural projects, we work with wells from 2 inches to 10 inches and can drill or replace wells up to 12 inches depending on project requirements<DevBadge tag="verify" />.
          </p>

          <div className="split-cta-row">
            <a
              className="button button-primary"
              href={site.phoneLink}
              onClick={() => trackEvent("click_to_call", { source: "about_story" })}
            >
              <Icon name="phone" size={17} /> Call {site.phone}
            </a>
            <Link
              to="/contact"
              className="text-link"
              onClick={() => trackEvent("quote_click", { source: "about_story" })}
            >
              Get a Free Quote <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Two-column prose commitments + edge-bleed warehouse split */}
      <section className="edge-split is-reversed is-soft" aria-label="Our commitments">
        <div className="edge-split-media" data-reveal="">
          <PictureAsset
            base="warehouse"
            alt={site.altText.warehouse}
            width={872}
            height={436}
            loading="lazy"
          />
          <span className="edge-media-caption">M&amp;J YARD &amp; HOME BASE · NEWAYGO</span>
        </div>

        <div className="edge-split-body" data-reveal="">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> Commitments
          </span>
          <h2>Straightforward work from the first call forward.</h2>

          <div className="two-col-open-values">
            <div className="open-value-col">
              <strong>
                Equipment &amp; range <DevBadge tag="verify" />
              </strong>
              <p>
                Outfitted in Newaygo for 2&quot;–10&quot; well work and up to 12&quot; replacement or large-capacity installations across homes, farms, and businesses.
              </p>
            </div>
            <div className="open-value-col">
              <strong>
                Weekend &amp; holiday help <DevBadge tag="verify" />
              </strong>
              <p>
                {site.emergencyHours}. If we cannot answer while on a rig, leave a message and we will return your call promptly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service area as clean text list */}
      <section className="about-towns-band" aria-label="Service areas">
        <div className="page-wrap" data-reveal="">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> Service area
            <DevBadge tag={site.serviceAreas.tag} />
          </span>
          <h2>Communities across West Michigan.</h2>
          <p className="county-copy">
            <strong>Towns:</strong> {site.serviceAreas.towns.join(" · ")}
          </p>
          <p className="county-copy">
            <strong>Counties:</strong> {site.serviceAreas.counties.map((c) => `${c} County`).join(" · ")}
          </p>
        </div>
      </section>

      <CTA
        compact
        eyebrow="Local help, personal service"
        title="Let's keep your water flowing."
        description="Contact our Newaygo team about well drilling or water system service."
      />
    </>
  );
}
