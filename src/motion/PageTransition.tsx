import { useEffect, useRef, type PropsWithChildren } from "react";
import { motion } from "motion/react";
import { motionConfig } from "./config";
import { useReducedMotion } from "./useReducedMotion";
/* [NEW] Initialize lazy GSAP ScrollTrigger reveals after route container mounts */
import { initRevealObserver } from "./reveal.js";

export default function PageTransition({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return initRevealObserver(containerRef.current);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={{
        duration: reducedMotion ? 0 : motionConfig.duration.ui,
        ease: motionConfig.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
