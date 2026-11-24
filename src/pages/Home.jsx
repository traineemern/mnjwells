import { Link } from "react-router-dom";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";

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

const featureIcons = { home: "home", shield: "shield", phone: "phone" };
const townId = (town) => `town-${town.toLowerCase().replace(/\s+/g, "-")}`;

export default function Home() {
  return (
    <>
      <Seo {...pageMeta.home} path="/" schema={businessSchema} />
      <section className="hero">
        <div className="hero-image" role="img" aria-label="M&J Water Wells drilling truck parked at a job site" />
        <div className="hero-shade" />
        <div className="hero-content page-wrap">
          <div className="hero-text">
            <span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Family-owned in Newaygo, Michigan</span>
            <h1>West Michigan&apos;s<br /><em>Well Drilling</em> Specialists!</h1>
            <p>Dependable well drilling and water system service for homes, businesses, and farms across West Michigan.</p>
            <div className="hero-actions">
              <a className="button button-primary button-large" href={site.phoneLink}><Icon name="phone" size={18} />Call {site.phone}</a>
              <Link className="button button-outline-light button-large" to="/contact">Request a free estimate <Icon name="arrowRight" size={18} /></Link>
            </div>
            <div className="hero-note"><Icon name="check" size={17} /> Local service. Straightforward answers.</div>
          </div>
          <div className="hero-photo-caption"><span className="caption-line" />On the job across West Michigan</div>
        </div>
        <a className="hero-scroll" href="#welcome"><span>Scroll to explore</span><Icon name="arrowDown" size={17} /></a>
      </section>

      <section id="welcome" className="intro-section section-pad">
        <div className="page-wrap intro-grid">
          <div className="intro-art">
            <img src="/images/service-trucks.png" alt="M&J Water Wells drilling trucks ready for a job" width="600" height="300" loading="lazy" />
            <div className="intro-stamp"><strong>Local</strong><span>people.<br />Reliable<br />water.</span></div>
          </div>
          <div className="intro-copy">
            <span className="eyebrow">Good water starts here</span>
            <h2>Water is essential.<br /><span>Good service should be, too.</span></h2>
            <p className="lead">From a new well to a pump that needs attention, our family-owned team is here to help keep your water flowing.</p>
            <p>Based in Newaygo, M&amp;J Water Wells serves residential, commercial, and irrigation customers throughout West Michigan with practical experience and personal service.</p>
            <Link to="/about" className="text-link">A little more about us <Icon name="arrowRight" size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="feature-section section-pad">
        <div className="page-wrap">
          <SectionHeading eyebrow="The M&J difference" title="Local know-how. Water you can count on." description="Whether you're planning a project or solving a water problem, our team is ready to talk it through." />
          <div className="feature-grid">
            {site.features.map((feature, index) => (
              <article className="feature-card" key={feature.title}>
                <span className="feature-number">0{index + 1}</span>
                <span className="icon-tile"><Icon name={featureIcons[feature.icon]} size={23} /></span>
                <span className="eyebrow">{feature.eyebrow}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.href} className="text-link">{feature.linkText}<Icon name="arrowRight" size={16} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews-section section-pad">
        <div className="page-wrap reviews-inner">
          <div className="reviews-copy">
            <span className="eyebrow">Recommended by West Michigan neighbors</span>
            <h2>See what local customers are saying.</h2>
            <p>Read recent experiences and feedback for M&amp;J Water Wells on Google.</p>
          </div>
          <a
            className="button button-outline-dark"
            href={site.googleBusinessUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Google reviews <Icon name="arrowRight" size={17} />
          </a>
        </div>
      </section>

      <section className="trust-section">
        <div className="page-wrap trust-inner">
          <div className="trust-title"><span className="eyebrow">Products we work with</span><h2>Trusted names.<br />Dependable systems.</h2></div>
          <div className="partner-list" aria-label={`Brands and products: ${site.partners.join(", ")}`}>
            {site.partners.map((partner, index) => <span className={`partner-name partner-${index + 1}`} key={partner}>{partner}</span>)}
          </div>
          <div className="payment-list">
            <span className="payment-label">Convenient ways to pay</span>
            <div>{site.paymentMethods.map((method) => <span className="payment-tag" key={method}>{method}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="service-areas" className="service-area-section section-pad">
        <div className="page-wrap area-layout">
          <div className="area-content">
            <SectionHeading eyebrow="Close to home" title="Proud to serve West Michigan." description="Based in Newaygo, we're on the road helping neighbors across the region." />
            <h3 className="area-subtitle">Communities we serve</h3>
            <div className="town-list">{site.serviceAreas.towns.map((town) => <a key={town} href={`#${townId(town)}`}><Icon name="mapPin" size={14} />{town}</a>)}</div>
            <p className="county-copy"><strong>Also serving:</strong> {site.serviceAreas.counties.map((county) => `${county} County`).join(" · ")}<br />and communities across West Michigan.</p>
            <Link to="/contact" className="text-link">Check service in your area <Icon name="arrowRight" size={16} /></Link>
          </div>
          <div className="area-image">
            <img src="/images/west-michigan-farm.png" alt="A red barn and open field in West Michigan" width="800" height="450" loading="lazy" />
            <div className="area-image-note"><Icon name="mapPin" size={20} /><span><b>Rooted in Newaygo</b><small>Serving neighbors across West Michigan</small></span></div>
          </div>
        </div>
        <div className="page-wrap town-coverage">
          <h3>Well service in nearby towns</h3>
          <div className="town-coverage-grid">
            {site.serviceAreas.towns.map((town) => (
              <article id={townId(town)} className="town-coverage-card" key={town}>
                <h4>{town}, Michigan</h4>
                <Link to="/contact" className="text-link">Ask about service here <Icon name="arrowRight" size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
