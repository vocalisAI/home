import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Multilingual = () => {
  const { i18n } = useTranslation();
  const [activeLangIndex, setActiveLangIndex] = useState(0);

  const languagesData = [
    { name: "English", phrase: "I need to schedule an appointment." },
    { name: "Spanish", phrase: "Necesito programar una cita." },
    { name: "French", phrase: "Je dois prendre rendez-vous." },
    { name: "German", phrase: "Ich muss einen Termin vereinbaren." },
    { name: "Italian", phrase: "Devo fissare un appuntamento." },
    { name: "Portuguese", phrase: "Preciso marcar uma consulta." },
    { name: "Russian", phrase: "Мне нужно записаться на прием." },
    { name: "Chinese", phrase: "我需要预约。" },
    { name: "Japanese", phrase: "予約を取りたいのですが。" },
    { name: "Korean", phrase: "예약을 하고 싶습니다." },
    { name: "Arabic", phrase: "أحتاج إلى تحديد موعد." },
    { name: "Hindi", phrase: "मुझे अपॉइंटमेंट बुक करना है।" },
    { name: "Dutch", phrase: "Ik moet een afspraak maken." },
    { name: "Swedish", phrase: "Jag behöver boka en tid." },
    { name: "Polish", phrase: "Muszę umówić się na spotkanie." },
    { name: "Turkish", phrase: "Bir randevu almam gerekiyor." },
    { name: "Vietnamese", phrase: "Tôi cần đặt lịch hẹn." },
    { name: "Greek", phrase: "Πρέπει να κλείσω ραντεβού." },
    { name: "Hebrew", phrase: "אני צריך לקבוע פגישה." },
    { name: "Indonesian", phrase: "Saya perlu menjadwalkan janji temu." },
    { name: "Thai", phrase: "ฉันต้องการนัดหมาย." },
    { name: "Czech", phrase: "Potřebuji si domluvit schůzku." },
    { name: "Danish", phrase: "Jeg har brug for at bestille en tid." },
    { name: "Finnish", phrase: "Minun täytyy varata aika." },
    { name: "Hungarian", phrase: "Időpontot kell egyeztetnem." },
    { name: "Norwegian", phrase: "Jeg må bestille en time." },
    { name: "Romanian", phrase: "Trebuie să programez o întâlnire." },
    { name: "Ukrainian", phrase: "Мені потрібно записатися на прийом." },
    { name: "Slovak", phrase: "Potrebujem si dohodnúť stretnutie." },
    { name: "Croatian", phrase: "Moram zakazati termin." },
    { name: "Bulgarian", phrase: "Трябва да си запиша час." },
    { name: "Serbian", phrase: "Moram da zakažem termin." },
    { name: "Malay", phrase: "Saya perlu menjadualkan janji temu." },
    { name: "Tagalog", phrase: "Kailangan kong mag-iskedyul ng appointment." },
    { name: "Swahili", phrase: "Nahitaji kupanga miadi." },
    { name: "Persian", phrase: "من نیاز دارم یک قرار ملاقات بگذارم." },
    { name: "Catalan", phrase: "Necessito demanar cita." },
    { name: "Afrikaans", phrase: "Ek moet 'n afspraak maak." },
    { name: "Estonian", phrase: "Mul on vaja aeg kinni panna." },
    { name: "Latvian", phrase: "Man jāpiesaka vizīte." },
    { name: "Lithuanian", phrase: "Turiu paskirti susitikimą." },
    { name: "Slovenian", phrase: "Moram se naročiti na pregled." },
    { name: "Icelandic", phrase: "Ég þarf að panta tíma." },
    { name: "Macedonian", phrase: "Треба да закажам термин." },
    { name: "Armenian", phrase: "Ես պետք է հանդիպում նշանակեմ:" },
    { name: "Azerbaijani", phrase: "Mən görüş təyin etməliyəm." },
    { name: "Belarusian", phrase: "Мне трэба запісацца на прыём." },
    { name: "Kazakh", phrase: "Маған кездесуді жоспарлау керек." },
    { name: "Nepali", phrase: "मलाई अपोइन्टमेन्ट लिनु पर्छ।" },
    { name: "Urdu", phrase: "مجھے ملاقات کا وقت طے کرنا ہے۔" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLangIndex((prev) => (prev + 1) % languagesData.length);
    }, 2800); 
    return () => clearInterval(interval);
  }, [languagesData.length]);

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
                       <p className="mb-0 fw-bold">{languagesData[activeLangIndex].phrase}</p>
                    </div>
                 </div>
                 
                 <div className="d-flex mb-1">
                    <div className="bg-light text-dark p-3 rounded-4 border" style={{borderBottomLeftRadius: '4px'}}>
                       <small className="d-block text-muted mb-1" style={{fontSize: '0.7em'}}>Vocalis</small>
                       <div className="d-flex align-items-center gap-2">
                          <div className="spinner-grow text-primary spinner-grow-sm" role="status"></div>
                          <span className="fw-bold text-success">
                            Respond in <span className="text-primary">{languagesData[activeLangIndex].name}</span>
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
                {languagesData.map((lang, index) => {
                  const isActive = index === activeLangIndex;
                  return (
                    <span 
                      key={lang.name}
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
                      {lang.name}
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
