import React from "react";
import { Link } from "react-router-dom";
import { WORKFLOWS } from "../../data/features";
import { Arrow } from "../ui/Icons";

/** Editorial index of the calls a front desk takes. Full stories live on /workflows. */
export default function HomeWorkflows() {
  return (
    <section className="section calls" aria-labelledby="calls-title">
      <div className="container calls__grid">
        <div className="calls__head">
          <h2 id="calls-title" className="h-display">Common front-desk calls</h2>
        </div>
        <ul className="calls__list">
          {WORKFLOWS.map((w) => (
            <li key={w.id}>
              <Link to={`/workflows#${w.id}`} className="calls__row">
                <span className="calls__title">{w.title}</span>
                <span className="calls__blurb">{w.blurb}</span>
                <Arrow className="calls__arrow" width={20} height={20} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
