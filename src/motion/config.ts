/* [UPDATED] Shared JS motion tokens synchronized with src/motion/tokens.css */
export const motionConfig = {
  duration: {
    fast: 0.18,
    ui: 0.35,
    reveal: 0.72,
    hero: 0.72,
  },
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  easeUi: [0.4, 0, 0.2, 1] as [number, number, number, number],
  gsapEase: "power3.out",
  stagger: {
    word: 0.05,
    small: 0.06,
    cards: 0.07,
  },
} as const;
