import { Link } from "react-router-dom";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";

export default function About() {
  return (
    <>
      <Seo {...pageMeta.about} path="/about" />
      <section className="page-hero about-hero">
        <div className="page-wrap page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>About us</span></div>
          <span className="eyebrow eyebrow-light">Neighbors helping neighbors</span>
          <h1>Good work runs<br />in the family.</h1>
          <p>Local roots, practical experience, and a team that takes pride in serving our West Michigan community.</p>
        </div>
      </section>
      <section className="about-story section-pad">
        <div className="page-wrap about-story-grid">
          <div className="about-copy">
            <span className="eyebrow">A family-owned local business</span>
            <h2>More than a well.<br /><span>A relationship you can trust.</span></h2>
            <p className="lead">M&amp;J Water Wells is a family-owned and operated business in Newaygo, Michigan.</p>
            <p>Owners {site.owners[0]} and {site.owners[1]} and their team are committed to serving the community and take pride in the work they do. From a new residential well to a larger commercial or agricultural project, we bring the right equipment and a straightforward, personal approach.</p>
            <p>We work with wells from 2 inches up to 10 inches and have the ability to drill or replace wells up to 12 inches, depending on the project.</p>
            <a className="button button-primary" href={site.phoneLink}><Icon name="phone" size={17} />Call {site.phone}</a>
          </div>
          <figure className="about-sign">
            <img src="/images/company-sign.png" alt="M&J Water Wells roadside sign in Newaygo, Michigan" width="445" height="300" loading="lazy" />
            <figcaption><span>Serving Newaygo &amp; West Michigan</span><small>A local business, right here at home.</small></figcaption>
          </figure>
        </div>
      </section>
      <section className="about-base">
        <div className="page-wrap about-base-grid">
          <div className="about-base-photo">
            <img src="/images/warehouse.png" alt="M&J Water Wells property and warehouse in Newaygo" width="872" height="436" loading="lazy" />
            <span>Our home base in Newaygo</span>
          </div>
          <div className="about-base-copy">
            <span className="eyebrow">Ready for the work</span>
            <h2>Set up for the jobs that matter.</h2>
            <p>Our equipment is ready for residential, commercial, and agricultural water needs. When a project calls for a bigger setup, we'll talk through the site and what it takes before work begins.</p>
            <div className="capacity-note"><strong>2&quot;–10&quot;</strong><span>Well drilling range<br />with up to 12&quot; drilling or replacement capability</span></div>
          </div>
        </div>
      </section>
      <section className="emergency-section">
        <div className="page-wrap emergency-inner">
          <div className="emergency-icon"><Icon name="headset" size={26} /></div>
          <div><span className="eyebrow eyebrow-light">Help beyond the work week</span><h2>Need help on a weekend or holiday?</h2><p>{site.emergencyHours}. If we can't answer, leave a message and we'll return your call promptly.</p></div>
          <a className="button button-white" href={site.phoneLink}><Icon name="phone" size={17} />Call {site.phone}</a>
        </div>
      </section>
      <CTA compact eyebrow="Local help, personal service" title="Let’s keep your water flowing." description="Contact our Newaygo team about well drilling or water system service." />
    </>
  );
}
