import React from "react";

// Check Icon Component
const CheckIcon = () => (
    <svg className="text-success" style={{width: '20px', height: '20px', flexShrink: 0}} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
    </svg>
  );

const Pricing = () => (
  <section id="pricing" className="py-5" style={{background:'#f8fafc'}}>
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="display-5 mb-3 fw-bold">Simple, Transparent Pricing</h2>
        <div className="mb-4">
          <span className="badge bg-success fs-5 me-2">10x More Affordable</span>
          <span className="text-muted">While competitors charge $5,000-10,000/month</span>
        </div>
        <p className="lead">No hidden fees, no long-term contracts. Start saving money and improving patient experience today.</p>
      </div>
      
      <div className="row justify-content-center g-4">
        <div className="col-lg-5">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-5 text-center">
              <h3 className="h2 mb-4 fw-semibold">Clinic Pro Package</h3>
              <div className="my-4 d-flex align-items-baseline justify-content-center">
                <span className="display-4 fw-bold me-2">$500</span>
                <span className="text-muted">/month</span>
              </div>
              <ul className="list-unstyled mb-4 text-start">
                <li className="d-flex align-items-center mb-3">
                  <CheckIcon />
                  <span className="ms-3">AI Voice Receptionist</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <CheckIcon />
                  <span className="ms-3">Automated Appointment Booking</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <CheckIcon />
                  <span className="ms-3">Google Calendar Integration</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <CheckIcon />
                  <span className="ms-3">Unlimited Calls</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <CheckIcon />
                  <span className="ms-3">Dedicated Support Helpline For Quick Assistance</span>
                </li>
              </ul>
              <a href="#contact" className="btn btn-primary btn-lg px-4 py-3 rounded-pill w-100">
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-5">
              <h3 className="h2 mb-4 fw-semibold">Our Commitment to Transparency</h3>
              <p className="lead mb-4">Here's a breakdown of your monthly subscription:</p>
              
              <div className="mb-4">
                <div className="d-flex h-8 w-100 overflow-hidden rounded-pill bg-light">
                  <div className="d-flex align-items-center justify-content-center text-white px-2 text-center small fw-medium" style={{width: '70%', background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>$350</div>
                  <div className="d-flex align-items-center justify-content-center text-white px-2 text-center small fw-medium" style={{width: '10%', background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>$50</div>
                  <div className="d-flex align-items-center justify-content-center text-white px-2 text-center small fw-medium" style={{width: '20%', background: 'linear-gradient(135deg, #4facfe, #00f2fe)'}}>$100</div>
                </div>
              </div>
              
              <ul className="list-unstyled mb-4">
                <li className="d-flex align-items-center mb-2">
                  <span className="me-2 rounded-circle" style={{width: '12px', height: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)'}}></span>
                  <small className="text-muted">AI API Usage & Maintenance</small>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="me-2 rounded-circle" style={{width: '12px', height: '12px', background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}></span>
                  <small className="text-muted">Server Hosting & Security</small>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="me-2 rounded-circle" style={{width: '12px', height: '12px', background: 'linear-gradient(135deg, #4facfe, #00f2fe)'}}></span>
                  <small className="text-muted">Company Profit & R&D</small>
                </li>
              </ul>
              
              <div className="border-top pt-4">
                <h4 className="h5 mb-2 fw-semibold">Giving Back</h4>
                <p className="text-muted small mb-0">
                  We donate 5% of our profit to <a href="https://www.doctorswithoutborders.org/" target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">Doctors Without Borders</a> to support their mission of providing impartial medical care in crisis zones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;
