import React from "react";
import CtaBand from "../components/ui/CtaBand";
import SeeItLive from "../components/ui/SeeItLive";
import { WORKFLOWS } from "../data/features";
import { usePageMeta } from "../lib/hooks";

export default function WorkflowsPage() {
  usePageMeta("A week of calls for one patient: insurance questions, rescheduling, after-hours calls and staff handoff, and what Vocalis does on each.");
  return (
    <>
      <section className="container page-hero">
        <p className="eyebrow">For Clinics</p>
        <h1 className="h-hero">A Week of Calls for One Patient.</h1>
        <p className="page-hero__lead">Maria calls Riverside Cardiology four times in two days. Here is what Vocalis does on each call and where your staff pick up.</p>
        <div className="page-hero__actions"><SeeItLive /></div>
      </section>

      <div className="container stories">
        <nav className="stories__index" aria-label="Maria’s calls">
          <ol>
            {WORKFLOWS.map((w) => (
              <li key={w.id}><a href={`#${w.id}`}><span>{w.when}</span>{w.title}</a></li>
            ))}
          </ol>
        </nav>
        <div className="stories__list">
          {WORKFLOWS.map((w) => (
            <article key={w.id} id={w.id} className="story" aria-labelledby={`${w.id}-h`}>
              <p className="story__when">{w.when}</p>
              <h2 id={`${w.id}-h`} className="story__title">{w.title}</h2>
              <p className="story__situation">{w.situation}</p>
              <blockquote className="story__quote">{w.call}</blockquote>
              <div className="story__cols">
                <div>
                  <h3>What Vocalis Does</h3>
                  <p>{w.does}</p>
                </div>
                <div>
                  <h3>What Your Team Sees</h3>
                  <p>{w.sees}</p>
                </div>
              </div>
              <p className="story__note">{w.note}</p>
            </article>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
