import React from "react";
import { Link } from "react-router-dom";
import { DEMO_HREF } from "../../data/site";
import SeeItLive from "../ui/SeeItLive";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Pure CSS. Nothing here is fetched, so the text below never waits on it. */}
      <div className="hero__aura" aria-hidden="true">
        <span className="hero__ring" />
        <span className="hero__ring hero__ring--inner" />
      </div>
      <div className="container hero__inner">
        <h1 id="hero-title" className="hero__title">
          AI Receptionist
          <br />{" "}
          for Independent Clinics
        </h1>
        <p className="hero__lead">
          When your front desk is busy, Vocalis answers the phone. It schedules visits and leaves staff a summary of what each caller needs.
        </p>
        <div className="hero__actions">
          <Link to={DEMO_HREF} className="btn btn--primary">Book a demo</Link>
          <SeeItLive />
        </div>
      </div>
    </section>
  );
}
