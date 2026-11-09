import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/hooks";

export default function NotFoundPage() {
  usePageMeta("");
  return (
    <section className="container page-hero" style={{ minHeight: "50vh" }}>
      <span className="eyebrow">404</span>
      <h1>We Couldn’t Find That Page.</h1>
      <p>It may have moved. Head back to the homepage, or book a demo.</p>
      <p style={{ marginTop: 24 }}><Link className="btn btn--primary" to="/">Back to home</Link></p>
    </section>
  );
}
