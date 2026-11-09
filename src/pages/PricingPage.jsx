import React from "react";
import PricingTable from "../components/pricing/PricingTable";
import LoiRequest from "../components/pricing/LoiRequest";
import Disclosure from "../components/ui/Disclosure";
import CtaBand from "../components/ui/CtaBand";
import { usePageMeta } from "../lib/hooks";
import { OVERAGE_PER_MIN } from "../data/pricing";

const FAQ = [
  ["Will Vocalis Replace My Staff?", "No. Vocalis handles front-desk calls and hands requests to your team. People still review, confirm and care for patients."],
  ["What Counts as a Minute?", "Included minutes are call minutes handled by Vocalis in the month. Overage minutes are billed at $" + OVERAGE_PER_MIN.toFixed(2) + " each. Ask us during a demo how your clinic’s call volume maps to a plan."],
  ["What Happens When a Caller Needs a Person?", "Vocalis passes the caller to your team with a short summary, so the caller doesn’t have to start over. Which situations trigger a handoff is set up with your clinic."],
  ["Does Vocalis Connect to Our Scheduling System?", "Calendar and scheduling connections are scoped with each clinic during onboarding. Appointment requests are reviewed and confirmed by your staff unless your configured setup confirms them directly."],
  ["Does Vocalis Diagnose Patients or Approve Insurance?", "No. Vocalis focuses on administrative communication. It does not give medical advice and it does not decide insurance coverage."],
  ["How Long Does Setup Take?", "It depends on your phone system and scheduling workflow. We’ll give you a realistic picture during the demo."],
];

export default function PricingPage() {
  usePageMeta("Simple monthly plans for independent clinics: Starter $299, Standard $499, Growth $899, with included call minutes.");
  return (
    <>
      <section className="container page-hero page-hero--center">
        <span className="eyebrow">Pricing</span>
        <h1>Simple Plans That Scale with Your Call Volume.</h1>
        <p>Pick the plan that fits your minutes. Every plan includes the voice receptionist; larger plans add support and setup options.</p>
      </section>
      <section className="section section--tight-top">
        <div className="container">
          <PricingTable />
          <p className="field__hint" style={{ marginTop: 20, textAlign: "center" }}>
            Prices in US dollars. Overage is ${OVERAGE_PER_MIN.toFixed(2)} per minute.
          </p>
        </div>
      </section>
      <section className="section" id="faq" aria-labelledby="faq-title">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section-head">
            <h2 id="faq-title" className="h-section">Questions Clinics Ask.</h2>
          </div>
          {FAQ.map(([q, a]) => (
            <Disclosure key={q} title={q}><p>{a}</p></Disclosure>
          ))}
          <div style={{ marginTop: 48 }}><LoiRequest /></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
