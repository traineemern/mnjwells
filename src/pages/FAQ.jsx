import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";
import { useReducedMotion } from "../motion/useReducedMotion";
import { motionConfig } from "../motion/config";
import MaskedHeading from "../components/MaskedHeading.jsx";

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
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <Seo {...pageMeta.faq} path="/faq" schema={faqSchema} />
      <section className="page-hero faq-hero">
        <div className="page-wrap page-hero-inner">
          <div className="breadcrumb" data-hero-item="" style={{ "--hero-index": 0 }}><Link to="/">Home</Link><span>/</span><span>FAQs</span></div>
          <span className="eyebrow eyebrow-light" data-hero-item="" style={{ "--hero-index": 1 }}>A few things you might be wondering</span>
          <MaskedHeading
            lines={[
              [{ text: "Good questions." }],
              [{ text: "Straight answers." }],
            ]}
          />
          <p data-hero-item="" style={{ "--hero-index": 2 }}>Here are answers to some common well drilling and water system questions.</p>
        </div>
      </section>
      {/* [UPDATED] FAQ layout styled after reference: left header + rounded call card, right stacked rounded accordion cards */}
      <section className="faq-section section-pad">
        <div className="page-wrap faq-layout">
          <div className="faq-sidebar" data-reveal="">
            <div className="faq-sidebar-head">
              <span className="eyebrow"><span className="eyebrow-dot" /> FAQs</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <aside className="faq-aside">
              <div className="faq-aside-avatar" aria-hidden="true">
                <Icon name="phone" size={24} />
              </div>
              <h3>We&apos;re happy to help.</h3>
              <p>Every property and water system is different. If you have a question that isn&apos;t covered here, talk to our team.</p>
              <a className="button button-primary button-pill" href={site.phoneLink}>
                <Icon name="phone" size={17} />Call {site.phone}
              </a>
              <Link to="/contact" className="text-link">Send us a message <Icon name="arrowRight" size={16} /></Link>
            </aside>
          </div>
          <div className="faq-list" data-reveal-stagger="">
            {site.faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <article
                  className={`faq-item${isOpen ? " is-open" : ""}`}
                  key={faq.question}
                  data-reveal-item=""
                >
                  <button
                    className="faq-summary"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <motion.span
                      className="faq-toggle-icon"
                      aria-hidden="true"
                      animate={reducedMotion ? undefined : { rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: motionConfig.duration.fast, ease: motionConfig.ease }}
                    >
                      <Icon name="plus" size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-answer"
                        initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reducedMotion ? 0 : motionConfig.duration.ui, ease: motionConfig.ease }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CTA compact eyebrow="Still have a question?" title="Talk through your situation." description="Every property and water system is different, so get a direct answer from our team." />
    </>
  );
}
