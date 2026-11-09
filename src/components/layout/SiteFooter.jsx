import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "../../data/site";
import { useVideo } from "../ui/VideoContext";

const VoicePlayground = lazy(() => import("./VoicePlayground"));
const SHOWS_PLAYGROUND = ["/", "/about"];

export default function SiteFooter() {
  const { pathname } = useLocation();
  const { open: openVideo } = useVideo();
  const anchor = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (!SHOWS_PLAYGROUND.includes(pathname) || !anchor.current || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect(); }
    }, { rootMargin: "400px" });
    observer.observe(anchor.current);
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <footer>
      {SHOWS_PLAYGROUND.includes(pathname) && <div className="playground-reserve" ref={anchor}>
        {near && <Suspense fallback={null}><VoicePlayground /></Suspense>}
      </div>}
      <div className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="brand">
              <img src="/brand/vocalis-mark-256.png" alt="" width="42" height="38" />
              Vocalis
            </Link>
            <p style={{ marginTop: 16 }}>An AI receptionist for independent clinics.</p>
          </div>
          <div>
            <h3>Product</h3>
            <ul>
              <li><Link to="/product?feature=voice-receptionist">Voice Receptionist</Link></li>
              <li><Link to="/product?feature=call-intelligence">Call Intelligence</Link></li>
              <li><Link to="/product?feature=scheduling-follow-up">Scheduling &amp; Follow-Up</Link></li>
              <li><Link to="/product?feature=clinic-insights">Clinic Insights</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3>Clinic Workflows</h3>
            <ul>
              <li><Link to="/workflows#appointment-requests">Appointment Requests</Link></li>
              <li><Link to="/workflows#insurance-follow-up">Insurance Follow-Up</Link></li>
              <li><Link to="/workflows#after-hours">After-Hours Coverage</Link></li>
              <li><Link to="/workflows#staff-handoff">Staff Handoff</Link></li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/about#why-the-name">Why the Name</Link></li>
              <li><Link to="/security">Security</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><Link to="/#contact">Book a demo</Link></li>
              <li><button type="button" className="site-footer__link" onClick={openVideo}>See it live</button></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__legal">
          <span>&copy; {new Date().getFullYear()} Vocalis. All rights reserved.</span>
        </div>
      </div>
      </div>
    </footer>
  );
}
