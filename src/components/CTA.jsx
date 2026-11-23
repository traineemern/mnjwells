import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";

export default function CTA({ compact = false }) {
  return (
    <section className={`cta-band${compact ? " cta-band-compact" : ""}`}>
      <div className="page-wrap cta-inner">
        <div className="cta-copy">
          <span className="eyebrow eyebrow-light">Ready when you are</span>
          <h2>Get a free estimate now.</h2>
          <p>Call {site.phone} or tell us a little about your project online.</p>
        </div>
        <div className="cta-actions">
          <a className="button button-white" href={site.phoneLink}><Icon name="phone" size={18} />Call {site.phone}</a>
          <Link className="button button-outline-light" to="/contact">Request an estimate <Icon name="arrowRight" size={18} /></Link>
        </div>
      </div>
    </section>
  );
}
