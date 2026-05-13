import React, { useState } from "react";

const Contact = () => {
  const [demoStatus, setDemoStatus] = useState("idle");
  const [loiStatus, setLoiStatus] = useState("idle");

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const setStatus = type === 'demo' ? setDemoStatus : setLoiStatus;
    setStatus("submitting");

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mbdaqzpj", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        if (type === 'demo') {
          setTimeout(() => setDemoStatus("idle"), 5000);
        } else {
          setTimeout(() => setLoiStatus("idle"), 5000);
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-5" style={{background:'#f8fafc'}}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 mb-3">Contact Us</h2>
          <p className="lead mb-4">Let's bring smarter communication to your clinic.</p>
          <p className="mb-5">Whether you're curious about how Vocalis works, want to schedule a demo, or just have a question — we'd love to hear from you!</p>
          <div className="mb-4">
            <a href="mailto:meetvocalis@gmail.com" className="btn btn-outline-primary btn-lg px-5 py-3 me-3 contact-email-btn">
              <i className="fas fa-envelope me-2"></i>meetvocalis@gmail.com
            </a>
          </div>
        </div>
        
        <div className="row g-4 justify-content-center">
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow">
              <div className="card-body p-5">
                <h4 className="text-center mb-4">📅 Schedule a Demo</h4>
                <p className="text-center mb-4">See Vocalis in action. Submit the form below and we'll reach out.</p>
                
                <form onSubmit={(e) => handleSubmit(e, 'demo')}>
                  <input type="hidden" name="_subject" value="New Demo Request from Vocalis Website" />
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="fullName" className="form-label">Full Name *</label>
                      <input type="text" className="form-control rounded-pill" id="fullName" name="fullName" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="clinicName" className="form-label">Clinic Name *</label>
                      <input type="text" className="form-control rounded-pill" id="clinicName" name="clinicName" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input type="email" className="form-control rounded-pill" id="email" name="email" required />
                    </div>
                    <div className="col-12 text-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5 rounded-pill w-100"
                        style={{background: '#38b2ac', border: 'none'}}
                        disabled={demoStatus === "submitting"}
                      >
                        {demoStatus === "submitting" ? "Sending..." : "Request a Demo"}
                      </button>
                    </div>
                  </div>
                </form>

                {demoStatus === "success" && (
                  <div className="alert alert-success mt-4 text-center border-0 rounded-pill py-2" role="alert" style={{background: '#e6fffa', color: '#2c7a7b', fontWeight: 700}}>
                    ✅ Demo request sent! We'll be in touch soon.
                  </div>
                )}
                {demoStatus === "error" && (
                  <div className="alert alert-danger mt-4 text-center border-0 rounded-pill py-2" role="alert">
                    ❌ Something went wrong. Please try again.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow" style={{background: 'linear-gradient(135deg, #38b2ac, #319795)', color: 'white'}}>
              <div className="card-body p-5 d-flex flex-column justify-content-center text-center">
                <div className="mb-3">
                  <div className="display-4 mb-2">✉️</div>
                  <h3 className="fw-bold mb-2">Interested?</h3>
                  <p style={{opacity: 0.9, fontSize: '1.1rem'}}>We'll send your letter of interest within 24 hours.</p>
                </div>
                
                <form onSubmit={(e) => handleSubmit(e, 'loi')}>
                   <input type="hidden" name="_subject" value="Letter of Interest Request" />
                   <input type="hidden" name="type" value="LOI" />
                   <div className="mb-3">
                     <input type="email" name="email" className="form-control form-control-lg rounded-pill border-0 shadow-sm" placeholder="Your work email" required />
                   </div>
                   <button type="submit" className="btn btn-light btn-lg px-5 rounded-pill w-100 fw-bold" style={{color: '#38b2ac'}} disabled={loiStatus === "submitting"}>
                     {loiStatus === "submitting" ? "Sending..." : "Send me the LOI"}
                   </button>
                </form>

                {loiStatus === "success" && (
                  <div className="alert alert-light mt-4 text-center border-0 rounded-pill py-2" style={{color: '#38b2ac', fontWeight: 700}}>
                    ✅ LOI request sent! Check your inbox.
                  </div>
                )}
                {loiStatus === "error" && (
                  <div className="alert alert-danger mt-4 text-center border-0 rounded-pill py-2" role="alert">
                    ❌ Something went wrong.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
