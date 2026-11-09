> **Updated owner instruction — November 8, 2026:** The founder has confirmed that the existing product, performance and security claims were already validated and should be restored. Earlier directions in this historical document to remove or revalidate those company claims are superseded. Keep the setup-time promise (“less than a week”) removed. Leave pricing alone. Read `CLAUDE_REFINEMENT_PROMPT.md` and `DESIGN_REVIEW.md` for the current direction. Demonstration patient records remain sample data.

# Claude implementation handoff

Use this prompt when you are ready to start coding. Keep the entire `docs/vocalis-redesign/` folder available so the plan, audit, and reference images travel together.

---

Redesign my Vocalis website using the attached plan. The visual reference is https://www.namuai-lab.com/. I want its spacious layout, refined navigation, subtle motion and useful interactive demonstrations adapted to Vocalis's own business, colors and materials.

Read these files first:

1. `/Users/somesh/Desktop/websites/home/docs/vocalis-redesign/REDESIGN_PLAN.md`
2. `/Users/somesh/Desktop/websites/home/docs/vocalis-redesign/SOURCE_AUDIT.md`
3. The screenshots/contact sheets in `/Users/somesh/Desktop/websites/home/docs/vocalis-redesign/references/`.

My local website checkout is `/Users/somesh/Desktop/websites/home`, but the live site at https://www.vocalis.cc/ is newer than that checkout. Reconcile the production source before replacing anything. Preserve local changes and untracked media. If you cannot recover current production source immediately, proceed with a local redesign branch and explicitly track what needs to be reconciled before release.

Build around Vocalis as patient access for independent clinics: calls, understanding, follow-up workflows and clinic insights. Use the recent mint/teal and navy pitch palette as the design default and retain the established logo. Keep the **Vocalis definition, pronunciation and anatomical image** as a distinctive homepage section.

Create the complete homepage and supporting Product, Workflows, Pricing, Security and About pages. The main homepage showcase has four genuinely useful interactive views: **Answer, Understand, Act, Improve**. Use controlled examples with clearly illustrative data, responsive layouts, accessible controls and tasteful motion. Preserve the functioning demo-request flow and current pricing structure.

Use the 36-second video at `/Users/somesh/Desktop/vocalis-pitch-video/out/vocalis-keynote-demo-v2.mp4`. Use the source project and dashboard assets listed in the audit for product visuals. The video is silent and illustrative. Do not preload the entire older orb-frame sequence or put a media loader in front of the website. Make the headline and CTA usable immediately.

Read the newer company materials under `/Users/somesh/Desktop/hipaa-voice-receptionist/pitch-slides/` and `/Users/somesh/Desktop/prog/PRODUCT/`. The audit identifies conflicts between old and new content. Do not invent metrics, live integrations, testimonials, certification badges, or API functionality. Keep unresolved details in an internal checklist and use accurate, general copy in the public draft. A real live-call demo is a later integration unless its backend is available and verified; the scripted interactive showcase should work now.

Follow the implementation sequence and acceptance criteria in the plan. First establish the shared design system, hero, product panel and definition at desktop/mobile sizes; then complete all pages and interactions. Use the current app stack unless the recovered production source gives a concrete reason to change it. Run appropriate builds and targeted checks, review screenshots at 390px/768px/1440px, verify keyboard and reduced-motion behavior, and provide a local preview with a concise report of any remaining publication dependencies.

This handoff requests implementation and review. Keep production deployment as a separate release step unless I explicitly authorize it in the coding session.
