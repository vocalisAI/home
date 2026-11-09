import React from "react";

/** Signature section: definition, pronunciation, anatomy, brand connection. */
export default function VocalisDefinition({ id = "definition", headingLevel = 2 }) {
  const H = `h${headingLevel}`;
  return (
    <section className="section definition" id={id} aria-labelledby={`${id}-word`}>
      <div className="container">
        <div className="definition__grid">
          <div className="definition__text">
            <H id={`${id}-word`} className="definition__word">vocalis</H>
            <p className="definition__phonetic">/ˈvoʊkælɪs/ — [vo·cal·is]</p>
            <hr className="definition__rule" />
            <p className="definition__body">
              The vocalis is the thin, innermost muscle of the vocal folds (part of the thyroarytenoid) that regulates vocal cord tension and pitch.
            </p>
          </div>
          <figure className="definition__figure">
            {/* Sits behind the picture and lines up with its baked-in "Vocalis Muscle" label. */}
            <span className="definition__mark" aria-hidden="true" />
            <img
              src="/brand/vocalis-anatomy.webp"
              width="983"
              height="1100"
              loading="lazy"
              decoding="async"
              alt="Labeled anatomical illustration of the larynx in cross-section, showing the hyoid bone, epiglottis, false and true vocal cords, thyroid and cricoid cartilage, trachea and the vocalis muscle."
            />
          </figure>
          <div className="definition__brand" id="why-the-name">
            <span className="eyebrow">Why the Name</span>
            <p>
              The vocalis muscle fine-tunes pitch and tone. We build voice production models with natural, human-centered speech, and we named the company for that precision. How a clinic sounds on the phone matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
