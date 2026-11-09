import React, { useEffect, useRef, useState } from "react";
import { CALL_LINES, CLINIC } from "../../data/scenarios";
import { Play, Pause, Replay } from "../ui/Icons";
import { useReducedMotion, useMediaQuery } from "../../lib/hooks";

const STEP_MS = 1700;
const lineText = (l) => l.note || l.text || l.parts.map((p) => p.t).join("");

function Transcript({ shown, visible }) {
  return (
    <ol className="transcript" aria-label={`Call to ${CLINIC}`}>
      {CALL_LINES.map((l, i) => (
        <li
          key={l.id}
          className={`bubble bubble--${l.who}${l.note ? " bubble--note" : ""}${!visible(i) ? " bubble--pending" : ""}${shown !== null && i === shown - 1 ? " bubble--now" : ""}`}
          aria-hidden={!visible(i)}
        >
          {!l.note && <span className="sr-only">{l.who === "vocalis" ? "Vocalis: " : "Caller: "}</span>}
          <span className="bubble__text">{lineText(l)}</span>
        </li>
      ))}
    </ol>
  );
}

/** Answer view: a large voice orb with live caption. The full transcript stays one tap away. */
export default function CallWalkthrough() {
  const reduced = useReducedMotion();
  const compact = useMediaQuery("(max-width: 719px)");
  // null = nothing is being played, whole transcript visible. Number = lines revealed so far.
  const [shown, setShown] = useState(null);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!playing || reduced) return undefined;
    timer.current = setTimeout(() => {
      const next = (shown ?? 0) + 1;
      if (next >= CALL_LINES.length) { setShown(null); setPlaying(false); }
      else setShown(next);
    }, STEP_MS);
    return () => clearTimeout(timer.current);
  }, [playing, shown, reduced]);

  // Changing Reduce Motion mid-playback stops it and reveals every line.
  useEffect(() => {
    if (reduced) { setPlaying(false); setShown(null); }
  }, [reduced]);

  useEffect(() => {
    const pause = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", pause);
    return () => document.removeEventListener("visibilitychange", pause);
  }, []);

  const start = () => { setShown(1); setPlaying(true); };
  const toggle = () => (playing ? setPlaying(false) : shown === null ? start() : setPlaying(true));
  const replay = () => { clearTimeout(timer.current); setShown(1); setPlaying(true); };

  const visible = (i) => shown === null || i < shown;
  const index = shown === null ? 1 : shown - 1; // At rest the caption shows the caller's first line.
  const current = CALL_LINES[Math.min(index, CALL_LINES.length - 1)];
  const speaking = playing && current.who === "vocalis";
  const opening = CALL_LINES[0];

  return (
    <div className="walk">
      <div className="walk__stage">
        <p className="walk__label">{CLINIC}</p>
        <div className={`orb${speaking ? " orb--speaking" : ""}${playing ? " orb--live" : ""}`} aria-hidden="true">
          <span className="orb__glow" />
          <span className="orb__ring" />
          <span className="orb__ring orb__ring--2" />
          <span className="orb__core" />
        </div>
        <div className="walk__caption" aria-live="off">
          {shown === null && <p className="walk__prev">{lineText(opening)}</p>}
          <p className={`walk__line walk__line--${current.who}`} key={current.id}>
            <span className="walk__who">{current.who === "vocalis" ? "Vocalis" : "Caller"}</span>
            {lineText(current)}
          </p>
        </div>
        <div className="walk__controls">
          {!reduced && (
            <>
              <button type="button" className="btn btn--primary" onClick={toggle}>
                {playing ? <Pause width={16} height={16} /> : <Play width={16} height={16} />}
                {playing ? "Pause" : shown === null ? "Play walkthrough" : "Resume"}
              </button>
              {(playing || shown !== null) && (
                <button type="button" className="btn btn--ghost" onClick={replay}>
                  <Replay width={16} height={16} /> Replay
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {compact ? (
        <details className="walk__more" open={reduced || undefined}>
          <summary>Read the full call</summary>
          <Transcript shown={shown} visible={visible} />
        </details>
      ) : (
        <div className="walk__more">
          <h4 className="walk__more-title">Full Call</h4>
          <Transcript shown={shown} visible={visible} />
        </div>
      )}
    </div>
  );
}
