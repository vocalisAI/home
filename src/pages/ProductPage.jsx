import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Tabs from "../components/ui/Tabs";
import CtaBand from "../components/ui/CtaBand";
import SeeItLive from "../components/ui/SeeItLive";
import { useVideo } from "../components/ui/VideoContext";
import { DEMOS } from "../components/home/ProductShowcase";
import { PRODUCT_FEATURES, PLATFORM_SPECS } from "../data/features";
import { DEMO_HREF } from "../data/site";
import { Play } from "../components/ui/Icons";
import DashboardShowcase from "../components/home/DashboardShowcase";
import VideoTranscript from "../components/ui/VideoTranscript";

const KNOWN = PRODUCT_FEATURES.map((f) => f.id);

export default function ProductPage() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("feature");
  // Only known values are honoured; anything else opens the first view.
  const active = KNOWN.includes(requested) ? requested : KNOWN[0];
  const { open: openVideo } = useVideo();

  // push (not replace) so Back/Forward restore the selected view
  const select = (id) => setParams({ feature: id });

  return (
    <>
      <section className="container page-hero">
        <p className="eyebrow">Product</p>
        <h1 className="h-hero">AI Receptionist and Call Intelligence for Clinics</h1>
        <p className="page-hero__lead">Vocalis answers calls in your clinic’s name, handles appointment requests, and turns each conversation into a summary your front desk can use.</p>
        <div className="page-hero__actions"><SeeItLive /></div>
      </section>

      <section className="section section--tight-top" aria-label="Product features">
        <div className="container">
          <div className="stage stage--product">
            <Tabs
              idPrefix="product"
              label="Product features"
              tabs={PRODUCT_FEATURES.map((f) => ({ id: f.id, label: f.label }))}
              value={active}
              onChange={select}
              variant="stage"
              renderPanel={(id) => {
                const f = PRODUCT_FEATURES.find((x) => x.id === id);
                const Demo = DEMOS[f.tab];
                return (
                  <div className="feature">
                    <div className="feature__copy">
                      <h2 className="feature__title">{f.benefit}</h2>
                      <ol className="numbered">
                        {f.capabilities.map((c) => (
                          <li key={c}><span>{c}</span></li>
                        ))}
                      </ol>
                      <blockquote className="pull">{f.scenario}</blockquote>
                      <Link to={DEMO_HREF} className="btn btn--primary">Book a demo</Link>
                    </div>
                    <div className="feature__visual">
                      <div className="showcase__demo"><Demo /></div>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </section>

      <DashboardShowcase />

      <section className="section specs" aria-labelledby="specs-title">
        <div className="container specs__grid">
          <h2 id="specs-title" className="h-display">Platform specifications</h2>
          <dl className="specs__list">
            {PLATFORM_SPECS.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="product-answers">
        <div className="container container--narrow product-answers">
          <h2 id="product-answers" className="h-display">Questions about clinic calls</h2>
          <dl>
            <dt>What calls can Vocalis answer?</dt>
            <dd>Vocalis can answer routine clinic questions, take appointment requests, collect insurance details by secure link, and queue callbacks. See <Link to="/workflows">examples of clinic calls</Link>.</dd>
            <dt>Can Vocalis book or reschedule appointments?</dt>
            <dd>Vocalis can take booking, rescheduling, and cancellation requests. During setup, we check which calendar and EHR connections your clinic can use. Your staff review requests unless your setup confirms them directly.</dd>
            <dt>When does Vocalis hand a call to staff?</dt>
            <dd>For requests that need a person, Vocalis uses your clinic’s handoff rules and passes along a short summary. Clinicians give medical advice. Insurers decide coverage.</dd>
            <dt>What does Vocalis show after a call?</dt>
            <dd>Your team can see why the patient called, what blocked the request, and the suggested next step. The dashboard also groups calls by reason and time of day so staff can spot recurring problems.</dd>
          </dl>
          <p>Compare <Link to="/pricing">monthly plans and included minutes</Link> or see <Link to="/security">how Vocalis handles patient information</Link>.</p>
        </div>
      </section>

      <section className="section overview-band" id="demo-transcript" aria-labelledby="overview-title">
        <div className="container overview">
          <div>
            <h2 id="overview-title" className="h-display">Product walkthrough</h2>
            <p className="muted overview__text">Watch an insurance follow-up call and see the appointment it creates.</p>
            <p><a href="/media/vocalis-overview.mp4">Open the silent product demo video</a></p>
          </div>
          <button type="button" className="poster js-only" onClick={openVideo} aria-label="See it live: open the video and transcript">
            <img src="/media/vocalis-overview-poster.jpg" width="1280" height="720" loading="lazy" alt="" />
            <span className="poster__play"><Play width={28} height={28} /></span>
          </button>
        </div>
        <div className="container container--narrow overview-transcript">
          <VideoTranscript />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
