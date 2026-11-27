import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";
import MaskedHeading from "../components/MaskedHeading.jsx";
import PictureAsset from "../components/PictureAsset.jsx";
import { DevBadge } from "../components/GuardContent.jsx";
import MachineryStickyStage from "../components/MachineryStickyStage.jsx";
import WellProcessSection from "../components/WellProcessSection.jsx";
import ServiceDirectoryBand from "../components/ServiceDirectoryBand.jsx";
import ProjectsFilmstrip from "../components/ProjectsFilmstrip.jsx";
import MichiganServiceMap from "../components/MichiganServiceMap.jsx";
import { attachMagneticEffect, trackEvent } from "../utils/analytics.js";
import { initHeroParallax } from "../motion/reveal.js";

/*
 * Hero dummy headline alternatives from data layer (`site.heroAlternatives`):
 * 1) Deep Bedrock Water. Straightforward Local Work.
 * 2) Clean Water Wells Across Six West Michigan Counties.
 */

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  telephone: site.phone,
  email: site.email,
  url: site.siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: [
    ...site.serviceAreas.towns,
    ...site.serviceAreas.counties.map((name) => `${name} County, Michigan`),
  ],
  openingHours: site.businessHours,
};

const townId = (town) => `town-${town.toLowerCase().replace(/\s+/g, "-")}`;

export default function Home() {
  const heroImageRef = useRef(null);
  const heroCallBtnRef = useRef(null);

  useEffect(() => {
    const cleanParallax = initHeroParallax(".hero", heroImageRef.current);
    const cleanMagnetic = attachMagneticEffect(heroCallBtnRef.current, 0.16);
    return () => {
      if (typeof cleanParallax === "function") cleanParallax();
      if (typeof cleanMagnetic === "function") cleanMagnetic();
    };
  }, []);

  return (
    <>
      <Seo {...pageMeta.home} path="/" ogImage={pageMeta.home.ogImage} schema={businessSchema} />

      {/* 1. Full-Viewport Hero */}
      <section className="hero">
        <div ref={heroImageRef} className="hero-image" aria-hidden="true">
          <PictureAsset
            base="truck"
            alt=""
            width={1200}
            height={800}
            loading="eager"
            className="hero-bg-img"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-content page-wrap">
          <div className="hero-text">
            <span className="eyebrow eyebrow-gold" data-hero-item="" style={{ "--hero-index": 0 }}>
              <span className="eyebrow-dot" /> Family-owned in Newaygo, Michigan
            </span>

            <MaskedHeading
              lines={[
                [{ text: "West Michigan's" }],
                [{ text: "Well Drilling", em: true }, { text: " Specialists!" }],
              ]}
            />

            <p data-hero-item="" style={{ "--hero-index": 1 }}>
              {site.description}
            </p>

            <div className="hero-actions" data-hero-item="" style={{ "--hero-index": 2 }}>
              <a
                ref={heroCallBtnRef}
                className="button button-primary button-large hero-phone-cta"
                href={site.phoneLink}
                onClick={() => trackEvent("click_to_call", { source: "hero_primary" })}
              >
                <Icon name="phone" size={18} /> Call {site.phone}
              </a>
              <Link
                className="button button-outline-light button-large"
                to="/contact"
                onClick={() => trackEvent("quote_click", { source: "hero_secondary" })}
              >
                Get a Free Quote <Icon name="arrowRight" size={18} />
              </Link>
            </div>

            <div className="hero-note" data-hero-item="" style={{ "--hero-index": 3 }}>
              <Icon name="check" size={17} />
              <span>
                Open weekends and holidays for emergencies
                <DevBadge tag="verify" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who We Are Split (Surface to Bedrock scroll transition band) */}
      <section id="welcome" className="edge-split surface-to-bedrock" aria-label="Who we are">
        <div className="edge-split-media" data-reveal="">
          <PictureAsset
            base="service-trucks"
            alt={site.altText.trucks}
            width={600}
            height={300}
            loading="lazy"
          />
          <span className="edge-media-caption">NEWAYGO, MI · FIELD FLEET</span>
        </div>

        <div className="edge-split-body" data-reveal="">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> Who we are
          </span>
          <h2>
            Water is essential.<br />
            <span>Good service should be, too.</span>
          </h2>
          <p className="lead">
            From a new residential well to a pump that needs attention, our family-owned team in Newaygo is ready to keep your water flowing.
          </p>
          <p>
            Owners {site.owners[0]} and {site.owners[1]} and their crew serve homes, farms, and businesses across West Michigan with practical experience and honest answers.
          </p>

          <div className="open-pillars">
            {site.features.map((feature, index) => (
              <div key={feature.title} className="open-pillar-row">
                <span className="open-pillar-num mono-label tabular-nums">0{index + 1}</span>
                <div className="open-pillar-copy">
                  <strong>
                    {feature.title}
                    <DevBadge tag={feature.tag} />
                  </strong>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="split-cta-row">
            <a
              className="button button-primary"
              href={site.phoneLink}
              onClick={() => trackEvent("click_to_call", { source: "who_we_are" })}
            >
              <Icon name="phone" size={17} /> Call {site.phone}
            </a>
            <Link to="/about" className="text-link">
              More about us <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Signature Moment: Sticky Machinery Stage (2" to 12" & capabilities) */}
      <MachineryStickyStage />

      {/* 4. Signature Moment: 5-Step Cutaway Process (dummy-guarded for prod safety) */}
      <WellProcessSection />

      {/* 5. Signature Moment: Typographic Service Index with Hover / Touch Inline Previews */}
      <ServiceDirectoryBand compact />

      {/* 6. Signature Moment: Full-Bleed Projects Filmstrip (dummy-guarded for prod safety) */}
      <ProjectsFilmstrip />

      {/* 7. Signature Moment: Service Area + Animated Inline SVG Map */}
      <section id="service-areas" className="service-area-band">
        <div className="page-wrap area-open-grid">
          <div className="area-open-copy" data-reveal="">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> Service area
              <DevBadge tag={site.serviceAreas.tag} />
            </span>
            <h2>Proud to serve West Michigan.</h2>
            <p>
              Based at {site.address.street} in Newaygo, our drilling rigs and pump trucks serve neighbors throughout the region.
            </p>
            <div className="town-inline-list" aria-label="Towns served">
              {site.serviceAreas.towns.map((town) => (
                <a key={town} href={`#${townId(town)}`}>
                  <Icon name="mapPin" size={14} /> {town}
                </a>
              ))}
            </div>
            <p className="county-copy">
              <strong>Counties served:</strong>{" "}
              {site.serviceAreas.counties.map((county) => `${county} County`).join(" · ")}
            </p>
            <Link
              to="/contact"
              className="text-link"
              onClick={() => trackEvent("quote_click", { source: "service_area" })}
            >
              Check service in your area <Icon name="arrowRight" size={16} />
            </Link>
          </div>

          <div>
            <MichiganServiceMap compact />
          </div>
        </div>
      </section>

      {/* 8. Trust Proof Row (No unapproved testimonials; OEM partners, payment, emergency & 5-yr warranty statement) */}
      <section className="trust-section" aria-label="Brands, payment methods, and warranty">
        <div className="page-wrap trust-inner" data-reveal="">
          <div className="trust-col">
            <span className="eyebrow eyebrow-gold">Products we work with</span>
            <h2>Proven pumps &amp; systems.</h2>
            <div className="partner-list" aria-label={`Brands and products: ${site.partners.join(", ")}`}>
              {site.partners.map((partner) => (
                <span className="partner-name" key={partner}>{partner}</span>
              ))}
            </div>
          </div>

          <div className="trust-col">
            <span className="eyebrow eyebrow-gold">
              Warranty &amp; emergencies <DevBadge tag="verify" />
            </span>
            <h2>System protection &amp; weekend help.</h2>
            <p>{site.emergencyHours}.</p>
            <p>Ask us about 5-year warranty coverage for pumps and pressure tanks, including terms and eligibility.</p>
          </div>

          <div className="trust-col">
            <span className="eyebrow eyebrow-gold">Ways to pay</span>
            <h2>Convenient local options.</h2>
            <p className="payment-inline-text">{site.paymentMethods.join(" · ")}</p>
            <a
              className="text-link text-link-light"
              href={site.phoneLink}
              onClick={() => trackEvent("click_to_call", { source: "trust_proof" })}
            >
              Call {site.phone} <Icon name="arrowRight" size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 9. Closing CTA Band */}
      <CTA />
    </>
  );
}
