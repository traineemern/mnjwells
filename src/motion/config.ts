export const motionConfig = {
  duration: {
    fast: 0.15,
    ui: 0.25,
    reveal: 0.45,
    hero: 0.7,
  },
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  stagger: {
    small: 0.1,
    cards: 0.08,
  },
} as const;
