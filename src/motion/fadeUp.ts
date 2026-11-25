import { motionConfig } from "./config";

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionConfig.duration.reveal,
      ease: motionConfig.ease,
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionConfig.stagger.cards,
    },
  },
};
