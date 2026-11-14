import React, { useRef, useState } from "react";
import { CONTACT_EMAIL } from "../../data/site";
import { contactEmailHref, EMAIL_RE } from "../../lib/contactEmail";
import { Mail } from "../ui/Icons";

const EMPTY = { fullName: "", clinicName: "", email: "", message: "" };

function validate(v) {
  const e = {};
  if (!v.fullName.trim()) e.fullName = "Please enter your name.";
  if (!v.clinicName.trim()) e.clinicName = "Please enter your clinic’s name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email address doesn’t look right.";
  return e;
}

export default function DemoRequestForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | compose
  const mailLink = useRef();
  const refs = { fullName: useRef(), clinicName: useRef(), email: useRef() };
  const draftHref = contactEmailHref("Vocalis demo request", [
    `Name: ${values.fullName.trim()}`,
    `Clinic: ${values.clinicName.trim()}`,
    `Reply email: ${values.email.trim()}`,
    "",
    values.message.trim(),
  ]);

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ fullName: true, clinicName: true, email: true });
    const firstBad = ["fullName", "clinicName", "email"].find((k) => errs[k]);
    if (firstBad) {
      refs[firstBad].current?.focus();
      return;
    }
    setStatus("compose");
    mailLink.current.click();
  };

  const field = (k, label, props = {}) => (
    <div className="field">
      <label htmlFor={`demo-${k}`}>{label}</label>
      <input
        id={`demo-${k}`}
        name={k}
        ref={refs[k]}
        value={values[k]}
        onChange={set(k)}
        onBlur={blur(k)}
        aria-invalid={!!(touched[k] && errors[k])}
        aria-describedby={touched[k] && errors[k] ? `demo-${k}-err` : undefined}
        {...props}
      />
      {touched[k] && errors[k] && <p className="field__err" id={`demo-${k}-err`}>{errors[k]}</p>}
    </div>
  );

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div>
          <h2 id="contact-title" className="h-display">Book a Demo.</h2>
          <p className="contact__lead">
            Tell us about your clinic, then send the prepared email to request a demo.
          </p>
          <p className="contact__alt">
            <Mail width={18} height={18} /> Prefer email?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>

        <form className="card contact__form" onSubmit={submit} noValidate aria-label="Request a demo">
              {field("fullName", "Your name", { type: "text", autoComplete: "name" })}
              {field("clinicName", "Clinic", { type: "text", autoComplete: "organization" })}
              {field("email", "Work email", { type: "email", autoComplete: "email", inputMode: "email" })}
              <div className="field">
                <label htmlFor="demo-message">Anything we should know? <span className="muted">(optional)</span></label>
                <textarea id="demo-message" name="message" rows={3} value={values.message} onChange={set("message")} />
              </div>
              <p className="field__hint">Please keep patient information out of this form.</p>
              <button type="submit" className="btn btn--primary">
                Open email to request a demo
              </button>
              <a ref={mailLink} href={draftHref} className="sr-only" tabIndex={-1} aria-hidden="true">Open prepared email</a>
              {status === "compose" && (
                <p className="field__hint" role="status">
                  Your email app should open with this message. Press Send there to finish. If it did not open, <a href={draftHref}>open the prepared email</a> or write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              )}
        </form>
      </div>
    </section>
  );
}
