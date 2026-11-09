import React from "react";
import { Link } from "react-router-dom";
import { SECURITY_CLAIMS } from "../data/claims";
import { DATA_PATH } from "../data/features";
import { CONTACT_EMAIL } from "../data/site";
import { usePageMeta } from "../lib/hooks";
import SeeItLive from "../components/ui/SeeItLive";

export default function SecurityPage() {
  usePageMeta("Vocalis is HIPAA compliant, SOC 2 Type 1 and Type 2 audited, and GDPR compliant. Patient information is encrypted in transit and at rest.");
  return (
    <>
      <section className="container page-hero">
        <p className="eyebrow">Security</p>
        <h1 className="h-hero">Security for Patient Conversations.</h1>
        <p className="page-hero__lead">Vocalis is HIPAA compliant, SOC 2 Type 1 and Type 2 audited, and GDPR compliant. Patient information is encrypted in transit and at rest.</p>
      </section>

      <section className="section section--tight-top" aria-labelledby="path-title">
        <div className="container">
          <h2 id="path-title" className="h-display path__title">Where Patient Information Goes.</h2>
          <ol className="path">
            {DATA_PATH.map((s, i) => (
              <li className="path__step" key={s.label}>
                <span className="path__dot" aria-hidden="true">{i + 1}</span>
                <strong>{s.label}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section specs" aria-labelledby="protect-title">
        <div className="container specs__grid">
          <h2 id="protect-title" className="h-display">How It’s Protected.</h2>
          <dl className="specs__list specs__list--prose">
            {SECURITY_CLAIMS.map(({ title, text }) => (
              <div key={title}><dt>{title}</dt><dd>{text}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section security-ask on-dark" aria-labelledby="ask-title">
        <div className="container security-ask__grid">
          <h2 id="ask-title" className="h-display">Questions from Your IT or Compliance Lead?</h2>
          <div>
            <p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or <Link to="/#contact">book a demo</Link> and bring them along. Please keep patient information out of the contact form.</p>
            <p className="security-ask__live"><SeeItLive /></p>
          </div>
        </div>
      </section>
    </>
  );
}
