import { FORM_ENDPOINT } from "../data/site";

/** Real transport: posts to Formspree. Tests inject a mock instead. */
export async function formspreeTransport(fields) {
  const data = new FormData();
  Object.entries(fields).forEach(([k, v]) => data.append(k, v));
  const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
