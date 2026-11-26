import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { contactEmailHref, EMAIL_RE } from "../../lib/contactEmail";
import { CONTACT_EMAIL } from "../../data/site";

export default function LoiRequest() {
  const [clinic, setClinic] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [validated, setValidated] = useState(false);
  const clinicInput = useRef();
  const emailInput = useRef();
  const mailLink = useRef();
  const clinicError = !clinic.trim() && "Please enter your clinic’s name.";
  const emailError = !EMAIL_RE.test(email.trim()) && "Please enter a valid email address.";
  const draftHref = contactEmailHref("Vocalis Letter of Intent request", [
    `Clinic: ${clinic.trim()}`,
    `Reply email: ${email.trim()}`,
    "",
    "Please follow up with me about a Letter of Intent.",
  ]);

  const submit = (e) => {
    e.preventDefault();
    if (clinicError || emailError) {
      flushSync(() => setValidated(true));
      const input = (clinicError ? clinicInput : emailInput).current;
      input.focus({ preventScroll: true });
      input.scrollIntoView({ block: "nearest", behavior: "instant" });
      return;
    }
    setStatus("compose");
    mailLink.current.click();
  };

  return (
    <form className="card loi" onSubmit={submit} noValidate aria-label="Request a letter of intent">
      <div>
        <h3 className="h-card">Need a Letter of Intent?</h3>
        <p className="muted">Enter your clinic name and email address, then send the prepared request. Both fields are required.</p>
      </div>
      <div className="loi__row">
        <div className="field">
          <label htmlFor="loi-clinic">Clinic name</label>
          <input
            id="loi-clinic"
            ref={clinicInput}
            name="clinic"
            type="text"
            autoComplete="organization"
            required
            value={clinic}
            onChange={(e) => { setClinic(e.target.value); setStatus("idle"); }}
            aria-invalid={validated && !!clinicError}
            aria-describedby={validated && clinicError ? "loi-clinic-error" : undefined}
          />
          {validated && clinicError && <p className="field__err" id="loi-clinic-error">{clinicError}</p>}
        </div>
        <div className="field">
          <label htmlFor="loi-email">Email address</label>
          <input
            id="loi-email"
            ref={emailInput}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            aria-invalid={validated && !!emailError}
            aria-describedby={validated && emailError ? "loi-email-error" : undefined}
          />
          {validated && emailError && <p className="field__err" id="loi-email-error">{emailError}</p>}
        </div>
        <button type="submit" className="btn btn--ghost">Open email request</button>
      </div>
      <a ref={mailLink} href={draftHref} className="sr-only" tabIndex={-1} aria-hidden="true">Open prepared email</a>
      <div role="status" className="loi__ok">
        {status === "compose" && <>Your email app should open. Press Send there to finish. If it did not open, <a href={draftHref}>open the prepared email</a> or write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>}
      </div>
    </form>
  );
}
