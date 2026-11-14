import React, { useRef, useState } from "react";
import { contactEmailHref, EMAIL_RE } from "../../lib/contactEmail";

export default function LoiRequest() {
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");
  const mailLink = useRef();
  const draftHref = contactEmailHref("Vocalis Letter of Intent request", [
    `Clinic: ${clinic.trim()}`,
    `Reply email: ${email.trim()}`,
    "",
    "Please follow up with me about a Letter of Intent.",
  ]);

  const submit = (e) => {
    e.preventDefault();
    if (!clinic.trim()) {
      setErr("Please enter your clinic’s name.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErr("Please enter a valid work email.");
      return;
    }
    setErr("");
    setStatus("compose");
    mailLink.current.click();
  };

  return (
    <form className="card loi" onSubmit={submit} noValidate aria-label="Request a letter of intent">
      <div>
        <h3 className="h-card">Need a Letter of Intent?</h3>
        <p className="muted">Tell us your clinic and email, then send the prepared request. We’ll follow up about the letter.</p>
      </div>
      <div className="loi__row">
        <label className="sr-only" htmlFor="loi-clinic">Clinic name</label>
        <input id="loi-clinic" type="text" autoComplete="organization" placeholder="Clinic name" value={clinic} onChange={(e) => setClinic(e.target.value)} aria-invalid={!!err && !clinic.trim()} aria-describedby={err && !clinic.trim() ? "loi-err" : undefined} />
        <label className="sr-only" htmlFor="loi-email">Work email</label>
        <input id="loi-email" type="email" autoComplete="email" placeholder="you@yourclinic.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!err && !!clinic.trim()} aria-describedby={err && clinic.trim() ? "loi-err" : undefined} />
        <button type="submit" className="btn btn--ghost">Open email request</button>
      </div>
      <a ref={mailLink} href={draftHref} className="sr-only" tabIndex={-1} aria-hidden="true">Open prepared email</a>
      {err && <p className="field__err" id="loi-err">{err}</p>}
      {status === "compose" && <p role="status" className="loi__ok">Your email app should open. Press Send there to finish. If it did not open, <a href={draftHref}>open the prepared email</a>.</p>}
    </form>
  );
}
