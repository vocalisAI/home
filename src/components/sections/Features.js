import React from "react";

const Features = () => (
  <section id="features" className="py-5" style={{background:'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="display-5 mb-3 fw-bold">Technical Architecture</h2>
        <p className="lead mb-5">Advanced AI technology working seamlessly to transform your clinic's communication</p>
      </div>
      
      {/* Technical Process Flow */}
      <div className="row justify-content-center mb-5">
        <div className="col-12">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h4 className="text-center mb-4 fw-bold">AI Processing Pipeline</h4>
              <div className="row g-0 align-items-center position-relative">
                {/* Step 1: Patient Calls */}
                <div className="col-md-1-8 col-6 mb-3 mb-md-0">
                  <div className="pipeline-card-container">
                    <div className="pipeline-card" id="patient-calls">
                      <div className="card-front">
                        <div className="text-center p-1 rounded technical-flow-card" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
                          <i className="fas fa-phone fa-md text-white mb-1"></i>
                          <p className="text-white small mb-0 fw-semibold">Patient Calls</p>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="text-center p-1 rounded" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <p className="text-white small mb-0 fw-bold" style={{fontFamily: 'Montserrat, Inter, sans-serif'}}>Patient Dials Your Clinic Number</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow 1 */}
                <div className="col-md-0-5 col-6 d-none d-md-block text-center">
                  <i className="fas fa-arrow-right fa-md text-muted process-arrow"></i>
                </div>
                
                {/* Step 2: Speech-to-Text */}
                <div className="col-md-1-8 col-6 mb-3 mb-md-0">
                  <div className="pipeline-card-container">
                    <div className="pipeline-card" id="speech-to-text">
                      <div className="card-front">
                        <div className="text-center p-1 rounded technical-flow-card" style={{background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>
                          <i className="fas fa-microphone fa-md text-white mb-1"></i>
                          <p className="text-white small mb-0 fw-semibold">Speech-to-Text</p>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="text-center p-1 rounded" style={{background: 'linear-gradient(135deg, #f093fb, #f5576c)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <p className="text-white small mb-0 fw-bold" style={{fontFamily: 'Montserrat, Inter, sans-serif'}}>Converts Voice to Text</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow 2 */}
                <div className="col-md-0-5 col-6 d-none d-md-block text-center">
                  <i className="fas fa-arrow-right fa-md text-muted process-arrow"></i>
                </div>
                
                {/* Step 3: AI Processing */}
                <div className="col-md-1-8 col-6 mb-3 mb-md-0">
                  <div className="pipeline-card-container">
                    <div className="pipeline-card" id="ai-processing">
                      <div className="card-front">
                        <div className="text-center p-1 rounded technical-flow-card" style={{background: 'linear-gradient(135deg, #4facfe, #00f2fe)'}}>
                          <i className="fas fa-brain fa-md text-white mb-1"></i>
                          <p className="text-white small mb-0 fw-semibold">AI Processing</p>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="text-center p-1 rounded" style={{background: 'linear-gradient(135deg, #4facfe, #00f2fe)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <p className="text-white small mb-0 fw-bold" style={{fontFamily: 'Montserrat, Inter, sans-serif'}}>AI Understands & Processes Request</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow 3 */}
                <div className="col-md-0-5 col-6 d-none d-md-block text-center">
                  <i className="fas fa-arrow-right fa-md text-muted process-arrow"></i>
                </div>
                
                {/* Step 4: Text-to-Speech */}
                <div className="col-md-1-8 col-6 mb-3 mb-md-0">
                  <div className="pipeline-card-container">
                    <div className="pipeline-card" id="text-to-speech">
                      <div className="card-front">
                        <div className="text-center p-1 rounded technical-flow-card" style={{background: 'linear-gradient(135deg, #43e97b, #38f9d7)'}}>
                          <i className="fas fa-volume-up fa-md text-white mb-1"></i>
                          <p className="text-white small mb-0 fw-semibold">Text-to-Speech</p>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="text-center p-1 rounded" style={{background: 'linear-gradient(135deg, #43e97b, #38f9d7)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <p className="text-white small mb-0 fw-bold" style={{fontFamily: 'Montserrat, Inter, sans-serif'}}>Converts Response to Voice</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow 4 */}
                <div className="col-md-0-5 col-6 d-none d-md-block text-center">
                  <i className="fas fa-arrow-right fa-md text-muted process-arrow"></i>
                </div>
                
                {/* Step 5: AI Responds */}
                <div className="col-md-1-8 col-6 mb-3 mb-md-0">
                  <div className="pipeline-card-container">
                    <div className="pipeline-card" id="ai-responds">
                      <div className="card-front">
                        <div className="text-center p-1 rounded technical-flow-card" style={{background: 'linear-gradient(135deg, #ff9a9e, #fecfef)'}}>
                          <i className="fas fa-comments fa-md text-white mb-1"></i>
                          <p className="text-white small mb-0 fw-semibold">AI Responds</p>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="text-center p-1 rounded" style={{background: 'linear-gradient(135deg, #ff9a9e, #fecfef)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <p className="text-white small mb-0 fw-bold" style={{fontFamily: 'Montserrat, Inter, sans-serif'}}>AI Speaks Back to Patient</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow 5 */}
                <div className="col-md-0-5 col-6 d-none d-md-block text-center">
                  <i className="fas fa-arrow-right fa-md text-muted process-arrow"></i>
                </div>
                
                {/* Step 6: Calendar API */}
                <div className="col-md-1-8 col-6 mb-3 mb-md-0">
                  <div className="pipeline-card-container">
                    <div className="pipeline-card" id="calendar-api">
                      <div className="card-front">
                        <div className="text-center p-1 rounded technical-flow-card" style={{background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)'}}>
                          <i className="fas fa-calendar fa-md text-white mb-1"></i>
                          <p className="text-white small mb-0 fw-semibold">Calendar API</p>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="text-center p-1 rounded" style={{background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <p className="text-white small mb-0 fw-bold" style={{fontFamily: 'Montserrat, Inter, sans-serif'}}>Updates Your Calendar</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Capabilities */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4 text-center">
              <div className="mb-3">
                <i className="fas fa-robot fa-3x text-primary"></i>
              </div>
              <h5 className="fw-semibold mb-3">Smart AI Processing</h5>
              <p className="text-muted">Advanced natural language understanding with context awareness and intent recognition.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4 text-center">
              <div className="mb-3">
                <i className="fas fa-plug fa-3x text-primary"></i>
              </div>
              <h5 className="fw-semibold mb-3">Seamless Integration</h5>
              <p className="text-muted">Works with your existing phone system and calendar without any hardware changes.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4 text-center">
              <div className="mb-3">
                <i className="fas fa-shield-alt fa-3x text-primary"></i>
              </div>
              <h5 className="fw-semibold mb-3">Enterprise Security</h5>
              <p className="text-muted">HIPAA-compliant with end-to-end encryption and secure data handling.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
