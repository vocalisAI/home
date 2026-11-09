> **Updated owner instruction — November 8, 2026:** The founder has confirmed that the existing product, performance and security claims were already validated and should be restored. Earlier directions in this historical document to remove or revalidate those company claims are superseded. Keep the setup-time promise (“less than a week”) removed. Leave pricing alone. Read `CLAUDE_REFINEMENT_PROMPT.md` and `DESIGN_REVIEW.md` for the current direction. Demonstration patient records remain sample data.

# Vocalis redesign — source and asset audit

Reviewed November 8, 2026. This document separates observed implementation, statements in company materials, and illustrative content. It is not a production security or functionality audit.

## Public sites

| Source | Review performed | Evidence |
|---|---|---|
| [Namu AI Lab](https://www.namuai-lab.com/) | Rendered desktop page; navigation expansion; Converse, Translate and API panel states; HTML/text structure. | Screenshots in `references/namu-*.jpg`. No microphone session, API execution, account action, or live call. |
| [Vocalis](https://www.vocalis.cc/) | Rendered site and page text; intro/media behavior; current pricing, definition, trust copy, team, FAQs, contact/LOI controls. | `references/vocalis-*.jpg`. No contact submission, LOI request, or sample call was triggered. |

The reference's visual patterns informed the original design proposal. Its backend capabilities were not validated. Mobile was briefly inspected, but this is not a full responsive QA report of either public site.

The initial Vocalis visit displayed a media-loading overlay. A later capture after waiting showed the completed orb intro. Scrolling thousands of pixels was still within that intro sequence. This supports the recommendation to shorten the first experience; it is not a measured Lighthouse or Core Web Vitals result.

## Website source

Root: `/Users/somesh/Desktop/websites/home`.

| File | Relevant content |
|---|---|
| `package.json` | React 18.2, react-scripts 5, Bootstrap 5.2, React Router 6.3, Sass, i18next. Homepage is configured as `https://vocalisAI.github.io/home`. |
| `src/App.js` | One homepage route with ten sections; loading animation gates rendering. |
| `src/components/home/MainBody.jsx` | Old full-height animated purple/pink/blue gradient hero. |
| `src/components/Navbar.jsx` | Existing logo and anchor-based navigation. |
| `src/components/sections/About.js` | Definition, pronunciation, anatomy, brand connection and founder biographies. |
| `src/components/sections/ProductDemo.js` | Scripted looping chat examples; not a live voice demo. |
| `src/components/sections/Multilingual.js` | Animated language list and marketing claims; not proof of actual supported languages. |
| `src/components/sections/Pricing.js` | Historical $500/month plan with unlimited-call and integration claims. |
| `src/components/sections/HIPAA.js` | Broad compliance and encryption marketing statements without substantiating evidence in this checkout. |
| `src/components/sections/Contact.js` | Formspree endpoint `https://formspree.io/f/mbdaqzpj`, success/error UI and `meetvocalis@gmail.com`. Read, not submitted. Confirm this is still production's intended endpoint. |
| `src/scss/custom.scss` | Existing colors, definition styles, broad Bootstrap overrides, motion and responsive rules. |
| `public/index.html` | Existing font links, metadata and icon dependencies to review during implementation. |

Local branch: `master`. Last local commit observed: `69c0129`, February 24, 2026. The working tree has pre-existing untracked videos, images and the `scrollable intro/` directory. Preserve them. Do not run a cleanup that removes untracked files.

The live page contains newer sections and pricing that are absent from this source. No matching current source was found in the targeted Desktop/websites and Desktop/prog searches. Remote history and the hosting deployment were not synchronized during this planning task. Claude must resolve that before replacing production.

## Backend source

Root: `/Users/somesh/Desktop/hipaa-voice-receptionist`.

Reviewed README, route/feature references and voice service files, including `app/services/llm.py` and `app/services/state.py`.

Observed: FastAPI/Azure architecture, FAQ routing, short conversational responses, administrative guardrail prompts, in-memory call state, limited conversation history, and state cleanup support. The prompt describes an appointment-help role, but that wording is not evidence of an appointment-booking integration.

This old repository does not establish the current production architecture. Its privacy-related code choices do not substantiate the live website's SOC 2, GDPR, encryption, or enterprise-wide retention claims. No live call was tested. Avoid treating prompt instructions as proof that every possible model output follows them.

## Newer business and pitch materials

| Exact location | Findings and how to use them |
|---|---|
| `/Users/somesh/Desktop/prog/PRODUCT/vocalis_master_context.md` | Broader patient-access intelligence positioning; communications → structured signals → operational recommendations. Strong strategic direction, not independent proof every proposed module is implemented. |
| `/Users/somesh/Desktop/prog/PRODUCT/retell-practicefusion-vocalis-blueprint.md` | Integration research/planning. Do not treat named EHR targets as completed integrations or repeat external vendor claims without current verification. |
| `/Users/somesh/Desktop/vocalis-pitch-video/VOCALIS_PITCH_BRIEF.md` | Evidence ledger distinguishes code-reviewed voice features, founder-confirmed capabilities, roadmap ideas and illustrative figures. Useful context, but some specifics are superseded by later slides/video. |
| `/Users/somesh/Desktop/hipaa-voice-receptionist/Vocalis Pitch - Venture4Impact(2026 Finalist).pdf` | Positioning, team/advisors, clinic focus, and older $500 pricing. Statistics and comparisons are pitch claims, not independently verified website evidence. |
| `/Users/somesh/Desktop/hipaa-voice-receptionist/pitch-slides/04_Pricing_Structure.pptx` | $299/1,500 minutes; $499/3,000; $899/6,000; $0.12/min overage. Matches the current live site's monthly structure. |
| `pitch-slides/01_Warm_Handoff_Patient_Trust.pptx` | Handoff narrative and claimed triggers. Verify precise supported behavior before marketing it as automatic detection. |
| `pitch-slides/03_Appendix_500_Cost_Breakdown.pptx` and `07_Appendix_HIPAA_Architecture.pptx` | Describe a fine-tuned open-weight model, GPU inference and a newer architecture; conflict with older Azure/stateless descriptions. |
| `pitch-slides/08_Appendix_Clinic_Dashboard.pptx` | Product presentation visual; associated HTML/PNG available in `dashboard-source/`. |
| `pitch-slides/09_Customer_Discovery_Quotes.pptx` | States 40 structured clinic interviews; explicitly says quotes represent themes and are not verbatim attributions. Do not convert these into customer testimonials. |
| `pitch-slides/10_Pilot_Precision_Heart_Rhythm.pptx` | States 612 minutes and 198 patient interactions, with appointment/referral workflows and handoff feedback. Possible case-study material; confirm measurement period, definitions, publication permission, and exact scope. |

Paths beginning `pitch-slides/` in the table are relative to `/Users/somesh/Desktop/hipaa-voice-receptionist/`.

Recent slides repeatedly use `#3FB59A`, `#69D3BD`, `#1E2B45`, `#111827`, `#FCFEFC`, `#F3F5F4`, and `#DDE3E1`. The dashboard uses a related teal `#2A9D82` and dark teal `#1D6F5C`. This is the evidence for the proposed mint/navy website palette.

## Media inventory

| Asset | Exact location | Treatment |
|---|---|---|
| Latest product walkthrough | `/Users/somesh/Desktop/vocalis-pitch-video/out/vocalis-keynote-demo-v2.mp4` | Primary video. Probed as 36.433s, 1920×1080, 60fps, 7,684,761 bytes; no audio stream. Frames sampled at 0/4/8/12/16/20/24/28/32 seconds. |
| Video source | `/Users/somesh/Desktop/vocalis-pitch-video/src/` | `scenes/Call.tsx`, `Week.tsx`, `Dash.tsx`, `Opening.tsx`; `theme.ts`, `choreo.ts`; project-root `timeline.json`. Sources explain structure and timing. |
| Older rendered versions | `/Users/somesh/Desktop/vocalis-pitch-video/out/vocalis-keynote-demo.mp4` and `vocalis-keynote-demo-4k.mp4` | Earlier exports. Do not select the 4K file solely because it has a higher resolution. |
| Orb/clinic video | `/Users/somesh/Desktop/websites/home/Enhancer-Ultra HD-Orb_transitioning_in_clinic_lobby_202605120008 (online-video-cutter.com).mp4` | Frames sampled at 0/2/4s. Embedded logo/text, clinic setting, changing turquoise/purple orb. Secondary brand material. |
| Orb frame sequence | `/Users/somesh/Desktop/websites/home/scrollable intro/` | 171 JPEGs. Archive/reference; avoid bulk loading on the redesigned page. |
| Dashboard visual | `/Users/somesh/Desktop/hipaa-voice-receptionist/pitch-slides/dashboard-source/dashboard@2x.png` | Visually inspected. Treat Lakeshore Family Medicine and all dashboard figures as illustrative unless separately established. |
| Dashboard source | Same folder, `dashboard.html` | Reference for chart structure and visual language; fixed-width presentation, not a responsive production application. |
| Anatomy | `/Users/somesh/Desktop/websites/home/public/vocalisanatomy.png` | Preserve with the definition. |
| Current local logo | `/Users/somesh/Desktop/websites/home/public/newestlogo.jpg` | Visually inspected cyan/navy waveform/V mark on white. Preserve identity. |
| Alternate logo candidates | `/Users/somesh/Desktop/prog/transparent logo.png`, `logo.png`, `newestlogo.jpg` | Located; inspect before choosing which file to use. |
| Earlier advertisement project | `/Users/somesh/Desktop/prog/Vocalis Advert.mov` and `/Users/somesh/Desktop/prog/remotion/` | Located; older marketing asset. Not selected as the redesign's primary demonstration. |

## Conflicts to resolve before publication

| Topic | Conflict | Practical decision |
|---|---|---|
| Website revision | Old local checkout vs newer deployed page | Recover current source or explicitly restore parity before release. |
| Pricing | Local/pitch $500 unlimited vs live/newer tiered minutes | Draft from the live/newer tiers; verify inclusions and annual terms. |
| Brand | Old gradient site, blue/purple video, newer mint slides | Use newer mint/navy as the stated design assumption. |
| Video duration | Brief says 52s; v2 probes at 36.43s | Use v2 and current frame timeline. |
| Handoff | Older brief lists roadmap; newer slides/pilot mention it | Include general narrative with scope confirmation; do not claim absence or invent exact triggers. |
| Analytics/booking | Brief records founder confirmation; old voice repo lacks implementation | Treat as company-described capabilities; verify exact integrations and behavior. |
| Infrastructure/retention | Azure/in-memory voice code vs Google Cloud/GPU/transcript slides | Do not produce a stitched-together architecture from both versions. |
| Performance metrics | Animated/demo dashboard figures vs possible actual pilot usage | Keep demonstration labels; validate pilot figures separately. |
| Security badges | Live claims include SOC 2 Type 1/2, GDPR and HIPAA | Observed marketing copy is not substantiation. Omit unsupported claims. |
| Customer quotes | Discovery slide uses representative themes | Never publish them as verbatim named testimonials. |

## Verification limits

This task produced planning documents and reference captures only. No frontend code, backend code, production settings, external records, forms or deployments were changed. No build/tests were run because application code was unchanged. Video review used extracted frames and source/timeline inspection, not a claim of playing every frame. No paid services, voice sessions, or real patient data were used.
