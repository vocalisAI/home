> **Updated owner instruction — November 8, 2026:** The founder has confirmed that the existing product, performance and security claims were already validated and should be restored. Earlier directions in this historical document to remove or revalidate those company claims are superseded. Keep the setup-time promise (“less than a week”) removed. Leave pricing alone. Read `CLAUDE_REFINEMENT_PROMPT.md` and `DESIGN_REVIEW.md` for the current direction. Demonstration patient records remain sample data.

# Vocalis website redesign — implementation plan

Prepared November 8, 2026. Planning deliverable for Claude; no website implementation or deployment has been performed.

## 1. Direction

Build a spacious, polished Vocalis marketing site inspired by [Namu AI Lab](https://www.namuai-lab.com/), using Vocalis's own identity, product stories, and media. Keep the anatomical Vocalis definition. Make the product explorable through useful tabs and demonstrations, and move secondary details into focused pages.

The central story is **patient access for small and independent clinics**: answer the call, understand the request and its obstacles, help the clinic act, and reveal recurring problems. The newer strategy documents and pitch materials support this broader positioning. The voice receptionist is the entry point; the website should also explain the intelligence and workflows around it.

Recommended design assumption: use the **mint/teal, navy, and near-white palette in the recent pitch slides and clinic-dashboard asset**. Preserve the established Vocalis logo. The old local website's purple/pink gradients and the video's blue/purple UI are historical variations, not the proposed primary palette.

Success means a practice manager can quickly answer: What does Vocalis do? What would it do in my clinic? What does the experience look like? How do I book a demo?

## 2. Critical starting point: reconcile the website source

The live [Vocalis website](https://www.vocalis.cc/) and this local checkout are different versions.

| Source | Observed state | Implication |
|---|---|---|
| `/Users/somesh/Desktop/websites/home` | React 18, Create React App, React Router 6, Bootstrap, SCSS. Local HEAD `69c0129`, February 24, 2026. Purple gradient hero; $500 single plan. | Useful source and asset inventory, but not a complete representation of production. |
| Live `www.vocalis.cc` | Orb/clinic intro with media loader, definition, after-hours scenario, $299/$499/$899 plans, security, team, FAQ, contact and LOI actions. | Preserve working production behavior and current pricing structure during the redesign. |
| Newer pitch/video materials | Patient-access intelligence, operational dashboard, warm handoffs, updated pricing and pilot material. | Primary content direction, with evidence distinctions described in the companion audit. |

Claude's first task is to identify the source revision currently deployed to `vocalis.cc`. Check the remote and hosting configuration in a separate branch or checkout; preserve local untracked media. Do not replace production with the February source by accident. If the current source cannot be recovered immediately, build a local redesign branch from this checkout and document the production features that must be reconciled before release. Development can proceed without deployment.

## 3. What to adapt from the reference

The reviewed reference uses a large centered headline, a softly animated background, a slim sticky header, expandable navigation, rounded tab panels, an orb-based voice control, use-case cards, an editorial content section, and expandable research content. Its demo tabs expose conversation, translation, and API interfaces. These interface states were inspected; live voice/translation requests were not executed.

Adapt the visual hierarchy, spacing, interaction patterns, and restraint. Use original Vocalis copy and visuals. Re-create the needed components in the Vocalis codebase; do not depend on Namu assets, scripts, services, or API endpoints.

Reference captures: [hero](references/namu-hero.jpg), [tab panel](references/namu-850.jpg), [navigation](references/namu-state-Research.jpg), [translation interface](references/namu-state-Translate.jpg), [API interface](references/namu-state-API.jpg), [cards](references/namu-1700.jpg).

## 4. Information architecture

Use a concise homepage and five focused supporting pages. Build shared components first so this does not become six unrelated designs.

| Page | Purpose | Content |
|---|---|---|
| `/` | Explain the product and invite exploration | Hero, interactive product showcase, clinic workflow examples, definition, concise trust section, demo request. |
| `/product` | Explore capabilities | Four feature tabs with deep links, rich visual examples, short capability explanations, implementation scope where relevant. |
| `/workflows` | Explain everyday clinic uses | Appointment requests, recurring insurance questions, after-hours requests, staff handoff. Use realistic scenarios, not invented customer stories. |
| `/pricing` | Show the existing commercial structure | Current three tiers, included minutes, overage, concise FAQ, demo CTA. |
| `/security` | Explain verified data handling | Plain-language data flow and operational safeguards with wording tied to confirmed implementation. |
| `/about` | Tell the company story | Definition, short founder bios, mission, supported pilot/company updates when cleared for publication. |

Desktop header: Vocalis logo → **Product**, **For clinics**, **Pricing**, **Company** → **Book a demo**.

- Product menu: Voice receptionist; Call intelligence; Scheduling & follow-up; Clinic insights; Security & privacy. First four link to the matching product tab.
- For clinics menu: appointment requests; insurance follow-up; after-hours coverage; staff handoff. Link to workflow sections.
- Company menu: About Vocalis; Why the name; Contact. Add a pilot story only when ready to publish.
- Use small, deliberate dropdowns; the product does not need a sprawling menu.
- Mobile: compact header and a tap-operated accordion menu. All destinations remain reachable without hover.
- Book a demo resolves to the same working form at `/#contact` from every page. No invented booking URL.
- No login, developer portal, API playground, news feed, or newsletter unless Vocalis actually needs and supports it.

Preserve existing public anchor destinations with aliases or redirects where practical. Routes must load on direct navigation and refresh under the actual hosting setup.

## 5. Homepage composition

### A. Hero: one message and one clear next step

Suggested copy:

> **Every call. A clearer path to care.**
>
> Vocalis helps independent clinics answer patient calls, understand recurring problems, and turn requests into next steps.

Eyebrow: `Patient access for independent clinics`.

Primary action: **Book a demo**. Secondary action: **Explore Vocalis**, scrolling to the interactive showcase. A smaller **Watch the 36-second overview** link opens the existing product video.

Visual: near-white field with a quiet mint/teal voice form, large navy type, ample open space, and a hint of product UI at the lower edge. Make the headline and buttons HTML content that appears immediately. The background may use a small procedural animation or optimized decorative clip; it must not gate the page.

At desktop sizes, aim for a hero around 75–90svh with a practical height cap. On phones, content determines height; keep both the proposition and CTA visible early. Avoid huge empty stretches before the visitor reaches the product.

### B. Main showcase: “From the first ring to the next step.”

One large rounded demonstration panel, with four persistent tabs. Each tab includes a short explanation, an interactive example, and a link to its product detail. Avoid adding a second, competing feature-card grid immediately below it.

| Tab | Main visual and action | What the visitor learns |
|---|---|---|
| **Answer** | Small voice orb beside a fictional clinic call transcript. Play/replay the walkthrough; optional real sample audio only when available. | How a caller interacts with Vocalis. |
| **Understand** | Select a transcript phrase; highlight connected **Intent**, **Friction**, and **Next step** cards. | How a repeat insurance question becomes a structured follow-up task. |
| **Act** | Select a scheduling/follow-up scenario; press **Show next step** to animate a request into a calendar or task card. Reset button restores the example. | How the clinic can follow through on the request. |
| **Improve** | Select a time window or call reason; a bottleneck chart and plain-language recommendation update together. | How repeated calls reveal operational problems. |

Use a persistent label: **Illustrative product walkthrough**. All example names and numbers are fictional. The interactive control changes only the example shown on the page; it never books a real appointment or enables a clinic automation.

The default Answer panel should be understandable before any click. Tab changes are manual, preserve a stable layout, and use short transitions. Mobile panels stack their explanation and visual; they must not shrink a desktop dashboard into unreadable miniature text.

### C. Clinic workflows: show specific situations

Heading: **Built around the calls your team handles every day.**

Use three substantial previews on the homepage: appointment requests, recurring insurance questions, and after-hours requests. Each includes one situation, an example next step, and a link to the corresponding workflow. Put handoff context beside the relevant example, then explain it fully on the workflows page.

Examples should show administrative help. An insurance-capture link is not an insurance approval; an appointment request is not a confirmed booking unless the configured integration actually confirms it. The visual copy must preserve that distinction.

### D. The Vocalis definition: retain it as a signature section

Keep this visible on the homepage, around the middle of the experience. Do not bury it only in the footer or About page.

Preserve the word **vocalis**, pronunciation **/ˈvoʊkælɪs/ — [vo·cal·is]**, and the local anatomical definition:

> The vocalis is the thin, innermost muscle of the vocal folds (part of the thyroarytenoid) that regulates vocal cord tension and pitch.

Use `public/vocalisanatomy.png`, generous whitespace, a large italic serif word, a fine divider, and readable supporting text. Desktop: definition / anatomy / brand connection. Mobile: definition, image, then brand connection.

Suggested updated brand connection:

> The vocalis muscle fine-tunes the human voice. We chose the name for the care and precision we want to bring to every patient conversation.

This keeps the meaning the user wants while fitting the current business story. The old sentence about building “leading voice production models” should not be carried forward automatically.

### E. Trust and human support

Use a restrained section explaining human handoff, administrative scope, and privacy-minded design, with a link to Security. Keep implementation details on the supporting page. A short data-flow diagram can show **patient call → clinic request → protected workflow → operational insight**, without asserting a particular encryption or retention mechanism until verified.

A compact pilot strip can be added here once the Precision Heart Rhythm usage figures and publication permission are confirmed. The layout must work without it; do not ship fabricated logos or placeholder endorsements.

### F. Conversion and footer

Heading: **See how Vocalis could work in your clinic.**

Preserve the working demo-request flow. Ask for name, clinic, email, and an optional short message. Display submission, success, and error states; preserve entered values on failure. Provide the existing `meetvocalis@gmail.com` fallback. Avoid asking for patient information in this marketing form.

Footer groups: Product; Clinic workflows; Company; Contact; real legal pages if available. No dead privacy/terms links and no large repeated sales pitch. Keep the LOI action off the main homepage unless it has a distinct, intentional business purpose; preserve its destination while the production source is reconciled.

## 6. Supporting-page content

### Product

Four tabs: **Voice receptionist**, **Call intelligence**, **Scheduling & follow-up**, **Clinic insights**. Example deep link: `/product?feature=call-intelligence`. Accept only known feature values; unknown values open the overview. Back/forward navigation should restore the selected view.

Each tab needs a unique product visualization, a short benefit statement, three specific capabilities, one concrete scenario, and a demo CTA. Reuse the homepage's example data and primitives. Put detailed diagrams or technical notes behind an expandable section; do not lead with the old Twilio/LLM-style architecture pipeline.

Language support belongs inside Voice receptionist when confirmed. Do not carry over a rotating list of 50 languages as evidence of actual supported behavior.

### Workflows

Lead with the clinic's situation, then show the call, the structured request, the next action, and the point where staff takes over. Use the same fictional patient journey across the page to avoid repetitive disconnected chat bubbles. Handoff examples should be labeled illustrative unless the exact trigger and summary behavior are verified.

No implication that Vocalis diagnoses patients, approves insurance, or guarantees a fully booked calendar. Keep the focus on communication and administrative work.

### Pricing

The current live page and newer pricing slide agree on these monthly tiers:

| Plan | Monthly price | Included minutes | Overage |
|---|---:|---:|---:|
| Starter | $299 | 1,500 | $0.12/min |
| Standard | $499 | 3,000 | $0.12/min |
| Growth | $899 | 6,000 | $0.12/min |

Use this structure for the redesign draft. Confirm current plan inclusions before release; do not revive the old $500/unlimited-calls offer. The live site also advertises a yearly discount; preserve its behavior only after confirming the billing basis and actual totals. Do not infer annual billing terms from a percentage label.

Optional useful tool: a **minutes estimator** that compares the three plans using `base + max(0, minutes − included) × 0.12`. Label it an estimate, exclude unsupported fees/discounts, and keep it subordinate to the plan cards. It should never estimate recovered revenue or guaranteed savings. Ship the three cards first; add the estimator after the primary experience is polished.

### Security

Explain the current product's actual data flow, what is retained, who can access it, how handoffs work, and where a clinic can request details. The available sources conflict: the old voice repository is Azure-based and keeps call state in memory, while newer slides describe GPU inference, Google Cloud, encrypted transcripts, and analytics. Do not combine those into an invented architecture or apply the old repo's no-storage behavior to the entire product.

The live website's SOC 2, GDPR, and broad HIPAA claims were observed but not substantiated by the reviewed materials. Do not recreate certification badges from marketing copy alone. Use restrained design-intent copy while the relevant facts are resolved. Never publish internal `[VERIFY]` placeholders as customer-facing text.

### About

Keep the definition and give it additional context. Shorten founder bios to role, relevant experience, and why the team is working on clinic access. Confirm current degrees, titles, affiliations, advisor relationships, and permission for logos. The pitch deck and older bios differ.

A future “Our work” section can hold pilot updates, product notes, and research. Launch it only with substantive, approved entries. Do not imitate an active research lab by inventing articles or reports.

## 7. Visual system

These are proposed implementation tokens, based on the newer slides and dashboard rather than an official brand manual.

| Role | Value | Use |
|---|---|---|
| Canvas | `#FCFEFC` | Main page background |
| Surface | `#FFFFFF` | Product panels and forms |
| Alternate surface | `#F3F5F4` | Quiet section contrast |
| Navy | `#1E2B45` | Primary buttons, wordmark, strong labels |
| Ink | `#111827` | Body and heading text |
| Muted | `#6B7280` | Secondary text; check contrast on chosen surfaces |
| Brand mint | `#3FB59A` | Active state fills and restrained illustration accents |
| Light mint | `#69D3BD` | Decorative glow and soft highlights |
| Dark teal | `#1D6F5C` | Text links and accessible colored labels |
| Border | `#DDE3E1` | Hairlines and panel boundaries |

Prefer navy buttons with white text or mint buttons with navy text. Do not assume white text on mint is readable.

Use **Inter** for the main UI, already referenced in the site. Reserve **Georgia** or the existing serif treatment for the definition. A useful desktop range is 72–96px for the hero, 38–52px for section headings, and 17–19px for body copy; use fluid sizes around 40–52px for the mobile hero. Keep body lines roughly 55–70 characters long.

Use a shared 1200–1280px content width, about 64px desktop side gutters and 20px phone gutters. Section spacing: roughly 88–120px desktop, 48–64px mobile. Demonstration panels: 24–28px radius; ordinary cards: 14–18px. Thin borders and soft, sparse shadows. Pills are suitable for tabs and CTAs, not every object.

Keep the existing logo artwork. Choose the best existing transparent version after inspecting it; do not recolor or redraw it casually. The cyan/navy logo can sit naturally within the mint/navy UI.

## 8. Video and asset plan

Primary demo: `/Users/somesh/Desktop/vocalis-pitch-video/out/vocalis-keynote-demo-v2.mp4`.

Measured properties: **36.433 seconds, 1920×1080, 60 fps, approximately 7.3 MiB, video-only with no audio stream**. The older pitch brief describes a 52-second version; its timestamps are stale for v2. The current `timeline.json` and `src/choreo.ts` match the shorter version.

| Approximate v2 window | Content | Website role |
|---|---|---|
| 0–2.5s | Introduction and incoming call | Optional opening still; do not make visitors wait through it repeatedly |
| 2.5–12s | Conversation and identifier-protection animation | Answer preview / video chapter |
| 12–16s | Intent, friction, action | Understand tab reference |
| 16–21s | Calendar transition and filled slots | Act tab reference, clearly illustrative |
| 21–32.5s | Bottleneck dashboard and fixes | Improve tab reference |
| 32.5–36.4s | Closing message | Full video only |

These windows are approximate; use the source frame markers for exact edits. The v2 chart shows illustrative values, including 41%; it is not customer performance evidence. The identifier animation is a visual metaphor, not evidence of a verified encryption implementation.

Use the full video in an accessible player opened on request. Provide a descriptive transcript explaining the visual sequence because there is no narration. Start with a legible poster from a product scene. Preserve a 16:9 aspect ratio. Load video after interaction or near the player, rather than downloading it during the initial page load.

The interactive website panels should rebuild the key UI states as responsive web components. **Do not mount Remotion's entire React 19 video project inside the React 18 website.** Use rendered media and selectively reimplement simple visuals.

Secondary asset: the clinic-orb MP4 in the `home` directory and its 171 JPEG frames in `scrollable intro/`. It is recognizable brand material, but its embedded text and dramatic zoom make it less useful behind a new headline. Keep it as optional secondary footage or a short decorative excerpt after visual testing. Do not preload the entire image sequence or require a long scroll to reveal the actual website.

The existing dashboard screenshot and HTML under `hipaa-voice-receptionist/pitch-slides/dashboard-source/` are strong visual references. Their clinic name and numerical data must be treated as demonstration content. Rebuild a focused responsive chart rather than inserting the entire screenshot as a tiny mobile dashboard.

Visual review sheets: [new demo](references/pitch-contact-sheet.jpg), [older orb clip](references/orb-contact-sheet.jpg).

## 9. Interaction requirements

| Component | Required behavior |
|---|---|
| Header/menu | Keyboard and touch access, visible focus, Escape closes, outside click closes, no hover-only navigation; mobile menu restores focus on close. |
| Feature tabs | Proper tab semantics and arrow-key behavior; active panel linked to its tab; no automatic switching; current selection has more than a color cue. |
| Example walkthrough | Play, pause and replay where time-based; selections update related highlights; explicit reset; no hidden live side effects. |
| Video dialog/player | Accessible title, keyboard close, focus management, visible playback controls; close stops playback. |
| Audio sample | Only include if a usable sample exists. Play/pause and transcript; no autoplay; changing samples stops the previous one. |
| Chart | Click, tap, or keyboard selects a segment; tooltip information also available as text; demo data labeled. |
| Contact form | Preserve real submission behavior; inline validation; in-progress, success and failure states; no duplicate submissions. |
| Motion | Subtle 150–300ms UI transitions. Reduced-motion mode removes background movement, counters and timeline animation while retaining all content. |

A live “Talk to Vocalis” tool is a separate integration milestone, not a decorative button. Ship the recorded/scripted walkthrough first. A live version requires a known demo backend, server-side credentials, session limits, microphone consent, clear start/end states, error handling, and a test-clinic context. No live endpoint was verified in this audit, and no call should be placed automatically.

## 10. What to remove or move

| Existing element | Decision |
|---|---|
| Vocalis definition and anatomy | Keep; improve layout and prominence. |
| Working contact flow and current pricing structure | Preserve and restyle after source reconciliation. |
| Full-screen loading/intro gate | Remove. Render content immediately; media enhances it asynchronously. |
| Old animated rainbow gradient and stars | Replace with the restrained brand system. |
| Long repeated benefit/feature pitches | Consolidate into the four-part showcase and focused detail pages. |
| Automatically looping chat cards | Replace with controlled walkthroughs. |
| Large technical pipeline | Move relevant verified details to Product/Security. |
| Long homepage founder biographies | Shorten on About. |
| Unsupported performance counters and savings claims | Remove until there is a documented basis. |
| Broad “50 languages,” “20+ calls,” “unlimited calls,” and guaranteed outcomes | Do not migrate automatically; verify exact scope. |
| Tax-deduction FAQs | Remove from the marketing narrative. |
| Operating-cost/profit breakdown and competitor price comparisons | Omit from public product pages unless there is a specific reason to maintain them. |
| Premature blog, API demo or multilingual site toggle | Omit until actual content/functionality exists. |

## 11. Implementation sequence for Claude

1. **Reconcile source and preserve functionality.** Identify production revision/hosting, record working links and forms, preserve untracked assets, create a redesign branch, and resolve which pricing/config values are authoritative. Keep this audit available as evidence.
2. **Establish the design system.** Build tokens, typography, buttons, container widths, header/footer, tabs, and disclosure components. Confirm the hero, one product panel, and definition look coherent at desktop and phone widths before multiplying layouts.
3. **Complete the homepage.** Build the hero, four-state showcase, workflow previews, definition, trust summary, and form. Integrate the existing video with poster and descriptive transcript. This is the main quality milestone.
4. **Build supporting pages.** Reuse the components/data for Product, Workflows, Pricing, Security and About. Add meaningful metadata, deep links, and navigation behavior. Keep copy concise; no empty sections.
5. **Finish content and media.** Replace placeholders, confirm claims/inclusions, optimize media, and review all generated/scenario content for consistency. Add the minutes estimator only after the core site works well.
6. **Verify and hand off.** Run the build and targeted checks; inspect visual states on real viewport sizes; resolve navigation, media, accessibility and layout issues; provide a local preview and concise completion report. Publish only under the user's subsequent implementation/deployment instruction.

Proposed component boundaries, to adapt to the recovered source: `SiteHeader`, `SiteFooter`, `Hero`, `ProductShowcase`, `CallWalkthrough`, `IntentFrictionAction`, `SchedulingExample`, `InsightsExample`, `WorkflowPreview`, `VocalisDefinition`, `VideoDialog`, `PricingTable`, and `DemoRequestForm`. Keep scenarios, prices and feature metadata separate from rendering.

Stay with the existing React stack for the redesign unless the recovered production source requires something else. A framework migration is not necessary to achieve this visual result. Replace conflicting global Bootstrap overrides deliberately; avoid layering another collection of `!important` rules on top of the old ones.

## 12. Acceptance criteria

- The first viewport explains the business and has a working demo CTA before media loads. No blocking loader or required intro scroll.
- The proposed mint/navy identity is consistent across website, product examples, and buttons; the existing logo remains recognizable.
- The Vocalis definition, pronunciation, and anatomy image remain clearly accessible on the homepage.
- Four meaningful product states work on desktop and mobile; a visitor can understand the default state without playing an animation.
- Every visible control has a working destination or local interaction. No fake live microphone, login, integration, dashboard export, or booking action.
- All example data is identified as illustrative. Customer claims, integrations, security statements and pricing details reflect confirmed scope.
- At 390px, 768px and 1440px widths: no unintended horizontal overflow, clipped tabs, illegible charts, or overlapping header/content. Also check keyboard-only use and reduced motion.
- Images have appropriate descriptions, decorative media is hidden from assistive technology, controls have names, text contrast is checked, and focus is visible.
- Direct links, refreshes, Back/Forward, old public anchors, form success/error states and video load failures behave correctly.
- The initial page does not fetch the entire orb frame sequence or multiple demo videos. Hero imagery reserves its dimensions; below-fold assets load lazily. Target good Core Web Vitals and report actual measured results rather than assumed scores.
- Meaningful checks cover navigation/menu/tab behavior, the contact submission states using a mock transport, and estimator arithmetic if added. Do not send real form submissions or place real calls during automated tests.
- The production build succeeds. Any deployment/base-path differences (`/home` versus root custom domain) are resolved explicitly. Existing source/media are preserved and the change is reviewable.

## 13. Decisions that can remain open during the build

These do not prevent a polished local implementation. Use the stated defaults and track unresolved publication details separately.

| Decision | Default for implementation |
|---|---|
| Brand variation | Recent mint/navy pitch palette; preserve existing logo. |
| Which video | v2, 36.43s, with existing illustrative-data caveat. |
| Live voice demo | Use a scripted visual walkthrough; add audio only if a real asset is supplied. |
| Pricing | Current live monthly tier structure; verify inclusions/annual billing before release. |
| Security architecture | Describe verified behavior only; omit unsupported certifications and vendor-specific assertions. |
| Pilot story | Keep out of the public draft until figures, period and publication permission are confirmed. |
| Source mismatch | Recover current source first; if unavailable, build locally with an explicit production-parity checklist. |

Read [SOURCE_AUDIT.md](SOURCE_AUDIT.md) for exact file locations, evidence distinctions, and discrepancies. Use [CLAUDE_HANDOFF.md](CLAUDE_HANDOFF.md) as the implementation prompt.
