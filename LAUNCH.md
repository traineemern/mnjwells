# M&J Water Wells — Launch Handoff (`LAUNCH.md`)

## 1. Owner Verification & Replacement Checklist (`dummy` & `verify`)

### `dummy` Items (Currently Gated Out of Production Builds via `<GuardContent tag="dummy" />`)
1. **`site.heroAlternatives` (`src/data/site.js`):** Two draft hero headlines kept in code/data only until owner selects or confirms copy.
2. **`site.processSteps` (`src/components/WellProcessSection.jsx`):** 5-step cutaway process (`Consultation`, `Site Assessment`, `Drilling`, `Installation`, `Follow-Up`). Verify steps match M&J's real field sequence before enabling in production.
3. **`site.projectsFilmstrip` (`src/components/ProjectsFilmstrip.jsx`):** 4 placeholder project gallery entries reusing general site photography. Supply authentic jobsite photography and verified captions before enabling in production.
4. **`ChatWidget.jsx` (`DUMMY_QUESTIONS`):** Interactive demo chatbot gated to `import.meta.env.DEV` until connected to a live intake workflow or removed.

### `verify` Items (Confirm Before Launch)
1. **Street Address & ZIP (`site.address`):** Confirm `1038 Stanton Avenue, Newaygo, MI 49337`.
2. **Owner Details (`site.owners`):** Confirm Mark and Julie's full surnames and preferred bio wording.
3. **Business & Emergency Hours (`site.businessHours`, `site.emergencyHours`):** Replace `"Call for current regular hours"` with confirmed hours; confirm weekend/holiday emergency dispatch policy shown in Hero, FAQ, Services, and Footer.
4. **5-Year Warranty (`site.features[1]`, Home Trust section):** Confirm eligibility rules and terms for pumps and pressure tanks.
5. **Drilling Diameter Range (`site.machineryStages`, `About.jsx`, `Services.jsx`):** Confirm `2"–10"` standard and up to `12"` drilling/replacement capacity.
6. **Towns & Counties (`site.serviceAreas`):** Verify all 9 towns and 6 counties (`Kent`, `Ottawa`, `Newaygo`, `Muskegon`, `Montcalm`, `Mecosta`).
7. **Pump Replacement & Well Abandonment Services (`site.services[4]`, `site.services[7]`):** Confirm availability and wording.
8. **Michigan Driller License (`site.credentials.licenseNumber`):** Populate once verified; omit empty field until ready.
9. **FAQ Review (`site.faqs`):** Review items #2 (`How long does a well last?`), #3 (`How deep will my well need to be?`), #6 (`Do you offer emergency service?`), #7 (`What areas do you serve?`), and #8 (`todo: true` estimate intake guidance).

*Pre-launch strict gate:* Run `node scripts/check-content.mjs --strict` after resolving/removing all `dummy` items to confirm zero `dummy` fields remain in `src/data/site.js`.

---

## 2. How to Edit Content (`src/data/site.js`)
- All text, phone numbers, emails, addresses, service lists, areas, FAQ answers, and SEO page metadata live cleanly in `src/data/site.js`.
- Every section and schema reads directly from `site` and `pageMeta`—no page markup edits are needed for copy updates.
- Image components read base names through `PictureAsset` (`public/images/<base>.avif`, `.webp`, `.png`). Supplying new photos only requires exporting AVIF/WebP/PNG triplets into `public/images/`.

---

## 3. Privacy-First Analytics Events (`src/utils/analytics.js`)
Events fire locally on `window` via `CustomEvent("mj:analytics")` and optionally forward cleanly to cookie-free analytics (`window.plausible` if added—no cookie banner required):
- `click_to_call`: Fired on phone links across Hero, Header, Mobile Bar, Services, About, FAQ, Contact, Footer, and Closing CTA.
- `quote_click`: Fired on `"Get a Free Quote"` / `"Inquire"` navigation actions.
- `form_start`: Fired once per visit when a user first focuses any input inside Contact's estimate `<form>`.
- `form_submit`: Fired on valid form submission inside `Contact.jsx`.

---

## 4. Redirect Map (`public/_redirects`)
Preserved 301 permanent redirects for legacy URLs:
- `/index.html` -> `/` (`301`)
- `/water-well-drilling-services-michigan.html` -> `/services` (`301`)
- `/about-our-well-drilling-company.html` -> `/about` (`301`)
- `/well-drilling/newaygo-mi-well-drilling-contractor.html` -> `/faq` (`301`)
- `/well-drilling/water-well-drilling-west-michigan-contact-us.html` -> `/contact` (`301`)
- `/*` -> `/index.html` (`200` SPA fallback)

---

## 5. Domain & Deployment Checklist
1. Set `VITE_SITE_URL` in hosting environment variables to the canonical domain (`https://mandjwaterwells.com`).
2. Set `VITE_FORMSPREE_ENDPOINT` to the verified Formspree endpoint.
3. Confirm domain URLs inside `public/robots.txt` and `public/sitemap.xml` match `VITE_SITE_URL`.
4. Run `npm run check:content && npm run build` and deploy `dist/`.
