# Motion implementation

Motion supports the existing West Michigan website without changing its content or layout.

- Shared timing, easing, and stagger values live in `src/motion/config.ts`.
- Reusable page, scroll-reveal, and reduced-motion utilities live in `src/motion/`.
- Route transitions, the mobile drawer, card reveals, hero mounts, FAQ height animation, and town-chip reveals use Motion.
- GSAP is dynamically imported for the Home hero, Services/FAQ hero parallax, and About scroll sequence. Cleanup uses `gsap.context()` and `ctx.revert()`.
- Lottie animations are placeholders in `src/assets/lottie/ripple.json` and `src/assets/lottie/success-check.json`. Replace either file with approved Lottie JSON; keep files below 30 KB.
- The emergency-bar ripple is in the header. The success check appears only after a successful form submission.
- CSS handles button press feedback, nav underlines, focus transitions, card hover, and service-arrow nudges.
- Three.js and Spline are not used because this content-led local business site does not need 3D rendering.

## Reduce or disable motion

The Motion wrapper detects `prefers-reduced-motion`; GSAP and Lottie are disabled or simplified for reduced-motion users. CSS also sets transitions and animations to negligible durations.

To tune durations or the shared easing curve, edit `src/motion/config.ts`. The current easing is `cubic-bezier(0.22, 1, 0.36, 1)`.

## Verify

Run `npm run build` for the production bundle and `npm run dev` for route/console checks. Test at mobile width and with OS "Reduce Motion" enabled.
