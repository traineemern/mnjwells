import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Icon } from "./Icons.jsx";
import { useReducedMotion } from "../motion/useReducedMotion";
import { motionConfig } from "../motion/config";

/* [NEW] Sample customer reviews for the 3D circular carousel (replace with verified Google reviews before launch) */
const CUSTOMER_REVIEWS = [
  {
    name: "Sarah & Tom Miller",
    town: "Newaygo, MI",
    service: "Residential New Well",
    quote:
      "Mark and his crew walked us through every step of drilling our new home well. Clear pricing, careful site cleanup, and steady water pressure from day one.",
  },
  {
    name: "David VanderMeer",
    town: "Fremont, MI",
    service: "Weekend Pump Repair",
    quote:
      "Our pump failed on a Saturday morning. M&J returned our call within the hour and had water running again before evening. Honest, straightforward service.",
  },
  {
    name: "Kelli & Greg DeYoung",
    town: "Rockford, MI",
    service: "Constant Pressure System",
    quote:
      "Upgrading to a constant pressure system made a night-and-day difference for our farmhouse. Friendly local people who truly stand behind their work.",
  },
  {
    name: "Brian Koopman",
    town: "Cedar Springs, MI",
    service: "Irrigation Well Service",
    quote:
      "We rely on M&J for our commercial irrigation well maintenance. They show up when they say they will and explain every option without any pressure.",
  },
];

function getCircularOffset(index, activeIndex, total) {
  let diff = (index - activeIndex) % total;
  if (diff < 0) diff += total;
  if (diff > total / 2) diff -= total;
  return diff;
}

export default function Reviews3DCarousel() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = CUSTOMER_REVIEWS.length;

  useEffect(() => {
    if (reducedMotion || paused) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, total]);

  const step = (delta) => {
    setActiveIndex((current) => (current + delta + total) % total);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <section
      className="reviews-3d-section section-pad"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="page-wrap">
        <div className="reviews-3d-header">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> West Michigan neighbors
            </span>
            <h2>Trusted by local families &amp; farms.</h2>
          </div>
          <div className="reviews-3d-controls">
            <span className="service-carousel-counter tabular-nums" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="carousel-arrow"
              aria-label="Previous customer review"
              onClick={() => step(-1)}
            >
              <Icon name="arrowLeft" size={18} />
            </button>
            <button
              type="button"
              className="carousel-arrow"
              aria-label="Next customer review"
              onClick={() => step(1)}
            >
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>

        <div className="reviews-3d-stage">
          <div className="reviews-3d-ring">
            {CUSTOMER_REVIEWS.map((review, index) => {
              const offset = getCircularOffset(index, activeIndex, total);
              const isFront = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isBack = !isFront && !isLeft && !isRight;

              const targetPose = reducedMotion
                ? {
                    x: "0%",
                    z: 0,
                    scale: 1,
                    rotateY: 0,
                    opacity: isFront ? 1 : 0,
                  }
                : isFront
                ? { x: "0%", z: 0, scale: 1, rotateY: 0, opacity: 1 }
                : isLeft
                ? { x: "-56%", z: -160, scale: 0.85, rotateY: 22, opacity: 0.72 }
                : isRight
                ? { x: "56%", z: -160, scale: 0.85, rotateY: -22, opacity: 0.72 }
                : { x: "0%", z: -320, scale: 0.7, rotateY: 0, opacity: 0 };

              return (
                <motion.article
                  key={review.name}
                  className={`review-3d-card${isFront ? " is-active" : ""}`}
                  style={{
                    zIndex: isFront ? 4 : isBack ? 1 : 2,
                    pointerEvents: isBack ? "none" : "auto",
                  }}
                  initial={false}
                  animate={targetPose}
                  transition={{
                    duration: reducedMotion ? 0.01 : 0.7,
                    ease: motionConfig.ease,
                  }}
                  onMouseEnter={() => {
                    if (isFront) setPaused(true);
                  }}
                  onMouseLeave={() => {
                    if (isFront) setPaused(false);
                  }}
                  onClick={() => {
                    if (!isFront && !isBack) setActiveIndex(index);
                  }}
                  aria-hidden={!isFront}
                >
                  <div className="review-3d-top">
                    <div className="review-stars" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Icon key={starIdx} name="star" size={16} fill="#e29b32" stroke="#e29b32" />
                      ))}
                    </div>
                    <span className="review-service-tag">{review.service}</span>
                  </div>
                  <blockquote className="review-3d-quote">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <footer className="review-3d-author">
                    <span className="review-avatar" aria-hidden="true">
                      {review.name.split(" ")[0][0]}
                    </span>
                    <div>
                      <strong>{review.name}</strong>
                      <small>{review.town}</small>
                    </div>
                  </footer>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="reviews-3d-dots" role="tablist" aria-label="Select customer review">
          {CUSTOMER_REVIEWS.map((review, index) => (
            <button
              key={review.name}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Show review from ${review.name}`}
              className={`carousel-dot${activeIndex === index ? " is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
