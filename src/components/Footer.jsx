import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";

const quickLinks = [
  ["Services", "/services"],
  ["About us", "/about"],
  ["Questions & answers", "/faq"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-wrap">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/">
            <img className="brand-logo-image" src="/images/logo.png" alt="M&J Water Wells" width="204" height="105" />
          </Link>
          <p>Family-owned well drilling and water system service for homes, businesses, and farms across West Michigan.</p>
          <a className="footer-phone" href={site.phoneLink}><Icon name="phone" size={17} />{site.phone}</a>
        </div>
        <div className="footer-column">
          <h2>Explore</h2>
          {quickLinks.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
        </div>
        <div className="footer-column footer-contact">
          <h2>Get in touch</h2>
          <a href={site.phoneLink}><Icon name="phone" size={16} />{site.phone}</a>
          <a href={`mailto:${site.email}`}><Icon name="mail" size={16} />{site.email}</a>
          <p><Icon name="mapPin" size={16} />{site.address.street}<br /><span>{site.address.city}, {site.address.region} {site.address.postalCode}</span></p>
          <p className="footer-hours">{site.emergencyHours}</p>
        </div>
        <div className="footer-column">
          <h2>Ways to pay</h2>
          <div className="payment-chips" aria-label={`Accepted payment methods: ${site.paymentMethods.join(", ")}`}>
            {site.paymentMethods.map((method) => <span key={method}>{method}</span>)}
          </div>
          <a className="back-top" href="#top"><Icon name="arrowDown" size={16} />Back to top</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="page-wrap footer-bottom-inner">
          <span>© {new Date().getFullYear()} M&J Water Wells. All rights reserved.</span>
          <span>Serving Newaygo &amp; West Michigan</span>
        </div>
      </div>
    </footer>
  );
}
