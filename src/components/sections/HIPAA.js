import React from "react";

const HIPAA = () => (
  <section id="hipaa" className="py-5" style={{background: '#fcfcfc'}}>
    <div className="container">
      <div className="text-center mb-5 mw-100" style={{maxWidth: '800px', margin: '0 auto'}}>
        <div className="mb-4">
           <i className="fas fa-shield-alt text-primary fa-3x"></i>
        </div>
        <h2 className="display-5 mb-4 fw-bold">Privacy & Security First</h2>
        <p className="lead mb-5 text-muted">
          We take patient data security seriously. Vocalis is fully HIPAA compliant and uses end-to-end encryption for all conversations and data storage.
        </p>
      </div>

      <div className="row justify-content-center g-4">
        <div className="col-md-6 col-lg-3 text-center">
           <div className="p-4 bg-white shadow-sm h-100 rounded-4">
              <i className="fas fa-lock text-primary fa-2x mb-3"></i>
              <h5 className="fw-bold mb-2">End-to-End Encryption</h5>
              <p className="small text-muted mb-0">AES-256 encryption for data at rest and in transit.</p>
           </div>
        </div>
        
        <div className="col-md-6 col-lg-3 text-center">
           <div className="p-4 bg-white shadow-sm h-100 rounded-4">
              <i className="fas fa-file-contract text-primary fa-2x mb-3"></i>
              <h5 className="fw-bold mb-2">BAA Compliance</h5>
              <p className="small text-muted mb-0">We sign a Business Associate Agreement for full accountability.</p>
           </div>
        </div>

        <div className="col-md-6 col-lg-3 text-center">
           <div className="p-4 bg-white shadow-sm h-100 rounded-4">
              <i className="fas fa-server text-primary fa-2x mb-3"></i>
              <h5 className="fw-bold mb-2">Secure Infrastructure</h5>
              <p className="small text-muted mb-0">Built on a compliant, secure cloud foundation.</p>
           </div>
        </div>

        <div className="col-md-6 col-lg-3 text-center">
           <div className="p-4 bg-white shadow-sm h-100 rounded-4">
              <i className="fas fa-user-shield text-primary fa-2x mb-3"></i>
              <h5 className="fw-bold mb-2">Access Control</h5>
              <p className="small text-muted mb-0">Strict role-based permissions and audit logs.</p>
           </div>
        </div>
      </div>
    </div>
  </section>
);

export default HIPAA;
