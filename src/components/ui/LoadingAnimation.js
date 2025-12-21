import React, { useState, useEffect } from "react";

const LoadingAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
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

export default LoadingAnimation;
