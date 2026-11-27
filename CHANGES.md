# Removed Legacy Components, Styles & Assets (`CHANGES.md`)

## 1. Removed React Component Files
- `src/components/FleetShowcase.jsx` — replaced by the asymmetric sticky-scroll `src/components/MachineryStickyStage.jsx`.
- `src/components/Reviews3DCarousel.jsx` — removed unapproved customer review cards to adhere strictly to verified-only public copy.
- `src/components/Step3DScene.jsx` — replaced heavy runtime Three.js procedural canvases with pre-rendered transparent AVIF/WebP/PNG 3D cutaway dioramas in `WellProcessSection.jsx`.
- `src/components/SectionHeading.jsx` — replaced by direct left-aligned editorial headings across sections.

## 2. Removed Public Image Assets
- `public/images/warranty.png` — unreferenced placeholder asset removed.
- `public/images/image.png` — duplicate copy of `public/images/logo.png` removed.

## 3. Removed Box/Card CSS Rules & Bloat (`src/index.css`)
Eliminated boxed cards, rounded panel containers, decorative framing pseudo-elements, and container box shadows:
- `.feature-grid`, `.feature-card`, `.feature-number`, `.icon-tile`
- `.pillars-panel`, `.pillar-row`, `.pillar-trigger`, `.pillar-body`
- `.fleet-*` card frames & `.fleet-inset-photo`
- `.reviews-section`, `.reviews-inner`, `.reviews-3d-*`, `.review-3d-card`, `.proof-quote-tile`
- `.service-grid`, `.service-card`, `.service-carousel-*`, `.service-footnote` (replaced by open inline CTA rule)
- `.town-coverage-*`, `.town-coverage-card`
- `.faq-aside`, `.faq-item` rounded box wrappers (replaced by full-width hairline `.faq-open-row` & open `.faq-open-contact`)
- `.contact-form-wrap` container card, `.map-floating-card`, `.intro-art::before/::after`, `.about-sign::before`, `.area-image::before`
- Removed eager `"motion/react"` dependency from initial `Home` / `Header` / `SiteLayout` route bundle to keep initial Home JS well below 150 KB gzipped.
