import React from "react";

const Security = () => {
  const certifications = [
    {
      title: "HIPAA Compliant",
      description: "Fully compliant with the Health Insurance Portability and Accountability Act. All Patient Health Information (PHI) is encrypted and protected under strict administrative and technical safeguards, and we sign a Business Associate Agreement (BAA) with every customer.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 2Z" fill="url(#teal-grad)" />
          <path d="M12 6V16M7 11H17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "SOC 2 Certified",
      description: "SOC 2 Type 1 & Type 2 certified. Our internal systems, security operations, and organizational controls are independently audited to guarantee enterprise-level data protection.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="url(#teal-grad)" />
          <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: "GDPR Compliant",
      description: "Adhering to the General Data Protection Regulation. We guarantee strict data privacy, absolute sovereignty, and comprehensive processing rights for all global user data.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7V12C2 18.2 6.3 23.9 12 25C17.7 23.9 22 18.2 22 12V7L12 2Z" fill="url(#teal-grad)" />
          <circle cx="12" cy="12.5" r="4.5" stroke="white" strokeWidth="2" />
          <path d="M12 6V8M12 17V19M6.5 12.5H8.5M15.5 12.5H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <section 
      id="security" 
      className="py-5 bg-white"
      style={{
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* SVG Gradients definitions */}
      <svg style={{ width: 0, height: 0, position: "absolute" }}>
        <defs>
          <linearGradient id="teal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38b2ac" />
            <stop offset="100%" stopColor="#319795" />
          </linearGradient>
          <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e6fffa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container position-relative">
        {/* Header */}
        <div className="text-center mb-5">
          <span 
            style={{
              background: "#e6fffa",
              color: "#319795",
              fontSize: ".75rem",
              fontWeight: 700,
              letterSpacing: "1.5px",
              padding: "6px 16px",
              borderRadius: 99,
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "1rem"
            }}
          >
            Trust & Security
          </span>
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#1e293b" }}>
            Enterprise-Grade Data Security
          </h2>
          <p className="lead mx-auto mb-4" style={{ maxWidth: 800, color: "#64748b" }}>
            We implement world-class security measures and strict regulatory standards to keep your medical practice and patient information fully protected.
          </p>
        </div>

        {/* The User's Paragraph in a High-Trust Statement Box */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <div 
              style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                borderLeft: "5px solid #38b2ac",
                borderRadius: "16px",
                padding: "1.75rem 2.25rem",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Background watermark lock icon for premium look */}
              <div 
                style={{
                  position: "absolute",
                  right: "5%",
                  bottom: "-10px",
                  opacity: 0.03,
                  transform: "scale(2.5)",
                  pointerEvents: "none"
                }}
              >
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>

              <div className="d-flex flex-column flex-md-row align-items-start gap-4 position-relative">
                <div 
                  style={{
                    background: "rgba(56, 178, 172, 0.1)",
                    borderRadius: "50%",
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#319795" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div>
                  <h4 style={{ color: "#1e293b", fontWeight: 700, marginBottom: "0.75rem" }}>
                    Our Security Commitment
                  </h4>
                  <p 
                    style={{ 
                      color: "#334155", 
                      fontSize: "1.1rem", 
                      lineHeight: "1.7",
                      marginBottom: 0,
                      fontWeight: "500"
                    }}
                  >
                    At Vocalis, we deeply understand the importance of privacy and security for your team’s information. We recognize the trust you place in us daily to safeguard your data, and we take this responsibility very seriously. Ensuring the safety and security of your data is not just a policy; it’s a fundamental principle that we live by. To align with our commitment to your privacy, we are proud to be HIPAA compliant, GDPR compliant, SOC 2 Type 1 & Type 2 certified. This ensures your data remains protected, secure, and confidential within your Vocalis account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Badges Grid */}
        <div className="row g-4 mt-0 justify-content-center">
          {certifications.map((cert, index) => (
            <div key={index} className="col-lg-4 col-md-6 d-flex">
              <div 
                style={{
                  width: "100%",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "default"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(56, 178, 172, 0.12)";
                  e.currentTarget.style.borderColor = "#38b2ac";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.02)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div className="mb-3 d-inline-block">
                  {cert.icon}
                </div>
                <h3 
                  style={{ 
                    fontSize: "1.25rem", 
                    fontWeight: 700, 
                    color: "#1e293b", 
                    marginBottom: "0.5rem" 
                  }}
                >
                  {cert.title}
                </h3>
                <p 
                  style={{ 
                    color: "#64748b", 
                    fontSize: "0.92rem", 
                    lineHeight: "1.6",
                    margin: 0,
                    flexGrow: 1
                  }}
                >
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Security;
