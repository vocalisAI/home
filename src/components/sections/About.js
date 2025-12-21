import React from "react";

const About = () => (
  <section id="about" className="py-5 bg-white">
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="display-5 mb-3 fw-bold">About Vocalis</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h4 className="mb-4">Our Vision</h4>
            <p className="lead mb-4">At Vocalis, we believe medical teams should spend more time caring for patients – not managing phones. That's why we're building a smarter, more reliable voice receptionist that helps clinics stay responsive, efficient, and modern.</p>
            <p className="mb-5">Our mission is to make communication seamless for every clinic — starting with the front desk.</p>
          </div>
        </div>
      </div>
      
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img
                    src={process.env.PUBLIC_URL + "/mahdikhan.jpeg"}
                    alt="Mahdi Khan - Co-Founder"
                    className="rounded-circle profile-picture"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      objectPosition: 'center 20%',
                      border: '4px solid #f8fafc',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
              </div>
              <h5 className="card-title text-center mb-3 fw-semibold">Mahdi Khan — Co-Founder</h5>
              <p className="text-muted text-center mb-3">Growth Lead</p>
              <p className="card-text">Hello, I'm Mahdi — a Biochemistry student at Case Western Reserve University, deeply committed to improving how care is delivered by solving the everyday challenges clinics face. My background bridges academic research and frontline care, giving me a unique, hands-on understanding of how clinical systems work — and where they fall short.</p>
              <p className="card-text">At Northwestern's Feinberg School of Medicine, I conduct research on DNA damage response using zebrafish models in the Parvez Lab. Outside the lab, I work at APPNA, a free family medicine clinic, rotating between front desk and medical assistant roles.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img
                    src={process.env.PUBLIC_URL + "/someshsaini.jpg"}
                    alt="Somesh Saini - Co-Founder"
                    className="rounded-circle profile-picture"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      objectPosition: 'center 30%',
                      border: '4px solid #f8fafc',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
              </div>
              <h5 className="card-title text-center mb-3 fw-semibold">Somesh Saini — Co-Founder</h5>
              <p className="text-muted text-center mb-3">Technical Lead</p>
              <p className="card-text">Hi, I'm Somesh — a Computer Science and Chemistry student at Case Western Reserve University with a deep passion for healthcare and machine learning. My academic and professional journey has been driven by one goal: to make a real-world impact at the intersection of technology and medicine.</p>
              <p className="card-text">I currently work as a Machine Learning Researcher at the Cleveland Clinic, where I'm developing AI solutions to help detect Chagas disease using ECG data. I've also served as an R&D intern at Procter & Gamble, focusing on innovation within everyday products.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h4 className="mb-4">Why We Built Vocalis</h4>
          <p className="lead mb-4">Across clinics, the same challenges repeat: missed calls, long hold times, and front desk staff stretched thin. These issues don't just create inefficiencies — they directly affect patient experience and care delivery.</p>
          <p className="mb-4">Vocalis was created to solve this. It functions like your most reliable receptionist — answering calls, booking appointments, and responding to common questions with clarity and accuracy, around the clock. No hold music, no missed opportunities.</p>
          <p>As founders with experience in both clinical care and technology, we built Vocalis to bridge the gap between patient needs and clinic capacity — using AI that's conversational, dependable, and purpose-built for healthcare.</p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
