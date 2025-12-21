import React from "react";

const HIPAA = () => (
  <section id="hipaa" className="py-5 bg-white">
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="display-5 mb-3">HIPAA-Compliant by Design</h2>
        <p className="lead">Protecting your patients' data is our highest priority.</p>
        <p className="mb-5">Vocalis was built from the ground up with HIPAA compliance in mind — because we know that trust and privacy are essential in healthcare. Every call handled by Vocalis is encrypted, stored securely, and processed according to strict privacy and data protection standards.</p>
      </div>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="card-title">End-to-End Encryption</h5>
              <p className="card-text">All patient data, including call transcripts, appointment details, and intake info, is encrypted both in transit and at rest. Even the Vocalis team can't read the actual data unless explicitly permitted by the clinic.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="card-title">No Data Stored Without Permission</h5>
              <p className="card-text">Vocalis only retains information necessary for clinic operations, and all data retention settings are fully configurable to your compliance needs.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="card-title">Access Controls & Audit Logs</h5>
              <p className="card-text">Role-based permissions and activity logs ensure that only authorized users can access sensitive data.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="card-title">No PHI Used for Model Training</h5>
              <p className="card-text">We do not use protected health information (PHI) to train or fine-tune any AI models — ever.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HIPAA;
