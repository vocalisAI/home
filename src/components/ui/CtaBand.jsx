import React from "react";
import { Link } from "react-router-dom";
import { DEMO_HREF } from "../../data/site";
import SeeItLive from "./SeeItLive";

export default function CtaBand({ title = "Book a Demo for Your Clinic." }) {
  return (
    <section className="section cta-band">
      <div className="container">
        <div className="cta-band__box">
          <h2 className="h-display">{title}</h2>
          <div className="cta-band__actions">
            <Link to={DEMO_HREF} className="btn btn--mint">Book a demo</Link>
            <SeeItLive />
          </div>
        </div>
      </div>
    </section>
  );
}
