import React from "react";
import { Link } from "react-router-dom";
import { PLANS, OVERAGE_PER_MIN } from "../../data/pricing";
import { DEMO_HREF } from "../../data/site";
import { Check } from "../ui/Icons";

const money = (n) => `$${n.toLocaleString("en-US")}`;

export default function PricingTable() {
  return (
    <div>
      <div className="plans">
        {PLANS.map((p) => {
          const price = p.monthly;
          return (
            <article key={p.id} className={`card plan${p.popular ? " plan--popular" : ""}`} aria-labelledby={`plan-${p.id}`}>
              {p.popular && <span className="pill plan__flag">Most popular</span>}
              <h2 id={`plan-${p.id}`} className="h-card">{p.name}</h2>
              <p className="muted">{p.target}</p>
              <p className="plan__price">
                <strong>{money(price)}</strong>
                <span className="muted"> / month</span>
              </p>
              <p className="plan__minutes">
                {p.included.toLocaleString("en-US")} minutes included · ${OVERAGE_PER_MIN.toFixed(2)}/min overage
              </p>
              <ul className="plan__list">
                {p.features.map((f) => (
                  <li key={f}><Check width={16} height={16} /> <span>{f}</span></li>
                ))}
              </ul>
              <Link to={DEMO_HREF} className={`btn ${p.popular ? "btn--primary" : "btn--ghost"}`}>Book a demo</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
