import React from "react";
import { Link } from "react-router-dom";
import { Arrow } from "../ui/Icons";

export default function TrustSection() {
  return (
    <section className="section trust" aria-labelledby="trust-title">
      <div className="container trust__grid">
        <h2 id="trust-title" className="h-display">What We Do with Patient Information.</h2>
        <div className="trust__body">
          <p>
            Vocalis is HIPAA compliant, SOC 2 Type 1 and Type 2 audited, and GDPR compliant. We encrypt patient information in transit and at rest, limit who can see it, and sign a BAA with every customer.
          </p>
          <Link className="link-arrow" to="/security">Read the security details <Arrow width={16} height={16} /></Link>
        </div>
      </div>
    </section>
  );
}
