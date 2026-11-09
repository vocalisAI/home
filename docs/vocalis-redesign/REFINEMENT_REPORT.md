# Refinement report

November 9, 2026. Worktree `/Users/somesh/Desktop/websites/home-redesign`, branch `redesign/vocalis-2026`. Nothing is committed, pushed or deployed. Every number below was measured on the final build; raw files are in `review-evidence/`.

## What this pass did

The first pass was clean but read like a recolored template. This pass rebuilt the look around the reference (Namu): light display type at large sizes, a diffuse mint atmosphere, one soft demo stage, editorial rows instead of repeated cards, and a physical closing section. Every page except Pricing was re-composed. Every visible sentence outside Pricing was edited. The reviewer's mobile fixes and the founder-approved claims were kept. Later requests in the same session are included below.

## Requested changes, all done

| Request | What was done |
|---|---|
| Hero and demo like Namu | Large light-weight headline over a CSS-only mint atmosphere with a slow voice ring. One demo stage with four full-width tabs and a large voice orb. Side-by-side comparison: `review-evidence/compare-namu-vs-vocalis.jpg` |
| Edit all copy for a clinic audience | Rewritten outside Pricing. Before/after table below |
| Title Case in titles, tab says only "Vocalis" | Headings, eyebrows, tab and nav labels are Title Case. The browser tab reads "Vocalis" on every page, including unknown URLs |
| Remove "sample" and similar wording | Removed from visible text, screen-reader labels, the video dialog and docs |
| Highlight "Vocalis Muscle" in the anatomy image | A mint highlight sits behind the label, positioned in percentages of the image so it stays on the label at every size |
| Call transcript as a text message | Speech bubbles: Vocalis on the left, the caller on the right, a small status line between |
| Remove the four metrics | Removed (70%, 90%, <30s, $87k). The data and styles are gone too |
| Remove "Access at every step is role-based and logged." | Removed. The access-control statement remains in "Controlled Access" |
| Remove the minutes estimator, center Pricing, say "overage" | Estimator, its helper and tests deleted. Plan cards and the page header are centered. "$0.12/min overage" replaces "after that" |
| Dashboard from the HIPAA pitch slides, with the features | Product page section "The Dashboard Behind Every Call" using the slide's dashboard at readable size. On narrow screens it pans sideways at a legible scale instead of shrinking |
| Playground like Namu | Real physics: pieces fall in, tumble, collide, spin and settle over the giant wordmark. Twenty icon-only pieces (no text). Tossed pieces float: lighter gravity plus a little air resistance. No visible heading, instructions or reset button |
| Less empty space | Section spacing cut by about a third across the site; closing section trimmed; hero shorter |
| "v" cut off, gap above the wordmark | The wordmark's left edge now sits exactly on the content edge, inside the clip. The closing section's empty play area is much smaller |
| Header must not overlay text; mobile logo looked broken | The header was 86% opaque with a blur, so page text showed through behind the logo and Menu button. It is now solid once you scroll |
| "See it live" instead of an auto-playing intro | Nothing plays by itself. A "See it live" button appears throughout the site and opens the video full screen. See below |
| Remove the yearly pricing option | Done. Pricing is monthly only: the toggle, the yearly prices and the "Save 20%" label are gone |
| Menu descriptions match their titles | The small lines under each menu item are Title Case too |
| Check the header on iPhones | See "iPhone check" below |
| Scale properly on mobile | Audit across 84 page and width combinations: zero problems |

## The video

- **Re-rendered in mint and navy** from a copy of the video project (the original is untouched). 36.4 s, 1920x1080, 60 fps, no audio, 5.1 MB (the original was 7.3 MB), fast-start. The title is "Meet Vocalis." in mint to navy. The wording was softened ("Sorry about that. Your name and date of birth?") and "41% Call Drop-Off" became "14 Calls on hold" to match the interactive demo. The patch and notes are in `video-mint/`.
- **It never starts by itself.** An earlier version played it as a full-screen intro; that was removed at your request. The video file is only downloaded when someone clicks.
- **"See it live"** is a button people keep meeting: the desktop header, the mobile menu, the homepage hero, under the demo stage, the Product and Workflows page headers, the closing band on Product, Workflows, Pricing and About, the Security page, and the footer. One click opens the video filling the whole screen, already playing, with a Close button, Escape, a focus trap and a hidden description for screen readers. It asks the browser for real full screen where allowed. On a portrait phone a 16:9 video is letterboxed; holding the phone sideways fills it. Without JavaScript, the homepage button is a plain link to the video file.

## iPhone check

Tested in WebKit with the iPhone SE, 13, 13 Pro Max and 13 landscape profiles, with a notch and home bar simulated (a normal emulation does not apply safe areas). The images were examined, not just measured:
- The logo is crisp at the top of the page and while scrolled. The header is solid once you scroll, so page text can no longer show through behind the logo or the Menu button (this was the cause of the "weird logo").
- With a notch the logo sits below it; the header grows by the notch height and nothing is covered.
- The full desktop navigation now appears from 1080 px up and its labels no longer wrap; below that the compact menu is used. A "See it live" button and "Book a demo" fit at every width.
- The open menu is an overlay that scrolls inside the screen. "See it live" and "Book a demo" are pinned to its bottom, so the main actions stay visible even with a group expanded.

## Headline copy, before and after

| Location | Before (first pass) | After |
|---|---|---|
| Hero lead | "Vocalis answers calls, books appointments, and spots the problems that keep patients calling back. Your team gets time for the people in front of them." | "Vocalis picks up every call, books the visit, and flags what keeps patients calling back, so your staff can look after the people standing at the desk." |
| Stage heading | "See what happens after the phone rings." | "Follow One Call from Hello to the Dashboard." |
| Answer | "Every call gets a first response." | "Picked Up on the First Ring, at Any Hour." |
| Understand | "Each request becomes something staff can work with." | "Every Call Becomes a Short, Readable Record." |
| Act | "From a request to a clear next step." | "Book the Visit and Send the Confirmation." |
| Improve | "Repeated calls point at the real bottleneck." | "See Where Calls Pile Up, and Why." |
| Homepage workflows | Three cards repeating the workflows page | "The Calls Your Desk Takes All Day." A four-row index |
| Trust band | "Patient information stays protected." | "What We Do with Patient Information." |
| Contact | "See how Vocalis could work in your clinic." | "Book a Demo." |
| Product page | "Answer the call. Understand it. Act on it." | "What Vocalis Does for Your Front Desk." |
| Workflows | "The everyday calls, and what happens next." | "A Week of Calls for One Patient." |
| Security | "Security for patient conversations." | Same headline; sections "Where Patient Information Goes." and "How It's Protected." |
| About | "Medical teams should spend more time caring for patients." | "Clinics Should Spend Their Time on Patients, Not Phones." |

Meaning changes worth knowing: Workflows is now one patient's week in time order and describes Vocalis booking, not "staff receive a request". The Product page gained an "On Every Call" spec list of the approved claims. About now says what the founders actually do. A search found none of the banned phrases.

## Measured results

| Check | Result |
|---|---|
| Unit and interaction tests | 16 of 16 pass |
| Production build | Compiles with no warnings. Main JS 73.6 kB gzip, CSS 10.7 kB gzip, plus a 0.8 kB playground stylesheet and small lazy chunks |
| Cross-browser harness (`verify-v2.cjs`) | 40 route and viewport checks plus every interaction, in Chromium and WebKit, 320 to 1440 px, no page errors. Includes: menu overlay and focus, stable playback height, Reduce Motion, malformed URL fragment, Back restoring a tab, the physics playground (falls, settles, tap, keyboard, drag, Home, bounds, Reduce Motion), See it live covering the screen and playing, mocked form success and failure |
| iPhone check | Header, logo while scrolling, notch clearance and the open menu on four iPhone profiles: no problems |
| Mobile audit (`mobile-audit.cjs`) | 84 page and width combinations (320, 360, 375, 390, 414, 430 in both engines, all routes): no horizontal overflow, no text under 12 px, no form field under 16 px, no tap target under 44 px, nothing outside the screen |
| Mobile Lighthouse | Home 99, Product 98, Workflows 99, Pricing 99, Security 99, About 98 for Performance; Accessibility, Best Practices and SEO 100 everywhere; CLS 0 on every route; home FCP 0.8 s, LCP 2.2 s, TBT 20 ms; About LCP 2.5 s (at the limit) |

**Conditions and limits.** Lighthouse 12, mobile preset (simulated slow 4G, 4x CPU slowdown), production build served locally. These are lab numbers, not field data, and total blocking time is not real-user INP. Unthrottled, the home page paints in about 90 ms. No physical device was available, so touch feel, the keyboard, real safe-area rendering and browser toolbars are not device-verified; WebKit is Playwright's 26.0 engine with an iPhone 13 profile.

## Things to review

1. **Dashboard figures.** The dashboard picture is the pitch slide's image. It shows a clinic name (Lakeshore Family Medicine) and figures such as 1,248 calls and 87% resolution. The brief's approved claims do not include those figures. Confirm you are comfortable showing the slide as is, or replace the image.
2. **Claims.** The restored compliance and capacity statements are the founder's and were not audited here. Keep a source on file for SOC 2 Type 1 and Type 2, GDPR and the BAA.
3. **Real devices.** Open the live site on a real iPhone and Android phone and check the hero, menu, playground dragging, the dashboard pan, the form with the keyboard open, and See it live in both orientations.
4. **Dependencies.** The Browserslist database is stale and many unused packages remain in `package.json`. The lockfile was regenerated; review it.
5. **Deployment.** Published to `master` at your request; Vercel builds it from there.
