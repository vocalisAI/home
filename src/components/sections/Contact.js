import React from "react";

const Contact = () => (
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
      
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
              <h4 className="text-center mb-4">📅 Schedule a Demo</h4>
              <p className="text-center mb-4">See Vocalis in action. Submit the form below and we'll reach out to find a time that works for you.</p>
              
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">Full Name *</label>
                    <input type="text" className="form-control" id="fullName" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="clinicName" className="form-label">Clinic Name *</label>
                    <input type="text" className="form-control" id="clinicName" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone Number (optional)</label>
                    <input type="tel" className="form-control" id="phone" />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">Message / What you're looking for (optional)</label>
                    <textarea className="form-control" id="message" rows="4" placeholder="Tell us about your clinic and how we can help..."></textarea>
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary btn-lg px-5 rounded-pill">Request a Demo</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
