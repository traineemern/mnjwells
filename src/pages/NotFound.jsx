import { Link } from "react-router-dom";
import { pageMeta, site } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import { Icon } from "../components/Icons.jsx";
/* [NEW] Masked-baseline word reveal for hero heading */
import MaskedHeading from "../components/MaskedHeading.jsx";

export default function NotFound() {
  return (
    <>
      <Seo {...pageMeta.notFound} path="/404" />
      <section className="not-found-section">
        <div className="not-found-watermark" aria-hidden="true">404</div>
        <div className="page-wrap not-found-content">
          <span className="eyebrow" data-hero-item="" style={{ "--hero-index": 0 }}>Looks like you've hit dry ground</span>
          {/* [UPDATED] Masked-baseline word reveal on 404 hero headline */}
          <MaskedHeading
            lines={[
              [{ text: "We can't find" }],
              [{ text: "that page." }],
            ]}
          />
          <p data-hero-item="" style={{ "--hero-index": 1 }}>The page may have moved or the address might be off. Let's get you back on track.</p>
          <div className="hero-actions" data-hero-item="" style={{ "--hero-index": 2 }}>
            <Link to="/" className="button button-primary">Back to home <Icon name="arrowRight" size={17} /></Link>
            <a href={site.phoneLink} className="button button-outline-dark"><Icon name="phone" size={17} />Call {site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
