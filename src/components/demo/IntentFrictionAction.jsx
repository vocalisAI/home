import React, { useState } from "react";
import { UNDERSTAND_CARDS } from "../../data/scenarios";

/** Understand view: select a phrase (or a column) and the connected pieces light up together. */
export default function IntentFrictionAction() {
  const [active, setActive] = useState("intent");
  const linked = (key) => active === key || (active === "next" && key !== "next");

  return (
    <div className="understand">
      <figure className="quote">
        <figcaption className="quote__label">Maria, calling Riverside Cardiology</figcaption>
        <blockquote>
          “It’s my{" "}
          <button type="button" className={`mark mark--friction${linked("friction") ? " is-on" : ""}`} aria-pressed={active === "friction"} onClick={() => setActive("friction")}>
            third call
          </button>{" "}
          about my Holter monitor —{" "}
          <button type="button" className={`mark mark--intent${linked("intent") ? " is-on" : ""}`} aria-pressed={active === "intent"} onClick={() => setActive("intent")}>
            insurance still hasn’t approved it.
          </button>
          ”
        </blockquote>
      </figure>

      <div className="understand__cols">
        {Object.entries(UNDERSTAND_CARDS).map(([key, c]) => (
          <button
            key={key}
            type="button"
            className={`ucol ucol--${key}${linked(key) ? " is-on" : ""}`}
            aria-pressed={active === key}
            onClick={() => setActive(key)}
          >
            <span className="ucol__label">{c.label}</span>
            <span className="ucol__value">{c.value}</span>
            <span className="ucol__detail">{c.detail}</span>
          </button>
        ))}
      </div>
      <p className="understand__status" role="status">
        {active === "next"
          ? "The next step comes from both the request and the repeat call."
          : `Selected: ${UNDERSTAND_CARDS[active].label}, ${UNDERSTAND_CARDS[active].value.toLowerCase()}.`}
      </p>
    </div>
  );
}
