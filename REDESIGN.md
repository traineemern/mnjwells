# M&J Water Wells — Architecture & Data Map (`REDESIGN.md`)

## 1. Option A Architecture — Stratified Earth Timeline
Implemented **Option A** per Step 1 review: unboxed alternating warm limestone (`--paper`, `--soft`) and deep basalt obsidian (`--obsidian`, `--basalt`) surfaces guided by a fixed left-edge **Depth Gauge** (`0 FT` → `100 FT` → `200 FT`) on desktop (`>= 1280px`), strictly preserving existing CSS color tokens (`src/index.css`) and verbatim existing image `alt` descriptions.

### Seven Signature Moments Implemented
1. **The Depth Gauge (`src/components/DepthGauge.jsx`):** Scroll-filling vertical hairline spine along left gutter (`scaleY(1)` statically under `prefers-reduced-motion`).
2. **Surface to Bedrock (`src/index.css` / `Home.jsx`):** Smooth scroll-driven transition (`animation-timeline: view()` + Depth Gauge progress var fallback) darkening from `--paper` to `--soft`/`--obsidian`.
3. **Sticky Machinery Stage (`src/components/MachineryStickyStage.jsx`):** Asymmetric `5/7` edge-bleed split holding rig/cutaway visuals sticky on desktop while right-column chapters advance cleanly on scroll.
4. **5-Step Cutaway Process (`src/components/WellProcessSection.jsx`):** Open horizontal progression (`Consultation` → `Site Assessment` → `Drilling` → `Installation` → `Follow-Up`) connected by an animated drawing hairline (`dummy`-guarded).
5. **Typographic Service Index with Previews (`src/components/ServiceDirectoryBand.jsx`):** Hairline-divided numbered list (`01`–`10`) with desktop sticky hover/focus preview and mobile inline tap expansion (`aria-expanded`).
6. **Projects Filmstrip (`src/components/ProjectsFilmstrip.jsx`):** Full-bleed horizontal drag/swipe image strip (`dummy`-guarded).
7. **Service Area Map (`src/components/MichiganServiceMap.jsx`):** Inline Lower Peninsula SVG with Newaygo highlighted in red and town hairlines animating once on scroll enter (`IntersectionObserver`).

---

## 2. Section-to-Data Mapping (`src/data/site.js`)

| Route & Section | Components | Data Fields Used (`src/data/site.js`) |
|---|---|---|
| Shared Shell | `Header.jsx`, `Footer.jsx`, `CTA.jsx`, `SiteLayout.jsx` | `site.name`, `site.phone`, `site.phoneLink`, `site.email`, `site.address`, `site.businessHours`, `site.emergencyHours`, `site.paymentMethods`, `site.credentials` |
| `/` Hero & Meta | `Home.jsx`, `Seo.jsx` | `pageMeta.home`, `site.tagline`, `site.description`, `site.phone`, `site.phoneLink`, `site.address`, `site.serviceAreas`, `site.heroAlternatives` (`dummy` comment) |
| `/` Who We Are Split | `Home.jsx`, `PictureAsset.jsx` | `site.owners`, `site.altText.trucks`, `site.features[]` |
| `/` Machinery Stage | `MachineryStickyStage.jsx` | `site.machineryStages[]` (`code`, `title`, `body`, `imageBase`, `caption`, `alt`, `tag`) |
| `/` 5-Step Process (`dummy`) | `WellProcessSection.jsx`, `GuardContent.jsx` | `site.processSteps[]` |
| `/` Service Index | `ServiceDirectoryBand.jsx` | `site.services[]`, `site.phone`, `site.phoneLink` |
| `/` Projects Strip (`dummy`) | `ProjectsFilmstrip.jsx`, `GuardContent.jsx` | `site.projectsFilmstrip[]` |
| `/` Service Area & Map | `Home.jsx`, `MichiganServiceMap.jsx` | `site.address.street`, `site.serviceAreas.towns[]`, `site.serviceAreas.counties[]` |
| `/` Trust Proof Band | `Home.jsx` | `site.partners[]`, `site.emergencyHours`, `site.paymentMethods[]`, `site.phone`, `site.phoneLink` |
| `/services` | `Services.jsx`, `ServiceDirectoryBand.jsx`, `Seo.jsx` | `pageMeta.services`, `site.services[]`, `site.emergencyHours`, `site.phone`, `site.phoneLink` |
| `/about` | `About.jsx`, `PictureAsset.jsx`, `Seo.jsx` | `pageMeta.about`, `site.owners`, `site.altText.sign`, `site.altText.warehouse`, `site.emergencyHours`, `site.serviceAreas` |
| `/faq` | `FAQ.jsx`, `Seo.jsx` | `pageMeta.faq`, `site.faqs[]`, `site.phone`, `site.email`, `site.address`, `site.businessHours`, `site.emergencyHours` |
| `/contact` | `Contact.jsx`, `Seo.jsx` | `pageMeta.contact`, `site.serviceOptions[]`, `site.formEndpoint`, `site.phone`, `site.email`, `site.address`, `site.businessHours`, `site.emergencyHours` |

---

## 3. WCAG 2.2 AA Contrast & Assets Summary
All foreground/background pairs use only existing CSS tokens (`--ink` on `--paper`: `16.33:1`, `--muted` on `--paper`: `6.08:1`, `--muted` on `--soft`: `5.43:1`, `--red` on `--paper`: `7.34:1`, `--red` on `--soft`: `6.56:1`, `--white` on `--red`: `7.86:1`, `--paper` on `--obsidian`: `17.40:1`, `--gold-soft` on `--obsidian`: `11.18:1`, `--gold-soft` on `--red`: `4.72:1`). All raster images ship in AVIF (`7K`–`103K`) and WebP (`7K`–`115K`) alongside explicit dimensions and PNG fallbacks, plus `32x32` PNG, `180x180` Apple touch icon, `favicon.svg`, and `site.webmanifest`.
