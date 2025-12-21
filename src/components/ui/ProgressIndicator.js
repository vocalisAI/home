import React, { useState, useEffect } from "react";

const ProgressIndicator = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'demo', 'benefits', 'features', 'multilingual', 'pricing', 'about', 'hipaa', 'faq', 'contact'];
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
    { id: 'demo', label: 'Demo', icon: 'fas fa-laptop-medical' },
    { id: 'benefits', label: 'Benefits', icon: 'fas fa-chart-line' },
    { id: 'features', label: 'Features', icon: 'fas fa-star' },
    { id: 'multilingual', label: 'Languages', icon: 'fas fa-language' },
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

export default ProgressIndicator;
