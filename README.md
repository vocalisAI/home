# Vocalis website

Marketing site for Vocalis, an AI receptionist for independent clinics. React 18, React Router 6 and Create React App, deployed on Vercel from `master`.

## Run it locally

Use Node 22 (the version in `engines` and on Vercel). The default Node on a newer machine will fail the engine check.

```bash
nvm use 22            # or any Node 22.x
npm install           # .npmrc sets legacy-peer-deps
npm start             # http://localhost:3000, hot reloading
```

Production build and a local preview of exactly what ships:

```bash
npm run build         # outputs ./build
npx serve -s build    # single-page-app fallback, so /pricing and friends load on refresh
```

## Checks

```bash
CI=true npm test -- --watchAll=false     # unit and interaction tests
node docs/vocalis-redesign/review-evidence/verify-v2.cjs   # Chromium + WebKit routes, menu, playback, form (needs the build served on :4173)
node docs/vocalis-redesign/review-evidence/shots.cjs       # screenshots of every route and demo tab
node docs/vocalis-redesign/review-evidence/mobile-audit.cjs        # every page at six phone widths
```

The browser scripts expect Playwright (see the header of each file). Tests never send a real form submission or place a call: the demo form takes an injectable transport and the browser script intercepts the Formspree request.

## How it is organised

| Path | What lives there |
|---|---|
| `src/pages/` | One file per route: Home, Product, Workflows, Pricing, Security, About |
| `src/components/home/` | Homepage sections (hero, stage, calls list, definition, security band, contact form) |
| `src/components/demo/` | The four interactive demos: Answer, Understand, Act, Improve |
| `src/components/layout/` | Header, footer, layout, the closing playground (loaded lazily) |
| `src/data/` | Copy and demo data kept apart from rendering: features, workflows, claims, pricing, scenarios |
| `src/styles/` | `base.css` (tokens, type, header, footer), `sections.css`, `pricing.css`, `playground.css` |
| `public/index.html` | Inline font faces and a static homepage shell that paints before JavaScript loads |
| `vercel.json` | SPA rewrite, cache headers and basic security headers |
| `docs/vocalis-redesign/` | Plan, audit, release checklist, review evidence |

Things worth knowing:

- **Homepage shell.** `public/index.html` contains the hero as plain HTML so the headline and "Book a demo" link appear before the bundle runs. React replaces it on mount. A test (`static homepage shell`) fails if its copy drifts from `Hero.jsx`, so edit both together.
- **See it live.** One full-screen player (`VideoDialog.jsx`, opened through `VideoContext.jsx`) is reachable from many places through the `SeeItLive` button. Nothing plays until someone clicks, and the video file is only downloaded then.
- **Claims.** Languages, capacity and compliance statements live in `src/data/claims.js` and `src/data/features.js`. They are company claims supplied by the founder.
- **Pricing.** Plan data is in `src/data/pricing.js`.
- **Contact form.** Posts to the Formspree endpoint in `src/data/site.js`. Keep patient information out of it.
- **Demo content.** Maria, Riverside Cardiology and the numbers inside the demos are made up. They live in `src/data/scenarios.js` and `src/data/features.js`.

## Deploying

Vercel builds on every push. Pushing a branch creates a preview deployment; merging to `master` publishes. See `docs/vocalis-redesign/RELEASE_CHECKLIST.md` before the first release of this redesign.
