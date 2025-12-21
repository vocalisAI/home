import React, { useState, useEffect, useRef } from "react";

const conversation1 = [
  { role: 'user', text: "I need to schedule a check-up for my back pain.", time: "10:00 AM" },
  { role: 'ai', text: "I can help with that. Are you a new patient?", time: "10:00 AM" },
  { role: 'user', text: "Yes, I am.", time: "10:01 AM" },
  { role: 'ai', text: "Okay. I can schedule you with Dr. Smith tomorrow at 2 PM. Does that work?", time: "10:01 AM" },
  { role: 'user', text: "Yes, that's perfect.", time: "10:01 AM" },
  { role: 'ai', text: "Great. You are booked for tomorrow at 2 PM. You will receive a confirmation text shortly.", time: "10:02 AM" }
];

const conversation2 = [
  { role: 'user', text: "Hello, I'd like to cancel my appointment.", time: "10:00 AM" },
  { role: 'ai', text: "I understand. Can I have your name and date of birth?", time: "10:00 AM" },
  { role: 'user', text: "Maria Garcia, 05/12/1985.", time: "10:01 AM" },
  { role: 'ai', text: "Thanks Maria. I see your appointment for Friday. Would you like to cancel it?", time: "10:01 AM" },
  { role: 'user', text: "Yes, please.", time: "10:01 AM" },
  { role: 'ai', text: "Your appointment has been cancelled. Anything else?", time: "10:02 AM" }
];

const ChatCard = ({ conversation, step, title, color }) => {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [step]);

  return (
    <div className="card border-0 shadow-lg overflow-hidden h-100" style={{borderRadius: '20px'}}>
      <div className="card-header bg-white border-0 py-3 px-4 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
           <div className={`text-white rounded-circle d-flex align-items-center justify-content-center me-3 bg-${color}`} style={{width: '40px', height: '40px'}}>
             <i className="fas fa-robot"></i>
           </div>
           <div>
             <h6 className="mb-0 fw-bold">{title}</h6>
             <small className="text-muted text-success"><i className="fas fa-circle fa-xs me-1"></i>Active Call</small>
           </div>
        </div>
      </div>
      
      <div 
        className="card-body bg-light" 
        style={{height: '350px', overflowY: 'auto'}}
        ref={scrollContainerRef}
      >
        {conversation.slice(0, step).map((msg, idx) => (
          <div key={idx} className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : ''}`}>
            <div 
              className={`p-3 rounded-4 shadow-sm ${msg.role === 'user' ? `bg-${color} text-white` : 'bg-white text-dark'}`}
              style={{maxWidth: '85%', borderBottomRightRadius: msg.role === 'user' ? '4px' : '20px', borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '20px'}}
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
  );
};

const ProductDemo = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        // Reset to 1 (first message) immediately after the last message to avoid "empty" typing state
        if (prev >= Math.max(conversation1.length, conversation2.length)) {
          return 1; 
        }
        return prev + 1;
      });
    }, 3000); // Slower pace
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="demo" className="py-5" style={{background: '#f8fafc'}}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 mb-3 fw-bold">No More Holds</h2>
          <p className="lead mb-2">
            Vocalis handles multiple calls simultaneously, ensuring your patients never wait in line again.
          </p>
          <p className="text-muted small fw-bold">
            <i className="fas fa-headset me-2"></i> Supports 20+ calls at once
          </p>
        </div>

        <div className="row justify-content-center g-4">
          <div className="col-md-6 col-lg-5">
            <ChatCard conversation={conversation1} step={step} title="Call #1 (New Patient)" color="primary" />
          </div>
          <div className="col-md-6 col-lg-5">
             {/* Offset animation start for variety if needed, keeping simple sync for now as requested 'multiple scenarios at once' */}
            <ChatCard conversation={conversation2} step={step} title="Call #2 (Cancellation)" color="info" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
