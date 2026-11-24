import React from "react";

export default function VideoTranscript() {
  return (
    <details className="video-transcript">
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
