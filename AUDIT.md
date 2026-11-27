# Repository Audit (`Step 1` — `CONCEPT.md` vs. Live Repo)

Verified directly against [index.html](file:///d:/Yatnesh-MernTrainee/mnj/index.html), [package.json](file:///d:/Yatnesh-MernTrainee/mnj/package.json), [src/index.css](file:///d:/Yatnesh-MernTrainee/mnj/src/index.css), [src/data/site.js](file:///d:/Yatnesh-MernTrainee/mnj/src/data/site.js), and [public/](file:///d:/Yatnesh-MernTrainee/mnj/public).

---

## 1. Color Token Differences

| Concept / Prompt Reference | Live `src/index.css` Token & Value | Notes |
|---|---|---|
| Ink `#121316` | `--obsidian: #121311`, `--ink: #191a17` (`@theme --color-ink: #191a17`) | Repo uses warmer near-black obsidian (`#121311`) and ink (`#191a17`) rather than `#121316`. |
| Charcoal `#1C1E22` / Steel `#2A2D33` | `--basalt: #1a1b18` | One dark warm-charcoal surface token exists (`#1a1b18`); `#1C1E22` and `#2A2D33` do not exist. |
| Off-white `#F3F1EE` | `--paper: #f9f7f2` (`@theme --color-paper: #f9f7f2`), `--white: #fff`, `--soft: #efeae0` | `CONCEPT.md` aligns with `#f9f7f2` / `#efeae0`; hairline divider is `--line: #e2dcd1`. |
| Slate `#8A9099` | `--muted: #5f5e58` (`@theme --color-muted: #5f5e58`) | Repo `--muted: #5f5e58` meets WCAG 2.2 AA (`6.08:1` on `--paper`, `5.43:1` on `--soft`). |
| Crimson `#9B2A2E` / Maroon `#6E1E22` | `--red: #a11a12` (`@theme --color-brand`), `--red-bright: #c22218`, `--red-dark: #74120c` | Repo brand red is `#a11a12` (richer, higher contrast at `7.34:1` on `--paper`), not `#9B2A2E`. |
| Rose `#D9928A` | `--gold: #e29b32`, `--gold-soft: #f0c177` | `CONCEPT.md` previously referenced `#D9928A` as a pending option; no rose hex exists in CSS. Repo uses warm amber/gold highlights (`#f0c177`, `11.18:1` on `--obsidian`). |
| Chrome `#C9CDD2` | Not present (`--white` / `--line: #e2dcd1`) | Repo uses warm bone/off-white hairlines (`--line: #e2dcd1`) and `--white` for chrome/icons on dark grounds. |

**Rule applied in Step 2:** Use **only** the live CSS variables in `src/index.css` (`--obsidian`, `--basalt`, `--ink`, `--muted`, `--paper`, `--soft`, `--line`, `--white`, `--red`, `--red-bright`, `--red-dark`, `--gold`, `--gold-soft`) and derive any hover/pressed variations strictly via existing tokens or reduced opacity—no new hex values.

---

## 2. Typography & Font Differences

- **`CONCEPT.md` / Brief note:** References an unspecified "condensed/display" option (`Roboto` + `Roboto Condensed` if chosen).
- **Live Repo (`index.html` + `src/index.css`):** Preloads and defines three font families with metric-matched fallbacks (`DM Sans Fallback`, `Manrope Fallback`) and `display=swap`:
  - `--font-display`: `"Manrope", "Manrope Fallback", "DM Sans", sans-serif` (weights `600;700;800`)
  - `--font-body` / `--font-ui`: `"DM Sans", "DM Sans Fallback", Arial, sans-serif` (weights `400;500;700`)
  - `--font-mono`: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace` (weights `500;600`)
- **Action needed / Rule applied:** Per the typography rule (*"keep the repo font unless the owner approves the change"*), Step 2 retains **Manrope + DM Sans + JetBrains Mono** unless you explicitly request switching to `Roboto` + `Roboto Condensed`. Note also that Step 2 specifies `18px` (`1.125rem`) body copy at `1.6` line-height, whereas live `:root` sets `--text-base: 1rem` (`16px`) and `--leading-body: 1.65`—cleanly adjustable once approved.

---

## 3. Data Layer, Validation Guards & Static Assets Differences

| Item Expected by Spec | Live Repository Reality | Gap to Address in Step 2 |
|---|---|---|
| `src/data/site.ts` with `legacy`, `verify`, `dummy` field tags | Live file is **`src/data/site.js`** (JavaScript); uses `// TODO:` comments, `todo: true`, and `verificationItems[]` without structured `legacy` / `verify` / `dummy` field wrappers | Keep `site.js` (per *"Migrate it to site.ts only if the owner approves"*) and wrap/tag every field cleanly with `{ value, tag: "legacy" \| "verify" \| "dummy" }` or metadata map + zero hardcoded copy in JSX. |
| `npm run check:content` script that fails production builds if `dummy` renders | [package.json](file:///d:/Yatnesh-MernTrainee/mnj/package.json) defines only `dev`, `build`, `preview` | Add `scripts/check-content.mjs` + `npm run check:content` (chained or runnable cleanly alongside Vite build) enforcing zero rendered `dummy` fields in production builds and printing a clear owner checklist. |
| Hero image (`public/images/hero-rig-placeholder.jpg`), AVIF/WebP `srcset`, and LQIP placeholders | Live images are `.png` only (`truck.png`, `service-trucks.png`, `company-sign.png`, `warehouse.png`, `west-michigan-farm.png`, `process-step-1..4.png`). No `.avif`, `.webp`, or `hero-rig-placeholder.jpg` exists yet. | Generate crisp `.avif` + `.webp` derivatives from existing images, create labeled hero placeholder/tag as `dummy` until owner supplies photography, and add `<link rel="preload" as="image">` for hero image. |
| Alt text descriptions | 4 existing photo alts live in JSX: `"M&J Water Wells roadside sign in Newaygo, Michigan"`, `"M&J Water Wells property and warehouse in Newaygo"`, `"M&J Water Wells drilling trucks ready for a job"`, `"A red barn and open field in West Michigan"` (plus diorama alts in `WellProcessSection.jsx`). | Lock existing alt strings verbatim; move into `src/data/site.js` tagged cleanly without changing wording. |
| Favicon set (`32px`, `180px`, `SVG`) & web manifest + print stylesheet | `public/favicon.svg`, `public/robots.txt`, `public/sitemap.xml`, `public/_redirects`, `public/404.html` exist. Missing `favicon-32x32.png`, `apple-touch-icon.png` (`180px`), `site.webmanifest`, and `@media print` styles for Services/FAQ. | Add PNG icon sizes, `site.webmanifest`, per-route OG/Twitter tags, BreadcrumbList JSON-LD, and clean `@media print` stylesheet. |
| Performance budget (`< 150 KB` gzipped JS on Home) | Current `vite build` emits `index` (`161.49 KB` gzip) + lazy `gsap`/`ScrollTrigger` (`46.39 KB` gzip) + `lottie` (`204.25 KB` gzip on `/contact`). | Code-split ChatWidget & ScrollTrigger strictly where needed, inline CSS/light SVG motion on Home where feasible, and keep Home initial JS bundle under `150 KB` gzipped. |
