import React, { useState, useEffect } from "react";

const conversation = [
  { role: 'user', text: "I need to schedule a check-up for my back pain.", time: "10:00 AM" },
  { role: 'ai', text: "I can help with that. Are you a new patient?", time: "10:00 AM" },
  { role: 'user', text: "Yes, I am.", time: "10:01 AM" },
  { role: 'ai', text: "Okay. I can schedule you with Dr. Smith tomorrow at 2 PM. Does that work?", time: "10:01 AM" },
  { role: 'user', text: "Yes, that's perfect.", time: "10:01 AM" },
  { role: 'ai', text: "Great. You are booked for tomorrow at 2 PM. You will receive a confirmation text shortly.", time: "10:02 AM" }
];

const ProductDemo = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < conversation.length ? prev + 1 : 0));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="demo" className="py-5" style={{background: '#f8fafc'}}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 mb-3 fw-bold">Experience the Intelligence</h2>
          <p className="lead mb-4">See how Vocalis handles complex scheduling conversations naturally.</p>
        </div>

        <div className="row justify-content-center align-items-center">
          {/* Chat Interface - Shifted to side */}
          <div className="col-lg-5 offset-lg-1 mb-4 mb-lg-0 order-lg-2">
             <div className="card border-0 shadow-lg overflow-hidden" style={{borderRadius: '20px', transform: 'scale(1.02)'}}>
              <div className="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                   <div className="text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
                     <i className="fas fa-robot"></i>
                   </div>
                   <div>
                     <h6 className="mb-0 fw-bold">Vocalis Assistant</h6>
                     <small className="text-muted text-success"><i className="fas fa-circle fa-xs me-1"></i>Online</small>
                   </div>
                </div>
                <i className="fas fa-phone-alt text-muted"></i>
              </div>
              
              <div className="card-body bg-light" style={{minHeight: '400px', maxHeight: '400px', overflowY: 'auto'}}>
                {conversation.slice(0, step).map((msg, idx) => (
                  <div key={idx} className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : ''}`}>
                    <div 
                      className={`p-3 rounded-4 shadow-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                      style={{maxWidth: '80%', borderBottomRightRadius: msg.role === 'user' ? '4px' : '20px', borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '20px'}}
                    >
                      <p className="mb-1">{msg.text}</p>
                      <small className={`d-block text-end ${msg.role === 'user' ? 'text-white-50' : 'text-muted'}`} style={{fontSize: '0.7rem'}}>{msg.time}</small>
                    </div>
                  </div>
                ))}
                {step < conversation.length && (
                  <div className="text-muted small ms-2">
                    <i className="fas fa-ellipsis-h fa-bounce"></i> Typing...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Analysis Panel - Captivating Side Content */}
          <div className="col-lg-5 order-lg-1">
             <div className="p-4">
                <div className="mb-4">
                  <h6 className="text-uppercase text-muted fw-bold small mb-3">Live Call Analysis</h6>
                  <div className="d-flex align-items-center gap-2 mb-2">
                     <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
                     <span className="fw-bold text-primary">Processing Audio...</span>
                  </div>
                   {/* Fake Waveform Visual */}
                  <div className="d-flex align-items-end gap-1 mb-4" style={{height: '40px'}}>
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-primary rounded-pill opacity-75"
                          style={{
                            width: '4px', 
                            height: `${Math.random() * 100}%`,
                            animation: `wave 0.5s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.05}s`
                          }}
                        ></div>
                      ))}
                  </div>
                </div>

                {/* Analysis Cards */}
                <div className="d-flex flex-column gap-3">
                   <div className="bg-white p-3 rounded-3 shadow-sm border-start border-4 border-success">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted">Intent Detected</small>
                        <i className="fas fa-check-circle text-success"></i>
                      </div>
                      <p className="fw-bold mb-0">Schedule Application</p>
                   </div>

                   <div className="bg-white p-3 rounded-3 shadow-sm border-start border-4 border-info">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted">Patient Status</small>
                        <i className="fas fa-user-plus text-info"></i>
                      </div>
                      <p className="fw-bold mb-0">New Patient</p>
                   </div>

                   <div className="bg-white p-3 rounded-3 shadow-sm border-start border-4 border-warning">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted">Action Taken</small>
                        <i className="fas fa-calendar-alt text-warning"></i>
                      </div>
                      <p className="fw-bold mb-0">Checked Availability: Tomorrow 2PM</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
