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
    }, 2000);
    return () => clearInterval(interval);
  }, [languages.length]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <section id="multilingual" className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h2 className="display-5 mb-4 fw-bold">We Speak Your Patient's Language</h2>
            <p className="lead mb-4">
              Vocalis fluently speaks and understands over 50 languages. Provide equitable care to diverse populations without the need for expensive interpreters.
            </p>
            
            <div className="d-flex flex-wrap gap-2 mb-4">
              <button 
                className={`btn ${i18n.language.startsWith('en') ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => changeLanguage('en')}
              >
                English Demo
              </button>
              <button 
                className={`btn ${i18n.language.startsWith('es') ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => changeLanguage('es')}
              >
                Spanish Demo (Español)
              </button>
            </div>
            
            <p className="text-muted small">
              <i className="fas fa-info-circle me-1"></i> 
              Click the buttons above to instantly translate this website and experience the multilingual capability.
            </p>
          </div>
          
          <div className="col-lg-6">
            <div className="position-relative p-5 text-center" style={{minHeight: '450px'}}>
              {/* Central Active Interaction */}
              <div 
                className="position-absolute top-50 start-50 translate-middle bg-white shadow-lg p-4 rounded-4 text-center"
                style={{zIndex: 10, minWidth: '300px', border: '1px solid rgba(0,0,0,0.1)'}}
              >
                <div className="mb-3">
                   <div 
                     className="rounded-circle d-flex align-items-center justify-content-center mx-auto text-white"
                     style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea, #764ba2)'}}
                   >
                     <i className="fas fa-microphone fa-xl"></i>
                   </div>
                </div>
                <h5 className="text-muted mb-2">User</h5>
                <p className="fw-bold mb-3 fs-5" style={{color: '#495057'}}>
                  "Respond in <span className="text-primary">{languages[activeLangIndex]}</span>"
                </p>
                <hr className="my-3 opacity-25" />
                <h5 className="text-muted mb-2">Vocalis</h5>
                <div className="d-flex align-items-center justify-content-center gap-2">
                   <div className="spinner-grow text-primary spinner-grow-sm" role="status"></div>
                   <p className="fw-bold mb-0 text-success">
                     Responding in {languages[activeLangIndex]}...
                   </p>
                </div>
              </div>

              {/* Background Rotating Cloud */}
              <div 
                className="language-cloud w-100 h-100 position-absolute top-0 start-0"
                style={{
                  zIndex: 1, 
                  opacity: 0.15, 
                  overflow: 'hidden',
                  pointerEvents: 'none'
                }}
              >
                {languages.map((lang, index) => {
                  // Distribute randomly for cloud effect
                  const top = Math.random() * 80 + 10 + '%';
                  const left = Math.random() * 80 + 10 + '%';
                  const animDuration = Math.random() * 10 + 10 + 's';
                  
                  return (
                    <span 
                      key={lang}
                      className="position-absolute fs-5 fw-bold text-dark"
                      style={{
                        top: top,
                        left: left,
                        animation: `float ${animDuration} ease-in-out infinite`,
                        transform: `scale(${Math.random() * 0.5 + 0.8})`
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
