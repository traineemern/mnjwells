/* [UPDATED] Aligned shared motion timing and easing tokens */
export const motionConfig = {
  duration: {
    fast: 0.18,
    ui: 0.35,
    reveal: 0.72,
    hero: 0.72,
  },
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  easeUi: [0.4, 0, 0.2, 1] as [number, number, number, number],
  stagger: {
    small: 0.05,
    cards: 0.07,
  },
} as const;
