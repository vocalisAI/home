import React, { useEffect, useRef, useState } from "react";
import { Close } from "./Icons";

// Read aloud to screen reader users in place of watching. The video has no sound.
const DESCRIPTION =
  "A silent walkthrough of one call. A title card reads Meet Vocalis. A call comes in to Riverside Cardiology: the caller says it is their third call about an insurance approval for a Holter monitor. Vocalis asks for a name and date of birth, then offers a link for insurance details and a consult. A side panel shows what the caller wants, what is in the way and a suggested action. A weekly calendar fills in with appointments. A chart of calls on hold points to a late-morning bottleneck on insurance, four fixes switch on, and the bottleneck clears.";

/**
 * "See it live": the video fills the whole screen the moment it opens and starts playing.
 * It asks the browser for real full screen where that is allowed. Close, Escape and leaving
 * full screen all return to the page. The <video> mounts only when opened, so nothing downloads on page load.
 */
export default function VideoDialog({ open, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    setFailed(false);
    const node = dialogRef.current;
    const previous = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Best effort: true full screen hides the browser's own chrome. Some browsers (iPhone Safari) refuse; the overlay still covers the viewport.
    let enteredFullscreen = false;
    try {
      const req = node && node.requestFullscreen && node.requestFullscreen({ navigationUI: "hide" });
      if (req && req.then) req.then(() => { enteredFullscreen = true; }).catch(() => {});
    } catch (e) { /* the overlay is enough */ }
    const onFullscreenChange = () => { if (enteredFullscreen && !document.fullscreenElement) onClose(); };
    document.addEventListener("fullscreenchange", onFullscreenChange);

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && node) {
        const f = node.querySelectorAll('button, [href], video[controls]');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.body.style.overflow = prevOverflow;
      if (document.fullscreenElement === node && document.exitFullscreen) document.exitFullscreen().catch(() => {});
      if (previous && previous.focus) previous.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="theater" role="dialog" aria-modal="true" aria-label="See it live" aria-describedby="theater-description" ref={dialogRef}>
      {failed ? (
        <div className="theater__fail" role="alert">
          <p>The video could not be loaded.</p>
          <a className="btn btn--primary" href="/media/vocalis-overview.mp4">Open the video file</a>
        </div>
      ) : (
        <video
          className="theater__video"
          autoPlay
          muted
          controls
          playsInline
          preload="auto"
          poster="/media/vocalis-overview-poster.jpg"
          onError={() => setFailed(true)}
        >
          <source src="/media/vocalis-overview.mp4" type="video/mp4" />
        </video>
      )}
      <button ref={closeRef} type="button" className="btn btn--glass theater__close" onClick={onClose}>
        <Close width={16} height={16} /> Close
      </button>
      <p id="theater-description" className="sr-only">{DESCRIPTION}</p>
    </div>
  );
}
