import React, { useState } from "react";
import { ACT_SCENARIOS, WEEK_DAYS, WEEK_ROWS, WEEK_BUSY } from "../../data/scenarios";
import { Arrow, Replay } from "../ui/Icons";

/** Act view: pick a situation, then watch the request become a booking or a callback. */
export default function SchedulingExample() {
  const [id, setId] = useState(ACT_SCENARIOS[0].id);
  const [done, setDone] = useState(false);
  const s = ACT_SCENARIOS.find((x) => x.id === id);

  const pick = (nextId) => {
    setId(nextId);
    setDone(false);
  };

  return (
    <div className="act">
      <div className="choices" role="group" aria-label="Situation">
        {ACT_SCENARIOS.map((x) => (
          <button key={x.id} type="button" className={`chip${x.id === id ? " is-on" : ""}`} aria-pressed={x.id === id} onClick={() => pick(x.id)}>
            {x.label}
          </button>
        ))}
      </div>

      <div className="act__stage">
        <div className="act__left">
          <div className={`req${done ? " is-sent" : ""}`}>
            <span className="req__label">From the call</span>
            <strong className="req__title">{s.request.title}</strong>
            <span className="muted">{s.request.meta}</span>
          </div>
          <div className={`result${done ? " is-on" : ""}`} aria-live="polite">
            {done ? (
              <>
                <span className="result__label">Vocalis</span>
                <strong>{s.task}</strong>
                <span className="result__row"><span className="pill pill--ok">{s.status}</span><span className="muted">{s.slot.label}</span></span>
              </>
            ) : (
              <span className="muted">Press “Show next step” to see what Vocalis does with this call.</span>
            )}
          </div>
          <div className="act__buttons">
            {!done ? (
              <button type="button" className="btn btn--primary" onClick={() => setDone(true)}>
                Show next step <Arrow width={16} height={16} />
              </button>
            ) : (
              <button type="button" className="btn btn--ghost" onClick={() => setDone(false)}>
                <Replay width={16} height={16} /> Reset example
              </button>
            )}
          </div>
        </div>

        <div className="week" role="img" aria-label={`Week schedule. ${done ? s.slot.label + " is marked as booked." : "Nothing has been booked yet."}`}>
          <div className="week__grid">
            <span />
            {WEEK_DAYS.map((d) => (
              <span className="week__day" key={d}>{d}</span>
            ))}
            {WEEK_ROWS.map((r, ri) => (
              <React.Fragment key={r}>
                <span className="week__time">{r}</span>
                {WEEK_DAYS.map((d, di) => {
                  const isTarget = done && s.slot.day === di && s.slot.row === ri;
                  return (
                    <span
                      key={`${ri}-${di}`}
                      className={`week__cell${WEEK_BUSY[ri][di] ? " is-busy" : ""}${isTarget ? " is-target" : ""}`}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="week__legend">
            <span><i className="dot dot--busy" /> Already scheduled</span>
            <span><i className="dot dot--target" /> Booked or queued by Vocalis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
