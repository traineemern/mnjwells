import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import { Icon } from "../components/Icons.jsx";
import successAnimation from "../assets/lottie/success-check.json";
const Lottie = lazy(() =>
  import("lottie-react").then((module) => ({ default: module.LottieLight }))
);

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  location: "",
  contactTime: "",
  message: "",
  _gotcha: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (event) => {
    if (event.target.name === "phone") event.target.setCustomValidity("");
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (status.message) setStatus({ type: "", message: "" });
  };

  const submit = async (event) => {
    event.preventDefault();
    const phoneInput = event.currentTarget.elements.namedItem("phone");
    phoneInput.setCustomValidity(/^[0-9+().\-\s]{7,}$/.test(form.phone) ? "" : "Enter a valid phone number.");
    if (!event.currentTarget.reportValidity()) return;
    if (form._gotcha.trim()) {
      setStatus({ type: "error", message: "We couldn't send your request. Please call us instead." });
      return;
    }
    if (!site.formEndpoint) {
      setStatus({ type: "error", message: "The online form isn't configured yet. Please call (616) 675-4875 or email us directly." });
      return;
    }
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      payload.append("_subject", "New estimate request - M&J Water Wells");
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error("The form service returned an error.");
      }
      setForm(initialForm);
      setStatus({ type: "success", message: "Thanks for reaching out. Your request was sent successfully. We'll be in touch soon." });
    } catch {
      setStatus({ type: "error", message: "We couldn't send your request right now. Please try again or call (616) 675-4875." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo {...pageMeta.contact} path="/contact" />
      <section className="page-hero contact-hero">
        <div className="page-wrap page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Contact</span></div>
          <span className="eyebrow eyebrow-light">Let's get your water flowing</span>
          <h1>Tell us what you<br />need a hand with.</h1>
          <p>Request a free estimate or call our Newaygo team. We're ready to listen.</p>
        </div>
      </section>
      <section className="contact-section section-pad">
        <div className="page-wrap contact-layout">
          <div className="contact-form-wrap">
            <div className="form-heading">
              <span className="eyebrow">Request a free estimate</span>
              <h2>How can we help?</h2>
              <p>Share a few details and we'll get back to you. Fields marked with <span aria-hidden="true">*</span> are required.</p>
            </div>
            <form className="estimate-form" onSubmit={submit} noValidate>
              <div className="form-row">
                <label>Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" value={form.name} onChange={update} required minLength={2} placeholder="Your name" /></label>
                <label>Phone <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} required placeholder="(616) 555-0123" /></label>
              </div>
              <label>Email address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" value={form.email} onChange={update} required placeholder="you@example.com" /></label>
              <div className="form-row">
                <label>Service needed <span aria-hidden="true">*</span>
                  <select name="service" value={form.service} onChange={update} required>
                    <option value="">Choose a service</option>
                    {site.serviceOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </label>
                <label>Property address or town <span aria-hidden="true">*</span><input name="location" autoComplete="street-address" value={form.location} onChange={update} required placeholder="Street address or nearby town" /></label>
              </div>
              <label>Preferred contact time
                <select name="contactTime" value={form.contactTime} onChange={update}>
                  <option value="">No preference</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </label>
              <label>Tell us a little more <span aria-hidden="true">*</span><textarea name="message" rows="5" value={form.message} onChange={update} required minLength={10} placeholder="What are you looking to get done?" /></label>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="_gotcha">Leave this field empty</label>
                <input id="_gotcha" name="_gotcha" tabIndex="-1" autoComplete="off" value={form._gotcha} onChange={update} />
              </div>
              <button className="button button-primary button-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending request…" : "Send estimate request"} <Icon name="arrowRight" size={18} />
              </button>
              <p className="form-privacy">Your information is only used to respond to your request.</p>
              <div className={`form-message${status.type ? ` ${status.type}` : ""}`} role="status" aria-live="polite">
                {status.type === "success" && (
                  <span className="form-success-lottie" aria-hidden="true">
                    <Suspense fallback={null}>
                      <Lottie src={successAnimation} loop={false} autoplay />
                    </Suspense>
                  </span>
                )}
                {status.message}
              </div>
            </form>
          </div>
          <aside className="contact-details">
            <div className="contact-details-top">
              <span className="eyebrow eyebrow-light">Prefer to talk?</span>
              <h2>We&apos;re right here in Newaygo.</h2>
              <p>Give us a call and tell us what's going on. We'll help you find the right next step.</p>
              <a className="contact-call" href={site.phoneLink}><Icon name="phone" size={21} />{site.phone}</a>
            </div>
            <div className="contact-info-list">
              <a href={`mailto:${site.email}`}><span className="contact-info-icon"><Icon name="mail" size={18} /></span><span><small>Email</small><strong>{site.email}</strong></span></a>
              <div><span className="contact-info-icon"><Icon name="mapPin" size={18} /></span><span><small>Visit or write</small><strong>{site.address.street}<br />{site.address.city}, {site.address.region} {site.address.postalCode}</strong></span></div>
              <div><span className="contact-info-icon"><Icon name="clock" size={18} /></span><span><small>Hours</small><strong>{site.businessHours}<br />{site.emergencyHours}</strong></span></div>
            </div>
            <div className="map-frame">
              <iframe
                title={`Map showing ${site.address.formatted}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.address.formatted)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a href={site.googleBusinessUrl} target="_blank" rel="noreferrer">Open in Google Maps <Icon name="arrowRight" size={14} /></a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
