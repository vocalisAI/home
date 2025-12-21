import React from "react";
import { useTranslation } from "react-i18next";

const Multilingual = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  ];

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
            <div className="position-relative p-5 text-center">
              {/* Animated Language Globe/Cloud */}
              <div 
                className="language-cloud p-4 rounded-circle shadow-lg d-flex align-items-center justify-content-center flex-wrap gap-3"
                style={{
                  background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                  minHeight: '400px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {languages.map((lang, index) => (
                  <span 
                    key={lang.code}
                    className="badge rounded-pill bg-white text-dark border shadow-sm p-3 m-1 language-badge"
                    style={{
                      fontSize: '1rem',
                      animation: `float 6s ease-in-out infinite`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <span className="me-2">{lang.flag}</span>
                    {lang.native}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Multilingual;
