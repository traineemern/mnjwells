import type { PropsWithChildren } from "react";
import { motion } from "motion/react";
import { motionConfig } from "./config";
import { useReducedMotion } from "./useReducedMotion";

export default function PageTransition({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
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
