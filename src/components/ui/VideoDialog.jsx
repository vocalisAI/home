import React, { useEffect, useRef, useState } from "react";
import { Close } from "./Icons";

const VIDEO = "/media/vocalis-overview.mp4";

function WalkthroughText() {
  return (
    <details className="theater__transcript">
      <summary>Read the video transcript and description</summary>
      <p>The silent video opens with “Meet Vocalis.” An incoming call to Riverside Cardiology opens a transcript:</p>
      <ol>
        <li><strong>Vocalis:</strong> “Riverside Cardiology, this is Vocalis. How can I help?”</li>
        <li><strong>Caller:</strong> “It’s my third call about my Holter monitor. Insurance still hasn’t approved it.”</li>
        <li><strong>Vocalis:</strong> “I can fix that. Your name and date of birth?”</li>
        <li><strong>Caller:</strong> The sample caller provides her name and birth date. The interface masks both and shows lock icons.</li>
        <li><strong>Vocalis:</strong> “Got it. I’ll text you a secure insurance link and book your EP consult for Tuesday.”</li>
      </ol>
      <p>A side panel identifies the caller’s intent (a Holter monitor and electrophysiology consult), the obstacle (insurance authorization on a third call), and the action (text an insurance link and book the consult for Tuesday at 10:30 a.m.). The selected action appears on the clinic’s weekly calendar, followed by other appointments.</p>
      <p>A heatmap highlights a sample 41% call drop-off rate for insurance holds at 11 a.m. Tuesday. Four switches turn on: instant call pickup, insurance details by text, automatic waitlist backfill, and reminder texts. The highlighted bottleneck clears in the example. The closing card reads “Meet the future of your clinic. Join today.”</p>
    </details>
  );
}

export default function VideoDialog({ onClose, opener }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeRef.current.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, [opener]);

  return (
    <dialog
      className="theater"
      aria-labelledby="theater-title"
      aria-describedby="theater-description"
      ref={dialogRef}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
    >
      <div className="theater__inner">
        <div className="theater__header">
          <h2 id="theater-title">See it live</h2>
          <button ref={closeRef} type="button" className="btn btn--ghost" onClick={onClose}>
            <Close width={16} height={16} /> Close
          </button>
        </div>
        <p id="theater-description">A silent demo of one call, from the first hello to the clinic dashboard.</p>
        {failed ? (
          <p role="alert">The video could not be loaded. <a href={VIDEO}>Open the video file</a> or read the transcript below.</p>
        ) : (
          <video
            className="theater__video"
            aria-label="Vocalis product walkthrough"
            controls
            playsInline
            preload="metadata"
            poster="/media/vocalis-overview-poster.jpg"
            src={VIDEO}
            onError={() => setFailed(true)}
          />
        )}
        <WalkthroughText />
      </div>
    </dialog>
  );
}
