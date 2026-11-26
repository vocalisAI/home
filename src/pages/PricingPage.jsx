import React from "react";
import PricingTable from "../components/pricing/PricingTable";
import LoiRequest from "../components/pricing/LoiRequest";
import Disclosure from "../components/ui/Disclosure";
import CtaBand from "../components/ui/CtaBand";
import { OVERAGE_PER_MIN, PLANS } from "../data/pricing";

const FAQ = [
  ["Will Vocalis replace my staff?", "No. Vocalis handles front-desk calls and hands requests to your team. Your staff review appointment requests and take calls that need a person."],
  ["What counts as a minute?", "Included minutes are call minutes handled by Vocalis in the month. Overage minutes are billed at $" + OVERAGE_PER_MIN.toFixed(2) + " each."],
  ["How does a caller reach a person?", "Vocalis passes the caller to your team with a short summary, so the caller doesn’t have to start over. Your clinic chooses which calls go to staff."],
  ["Can Vocalis connect to our scheduling system?", "During setup, we check which connections your calendar supports. Your staff confirm requests unless your system can confirm them automatically."],
  ["Does Vocalis diagnose patients or approve insurance?", "No. Vocalis focuses on administrative communication. It does not give medical advice and it does not decide insurance coverage."],
  ["How long does setup take?", "It depends on your phone system and scheduling workflow. We can estimate the timeline once we know which systems you use."],
];

export default function PricingPage() {
  return (
    <>
      <section className="container page-hero page-hero--center">
        <span className="eyebrow">Pricing</span>
        <h1>Monthly plans and call minutes</h1>
        <p>Vocalis starts at ${PLANS[0].monthly} per month for {PLANS[0].included.toLocaleString("en-US")} call minutes. Every plan includes the AI receptionist.</p>
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
            <h2 id="faq-title" className="h-section">Pricing and setup questions</h2>
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
