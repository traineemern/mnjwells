import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";
import { useReducedMotion } from "../motion/useReducedMotion";
import { motionConfig } from "../motion/config";

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
  const heroRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let gsapContext;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapContext = gsap.context(() => {
        gsap.to(heroRef.current, {
          y: 40,
          ease: "none",
          scrollTrigger: { trigger: ".faq-hero", start: "top top", end: "bottom top", scrub: true },
        });
      });
    }).catch(() => {});
    return () => { cancelled = true; gsapContext?.revert(); };
  }, [reducedMotion]);

  return (
    <>
      <Seo {...pageMeta.faq} path="/faq" schema={faqSchema} />
      <section ref={heroRef} className="page-hero faq-hero">
        <div className="page-wrap page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>FAQs</span></div>
          <span className="eyebrow eyebrow-light">A few things you might be wondering</span>
          <h1>Good questions.<br />Straight answers.</h1>
          <p>Here are answers to some common well drilling and water system questions.</p>
        </div>
      </section>
      <section className="faq-section section-pad">
        <div className="page-wrap faq-layout">
          <aside className="faq-aside">
            <span className="eyebrow">Need a hand?</span>
            <h2>We&apos;re happy to help.</h2>
            <p>Every property and water system is different. If you have a question that isn't covered here, talk to our team.</p>
            <a className="button button-primary" href={site.phoneLink}><Icon name="phone" size={17} />{site.phone}</a>
            <Link to="/contact" className="text-link">Send us a message <Icon name="arrowRight" size={16} /></Link>
          </aside>
          <div className="faq-list">
            {site.faqs.map((faq, index) => (
              <article className="faq-item" key={faq.question}>
                <button
                  className="faq-summary"
                  type="button"
                  aria-expanded={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span className="faq-number">0{index + 1}</span>
                  <span>{faq.question}</span>
                  <span className="faq-chevron"><Icon name="chevronDown" size={19} /></span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
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
            ))}
          </div>
        </div>
      </section>
      <CTA compact eyebrow="Still have a question?" title="Talk through your situation." description="Every property and water system is different, so get a direct answer from our team." />
    </>
  );
}
