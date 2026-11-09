import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Tabs from "../components/ui/Tabs";
import Disclosure from "../components/ui/Disclosure";
import CtaBand from "../components/ui/CtaBand";
import SeeItLive from "../components/ui/SeeItLive";
import { useVideo } from "../components/ui/VideoContext";
import { DEMOS } from "../components/home/ProductShowcase";
import { PRODUCT_FEATURES, PLATFORM_SPECS } from "../data/features";
import { DEMO_HREF } from "../data/site";
import { usePageMeta } from "../lib/hooks";
import { Play } from "../components/ui/Icons";
import DashboardShowcase from "../components/home/DashboardShowcase";

const KNOWN = PRODUCT_FEATURES.map((f) => f.id);

export default function ProductPage() {
  usePageMeta("The Vocalis voice receptionist, call intelligence, scheduling and follow-up, and clinic insights for independent clinics.");
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
        <h1 className="h-hero">What Vocalis Does for Your Front Desk.</h1>
        <p className="page-hero__lead">It answers the phone, books the appointment, and shows your team where patients get stuck. Pick a part to see it work.</p>
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
          <h2 id="specs-title" className="h-display">On Every Call.</h2>
          <dl className="specs__list">
            {PLATFORM_SPECS.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section overview-band" aria-labelledby="overview-title">
        <div className="container overview">
          <div>
            <h2 id="overview-title" className="h-display">See It Live.</h2>
            <p className="muted overview__text">One call, from the first hello to the dashboard. The video has no sound, and there’s a written description if you’d rather read it.</p>
          </div>
          <button type="button" className="poster" onClick={openVideo} aria-label="See it live: play the video">
            <img src="/media/vocalis-overview-poster.jpg" width="1280" height="720" loading="lazy" alt="" />
            <span className="poster__play"><Play width={28} height={28} /></span>
          </button>
        </div>
      </section>

      <section className="section" aria-label="How the pieces fit together">
        <div className="container container--narrow">
          <Disclosure title="How the Pieces Fit Together">
            <p>A call comes in and Vocalis answers. The conversation becomes a structured record. Booking, reminders and waitlist backfill run against your calendar and EHR, and your staff review anything that needs a person. Call patterns collect in your clinic dashboard.</p>
            <p>How Vocalis connects to your systems depends on your setup. We’ll walk through it during a demo.</p>
          </Disclosure>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
