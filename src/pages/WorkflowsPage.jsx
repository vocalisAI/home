import React from "react";
import { Link } from "react-router-dom";
import CtaBand from "../components/ui/CtaBand";
import SeeItLive from "../components/ui/SeeItLive";
import { Arrow } from "../components/ui/Icons";
import { WORKFLOWS } from "../data/features";
import { CLINIC } from "../data/scenarios";

export default function WorkflowsPage() {
  return (
    <>
      <section className="clinic-intro">
        <div className="container clinic-intro__grid">
          <div>
            <p className="eyebrow">For clinics</p>
            <h1 className="h-hero">When patients call the front desk</h1>
            <p className="clinic-intro__lead">Maria calls about an insurance approval on Monday. By Tuesday morning, she needs to speak to the front desk.</p>
            <SeeItLive variant="ghost" />
          </div>
          <nav className="call-log" aria-label="Example call log">
            <div className="call-log__head">
              <span>{CLINIC}</span>
              <span>Example call log</span>
            </div>
            <div className="call-log__signal" aria-hidden="true" />
            <ol>
              {WORKFLOWS.map(({ id, when, title }) => (
                <li key={id}>
                  <Link to={`#${id}`}>
                    <span className="call-log__time">{when}</span>
                    <span>{title}</span>
                    <Arrow width={16} height={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <div className="container clinic-calls">
        {WORKFLOWS.map(({ id, when, title, situation, call, record, outcome, fields, note }) => (
          <article key={id} id={id} className="clinic-call" aria-labelledby={`${id}-h`}>
            <div className="clinic-call__conversation">
              <p className="clinic-call__time">{when}</p>
              <h2 id={`${id}-h`}>{title}</h2>
              <p className="clinic-call__context">{situation}</p>
              <blockquote>{call}</blockquote>
            </div>
            <div className="clinic-record">
              <header className="clinic-record__head">
                <h3>{record}</h3>
                <p>{outcome}</p>
              </header>
              <dl>
                {fields.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
              {note && <p>{note}</p>}
            </div>
          </article>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
