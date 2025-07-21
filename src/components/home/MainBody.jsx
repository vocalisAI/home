import React from "react";
import Container from "react-bootstrap/Container";
import { Jumbotron } from "./migration";

const MainBody = React.forwardRef((props, ref) => {
  const triggerAnimation = () => {
    // Reload the page to trigger the animation again
    window.location.reload();
  };

  return (
    <Jumbotron
      fluid
      id="home"
      style={{
        background: `linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)`,
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        position: "relative"
      }}
      className="title bg-transparent bgstyle text-white min-vh-100 d-flex align-content-center align-items-center flex-wrap m-0"
    >
      <div id="stars"></div>
      <Container className="text-center py-5">
        {/* Introducing Vocalis - Made Larger and More Prominent */}
        <div className="mb-4">
          <button
            onClick={triggerAnimation}
            className="badge bg-white bg-opacity-25 text-dark px-5 py-4 rounded-pill intro-badge border-0"
            style={{
              fontSize: '1.8rem', 
              fontFamily: 'Montserrat, Inter, sans-serif', 
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
              e.target.style.background = 'rgba(255,255,255,0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255,255,255,0.25)';
            }}
            title="Click to replay animation"
          >
            Introducing Vocalis
          </button>
        </div>

        {/* Main Headline - Larger and More Impactful */}
        <h1 ref={ref} className="display-2 mb-4 fw-bold text-white" style={{
          fontFamily: 'Montserrat, Inter, sans-serif', 
          textShadow: '0 4px 8px rgba(0,0,0,0.4)',
          lineHeight: '1.2',
          letterSpacing: '-0.5px'
        }}>
          AI Voice Receptionist
          <br />
          <span style={{fontSize: '0.85em', opacity: 0.95}}>for Modern Clinics</span>
        </h1>

        {/* Mission Statement - Concise and Powerful */}
        <div className="lead mb-5 text-white" style={{
          fontSize: '1.6rem', 
          fontFamily: 'Montserrat, Inter, sans-serif', 
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          fontWeight: '400',
          lineHeight: '1.4',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Answer calls. Book appointments. Handle questions.
          <br />
          <span style={{fontSize: '0.9em', opacity: 0.9}}>Automatically. Around the clock.</span>
        </div>

        {/* Call to Action - Smaller than Introducing Vocalis */}
        <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
          <a
            className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold"
            href="#contact"
            role="button"
            aria-label="Schedule a Demo"
            style={{
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
            }}
          >
            Schedule a Demo
          </a>
        </div>
      </Container>
    </Jumbotron>
  );
});

export default MainBody;
