import React, { useEffect, useRef, useState } from "react";
import { Close } from "./Icons";
import VideoTranscript from "./VideoTranscript";

const VIDEO = "/media/vocalis-overview.mp4";

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
        <VideoTranscript />
      </div>
    </dialog>
  );
}
