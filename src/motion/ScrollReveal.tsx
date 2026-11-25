import type { PropsWithChildren } from "react";
import { motion } from "motion/react";
import { motionConfig } from "./config";
import { useReducedMotion } from "./useReducedMotion";

type ScrollRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: reducedMotion ? 0 : motionConfig.duration.reveal,
        delay: reducedMotion ? 0 : delay,
        ease: motionConfig.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
