import React from "react";
import Container from "react-bootstrap/Container";
import { Jumbotron } from "./migration";
import { useTranslation } from "react-i18next";

const MainBody = React.forwardRef((props, ref) => {
  const { t } = useTranslation();

  return (
    <Jumbotron
      fluid
      id="home"
      style={{
        background: `linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)`,
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center"
      }}
      className="title bg-transparent bgstyle text-white m-0"
    >
      <div id="stars"></div>
      <Container className="text-center py-5">
        
        {/* Main Headline */}
        <h1 ref={ref} className="display-2 mb-3 fw-bold text-white" style={{
          fontFamily: 'Montserrat, Inter, sans-serif', 
          textShadow: '0 4px 8px rgba(0,0,0,0.4)',
          lineHeight: '1.2',
          letterSpacing: '-0.5px'
        }}>
          {t('hero.title')}
          <br />
          <span style={{fontSize: '0.6em', opacity: 0.95}}>{t('hero.subtitle')}</span>
        </h1>

        {/* Mission Statement */}
        <div className="lead mb-5 text-white" style={{
          fontSize: '1.4rem', 
          fontFamily: 'Montserrat, Inter, sans-serif', 
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          fontWeight: '400',
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          The first-of-its-class, most affordable AI receptionist.
          <br />
          <span style={{fontSize: '0.9em', opacity: 0.9}}>Automate intake and scheduling so you can focus on care.</span>
        </div>

        {/* Call to Action */}
        <div className="d-flex flex-column flex-md-row justify-content-center gap-4 mb-5">
          <a
            className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold"
            href="#contact"
            role="button"
            aria-label={t('hero.cta')}
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
            {t('hero.cta')}
          </a>
        </div>
      </Container>
    </Jumbotron>
  );
});

export default MainBody;

