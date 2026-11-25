import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";
import { useReducedMotion } from "../motion/useReducedMotion";
import { motionConfig } from "../motion/config";

export default function Services() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef(null);

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
          scrollTrigger: { trigger: ".services-hero", start: "top top", end: "bottom top", scrub: true },
        });
      });
    }).catch(() => {});
    return () => { cancelled = true; gsapContext?.revert(); };
  }, [reducedMotion]);

  return (
    <>
      <Seo {...pageMeta.services} path="/services" />
      <section ref={heroRef} className="page-hero services-hero">
        <div className="page-wrap page-hero-inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Services</span></div>
          <span className="eyebrow eyebrow-light">Residential · Commercial · Irrigation</span>
          <h1>Reliable water starts<br />with the right well.</h1>
          <p>From drilling and pump systems to repairs and inspections, M&amp;J Water Wells is your local partner in Newaygo and across West Michigan.</p>
          <a className="button button-primary button-large" href={site.phoneLink}><Icon name="phone" size={18} />Talk through your project</a>
        </div>
      </section>
      <section className="services-section section-pad">
        <div className="page-wrap">
          <SectionHeading eyebrow="What we do" title="Well drilling & water services" description="Every property has different needs. Tell us about yours and we'll help you find the right next step." />
          <div className="service-grid">
            {site.services.map((service, index) => (
              <motion.article
                className="service-card"
                key={service.title}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : motionConfig.duration.reveal, delay: reducedMotion ? 0 : index * motionConfig.stagger.cards, ease: motionConfig.ease }}
              >
                <span className="service-card-icon"><Icon name={service.icon} size={25} /></span>
                <span className="service-index">SERVICE 0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/contact" aria-label={`Ask us about ${service.title}`}><Icon name="arrowRight" size={18} /></Link>
              </motion.article>
            ))}
          </div>
          <div className="service-footnote"><Icon name="shield" size={19} /><p>Not sure what your water system needs? <strong>We can help you figure it out.</strong></p><a href={site.phoneLink}>Call our team <Icon name="arrowRight" size={15} /></a></div>
        </div>
      </section>
      <section className="service-promise">
        <div className="page-wrap promise-grid">
          <div>
            <span className="eyebrow eyebrow-light">From the first call to the finished job</span>
            <h2>Careful work. Clear communication.</h2>
          </div>
          <div className="promise-points">
            <p><Icon name="check" size={18} /> Service for homes, farms, and businesses</p>
            <p><Icon name="check" size={18} /> Experienced with a range of well systems</p>
            <p><Icon name="check" size={18} /> Weekend and holiday emergency service</p>
          </div>
        </div>
      </section>
      <CTA compact eyebrow="Start with the right solution" title="Planning a water project?" description="Tell us what you're working on, and we'll help you determine the right next step." />
    </>
  );
}
