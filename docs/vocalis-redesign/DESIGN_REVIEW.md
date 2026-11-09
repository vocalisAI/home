# Vocalis redesign review and Claude takeover

Updated November 9, 2026. Reviewed Claude's local worktree at `/Users/somesh/Desktop/websites/home-redesign` and its production build. No production deployment was made.

## Candid assessment

The redesign is a useful first implementation. It is more readable, better organized, and much lighter than the former scroll-driven intro. It has six actual routes, shared components, example data separated from rendering, accessible tabs, lazy video, and a functioning request form. Those are worth preserving.

Visually, it has not yet reached the reference. It still relies heavily on centered headline/subhead blocks, rounded white cards, pale backgrounds, and cautious generic language. The repeated layout makes pages feel interchangeable. Namu's stronger qualities are its confident typographic scale, atmospheric hero, spacious product stage, varied editorial sections, and playful physical footer. The next pass should borrow that hierarchy and restraint while using Vocalis's own materials.

The original hero's thin sine waves run behind the text, particularly awkwardly on a narrow phone. The clipped chat preview is a decorative fragment of a demonstration that immediately appears again below it. The homepage repeats detailed workflow cards even though those workflows have their own page. The first 390px capture was roughly 7,700 CSS pixels tall. Scrolling is not itself a defect, but repetition is making the page longer than its content warrants.

The definition is the strongest distinctive brand element. Keep the serif word, pronunciation, anatomy and connection to speech. It deserves a quiet editorial composition rather than another generic feature block.

The original rewritten copy also undersells the product. Repeated references to recording requests and waiting for staff make an automated-booking product sound like a message-taking service. “Illustrative,” “fictional,” and “nothing happens” need one clear place within a demonstration, rather than dominating the product description.

## Findings with direct evidence

| Finding | Observed behavior | Correction in the refinement |
|---|---|---|
| Walkthrough playback jumps the page | At 390px, the Chrome panel went from approximately 873px to 380px when Play was pressed. WebKit went from 859px to 380px. | Unrevealed transcript lines retain space during playback. |
| Changing Reduce Motion loses transcript content | Starting playback then changing the media preference hid the unrevealed lines and removed the controls. | Preference changes stop playback and reveal every line. |
| Malformed URL fragment crashes | `/about#%E0%A4%A` left an empty page. | Fragment decoding has a literal-ID fallback. |
| Mobile menu changes document layout | Opening a Product group expanded the header to roughly 634px, with background content still interactive. | Overlay menu, bounded height, focus containment, background inertness and scroll isolation. |
| Draggable pieces overlap | A tapped/focused waveform could be covered by a neighboring speech tile, so the next drag hit the wrong object. | Focused and dragged pieces rise above their neighbors. |
| First preview lacked performance evidence | No Lighthouse report had been run. | A mobile Lighthouse run and Chromium/WebKit interaction checks are supplied. |
| Feature link is vague | Lighthouse flagged “Learn more.” | The link now names the actual feature. |

Initial overflow checks passed at 320, 375, 390, 768 and 1440px. That is useful evidence, but width checks alone do not verify keyboard, safe-area, touch or playback behavior.

## Changes prepared for the next design pass

- Restored the founder-approved performance claims: 70% call deflection, 90% patient satisfaction, under 30-second average wait, $87k annual savings. They render directly instead of counting up from zero.
- Restored 24/7, 50+ languages, 20+ simultaneous calls, automated scheduling, EHR/calendar integration, reminders and waitlist backfill in product content.
- Restored HIPAA, BAA, SOC 2 Type 1/2, GDPR, encryption, role-based access/audit logs and no PHI for model training. The internal record says these were restored at the founder's instruction; this review did not independently audit the claims.
- Kept the “less than a week” setup promise absent. Pricing files and billing values remain unchanged.
- Shortened the homepage by moving workflow depth to the existing Workflows page, removed the clipped chat fragment, simplified the trust section and made the headline more concrete.
- Preserved the definition and strengthened the connection to Vocalis's voice technology.
- Added safe-area support and bounded overlays, larger small controls, and a stable walkthrough.
- Added an optional bounded footer playground with waveform, speech, phone and calendar pieces. It loads near the footer; its animation loop sleeps when settled, hidden or offscreen. Tapping, keyboard movement and reset provide alternatives to dragging. Reduced motion disables inertia.
- Updated earlier planning documents so their claims-removal instructions cannot override the founder's correction.

These changes provide a sounder starting point. The visual composition should still be reviewed as a whole by Claude using the new prompt. The footer is a working first version, not a reason to declare the rest of the site finished.

## Mobile and browser documentation used

Use primary documentation and standard APIs. These links were checked during this review:

- [Apple/WebKit: safe-area insets and viewport-fit](https://webkit.org/blog/7929/designing-websites-for-iphone-x/) — when drawing edge to edge, protect controls/content using the system insets. This older foundational guidance still explains the mechanism.
- [Apple: viewport units](https://developer.apple.com/videos/play/wwdc2022/10048/) — distinguish stable small viewport sizing from dynamic overlay height.
- [WebKit features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) — browser compatibility context. The downloaded automated WebKit engine is 26.0; do not present it as a test of every current iOS release.
- [MDN: touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action) and [pointer capture](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture) — localize custom drag handling to the pieces and keep normal page gestures available elsewhere.
- [MDN: reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — respect changes to the preference, not only the initial value.
- [W3C: alternatives to dragging](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) — provide a tap/click operation as well as keyboard support.
- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) — defer optional work until it approaches the viewport.
- [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) — loading, responsiveness and layout stability. Targets are LCP <=2.5s, INP <=200ms and CLS <=0.1; field evaluation requires real-user data.

## Measurement limits

The mobile Lighthouse result is a local production-build lab run, not a promise about production hosting or every iPhone. It measured 1.4s LCP, 0 CLS and 0ms total blocking time, with Performance 100, Accessibility 100, Best Practices 100 and SEO 92. The final small footer-focus and feature-link fixes were made after that report; the link-text issue it identified is fixed in source. Do not relabel the older report as a measurement of a later design.

Total blocking time is not real-user INP. No physical iPhone has been connected for this review. Automated WebKit emulation helps catch engine problems, but toolbar changes, the software keyboard, actual safe-area rendering and touch feel still require a device check before claiming device verification.

The build warns that the Browserslist database is outdated. The retained app still uses Create React App 5/React 18. The browser database and unused build dependencies merit a separate maintenance pass; a framework rewrite is not needed to achieve the intended design.

## Remaining design decisions for Claude to execute

Follow the concrete composition instructions in `CLAUDE_REFINEMENT_PROMPT.md`. Improve the hero and main demo as a pair, then carry the same design system through the supporting pages. Use the actual dashboard/pitch/video materials. A mint rerender of the silent video may improve consistency, but preserve the current export until the replacement is ready.

Do not ask the founder to repeat approvals for the restored claims. Do not reopen pricing. Do not remove the definition. Complete the pass, inspect screenshots, test the named interactions and deliver the result for review.

## Completed checks — November 9, 2026

- Production build succeeds. Main JavaScript is approximately 76.18 kB gzip; the optional playground is a separate approximately 2.46 kB gzip chunk.
- 19 existing automated tests pass.
- 40 route/viewport checks pass across Chromium and WebKit, spanning widths 320, 375, 390, 430, 768 and 1440px. All tested pages have one H1 and no horizontal document overflow.
- Both engines pass menu focus/cleanup, stable playback, Reduce Motion changes, malformed fragment handling, product Back navigation, playground tap/keyboard/drag/reset/bounds, video open/close/unmount and mocked form success/failure. No page errors were recorded.
- The phone walkthrough is now stable at approximately 877px in Chromium and 863px in WebKit before and after pressing Play.
- The reviewed 390px homepage capture is approximately 6,000px tall, including the new playground, compared with roughly 7,700px for the first redesign.

See `review-evidence/verified.json` for the exact browser/viewport results, `review-evidence/lighthouse-mobile.json` for the local lab report, and the before/after JPEG captures. The report's measurement limits above still apply.
