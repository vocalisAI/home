import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="container page-hero" style={{ minHeight: "50vh" }}>
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p style={{ marginTop: 24 }}><Link className="btn btn--primary" to="/">Back to home</Link></p>
    </section>
  );
}
