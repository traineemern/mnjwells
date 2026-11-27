import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { site, pageMeta } from "../data/site.js";
import Seo from "../components/Seo.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CTA from "../components/CTA.jsx";
import { Icon } from "../components/Icons.jsx";
import MaskedHeading from "../components/MaskedHeading.jsx";
import { prefersReducedMotion } from "../motion/reveal.js";

export default function Services() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const total = site.services.length;

  const syncCarouselState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector(".service-card");
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "14");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + gap : 1;
    const cardsInView = Math.max(1, Math.round((track.clientWidth + gap) / cardWidth));
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const current = Math.min(total - 1, Math.max(0, Math.round(track.scrollLeft / cardWidth)));

    setVisibleCount(cardsInView);
    setActiveIndex(current);
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < maxScroll - 4);
  }, [total]);

  useEffect(() => {
    syncCarouselState();
    window.addEventListener("resize", syncCarouselState, { passive: true });
    return () => window.removeEventListener("resize", syncCarouselState);
  }, [syncCarouselState]);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll(".service-card");
    const maxIndex = Math.max(0, total - visibleCount);
    const clamped = Math.min(maxIndex, Math.max(0, index));
    const target = cards[clamped];
    if (!target) return;
    track.scrollTo({
      left: target.offsetLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  };

  const pageCount = Math.max(1, total - visibleCount + 1);

  return (
    <>
      <Seo {...pageMeta.services} path="/services" />
      <section className="page-hero services-hero">
        <div className="page-wrap page-hero-inner">
          <div className="breadcrumb" data-hero-item="" style={{ "--hero-index": 0 }}><Link to="/">Home</Link><span>/</span><span>Services</span></div>
          <span className="eyebrow eyebrow-light" data-hero-item="" style={{ "--hero-index": 1 }}>Residential · Commercial · Irrigation</span>
          <MaskedHeading
            lines={[
              [{ text: "Reliable water starts" }],
              [{ text: "with the right well." }],
            ]}
          />
          <p data-hero-item="" style={{ "--hero-index": 2 }}>From drilling and pump systems to repairs and inspections, M&amp;J Water Wells is your local partner in Newaygo and across West Michigan.</p>
          <a className="button button-primary button-large" href={site.phoneLink} data-hero-item="" style={{ "--hero-index": 3 }}><Icon name="phone" size={18} />Talk through your project</a>
        </div>
      </section>
      <section className="services-section section-pad">
        <div className="page-wrap">
          {/* [UPDATED] Services header paired with carousel controls */}
          <div className="services-header">
            <SectionHeading eyebrow="What we do" title="Well drilling & water services" description="Every property has different needs. Tell us about yours and we'll help you find the right next step." />
            <div className="service-carousel-controls" data-reveal="">
              <span className="service-carousel-counter tabular-nums" aria-live="polite">
                {String(Math.min(activeIndex + 1, pageCount)).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="carousel-arrow"
                aria-label="Previous service"
                disabled={!canPrev}
                onClick={() => scrollToIndex(activeIndex - 1)}
              >
                <Icon name="arrowLeft" size={18} />
              </button>
              <button
                type="button"
                className="carousel-arrow"
                aria-label="Next service"
                disabled={!canNext}
                onClick={() => scrollToIndex(activeIndex + 1)}
              >
                <Icon name="arrowRight" size={18} />
              </button>
            </div>
          </div>

          {/* [NEW] Accessible horizontal scroll-snap carousel for services */}
          <div
            className="service-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Well drilling and water services"
            onKeyDown={handleKeyDown}
          >
            <div
              ref={trackRef}
              className="service-carousel-track"
              tabIndex={0}
              aria-label="Scrollable list of services"
              onScroll={syncCarouselState}
              data-reveal-stagger=""
            >
              {site.services.map((service, index) => (
                <article className="service-card" key={service.title} data-reveal-item="">
                  <span className="service-card-icon"><Icon name={service.icon} size={25} /></span>
                  <span className="service-index">SERVICE {String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/contact" aria-label={`Ask us about ${service.title}`}><Icon name="arrowRight" size={18} /></Link>
                </article>
              ))}
            </div>
            <div className="service-carousel-dots" role="tablist" aria-label="Choose a service slide">
              {Array.from({ length: pageCount }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === idx}
                  aria-label={`Show services starting at item ${idx + 1}`}
                  className={`carousel-dot${activeIndex === idx ? " is-active" : ""}`}
                  onClick={() => scrollToIndex(idx)}
                />
              ))}
            </div>
          </div>

          <div className="service-footnote" data-reveal=""><Icon name="shield" size={19} /><p>Not sure what your water system needs? <strong>We can help you figure it out.</strong></p><a href={site.phoneLink}>Call our team <Icon name="arrowRight" size={15} /></a></div>
        </div>
      </section>
      <section className="service-promise">
        <div className="page-wrap promise-grid" data-reveal="">
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
