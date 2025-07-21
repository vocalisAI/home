import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainBody from "./components/home/MainBody";
import Footer from "./components/Footer";
import "./scss/custom.scss";

// Loading Animation Component
const LoadingAnimation = ({ onComplete }) => {
  const [stage, setStage] = React.useState(0);
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    // Stage 0: Show logo
    const timer1 = setTimeout(() => {
      setStage(1);
    }, 1000);

    // Stage 1: Show name
    const timer2 = setTimeout(() => {
      setStage(2);
    }, 2000);

    // Stage 2: Fade out and show main content
    const timer3 = setTimeout(() => {
      setShowContent(true);
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (showContent) {
    return null;
  }

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        {/* Logo */}
        <div className={`logo-container ${stage >= 0 ? 'show' : ''}`}>
          <div className="logo-circle">
            <i className="fas fa-microphone-alt fa-3x text-white"></i>
          </div>
        </div>
        
        {/* Name */}
        <div className={`name-container ${stage >= 1 ? 'show' : ''}`}>
          <h1 className="company-name">Vocalis</h1>
          <p className="company-tagline">AI Voice Receptionist</p>
        </div>
        
        {/* Loading dots */}
        <div className={`loading-dots ${stage >= 1 ? 'show' : ''}`}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

// Progress Indicator Component
const ProgressIndicator = () => {
  const [activeSection, setActiveSection] = React.useState('hero');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'benefits', 'features', 'pricing', 'about', 'hipaa', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      // Check if we're at the top (hero section)
      if (scrollPosition < 300) {
        setActiveSection('hero');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'hero', label: 'Home', icon: 'fas fa-home' },
    { id: 'benefits', label: 'Benefits', icon: 'fas fa-chart-line' },
    { id: 'features', label: 'Features', icon: 'fas fa-star' },
    { id: 'pricing', label: 'Pricing', icon: 'fas fa-dollar-sign' },
    { id: 'about', label: 'About', icon: 'fas fa-users' },
    { id: 'hipaa', label: 'HIPAA', icon: 'fas fa-shield-alt' },
    { id: 'faq', label: 'FAQ', icon: 'fas fa-question-circle' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  const handleSectionClick = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="position-fixed top-50 end-0 translate-middle-y" style={{zIndex: 1000}}>
      <div className="bg-white rounded-start shadow-lg p-2">
        {sections.map((section, index) => (
          <div key={section.id} className="mb-2">
            <button
              onClick={() => handleSectionClick(section.id)}
              className={`d-flex align-items-center justify-content-center rounded-circle text-decoration-none border-0 progress-indicator-btn ${
                activeSection === section.id ? 'bg-primary text-white' : 'text-muted bg-transparent'
              }`}
              style={{width: '40px', height: '40px', cursor: 'pointer'}}
              title={section.label}
              aria-label={`Go to ${section.label} section`}
            >
              <i className={`${section.icon} fa-sm`}></i>
            </button>
            {index < sections.length - 1 && (
              <div className="mx-auto" style={{width: '2px', height: '20px', background: '#e9ecef'}}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Benefits Section
const Benefits = () => (
  <section id="benefits" className="py-5" style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="display-5 mb-3 fw-bold text-white">Why Choose Vocalis?</h2>
        <p className="lead text-white-50 mb-5">Transform your clinic's communication while saving thousands on staffing costs</p>
      </div>
      
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-body p-4 text-center">
              <div className="mb-3">
                <i className="fas fa-dollar-sign fa-3x text-success"></i>
              </div>
              <h5 className="fw-semibold mb-3">Massive Cost Savings</h5>
              <p className="text-muted mb-3">Save $50,000+ annually compared to hiring a full-time receptionist</p>
              <div className="text-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>10x cheaper than competitors</small>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>No benefits, training, or turnover costs</small>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Immediate ROI within first month</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-body p-4 text-center">
              <div className="mb-3">
                <i className="fas fa-clock fa-3x text-primary"></i>
              </div>
              <h5 className="fw-semibold mb-3">Always Available</h5>
              <p className="text-muted mb-3">Never miss a call or appointment opportunity again</p>
              <div className="text-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Works nights, weekends, holidays</small>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>No sick days or vacation time</small>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Instant response to every call</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-body p-4 text-center">
              <div className="mb-3">
                <i className="fas fa-chart-line fa-3x text-warning"></i>
              </div>
              <h5 className="fw-semibold mb-3">Increased Revenue</h5>
              <p className="text-muted mb-3">Capture more appointments and reduce no-shows</p>
              <div className="text-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Book appointments anytime</small>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Reduce missed calls by 90%</small>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Improve patient satisfaction</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-body p-4 text-center">
              <div className="mb-3">
                <i className="fas fa-shield-alt fa-3x text-info"></i>
              </div>
              <h5 className="fw-semibold mb-3">HIPAA Compliant</h5>
              <p className="text-muted mb-3">Enterprise-grade security for healthcare data</p>
              <div className="text-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>End-to-end encryption</small>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>HIPAA-compliant data handling</small>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Secure cloud infrastructure</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-body p-4 text-center">
              <div className="mb-3">
                <i className="fas fa-rocket fa-3x text-danger"></i>
              </div>
              <h5 className="fw-semibold mb-3">Easy Setup</h5>
              <p className="text-muted mb-3">Get started in minutes, not months</p>
              <div className="text-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>No hardware installation</small>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Works with existing phone system</small>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Instant activation</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-body p-4 text-center">
              <div className="mb-3">
                <i className="fas fa-headset fa-3x text-secondary"></i>
              </div>
              <h5 className="fw-semibold mb-3">Human-like Experience</h5>
              <p className="text-muted mb-3">Patients can't tell they're talking to AI</p>
              <div className="text-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Natural conversation flow</small>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Understands context and intent</small>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-check text-success me-2"></i>
                  <small>Professional, friendly tone</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cost Comparison */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-lg" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
            <div className="card-body p-5 text-center">
              <h3 className="fw-bold mb-4">The Math is Simple</h3>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="rounded p-4 shadow-sm" style={{background: 'linear-gradient(135deg, #fff5f5, #fed7d7)'}}>
                    <h5 className="text-danger fw-bold">Traditional Receptionist</h5>
                    <div className="h2 text-danger mb-2">$4,000</div>
                    <small className="text-muted">Monthly cost (salary + benefits)</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="rounded p-4 shadow-sm" style={{background: 'linear-gradient(135deg, #f0fff4, #c6f6d5)'}}>
                    <h5 className="text-success fw-bold">Vocalis AI</h5>
                    <div className="h2 text-success mb-2">$500</div>
                    <small className="text-muted">Monthly subscription</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="rounded p-4 shadow-sm" style={{background: 'linear-gradient(135deg, #eff6ff, #bfdbfe)'}}>
                    <h5 className="text-primary fw-bold">Annual Savings</h5>
                    <div className="h2 text-primary mb-2">$42,000</div>
                    <small className="text-muted">That's 8x your investment back!</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Features Section
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

// About Section
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
              <p className="card-text">Hello, I'm Mahdi — a Biochemistry student at Case Western Reserve University (CWRU) deeply committed to improving how care is delivered by solving the everyday challenges clinics face. My background bridges academic research and frontline care, giving me a unique, hands-on understanding of how clinical systems work — and where they fall short.</p>
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
              <p className="card-text">Hi, I'm Somesh — a Computer Science and Chemistry student at Case Western Reserve University (CWRU) with a deep passion for healthcare and machine learning. My academic and professional journey has been driven by one goal: to make a real-world impact at the intersection of technology and medicine.</p>
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

// Check Icon Component
const CheckIcon = () => (
  <svg className="text-success" style={{width: '20px', height: '20px', flexShrink: 0}} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
  </svg>
);

// Pricing Section
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

// HIPAA Compliance Section
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

// FAQ Section
const FAQ = () => {
  const [openItem, setOpenItem] = React.useState(null);

  const faqItems = [
    {
      id: 1,
      question: "Will Vocalis replace my staff?",
      answer: "Not at all. Vocalis is designed to enhance your team's capacity, not replace it. Think of it as a virtual assistant that handles repetitive, high-volume tasks — like answering routine questions, managing appointment scheduling, and triaging calls — so your staff can focus on delivering high-quality, in-person care.\n\nBy offloading these time-consuming duties, Vocalis helps reduce burnout, minimize disruptions, and ensure no call goes unanswered — all without adding to your payroll. Clinics using Vocalis consistently report smoother workflows, improved staff morale, and a better overall patient experience."
    },
    {
      id: 2,
      question: "Is Vocalis secure and HIPAA-compliant?",
      answer: "Yes. Vocalis was built with HIPAA compliance at its core. All data is encrypted in transit and at rest, and we don't use any protected health information (PHI) to train our models. Role-based access and detailed audit logs ensure only the right people see the right information. We also offer a downloadable compliance overview for your legal or IT team."
    },
    {
      id: 3,
      question: "What happens if multiple patients call at once?",
      answer: "Vocalis can handle multiple simultaneous calls — something a human receptionist can't. Each caller gets an immediate, personalized experience, even during peak hours. No hold music. No voicemail runaround."
    },
    {
      id: 4,
      question: "Is Vocalis available 24/7?",
      answer: "Yes. Vocalis answers calls day and night, including weekends and holidays. If your front desk is busy, or closed, we're still picking up the phone and helping your patients."
    },
    {
      id: 5,
      question: "Will it integrate with my existing systems?",
      answer: "Yes, Vocalis is built to integrate seamlessly with most major scheduling platforms and electronic health record (EHR) systems through secure, HIPAA-compliant APIs. During onboarding, our team works closely with your clinic to ensure everything connects smoothly — with minimal disruption to your existing workflows. Whether you're using a popular system or a custom setup, we'll tailor the integration to fit your needs."
    },
    {
      id: 6,
      question: "How long does it take to get started?",
      answer: "Most clinics are up and running in less than a week. We offer onboarding support, live testing, and real-time adjustments to make sure everything fits your workflow from day one."
    }
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="py-5" style={{background:'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 mb-3 fw-bold">Frequently Asked Questions (FAQ)</h2>
          <p className="lead mb-5">Got questions? You're not alone. Here are some of the most common things clinics ask us about Vocalis — and our answers.</p>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqItems.map((item) => (
                <div key={item.id} className="accordion-item border-0 mb-3 shadow-sm">
                  <h2 className="accordion-header" id={`heading${item.id}`}>
                    <button
                      className={`accordion-button ${openItem === item.id ? '' : 'collapsed'} fw-semibold`}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={openItem === item.id}
                      aria-controls={`collapse${item.id}`}
                      style={{
                        background: openItem === item.id 
                          ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                          : 'white',
                        color: openItem === item.id ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '10px'
                      }}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${item.id}`}
                    className={`accordion-collapse collapse ${openItem === item.id ? 'show' : ''}`}
                    aria-labelledby={`heading${item.id}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body p-4" style={{background: 'white', borderRadius: '0 0 10px 10px'}}>
                      <p className="mb-0" style={{whiteSpace: 'pre-line'}}>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
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

const Home = React.forwardRef((props, ref) => {
  return (
    <>
      <MainBody ref={ref} />
      <Benefits />
      <Features />
      <Pricing />
      <About />
      <HIPAA />
      <FAQ />
      <Contact />
    </>
  );
});

function App() {
  const titleRef = React.useRef();
  const [isLoading, setIsLoading] = React.useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL + "/"}>
      <LoadingAnimation onComplete={handleLoadingComplete} />
      {!isLoading && (
        <div className="loading-complete">
          <Navbar ref={titleRef} />
          <ProgressIndicator />
          <Routes>
            <Route path="/" exact element={<Home ref={titleRef} />} />
          </Routes>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
