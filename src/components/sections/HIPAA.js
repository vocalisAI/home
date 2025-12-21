import React from "react";

const HIPAA = () => (
  <section id="hipaa" className="py-5" style={{background: '#fcfcfc'}}>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img src="/assets/hipaa-badge.png" alt="HIPAA Compliant" className="img-fluid" style={{maxHeight: '300px'}} />
        </div>
        <div className="col-lg-6">
          <h2 className="display-5 mb-4 fw-bold">Privacy & Security First</h2>
          <p className="lead mb-4">
            We take patient data security seriously. Vocalis is fully HIPAA compliant and uses end-to-end encryption for all conversations and data storage.
          </p>
          <ul className="list-unstyled">
            <li className="mb-3"><i className="fas fa-lock text-primary me-2"></i> End-to-end encryption (AES-256)</li>
            <li className="mb-3"><i className="fas fa-file-contract text-primary me-2"></i> We sign a BAA to ensure compliance</li>
            <li className="mb-3"><i className="fas fa-server text-primary me-2"></i> Secure, compliant cloud infrastructure</li>
            <li className="mb-3"><i className="fas fa-user-shield text-primary me-2"></i> Strict access controls and audit logs</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default HIPAA;
