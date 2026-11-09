# Vocalis refinement prompt for Claude

Work in `/Users/somesh/Desktop/websites/home-redesign`, branch `redesign/vocalis-2026`. The sibling `home` folder is an older checkout. Preserve all existing staged and unstaged work, including the review fixes. Read `START_HERE.md` and `DESIGN_REVIEW.md` before changing anything. Use the provided screenshots and inspect the running site yourself.

## What I want

Make Vocalis feel like a real clinic software company with a clear point of view. The first redesign is cleaner, but too much of it reads and looks like a generic AI-generated landing page. Keep the mint/navy identity, logo, Vocalis definition, pronunciation and anatomy image. Keep the actual multipage structure: Home, Product, Workflows, Pricing, Security and About. Each page needs its own purpose; do not move every page back onto the homepage.

The homepage should help someone understand the product quickly, try a demonstration, read the results, and request a demo. Put detailed workflow stories on `/workflows`, capability details on `/product`, and security details on `/security`. Navigation, direct URLs, refresh and Back/Forward must work.

## Owner-approved claims — do not remove them again

I have already validated the company's existing claims. Preserve the restored performance figures (70% call deflection, 90% patient satisfaction, under 30-second average wait, $87k annual savings), 24/7 availability, 50+ languages, 20+ simultaneous calls, automated booking/rescheduling, EHR/calendar integration, reminders, waitlist backfill, human handoff, and the existing HIPAA, BAA, SOC 2 Type 1/Type 2 and GDPR statements. The reviewer restored these at my instruction; that is the authorization to retain them. Do not invent extra statistics, testimonials, certifications or customer names.

Remove any promise that clinics are live in less than a week. Leave pricing tiers, amounts, included minutes, overage, billing and pricing-page content alone. Keep fictional patient records labeled as sample data inside demonstrations; do not describe the whole product as fictional or experimental.

## Copy-editing prompt

Act as an experienced editor writing for an independent practice owner and the person running their front desk. Read every visible sentence aloud. Rewrite what sounds like a pitch-deck template, an AI disclaimer, or an instruction to a developer.

Use concrete nouns and verbs: calls, appointments, insurance questions, callbacks, front-desk staff. Say what Vocalis does and what happens next. One useful thought per paragraph. Vary sentence length naturally. Keep necessary medical and technical terms, but explain them when the audience needs it. Make headings specific enough that they could not be pasted onto any other software company's website.

Avoid stock phrases such as “seamless,” “revolutionize,” “unlock,” “empower,” “elevate,” “cutting-edge,” “game-changing,” “where innovation meets,” “the future of,” and “a smarter way to.” Avoid repeated three-part slogans, “not just X, but Y,” rhetorical question/answer headings, unnecessary em dashes, and a reassuring adjective in every sentence. Do not make the text artificially casual, deliberately ungrammatical, or full of slang. Keep the founders' actual perspective and the specificity of their clinic work.

Examples of the editing direction:

- “Turn requests into actionable next steps” → “Book the visit and send the confirmation.”
- “Administrative help, with people in the loop” → “Your team takes over with the call summary in hand.”
- “Handled with care, explained plainly” → “Security for patient conversations.”
- “Four connected parts of one workflow for patient access” → Explain the four capabilities directly, using their actual names.

Preserve the meaning and approved claims. Do not weaken automated booking into “staff receive a request” unless describing a workflow that actually requires staff review. Do not repeat “illustrative,” “fictional,” or “nothing happens” under every card. Use one concise “Interactive demo · sample patient data” label where it belongs.

After editing, provide a short before/after table for the main headlines and summarize substantive meaning changes. This is an editorial task, not an attempt to evade an AI detector.

## Visual direction

Keep the cleaner typography and responsive layout. Improve the hierarchy and product imagery rather than adding more generic cards. Avoid repeated centered headline/subhead/three-card sections. Keep deliberate whitespace, but remove empty spacing that adds scrolling without information. Keep the homepage short enough that its purpose remains obvious on a phone.

Make the Namu relationship visible in the composition, not just the color palette:

1. Use a calm, large centered hero with a short headline and lighter typography. Build a soft mint atmospheric voice form with restrained texture; the current thin sine-wave background feels generic and can go. Text and CTAs must appear before decorative media loads.
2. Give the main demo one large stage with four clear tabs. Favor a substantial voice visual and product action over many nested bordered cards. The transcript can be secondary or expandable; preserve access to the full transcript. The default view must make sense without clicking.
3. Replace repeated cards with a mix of editorial rows, large product visuals and fine separators. Each supporting page should earn its place with specific information and a distinct composition. Do not repeat the entire homepage under a new heading.
4. Keep the anatomical definition as a deliberate editorial break. Preserve the pronunciation and image. It is a real piece of the brand, not filler.
5. Use the supplied dashboard source or a focused responsive reconstruction to show operational insight. Avoid turning it into a row of generic feature icons or a desktop screenshot shrunk onto a phone.
6. End with the bounded draggable pieces and a large Vocalis wordmark, then a useful footer. Keep enough space to play; keep critical links outside the draggable area.
7. Compare the final screenshots beside Namu at desktop and phone sizes. Ask whether hierarchy, spacing, typography and interaction carry the same restraint and confidence. A recolored template does not satisfy the brief.

Deliver a complete, coherent pass across the pages. Resolve the choices above with judgment and review the result yourself before handing it back. Do not leave starter copy, placeholders, unimplemented controls or half-finished mobile states.

The original Namu reference is https://www.namuai-lab.com/. Its draggable footer is a useful inspiration. A small Vocalis playground now exists: speech, phone, waveform and calendar pieces. Refine it if needed; keep it bounded, optional, below the actual content and above normal footer links. Drag, tap and keyboard actions must work. It must not trap page scrolling, cover navigation, or run animation work when offscreen. Do not add a heavy physics library just for decoration.

The product video is `/Users/somesh/Desktop/vocalis-pitch-video/out/vocalis-keynote-demo-v2.mp4`. It is 36.43 seconds and silent. The current source timeline is in that project's `timeline.json`; the old brief's 52-second timing is stale. If rerendering for brand consistency, work from a copy of the source, use the mint/navy palette, retain the actual product claims, and keep the existing video until the new one is reviewed. Use the newer HIPAA-receptionist pitch slides/dashboard for product context. Do not let video production delay or block the first page render.

## Mobile and implementation requirements

Preserve the fixes in the reviewed version: stable transcript dimensions during playback; Reduce Motion changes reveal the complete transcript; malformed hash URLs do not crash; mobile menu is an overlay with focus containment and background isolation; safe-area padding; lazy video and footer; and keyboard/tap alternatives to dragging.

Use standard web APIs and current primary documentation, linked in the review. Keep controls at least 44 CSS px where practical, input text at least 16px, no disabled pinch zoom, and natural page scrolling. Use safe-area insets together with `viewport-fit=cover`. Use dynamic viewport height for overlays and content-based sizing for normal sections. Test long labels, menu groups, landscape, keyboard appearance, dialog close, rotation, font loading and reduced motion. Keep medical data out of the marketing form.

Run the production build and tests. Inspect all routes at 390px and 1440px, and key interactions at 320/375/430/768px and phone landscape. Use Chromium and WebKit; distinguish emulation from testing on a real iPhone. Test the contact form only with an intercepted/mock transport. Do not send real submissions or place calls during QA.

Measure mobile Lighthouse loading and stability. Targets: LCP <=2.5s, CLS <=0.1 and real-user INP <=200ms. Report actual measurements and their conditions. Do not call a local score proof that every iPhone is fast, or treat Lighthouse TBT as field INP. Report real-device testing separately.

Deliver the refined site, updated screenshots, checks/results, and a short list of any remaining issues. Keep production deployment separate unless I authorize it.
