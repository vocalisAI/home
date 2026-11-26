import React from "react";
import VocalisDefinition from "../components/home/VocalisDefinition";
import CtaBand from "../components/ui/CtaBand";

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
  return (
    <>
      <section className="container page-hero">
        <p className="eyebrow">About</p>
        <h1 className="h-hero">Why we built Vocalis</h1>
      </section>

      <section className="section section--tight-top" aria-labelledby="story-title">
        <div className="container about-story">
          <h2 id="story-title" className="h-display">At the front desk</h2>
          <div className="about-story__body">
            <p>At APPNA, a free family medicine clinic, Mahdi divides his time between the front desk and medical assistant duties. When someone calls while he’s helping a patient at the counter, both need his attention.</p>
            <p>Mahdi and Somesh, a machine learning researcher at Cleveland Clinic, built Vocalis to answer those calls and pass the requests that need a person back to staff.</p>
          </div>
        </div>
      </section>

      <VocalisDefinition id="about-definition" headingLevel={2} />

      <section className="section" aria-labelledby="team-title">
        <div className="container team__inner">
          <h2 id="team-title" className="h-display team__title">Meet the founders</h2>
          <div className="team">
            {TEAM.map(({ name, role, img, bio }) => (
              <article className="member" key={name}>
                <img className="member__portrait" src={img} width="480" height="480" loading="lazy" alt={`Portrait of ${name}`} />
                <div className="member__identity">
                  <h3>{name}</h3>
                  <p className="member__role">{role}</p>
                </div>
                <div className="member__bio">
                  {bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
