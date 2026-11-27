import { useState } from "react";
import { Link } from "react-router-dom";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";
import MaskedHeading from "../components/MaskedHeading.jsx";
import { DevBadge } from "../components/GuardContent.jsx";
import { trackEvent } from "../utils/analytics.js";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: site.faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <>
      <Seo
        {...pageMeta.faq}
        path="/faq"
        ogImage={pageMeta.faq.ogImage}
        breadcrumbLabel="FAQs"
        schema={faqSchema}
      />

      <section className="faq-open-section">
        <div className="page-wrap">
          <div className="faq-open-head">
            <div className="breadcrumb-dark" data-hero-item="" style={{ "--hero-index": 0 }}>
              <Link to="/">Home</Link>
              <span>/</span>
              <span>FAQs</span>
            </div>
            <span className="eyebrow" data-hero-item="" style={{ "--hero-index": 1 }}>
              <span className="eyebrow-dot" /> Straightforward answers
            </span>
            <MaskedHeading lines={[[{ text: "Questions & Answers" }]]} />
          </div>

          <div className="faq-open-list">
            {site.faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              return (
                <div className="faq-open-row" key={faq.question}>
                  <button
                    className="faq-open-summary"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>
                      {faq.question}
                      <DevBadge tag={faq.tag} />
                    </span>
                    <span className={`faq-plus-icon${isOpen ? " is-open" : ""}`} aria-hidden="true">
                      <Icon name="plus" size={20} />
                    </span>
                  </button>

                  <div id={panelId} className="faq-open-answer" hidden={!isOpen}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Open contact details placed directly below final FAQ item */}
          <div className="faq-open-contact" aria-label="Contact details">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-dot" /> Contact details
              </span>
              <h2>Still have a question?</h2>
              <p>Reach our Newaygo office directly or open the estimate request form.</p>
              <Link
                className="text-link"
                to="/contact"
                onClick={() => trackEvent("quote_click", { source: "faq_contact" })}
              >
                Open the estimate request form <Icon name="arrowRight" size={16} />
              </Link>
            </div>

            <div className="faq-contact-grid">
              <div className="faq-contact-item">
                <small>Phone</small>
                <a
                  href={site.phoneLink}
                  onClick={() => trackEvent("click_to_call", { source: "faq_contact_block" })}
                >
                  {site.phone}
                </a>
              </div>
              <div className="faq-contact-item">
                <small>Email</small>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div className="faq-contact-item">
                <small>
                  Address <DevBadge tag="verify" />
                </small>
                <p>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </p>
              </div>
              <div className="faq-contact-item">
                <small>
                  Business Hours <DevBadge tag="verify" />
                </small>
                <p>
                  {site.businessHours}
                  <br />
                  {site.emergencyHours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA
        compact
        eyebrow="Get in touch"
        title="Need help with a well project?"
        description="Call our Newaygo office directly or send project details online."
      />
    </>
  );
}
