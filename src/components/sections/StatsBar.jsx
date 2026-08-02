import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: 70,  suffix: "%",  label: "Call Deflection Rate" },
  { value: 90,  suffix: "%",  label: "Patient Satisfaction" },
  { value: 30,  suffix: "s",  label: "Avg. Wait Time",  prefix: "<" },
  { value: 87,  suffix: "k",  label: "Annual Savings",  prefix: "$" },
];

function useCountUp(target, duration = 1300, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTs = null;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      // ease-out quad
      const eased = 1 - Math.pow(1 - progress, 2);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

const StatItem = ({ value, suffix, label, prefix, started, divider }) => {
  const count = useCountUp(value, 1300, started);
  return (
    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
      <div style={{ textAlign: "center", flex: 1 }}>
        {/* Number */}
        <div
          style={{
            fontFamily: "'Montserrat', 'Inter', sans-serif",
            fontSize: "1.6rem",
            fontWeight: 800,
            color: "#0ABFBC",
            lineHeight: 1,
            letterSpacing: "-0.025em",
          }}
        >
          {prefix || ""}
          {count}
          {suffix}
        </div>
        {/* Label */}
        <div
          style={{
            fontFamily: "'Montserrat', 'Inter', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 700,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginTop: "0.35rem",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      </div>
      {divider && (
        <div
          style={{
            width: 1,
            height: 32,
            background: "rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
};

const StatsBar = () => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        /* sits between the warm hero (#e8e0d6) and the white WhatIsVocalis —
           use white so it matches WhatIsVocalis cleanly */
        background: "#ffffff",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "1rem 0",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "nowrap",
          padding: "0 2rem",
        }}
      >
        {stats.map((s, i) => (
          <StatItem
            key={s.label}
            {...s}
            started={started}
            divider={i < stats.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
