import React, { useRef, useState } from "react";
import { CONTACT_EMAIL } from "../../data/site";
import { formspreeTransport, EMAIL_RE } from "../../lib/formTransport";
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

export default function DemoRequestForm({ transport = formspreeTransport }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const inFlight = useRef(false);
  const refs = { fullName: useRef(), clinicName: useRef(), email: useRef() };

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return; // no duplicate submissions
    const errs = validate(values);
    setErrors(errs);
    setTouched({ fullName: true, clinicName: true, email: true });
    const firstBad = ["fullName", "clinicName", "email"].find((k) => errs[k]);
    if (firstBad) {
      refs[firstBad].current?.focus();
      return;
    }
    inFlight.current = true;
    setStatus("submitting");
    try {
      await transport({
        _subject: "New Demo Request from Vocalis Website",
        fullName: values.fullName.trim(),
        clinicName: values.clinicName.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setValues(EMPTY);
      setTouched({});
      setStatus("success");
    } catch {
      setStatus("error"); // values are kept so nothing needs retyping
    } finally {
      inFlight.current = false;
    }
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
            Tell us about your clinic and we’ll get in touch to set up a time to see Vocalis answer a call.
          </p>
          <p className="contact__alt">
            <Mail width={18} height={18} /> Prefer email?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>

        <form className="card contact__form" onSubmit={submit} noValidate aria-label="Request a demo">
          {status === "success" ? (
            <div className="contact__success" role="status">
              <h3 className="h-card">Thank you. Your request is in.</h3>
              <p className="muted">We’ll be in touch soon to set up your demo.</p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus("idle")}>Send another request</button>
            </div>
          ) : (
            <>
              {field("fullName", "Your name", { type: "text", autoComplete: "name" })}
              {field("clinicName", "Clinic", { type: "text", autoComplete: "organization" })}
              {field("email", "Work email", { type: "email", autoComplete: "email", inputMode: "email" })}
              <div className="field">
                <label htmlFor="demo-message">Anything we should know? <span className="muted">(optional)</span></label>
                <textarea id="demo-message" name="message" rows={3} value={values.message} onChange={set("message")} />
              </div>
              <p className="field__hint">Please keep patient information out of this form.</p>
              <button type="submit" className="btn btn--primary" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Request a demo"}
              </button>
              {status === "error" && (
                <p className="field__err contact__error" role="alert">
                  That didn’t go through, but your details are still here. Try again, or email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
