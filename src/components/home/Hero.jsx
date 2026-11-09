import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DEMO_HREF } from "../../data/site";
import SeeItLive from "../ui/SeeItLive";

export default function Hero() {
  const ref = useRef(null);
  const [offscreen, setOffscreen] = useState(false);
  // The blurred ring animates a large layer, so let it sleep when nobody can see it.
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className={`hero${offscreen ? " hero--offscreen" : ""}`} aria-labelledby="hero-title">
      {/* Pure CSS. Nothing here is fetched, so the text below never waits on it. */}
      <div className="hero__aura" aria-hidden="true">
        <span className="hero__ring" />
        <span className="hero__ring hero__ring--inner" />
      </div>
      <div className="container hero__inner">
        <p className="hero__eyebrow">AI Receptionist for Independent Clinics</p>
        <h1 id="hero-title" className="hero__title">
          Your Front Desk
          <br />
          Has Enough to Do.
        </h1>
        <p className="hero__lead">
          Vocalis picks up every call, books the visit, and flags what keeps patients calling back, so your staff can look after the people standing at the desk.
        </p>
        <div className="hero__actions">
          <Link to={DEMO_HREF} className="btn btn--primary">Book a demo</Link>
          <SeeItLive />
        </div>
      </div>
    </section>
  );
}
