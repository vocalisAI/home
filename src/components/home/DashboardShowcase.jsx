import React from "react";

const NOTES = [
  ["Every Call, by Reason", "See what patients call about, from appointments to medication requests, and how many calls each reason brings."],
  ["Resolved or Handed to Staff", "A running count of the calls Vocalis resolved and the calls it passed to your team, with the reason for each handoff."],
  ["When Calls Arrive", "Peak call hours, missed calls and after-hours calls in one place."],
];

/** The clinic dashboard from the pitch slides, shown at a readable size. On narrow screens it pans sideways. */
export default function DashboardShowcase() {
  return (
    <section className="section dashboard" aria-labelledby="dash-title">
      <div className="container">
        <div className="dashboard__head">
          <h2 id="dash-title" className="h-display">The Dashboard Behind Every Call.</h2>
          <p>Call volume, call reasons, bookings and handoffs for each location, updated as calls come in.</p>
        </div>
        <figure className="dashboard__frame">
          <div className="dashboard__scroll" tabIndex={0} role="group" aria-label="Clinic dashboard screenshot. Scroll sideways on small screens.">
            <img
              src="/brand/vocalis-dashboard.webp"
              width="2000"
              height="916"
              loading="lazy"
              decoding="async"
              alt="The Vocalis clinic dashboard. Cards show total calls, resolution rate, appointments booked and average handle time. Below are a chart of call volume over 30 days, calls by reason, the resolution rate trend, calls resolved by Vocalis versus escalated to staff, and operational insights such as peak call hours, missed calls and after-hours calls."
            />
          </div>
        </figure>
        <p className="dashboard__hint">Scroll sideways to see the whole dashboard.</p>
        <ul className="dashboard__notes">
          {NOTES.map(([t, d]) => (
            <li key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
