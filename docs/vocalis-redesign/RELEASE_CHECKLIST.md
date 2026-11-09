# Release checklist — updated November 9, 2026

## Owner direction

The founder explicitly confirmed the existing product, performance and security claims are validated. Restore and retain them; prior blanket instructions to remove or revalidate them are superseded. The setup promise “less than a week” stays removed. Pricing is out of scope for this refinement.

- Restored claims are centralized in `src/data/claims.js` and the product content.
- The old production figures are unchanged: 70%, 90%, <30s, $87k.
- Security statements retain HIPAA, BAA, SOC 2 Type 1/2, GDPR, encryption, access control and no PHI for model training.
- Example patient data is still labeled as sample data.
- No pricing amounts, tiers, billing or pricing-page content changed in this refinement.

## Before release

- Review the local preview and before/after captures.
- Confirm deploying this branch is the intended release action; no production deployment has occurred in the review task.
- Test on a physical iPhone: Safari toolbar expansion, portrait/landscape rotation, keyboard opening in the contact form, safe-area rendering, playback and touch dragging. Automated WebKit is supplementary evidence, not a physical device.
- Preserve the current Vercel route rewrite and root-domain assets. Test direct route loads on the deployment preview.
- Keep the existing Formspree destination; automated QA must use a mock transport.
- Read `DESIGN_REVIEW.md` for remaining visual and tooling limitations.

## Engineering notes

The project remains on Create React App 5/React 18. Unused dependencies and the stale Browserslist database predate this pass; a separate maintenance change should update the browser database and review build dependencies. Do not mix that work with pricing changes or undo the current redesign.

## Added in the November 9 refinement pass

- [ ] Push the branch only when you want a Vercel preview, then run the checks below against that URL. Nothing has been pushed.
- [ ] On the preview: load `/product`, `/workflows`, `/pricing`, `/security`, `/about` directly and refresh each (the `vercel.json` rewrite must still apply). Confirm `/media/*` and `/fonts/*` load.
- [ ] Confirm the new cache and security headers appear in the response (`vercel.json` `headers`): immutable on `/static` and `/fonts`, a week on `/brand` and `/media`.
- [ ] Run mobile Lighthouse against the preview. Local lab results: Performance 98 to 99, Accessibility, Best Practices and SEO 100, CLS 0 on every route; home LCP 2.2 s, About 2.5 s (see `REFINEMENT_REPORT.md`). Add real-user data once the site is live.
- [ ] Keep `public/index.html` (static hero shell) and `src/components/home/Hero.jsx` in step. A test fails if their copy drifts apart.
- [x] The overview video was re-rendered in mint and navy (see `video-mint/`). The original v2 export is untouched.
- [ ] Review the regenerated `package-lock.json`, the added dev dependency `@testing-library/dom`, and the removed assets listed in `REFINEMENT_REPORT.md`.
- [ ] Remove unused dependencies and update the Browserslist database in a separate change.
- [ ] Sitemap and `og:image` (`social-image.png`) were regenerated for the six routes and the logo mark. Check the link preview card.
- [ ] LOI request lives on `/pricing`, not the homepage. It uses the same Formspree endpoint as before.

## Published November 9, 2026

Pushed to `master` at the owner's request, so Vercel builds and publishes it.

- [ ] Open the live site and check the hero, the "See it live" button (header, hero, menu, footer), and the pricing page.
- [ ] Confirm the dashboard picture on the Product page. It is the pitch slide's image and shows a clinic name and figures (1,248 calls, 87% resolution) that are not among the approved claims.
- [ ] Open "See it live" on a real phone in portrait and landscape. Portrait letterboxes a 16:9 video.
- [ ] Check the playground on a real touch device: dragging a piece should never block scrolling elsewhere.
- [ ] Pricing is monthly only: the yearly toggle and yearly prices were removed. The minutes estimator was removed too. No monthly amounts, tiers or included minutes were changed.
- [ ] The LOI request ("Need a Letter of Interest?") sits on the Pricing page and posts to the same Formspree endpoint as before.
