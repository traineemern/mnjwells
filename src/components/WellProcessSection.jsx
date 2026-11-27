import { Fragment, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../motion/reveal.js";

/* [UPDATED] 4-step isometric 3D diorama horizontal process showcase matching reference mockup */
const PROCESS_STEPS = [
  {
    number: 1,
    title: "Site Preparation",
    caption: "Property walk, setbacks & survey stakeout",
    image: "/images/process-step-1.png",
    alt: "3D isometric soil cutaway diorama showing M&J pickup truck, evergreens, and red survey flag for site preparation",
    width: 833,
    height: 614,
    scaleClass: "is-step-1",
  },
  {
    number: 2,
    title: "Drilling Process",
    caption: "Rig boring & protective steel well casing",
    image: "/images/process-step-2.png",
    alt: "3D isometric soil cutaway diorama showing drilling rig truck boring vertical steel casing through layered earth",
    width: 768,
    height: 814,
    scaleClass: "is-step-2",
  },
  {
    number: 3,
    title: "Well Completion",
    caption: "Sanitary seal, concrete pad & manifold",
    image: "/images/process-step-3.png",
    alt: "3D isometric soil cutaway diorama showing concrete pad, multi-valve red wellhead manifold, and sealed steel casing",
    width: 774,
    height: 765,
    scaleClass: "is-step-3",
  },
  {
    number: 4,
    title: "Ready for Use",
    caption: "Pump hookup, flush test & clean water",
    image: "/images/process-step-4.png",
    alt: "3D isometric soil cutaway diorama showing red well pump pedestal pouring clear water down a rocky spillway",
    width: 672,
    height: 603,
    scaleClass: "is-step-4",
  },
];

function StepConnectorArrow({ isActive }) {
  return (
    <div className={`process-arrow-col${isActive ? " is-active" : ""}`} aria-hidden="true">
      <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
        <path
          d="M1 8H23.5M18 2.5L24 8L18 13.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function WellProcessSection() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* Staggered scroll entrance using GSAP ScrollTrigger */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return undefined;

    let cancelled = false;
    let gsapContext = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        gsapContext = gsap.context(() => {
          const items = section.querySelectorAll(".process-step-item, .process-arrow-col");
          gsap.from(items, {
            y: 26,
            opacity: 0,
            scale: 0.96,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: section.querySelector(".process-flow-grid"),
              start: "top 82%",
              once: true,
            },
          });
        }, section);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      gsapContext?.revert();
    };
  }, []);

  /* Gentle sequential spotlight progression (1 -> 2 -> 3 -> 4) unless hovering/reduced-motion */
  useEffect(() => {
    if (prefersReducedMotion() || isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handleTilt = (event) => {
    if (prefersReducedMotion()) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.setProperty("--tilt-y", `${(nx * 5.5).toFixed(2)}deg`);
    card.style.setProperty("--tilt-x", `${(-ny * 4).toFixed(2)}deg`);
  };

  const resetTilt = (event) => {
    const card = event.currentTarget;
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--tilt-x", "0deg");
  };

  return (
    <section
      ref={sectionRef}
      className="process-section section-pad"
      aria-label="4-step well drilling process"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="page-wrap process-header">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> How your well gets built
        </span>
        <h2>From site preparation to clean water.</h2>
      </div>

      <div className="page-wrap process-flow-grid" role="list">
        {PROCESS_STEPS.map((item, index) => {
          const isCurrent = activeStep === index;
          return (
            <Fragment key={item.number}>
              <article
                role="listitem"
                className={`process-step-item${isCurrent ? " is-current" : ""}`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                onFocus={() => setActiveStep(index)}
                tabIndex={0}
              >
                <div className="process-step-top">
                  <span className="process-num-badge tabular-nums">{item.number}</span>
                  <h3>{item.title}</h3>
                </div>

                <div className="process-diorama-stage">
                  <div className="process-pink-halo" aria-hidden="true" />
                  <div className="process-ground-shadow" aria-hidden="true" />
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className={`process-diorama-img ${item.scaleClass}`}
                    draggable="false"
                  />
                </div>

                <p className="process-step-caption">{item.caption}</p>
              </article>

              {index < PROCESS_STEPS.length - 1 ? (
                <StepConnectorArrow isActive={activeStep === index || activeStep === index + 1} />
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
