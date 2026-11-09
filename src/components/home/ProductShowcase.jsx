import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tabs from "../ui/Tabs";
import { SHOWCASE, PRODUCT_FEATURES } from "../../data/features";
import CallWalkthrough from "../demo/CallWalkthrough";
import IntentFrictionAction from "../demo/IntentFrictionAction";
import SchedulingExample from "../demo/SchedulingExample";
import InsightsExample from "../demo/InsightsExample";
import { Arrow } from "../ui/Icons";
import SeeItLive from "../ui/SeeItLive";

export const DEMOS = {
  answer: CallWalkthrough,
  understand: IntentFrictionAction,
  act: SchedulingExample,
  improve: InsightsExample,
};

/** One large stage with four tabs. Also used on the Product page. */
export function Stage({ tab, onTab, idPrefix = "showcase", label = "Product walkthrough" }) {
  const tabs = SHOWCASE.map((s) => ({ id: s.id, label: s.tab }));
  return (
    <div className="stage">
      <Tabs
        idPrefix={idPrefix}
        label={label}
        tabs={tabs}
        value={tab}
        onChange={onTab}
        variant="stage"
        renderPanel={(id) => {
          const s = SHOWCASE.find((x) => x.id === id);
          const Demo = DEMOS[id];
          const feature = PRODUCT_FEATURES.find((f) => f.id === s.feature);
          return (
            <div className="stage__panel">
              <div className="stage__intro">
                <h3 className="stage__title">{s.title}</h3>
                <div className="stage__aside">
                  <p>{s.body}</p>
                  <Link className="link-arrow" to={`/product?feature=${s.feature}`}>
                    About the {feature.label.toLowerCase()} <Arrow width={16} height={16} />
                  </Link>
                </div>
              </div>
              <div className="showcase__demo">
                <Demo />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default function ProductShowcase() {
  const [tab, setTab] = useState("answer");
  return (
    <section className="section showcase" id="showcase" aria-labelledby="showcase-title">
      <div className="container">
        <h2 id="showcase-title" className="h-display showcase__heading">Follow One Call from Hello to the Dashboard.</h2>
        <Stage tab={tab} onTab={setTab} />
        <div className="showcase__more"><SeeItLive variant="ghost" /></div>
      </div>
    </section>
  );
}
