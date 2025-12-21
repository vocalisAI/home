import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Multilingual = () => {
  const { i18n } = useTranslation();
  const [activeLangIndex, setActiveLangIndex] = useState(0);

  const languages = [
    "Afrikaans", "Arabic", "Armenian", "Azerbaijani", "Belarusian", "Bosnian", "Bulgarian", 
    "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch", "English", "Estonian", 
    "Finnish", "French", "Galician", "German", "Greek", "Hebrew", "Hindi", "Hungarian", 
    "Icelandic", "Indonesian", "Italian", "Japanese", "Kannada", "Kazakh", "Korean", 
    "Latvian", "Lithuanian", "Macedonian", "Malay", "Marathi", "Maori", "Nepali", 
    "Norwegian", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Serbian", 
    "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish", "Tagalog", "Tamil", "Thai", 
    "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLangIndex((prev) => (prev + 1) % languages.length);
    }, 2500); // Slightly slower for readability
    return () => clearInterval(interval);
  }, [languages.length]);

  return (
    <section id="multilingual" className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-5 mb-lg-0">
            <h2 className="display-5 mb-4 fw-bold">We Speak Your Patient's Language</h2>
            <p className="lead mb-4">
              Vocalis fluently speaks and understands over 50 languages. Provide equitable care to diverse populations without the need for expensive interpreters.
            </p>
            <p className="text-muted">
               <i className="fas fa-check-circle text-success me-2"></i> Automatic Language Detection
            </p>
            <p className="text-muted">
               <i className="fas fa-check-circle text-success me-2"></i> Real-time Translation
            </p>
            <p className="text-muted">
               <i className="fas fa-check-circle text-success me-2"></i> Culturally Aware Responses
            </p>
          </div>
          
          <div className="col-lg-7">
            <div className="position-relative p-5 text-center" style={{minHeight: '500px'}}>
              
              {/* Central Active Interaction */}
              <div 
                className="position-absolute top-50 start-50 translate-middle bg-white shadow-lg p-4 rounded-4 text-start"
                style={{zIndex: 10, minWidth: '340px', border: '1px solid rgba(0,0,0,0.1)'}}
              >
                 <div className="d-flex mb-3 justify-content-end">
                    <div className="bg-primary text-white p-3 rounded-4" style={{borderBottomRightRadius: '4px'}}>
                       <small className="d-block text-white-50 mb-1" style={{fontSize: '0.7em'}}>Patient</small>
                       <p className="mb-0">I need to schedule an appointment.</p>
                    </div>
                 </div>
                 
                 <div className="d-flex mb-1">
                    <div className="bg-light text-dark p-3 rounded-4 border" style={{borderBottomLeftRadius: '4px'}}>
                       <small className="d-block text-muted mb-1" style={{fontSize: '0.7em'}}>Vocalis</small>
                       <div className="d-flex align-items-center gap-2">
                          <div className="spinner-grow text-primary spinner-grow-sm" role="status"></div>
                          <span className="fw-bold text-success">
                            Respond in <span className="text-primary">{languages[activeLangIndex]}</span>
                          </span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Background Cloud */}
              <div 
                className="language-cloud w-100 h-100 position-absolute top-0 start-0 d-flex flex-wrap justify-content-center align-items-center align-content-center gap-3"
                style={{
                  zIndex: 1, 
                  overflow: 'hidden',
                  pointerEvents: 'none'
                }}
              >
                {languages.map((lang, index) => {
                  const isActive = index === activeLangIndex;
                  return (
                    <span 
                      key={lang}
                      className="transition-all"
                      style={{
                        fontSize: isActive ? '1.8rem' : '1rem',
                        fontWeight: isActive ? '800' : '400',
                        color: isActive ? '#667eea' : '#cbd5e0',
                        opacity: isActive ? 1 : 0.4,
                        transition: 'all 0.5s ease',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        margin: '5px'
                      }}
                    >
                      {lang}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Multilingual;
