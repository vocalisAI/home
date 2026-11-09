import React, { useRef, useState } from "react";
import { formspreeTransport, EMAIL_RE } from "../../lib/formTransport";

/** Letter-of-interest request. Moved off the homepage; same destination as before. */
export default function LoiRequest({ transport = formspreeTransport }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");
  const busy = useRef(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy.current) return;
    if (!EMAIL_RE.test(email.trim())) {
      setErr("Please enter a valid work email.");
      return;
    }
    setErr("");
    busy.current = true;
    setStatus("submitting");
    try {
      await transport({ _subject: "Letter of Interest Request", type: "LOI", email: email.trim() });
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  };

  return (
    <form className="card loi" onSubmit={submit} noValidate aria-label="Request a letter of interest">
      <div>
        <h3 className="h-card">Need a Letter of Interest?</h3>
        <p className="muted">Share your work email and we’ll send one over.</p>
      </div>
      <div className="loi__row">
        <label className="sr-only" htmlFor="loi-email">Work email</label>
        <input id="loi-email" type="email" autoComplete="email" placeholder="you@yourclinic.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!err} aria-describedby={err ? "loi-err" : undefined} />
        <button type="submit" className="btn btn--ghost" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send request"}</button>
      </div>
      {err && <p className="field__err" id="loi-err">{err}</p>}
      {status === "success" && <p role="status" className="loi__ok">Request sent. We’ll be in touch.</p>}
      {status === "error" && <p role="alert" className="field__err">Something went wrong. Please try again.</p>}
    </form>
  );
}
