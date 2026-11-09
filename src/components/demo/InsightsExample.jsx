import React, { useRef, useState } from "react";
import { INSIGHT_REASONS, SLOT_LABELS } from "../../data/scenarios";

const peakIndex = (values) => values.indexOf(Math.max(...values));
const labelFor = (i) => `${SLOT_LABELS[i]} ${i < 8 ? "AM" : "PM"}`;
const total = (r) => r.values.reduce((a, b) => a + b, 0);

/** Improve view: a focused rebuild of the clinic dashboard. Pick a reason, then a time window. */
export default function InsightsExample() {
  const [reasonId, setReasonId] = useState(INSIGHT_REASONS[0].id);
  const reason = INSIGHT_REASONS.find((r) => r.id === reasonId);
  const [sel, setSel] = useState(peakIndex(reason.values));
  const refs = useRef([]);
  const max = Math.max(...reason.values);
  const peak = peakIndex(reason.values);
  const biggest = Math.max(...INSIGHT_REASONS.map(total));

  const choose = (id) => {
    const r = INSIGHT_REASONS.find((x) => x.id === id);
    setReasonId(id);
    setSel(peakIndex(r.values));
  };

  const onKey = (e) => {
    let n = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = Math.min(sel + 1, reason.values.length - 1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = Math.max(sel - 1, 0);
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = reason.values.length - 1;
    if (n === null) return;
    e.preventDefault();
    setSel(n);
    refs.current[n]?.focus();
  };

  return (
    <div className="insights">
      <div className="insights__reasons" role="group" aria-label="Call reason">
        <p className="insights__head">Why Patients Called</p>
        {INSIGHT_REASONS.map((r) => (
          <button key={r.id} type="button" className={`reason${r.id === reasonId ? " is-on" : ""}`} aria-pressed={r.id === reasonId} onClick={() => choose(r.id)}>
            <span className="reason__name">{r.label}</span>
            <span className="reason__bar"><i style={{ width: `${(total(r) / biggest) * 100}%` }} /></span>
            <span className="reason__n">{total(r)}</span>
          </button>
        ))}
      </div>

      <div className="insights__main">
        <p className="insights__head">When Those Calls Arrive</p>
        <div className="chart">
          <div className="chart__bars" role="radiogroup" aria-label={`Calls by half hour, ${reason.label}`} onKeyDown={onKey}>
            {reason.values.map((v, i) => (
              <button
                key={i}
                ref={(el) => (refs.current[i] = el)}
                type="button"
                role="radio"
                aria-checked={sel === i}
                tabIndex={sel === i ? 0 : -1}
                aria-label={`${labelFor(i)}: ${v} ${v === 1 ? "call" : "calls"}`}
                className={`bar${sel === i ? " is-sel" : ""}${i === peak ? " is-peak" : ""}`}
                onClick={() => setSel(i)}
              >
                <span className="bar__fill" style={{ height: `${Math.max(4, (v / max) * 100)}%` }} />
              </button>
            ))}
          </div>
          <div className="chart__axis" aria-hidden="true">
            <span>8 AM</span><span>10 AM</span><span>12 PM</span><span>2 PM</span><span>4 PM</span>
          </div>
        </div>
        <div className="insights__foot">
          <div className="readout" role="status">
            <span className="readout__label">{sel === peak ? "Busiest Window" : "Selected Window"}</span>
            <strong>{labelFor(sel)}</strong>
            <span>{reason.values[sel]} {reason.values[sel] === 1 ? "call" : "calls"} · {reason.label.toLowerCase()}</span>
          </div>
          <div className="reco">
            <span className="reco__label">What to Try First</span>
            <p>{reason.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
