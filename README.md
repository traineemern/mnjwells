# M&J Water Wells website

A responsive, static-friendly React website for M&J Water Wells, built with Vite and Tailwind CSS 4. The routes are implemented with React Router and emitted as static route entry points so `/services`, `/about`, `/faq`, `/contact`, and `/404` can load directly on static hosts.

## Project structure

```text
public/
  _redirects           Netlify redirects for legacy URLs and SPA fallback
  404.html              Static-host fallback page
  images/               Supplied photos and image placement notes
  robots.txt
  sitemap.xml
src/
  components/           Shared header, footer, SEO, buttons, and icons
  data/site.js          All editable business, services, area, and FAQ content
  pages/                Home, Services, About, FAQ, Contact, and 404 pages
  index.css             Tailwind 4 theme tokens and responsive site styles
```

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Local development

```sh
npm install
npm run dev
```

Vite prints a local URL (normally `http://localhost:5173`). To test the production output locally:

```sh
npm run build
npm run preview
```

The production files are written to `dist/`.

## Contact form setup

The estimate form uses Formspree for hosted submission and server-side validation. The browser also validates required fields, email format, phone pattern, and minimum lengths before submission. A honeypot field is included as basic spam protection.

1. Create a form in the business's Formspree account.
2. Copy `.env.example` to `.env.local`.
3. Replace the sample endpoint with the real Formspree endpoint:

   ```text
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
   ```

4. Restart Vite after changing environment variables. Set the same variable in the deployment provider's environment settings.

If the endpoint is not set, the website clearly asks visitors to call or email instead of showing a false success message. Formspree processes/validates submissions on its servers; no private API key belongs in this front-end project.

## Deploy

### Netlify

Connect the repository and configure:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: `VITE_FORMSPREE_ENDPOINT` and, if needed, `VITE_SITE_URL`

The `public/_redirects` file maps the previous URLs and provides the client-route fallback. Existing static route files are served directly.

### GitHub Pages

Build and publish the contents of `dist/` to GitHub Pages. The Vite build creates route entry documents in `dist/services/`, `dist/about/`, `dist/faq/`, `dist/contact/`, and `dist/404/`, and includes a static branded `404.html`.

For a user/organization site or custom domain, the default root asset base works as-is. For a project site under `https://account.github.io/repository/`, set Vite's `base` to `"/repository/"` before building and set `VITE_SITE_URL` to the intended canonical domain. Point the domain and sitemap to the production site before launch.

## Updating business content

Edit `src/data/site.js` for contact details, hours, services, service towns/counties, FAQs, service options, and page copy. Rebuild and deploy after changing the data. The layout and page components read from this file, so routine content changes do not require editing page markup.

Replace the placeholder domain in `VITE_SITE_URL`, `public/robots.txt`, and `public/sitemap.xml` together when the final production domain is confirmed. The map and Google Business link are based on `site.address` and `site.googleBusinessUrl` in `src/data/site.js`. Replace the Google link with the exact verified profile URL and update the address once confirmed. Add the Michigan driller license number to `site.credentials.licenseNumber` only after it has been verified.

## Owner review checklist

Resolve each item before representing it as verified business information:

- [ ] Confirm the street address and ZIP code.
- [ ] Confirm Mark and Julie's full surnames and owner biographies.
- [ ] Confirm the 5-year warranty, terms, and eligibility for pumps and pressure tanks.
- [ ] Confirm the towns and counties served.
- [ ] Confirm pump replacement and well abandonment/decommissioning wording and availability.
- [ ] Confirm drilling capacities (2–10 inches; up to 12 inches drilling or replacement).
- [ ] Add actual business hours and confirm the weekend/holiday emergency process.
- [ ] Confirm any Michigan driller license number and certifications before publishing credentials.
- [ ] Add the verified Google Business Profile/reviews link and approved customer review quotes, if available.
- [ ] Confirm the canonical website domain and that the legacy redirects match the old site's URLs.
- [ ] Review the FAQ answers in `src/data/site.js` for local accuracy.
- [ ] Set up the Formspree endpoint and confirm form delivery.
- [ ] Verify image identifications and replace any low-resolution source photographs with original files.

## Notes

- See `MOTION.md` for animation locations, tuning, reduced-motion behavior, and Lottie placeholder replacement.
- Business information remains in one editable file, `src/data/site.js`; comments and this checklist flag details supplied as `[VERIFY]` and owner-editable FAQ placeholders as `TODO`.
- Partner names are text treatments, not official logo files. Use approved partner logo artwork only if available.
- The site includes local business and FAQ JSON-LD, per-route metadata/canonical tags, a sitemap, robots file, reduced-motion handling, keyboard focus states, and a mobile navigation focus trap.
- The canonical domain, address, warranty, owner surnames, listed service range, service areas, and opening hours remain unverified. Confirm them before launch.
