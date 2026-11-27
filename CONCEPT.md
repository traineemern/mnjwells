# M&J Water Wells — Website Redesign Concept (`Step 1`)

## 1. The Big Idea
We are shifting M&J Water Wells from a conventional local-contractor brochure into a **"Precision Beneath Your Property"** industrial editorial experience—pairing raw mechanical authority (`2"`–`12"` well capacity, deep-ground engineering, and 24/7 response) with quiet, straightforward family accountability. Instead of boxed SaaS templates, the site borrows from architectural spec sheets and heavy-equipment fieldwork: tight condensed/display typography, hairline structural rules, deep basalt backdrops (`#121311` / `#1a1b18`), warm stone surfaces (`#f9f7f2` / `#efeae0`), and authoritative M&J Crimson (`#a11a12`) + Gold (`#f0c177`) signals. This suits a family-owned drilling company in Newaygo because homeowners, farmers, and commercial builders hire two things simultaneously: heavy iron capable of reaching clean bedrock water, and real neighbors (`Mark` & `Julie`) who answer the phone on a holiday weekend.

---

## 2. Hero Concept
- **Headline (Anchor + Two `dummy` Alternatives):**
  - **Anchor (live data layer):** `"West Michigan's Well Drilling Specialists."`
  - **Alternative A (`dummy`):** `"Deep Bedrock Water. Straightforward Local Work."`
  - **Alternative B (`dummy`):** `"Drilling Clean Water Across Six West Michigan Counties."`
  - *Typography & Accent:* Oversized condensed/display stack with accent words styled in the existing accent token (`--gold-soft: #f0c177` / rose `#D9928A` pending token decision) against `--obsidian: #121311` and warm light ink (`--paper: #f9f7f2`).
- **Supporting Line:** From `site.description` / Home copy—direct statement covering residential (`2"`–`6"`), commercial, and large-capacity irrigation (`6"`–`12"`) well drilling and 24/7 emergency repair from Newaygo, MI.
- **Imagery:** A low, dramatic industrial framing of the M&J drilling rig (`public/images/hero-rig-placeholder.jpg` marked `dummy` until owner-supplied high-res photography replaces the existing `/images/truck.png` asset).
- **Motion:** Masked word-baseline reveal on mount, subtle scroll-linked image scale/parallax shift via GSAP `ScrollTrigger` (capped `< 800ms` transitions), and an immediate instant-render fallback under `prefers-reduced-motion: reduce`.
- **CTAs (Both Visible Above the Fold at `390px`):**
  - Primary: `"Call (616) 675-4875"` (`tel:+16166754875`) in solid crimson (`--red: #a11a12`).
  - Secondary: `"Get a Free Quote"` linking cleanly to `/contact`.

---

## 3. Homepage Storytelling Structure
The homepage guides a visitor through four psychological stages with intentional surface shifts and distinct layout rhythms:

1. **"Who Are They" (Identity & Roots):** Opens on the high-contrast hero, flows into a split editorial narrative anchored by a vertical scroll-drawing hairline rule (`--line` / crimson progress fill), the family-owned story of Mark and Julie in Newaygo, and an oversized roadside-sign / yard photo.
2. **"What They Do" (Machinery, Process & Scope):**
   - **Sticky-Scroll Machinery & Capacity Stage:** Fixed left visual stage displaying equipment and borehole capacity specs (`2"`–`10"` and up to `12"` capability) while right-column technical chapters advance through residential, commercial, irrigation, and constant-pressure hardware as the visitor scrolls.
   - **Numbered Process Sequence (`dummy` steps pending owner confirmation):** Horizontal step progression (`01` Consultation → `02` Site Assessment → `03` Drilling → `04` Pump & System Installation → `05` Follow-Up & Testing) illustrated with clean 3D cutaway dioramas.
   - **Typographic Service Index:** Full-width architectural table/list of M&J's 10 core services (`site.services`) with hover-triggered inline image & scope preview—zero icon boxes.
   - **Projects Showcase (`dummy` media):** Full-bleed horizontal project gallery strip showcasing representative West Michigan installations (`Residential Well`, `Commercial Irrigation`, `Constant Pressure Retrofit`) with county captions.
3. **"Why Trust Them" (Geography, OEM Hardware & Accountability):**
   - **Inline SVG West Michigan Service Map:** Styled Lower Peninsula outline in crisp linework with an accented animated Newaygo hub marker and live route connections to Fremont, Grant, Rockford, Big Rapids, Cedar Springs, Greenville, Hesperia, and Byron.
   - **Verification & OEM Proof Strip:** Highlights `Franklin Electric`, `Pentair`, `Grundfos`, payment options (`Square`, cards), `24/7` weekend/holiday emergency response, and the `5-year` pumps & pressure tanks warranty inquiry statement (omitting unapproved testimonials).
4. **"Call Now" (Conversion Close):** Ends on a full-width crimson-and-obsidian closing banner with oversized type, click-to-call `(616) 675-4875`, and a clear quote button. Every preceding major section closes cleanly with one phone link / single primary CTA step.

---

## 4. Sitemap (Preserving Existing Routes)
No routes are broken or removed; section modules and data keys map across the existing five routes:
- `/` (**Home**): Full-viewport Rig Hero → Who We Are (Split + Scroll Line) → Sticky-Scroll Machinery & Capacity → Numbered 5-Step Process (`dummy`) → Typographic Services Index → Full-Bleed Projects Strip (`dummy`) → SVG West Michigan Map → Trust, Brands & Warranty Proof → Closing CTA.
- `/services` (**Services**): Editorial Services Hero → Category-Filtered Interactive Service Index (hover/tap inspection) → Technical Equipment Capacity (`2"`–`12"`) → Weekend/Holiday Dispatch Note → Closing CTA.
- `/about` (**About**): Family Story & Sign Feature → Newaygo Home Base (`warehouse.png`) → Drilling Diameter & Rig Capabilities → Weekend/Holiday Emergency Commitment → Closing CTA.
- `/faq` (**FAQs**): Sticky Direct-Call Support Panel → Accessible Hairline Accordion (`site.faqs`) → Closing CTA.
- `/contact` (**Contact**): Atmospheric Shop Backdrop → Interactive Estimate Intake Form + Newaygo Embed Map + Office Details/Emergency Hours → Direct Phone Fallback.
- `*` / `/404` (**Not Found**): Clean editorial recovery page with direct Home & Contact navigation.

---

## 5. Three Alternative Homepage Layout Concepts (Choose One)
1. **Option A — Stratified Earth Timeline (Recommended):** Alternates deep obsidian dark bands and warm paper light bands down a continuous left-hand depth-gauge spine that fills smoothly as the visitor scrolls from surface soil to bedrock.
2. **Option B — Split-Viewport Editorial Index:** Pins a 45% left-hand visual/navigation column on desktop through key storytelling chapters while the right 55% scrolls through machinery specs, well processes, and service tables like an architectural dossier.
3. **Option C — Full-Bleed Banded Dossier:** Uses full-viewport-width alternating architectural bands with large tabular section indices (`01`–`08`), asymmetric two-column typography, and edge-to-edge horizontal scrub galleries without split sidebars.

---

## 6. How Each Section Avoids Generic Card Grids
- **Hero:** Full-viewport asymmetrical typographic stage anchored over industrial imagery with raw bottom-edge dual CTAs—no boxed overlay card.
- **Who We Are:** Asymmetric photo-and-prose editorial split tied together by an animated vertical hairline scroll stroke rather than multi-column boxes.
- **Machinery & Expertise:** Sticky-scroll two-column choreographed stage swapping imagery alongside scrolling prose blocks.
- **How It Works:** Connected open horizontal numbered progression (`01`–`05`) separated by directional connectors on raw page ground instead of enclosed bordered cards.
- **Services Index:** Oversized numbered typographic rows (`1px` hairline dividers) with a cursor-reactive or hover-revealed preview frame instead of rounded icon cards.
- **Projects Strip:** Seamless edge-to-edge editorial image strip/masonry band with minimal baseline captions rather than bordered portfolio boxes.
- **Service Area:** Direct inline SVG map composition beside a clean list of West Michigan towns and counties—no boxed town cards.
- **Trust & Proof:** Horizontal typographic lockup separating OEM brand marks, payment tags, warranty terms, and weekend emergency commitment across crisp hairline columns.

---

## 7. Mobile Approach (`<= 767px`, verified at `390px`)
- **Global Bar:** Fixed bottom two-action sticky dock (`Call (616) 675-4875` in crimson + `Free Quote`) paired with a compact header keeping `(616) 675-4875` visible at first paint.
- **Hero:** Single-column compact vertical stack keeping the headline, core value prop, primary crimson `"Call (616) 675-4875"` CTA, and secondary `"Get a Free Quote"` button completely above the fold at `390px`.
- **Who We Are:** Stacks photo first, followed by concise narrative with the vertical depth line docked neatly along the left margin (`16px` gutter).
- **Machinery & Expertise:** Converts desktop sticky-scroll into stacked chapter pairs (image directly above its short spec paragraph) to avoid cramped split panes.
- **How It Works & Projects:** Smooth horizontal swipe tracks with `scroll-snap-type: x mandatory` and subtle edge peek cues so each step or project photograph keeps full impact without vertical bloat.
- **Services Index:** Single-column expandable hairline rows—tapping a service title reveals its inline description and preview thumbnail smoothly.
- **Service Area Map & Trust:** Interactive SVG map sized cleanly above a wrap-friendly town chip list; partner brands and payment tags wrap cleanly in a compact 2-column hairline grid.

---

---

## 8. Step 1 Review: Layout Recommendation & One-Page Direction

### Recommendation: **Option A — Stratified Earth Timeline**
**Why Option A is the strongest fit for M&J Water Wells:**
1. **Natural Subject Metaphor:** Drilling a water well is literally a vertical journey through geological layers (topsoil → clay → gravel → bedrock water). Shifting cleanly from warm paper (`--paper: #f9f7f2`) through stone (`--soft: #efeae0`) into deep basalt (`--obsidian: #121311`) while a left-edge **Depth Gauge (`0 → 100 → 200 ft`)** fills on scroll turns the page structure itself into an intuitive explanation of what M&J does—without adding clutter or boxed cards.
2. **Fastest 10-to-30 Second Trust & Call Path:** Homeowners or farmers scanning on mobile don't want complex pinned sidebars (`Option B`, which gets cramped on narrower laptops/tablets and hides hierarchy on mobile) or disjointed pure-horizontal bands (`Option C`, which lacks a unifying visual thread). Option A keeps vertical scanning effortless while delivering genuine visual craft.
3. **Budget & Motion Discipline:** Alternating bands + a single left-edge scroll gauge + lightweight CSS/IntersectionObserver + scoped GSAP `ScrollTrigger` delivers museum-grade industrial presence well within our `<= 150 KB` gzipped Home JS budget.

---

### One-Page Direction for Option A

- **Mood:** *Grounded Industrial Editorial*—calm, heavy-iron precision rather than loud contractor hype. Unboxed `1px` architectural hairlines (`--line: #e2dcd1`), generous whitespace, dark obsidian mechanical sections contrasted with sunlit warm limestone editorial bands, and sharp crimson (`--red: #a11a12`) + warm gold (`--gold-soft: #f0c177`) focal signals.
- **Type Scale & Family (Keeping Verified Repo Fonts unless Swapped to Roboto):**
  - **Display (`Manrope` 800, `-0.03em` tracking, `1.04` leading):** Hero H1 (`clamp(2.75rem, 5.2vw, 5.1rem)`), Section H2 (`clamp(2rem, 3.2vw, 3.05rem)`), Typographic Service Index titles (`clamp(1.35rem, 2vw, 1.95rem)`).
  - **Body (`DM Sans` 400/500, `1.125rem` / `18px`, `1.6` line-height, `66ch` measure):** Clear, scannable prose using `--ink` (`#191a17`) on light and `--paper` (`#f9f7f2`) on dark, paired with WCAG AA `--muted` (`#5f5e58`).
  - **Telemetry & Eyebrows (`JetBrains Mono` 600, `11px`, `+0.1em` tracking, uppercase):** Step numbers, depth-gauge ticks, and technical borehole specifications (`2"–12"`).
- **The Three Flagship Signature Moments:**
  1. **The Depth Gauge:** A razor-thin `2px` vertical hairline pinned along the left viewport gutter (desktop) with crisp decorative tick marks (`0`, `100`, `200 ft`) whose crimson indicator fills smoothly (`scaleY`) as the user scrolls from hero to footer—linking every section along one drilling axis (`scaleY(1)` static under `prefers-reduced-motion`).
  2. **Surface to Bedrock:** Scroll-driven background transition smoothly shifting from `--paper` / translucent hero opening down into deep `--obsidian` (`#121311`) as the visitor descends from the opening hero into M&J's deeper geological capabilities (CSS `animation-timeline: scroll()` where supported + tiny JS intersection/scroll progress fallback).
  3. **Sticky Machinery Stage:** An edge-to-edge asymmetric `5/7` split where the left column stays fixed on a dramatic drilling rig visual / labeled diameter cutaway (`2"–6"` residential, `6"+` irrigation, constant pressure, excavation) while the right column steps one screen per capability—swapping the left stage visual only when each chapter crosses center viewport.
  *(All supporting moments—the horizontal hairline Cutaway Process (`dummy`), hover/tap Typographic Service Index, swipeable Projects Filmstrip (`dummy`), and animated inline SVG Lower Peninsula Service Map—plug cleanly into this same vertical timeline.)*
- **Motion Budget:**
  - **Target:** Keep Home initial JS **< 150 KB gzipped** (`gsap` lazy-loaded strictly for desktop sticky/parallax where needed, CSS `@keyframes` & native View Transitions API where possible).
  - **Timing & Feel:** Word-stagger hero entrance at `60ms` intervals (`< 750ms` total); interactive UI transitions `160ms–320ms`; scroll reveals `< 800ms`. Zero motion delays content visibility; subtle magnetic pull on desktop primary CTAs + single soft first-view phone pulse only; full instant resolution under `prefers-reduced-motion: reduce` and `.no-js`.

---

## Codebase Audit Notes (Before Step 2 Begins)
Before proceeding to **Step 2**, please confirm these alignment details found in the live repository:
1. **Color Token Differences:**
   - The prompt lists an approximate dark/rose palette (`#121316`, `#1C1E22`, `#2A2D33`, `#F3F1EE`, `#8A9099`, `#9B2A2E`, `#D9928A`, `#C9CDD2`, `#6E1E22`).
   - The live stylesheet (`src/index.css`) does **not** contain those exact hex codes; it defines:
     `--obsidian: #121311`, `--basalt: #1a1b18`, `--ink: #191a17`, `--muted: #5f5e58`, `--paper: #f9f7f2`, `--white: #fff`, `--soft: #efeae0`, `--line: #e2dcd1`, `--red: #a11a12`, `--red-bright: #c22218`, `--red-dark: #74120c`, `--gold: #e29b32`, `--gold-soft: #f0c177` (and Tailwind `@theme`: `#a11a12`, `#76130f`, `#1f1f1f`, `#666663`, `#fbfaf7`, `#f1f0ec`).
   - **Confirmation Needed:** Per your color rule (*"use the code values and report the difference"*), Step 2 will build strictly using the live CSS tokens in `src/index.css`—or confirm if you explicitly want Roboto + the `#121316`/`#D9928A` slate/rose token values adopted instead.
2. **Data Layer & Tooling Alignment:**
   - The live data layer is `src/data/site.js` (not `src/data/site.ts`), currently using `todo: true` comments and `verificationItems` without `legacy` / `verify` / `dummy` schema keys or an `npm run check:content` build guard script.
   - Four existing image `alt` descriptions live across `Home.jsx` and `About.jsx` (we will lock and preserve them verbatim).
   - In Step 2, we can migrate cleanly or add `legacy` / `verify` / `dummy` metadata markers + a `check:content` Vite/Node guard in `package.json` cleanly on top of `src/data/site.ts` / `site.js` once you approve this concept.
