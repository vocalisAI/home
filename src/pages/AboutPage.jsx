import React from "react";
import VocalisDefinition from "../components/home/VocalisDefinition";
import CtaBand from "../components/ui/CtaBand";
import { usePageMeta } from "../lib/hooks";

const TEAM = [
  {
    name: "Mahdi Khan",
    role: "Co-founder, Growth",
    img: "/brand/team-mahdi.webp",
    bio: [
      "Biochemistry student at Case Western Reserve University. He works at APPNA, a free family medicine clinic, moving between the front desk and the medical assistant role.",
      "He also researches the DNA damage response in zebrafish at Northwestern’s Feinberg School of Medicine.",
    ],
  },
  {
    name: "Somesh Saini",
    role: "Co-founder, Technical",
    img: "/brand/team-somesh.webp",
    bio: [
      "Computer science and chemistry student at Case Western Reserve University.",
      "He is a machine learning researcher at the Cleveland Clinic, building ECG-based detection for Chagas disease, and was an R&D intern at Procter & Gamble.",
    ],
  },
];

export default function AboutPage() {
  usePageMeta("Vocalis is built by two co-founders who have worked in clinics and in machine learning. Learn why we built a receptionist for independent clinics.");
  return (
    <>
      <section className="container page-hero">
        <p className="eyebrow">About</p>
        <h1 className="h-hero">Clinics Should Spend Their Time on Patients, Not Phones.</h1>
      </section>

      <section className="section section--tight-top" aria-labelledby="story-title">
        <div className="container about-story">
          <h2 id="story-title" className="h-display">Why We Built It.</h2>
          <div className="about-story__body">
            <p>Mahdi works the front desk and the medical assistant role at APPNA, a free family medicine clinic. Somesh builds machine learning tools at the Cleveland Clinic. Vocalis is where those two jobs meet.</p>
            <p>We wanted a receptionist that keeps a clinic responsive without adding to anyone’s workload, and that starts where the pressure is: the front desk and the phone.</p>
          </div>
        </div>
      </section>

      <VocalisDefinition id="about-definition" headingLevel={2} />

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <h2 id="team-title" className="h-display team__title">The Team.</h2>
          <div className="team">
            {TEAM.map((m) => (
              <article className="member" key={m.name}>
                <img src={m.img} width="160" height="160" loading="lazy" alt={`Portrait of ${m.name}`} />
                <div>
                  <h3>{m.name}</h3>
                  <p className="member__role">{m.role}</p>
                  {m.bio.map((b) => <p key={b} className="member__bio">{b}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
