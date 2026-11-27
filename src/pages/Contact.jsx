import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import { Icon } from "../components/Icons.jsx";
import successAnimation from "../assets/lottie/success-check.json";
import MaskedHeading from "../components/MaskedHeading.jsx";
import { useReducedMotion } from "../motion/useReducedMotion";
import { motionConfig } from "../motion/config";

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
  const reducedMotion = useReducedMotion();
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
      <section className="contact-showcase">
        <div className="contact-showcase-backdrop" aria-hidden="true" />
        <div className="page-wrap">
          <div className="contact-showcase-grid">
            <div className="contact-showcase-info">
              <div className="contact-showcase-top">
                <div className="breadcrumb" data-hero-item="" style={{ "--hero-index": 0 }}>
                  <Link to="/">Home</Link><span>/</span><span>Contact</span>
                </div>
                <span className="eyebrow eyebrow-light" data-hero-item="" style={{ "--hero-index": 1 }}>
                  Let&apos;s get your water flowing
                </span>
                <MaskedHeading
                  lines={[
                    [{ text: "Tell us what you" }],
                    [{ text: "need a hand with." }],
                  ]}
                />
                <p className="contact-showcase-lead" data-hero-item="" style={{ "--hero-index": 2 }}>
                  Request a free estimate or call our Newaygo team. We&apos;re ready to listen.
                </p>
              </div>

              {/* [UPDATED] Map fills remaining column height so its bottom aligns with the end of the form */}
              <div className="contact-inline-map" data-hero-item="" style={{ "--hero-index": 3 }}>
                <div className="map-frame contact-map-frame">
                  <iframe
                    title={`Map showing ${site.address.formatted}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(site.address.formatted)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <div className="map-floating-card">
                    <span className="map-floating-icon"><Icon name="mapPin" size={16} /></span>
                    <div>
                      <strong>{site.name}</strong>
                      <p>{site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}</p>
                      <a href={site.googleBusinessUrl} target="_blank" rel="noreferrer" className="text-link">
                        Open in Google Maps <Icon name="arrowRight" size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="contact-form-wrap"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : motionConfig.duration.reveal, ease: motionConfig.ease, delay: reducedMotion ? 0 : 0.12 }}
            >
              <div className="form-heading">
                <span className="eyebrow">Request a free estimate</span>
                <h2>How can we help?</h2>
                <p>Share a few details and we&apos;ll get back to you. Fields marked with <span aria-hidden="true">*</span> are required.</p>
              </div>
              <form className="estimate-form" onSubmit={submit} noValidate>
                <div className="form-row">
                  <label>Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" value={form.name} onChange={update} required minLength={2} placeholder="Your name" /></label>
                  <label>Phone <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} required placeholder="(616) 555-0123" /></label>
                </div>
                <label>Email address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" value={form.email} onChange={update} required placeholder="you@example.com" /></label>
                <div className="form-row">
                  {/* [UPDATED] Restored dropdown select for service needed */}
                  <label>Service needed <span aria-hidden="true">*</span>
                    <select name="service" value={form.service} onChange={update} required>
                      <option value="">Choose a service</option>
                      {site.serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
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
                <label>Tell us a little more <span aria-hidden="true">*</span><textarea name="message" rows="4" value={form.message} onChange={update} required minLength={10} placeholder="What are you looking to get done?" /></label>
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="_gotcha">Leave this field empty</label>
                  <input id="_gotcha" name="_gotcha" tabIndex="-1" autoComplete="off" value={form._gotcha} onChange={update} />
                </div>
                <button className="button button-primary button-pill button-submit" type="submit" disabled={submitting}>
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
            </motion.div>
          </div>

          {/* [UPDATED] Section ends right after the brand quote */}
          <div className="contact-showcase-bottom" data-reveal="">
            <blockquote className="contact-quote">
              <p>&ldquo;Good water starts with honest work. Whether it&apos;s a new well or a weekend repair, we treat every West Michigan property like our own neighbor&apos;s.&rdquo;</p>
              <footer>— {site.owners[0]} &amp; {site.owners[1]}, {site.name} · Newaygo, MI</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
