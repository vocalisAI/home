import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styles from "../../scss/VocalisCapabilities.module.scss";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    window.addEventListener('orientationchange', () => setTimeout(handler, 100));
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('orientationchange', handler);
    };
  }, []);
  return size;
};

const CAPABILITIES = [
  { id: '247',          text: 'handle calls 24/7 with ease',         tagline: 'No voicemail. No missed patients. Ever.' },
  { id: 'multiple',     text: 'handle multiple calls at once',        tagline: 'Every caller gets a real answer — simultaneously.' },
  { id: 'languages',    text: 'speak over 20 languages',              tagline: 'Your patients feel heard, in their own language.' },
  { id: 'hipaa',        text: 'be compliant with HIPAA',              tagline: 'Built for healthcare from day one. Not an afterthought.' },
  { id: 'ehr',          text: 'easily integrate into your EHR',       tagline: 'Plug in once. Syncs automatically from day one.' },
  { id: 'human',        text: 'give a human-like experience',         tagline: 'Patients can\'t tell the difference. Clinics love the results.' },
  { id: 'revenue',      text: 'save your clinic thousands',           tagline: 'Every unanswered call is lost revenue. Vocalis answers every one.' },
  { id: 'sick',         text: 'skip sick or rest days',               tagline: '365 days. 24 hours. Zero absences. Guaranteed.' },
];




const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

// AnimatedCounter restored for use
export const AnimatedCounter = ({ end, start = 0, duration = 1500, prefix = "", suffix = "", isActive, delay = 0 }) => {
  const [count, setCount] = useState(start);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setCount(start);
      return;
    }
    
    const timeout = setTimeout(() => {
      let startTime = null;
      const range = end - start;
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const eased = progress < 0.5 
          ? 2 * progress * progress 
          : -1 + (4 - 2 * progress) * progress;
          
        setCount(Math.floor(start + eased * range));
        
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };
      
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, end, start, duration, delay]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};


const LanguageShowcase = ({ isActive, isMobile }) => {
  const slides = [
    { lang: 'Spanish', text: '¿Puedo agendar una cita para mañana?', response: '¡Claro! ¿Qué hora le vendría mejor?', detect: 'Spanish Detected' },
    { lang: 'French', text: "J'ai besoin d'un rendez-vous, s'il vous plaît.", response: "Bien sûr, quel créneau préférez-vous ?", detect: 'French Detected' },
    { lang: 'Mandarin', text: '我想预约明天的门诊。', response: '没问题，您想约在上午还是下午？', detect: 'Mandarin Detected' },
    { lang: 'Hindi', text: 'नमस्ते, क्या मुझे कल का अपॉइंटमेंट मिल सकता है?', response: 'जी हाँ, क्या सुबह 10 बजे का समय सही रहेगा?', detect: 'Hindi Detected' },
    { lang: 'Arabic', text: 'أريد حجز موعد مع الطبيب.', response: 'بالتأكيد، هل يناسبك يوم الأربعاء؟', detect: 'Arabic Detected' },
    { lang: 'German', text: 'Ich möchte einen Termin vereinbaren.', response: 'Gerne, passt Ihnen der Vormittag?', detect: 'German Detected' },
    { lang: 'Portuguese', text: 'Gostaria de marcar uma consulta.', response: 'Com certeza! Temos disponibilidade amanhã.', detect: 'Portuguese Detected' },
    { lang: 'Italian', text: 'Vorrei prenotare una visita per domani.', response: 'Certamente, preferisce la mattina o il pomeriggio?', detect: 'Italian Detected' },
    { lang: 'Japanese', text: '明日の予約をお願いできますか？', response: 'はい、承知いたしました。', detect: 'Japanese Detected' },
    { lang: 'Korean', text: '내일 진료 예약을 하고 싶습니다.', response: '네, 가능합니다. 성함을 말씀해 주시겠어요?', detect: 'Korean Detected' },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 1200); // Faster cycling
    return () => clearInterval(interval);
  }, [isActive, slides.length]);

  const pilledLanguages = [
    'Spanish', 'French', 'Mandarin', 'Hindi', 'Arabic', 'German', 'Portuguese', 
    'Italian', 'Japanese', 'Korean', 'Russian', 'Turkish', 'Vietnamese', 
    'Polish', 'Thai', 'Dutch', 'Greek', 'Hebrew', 'Bengali', 'Farsi',
    'Swedish', 'Danish', 'Norwegian', 'Indonesian', 'Tagalog', 'Finnish'
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <div key={`lang-${index}`} className={`${styles.phoneCard} ${styles.langFlash}`} style={{ 
        width: isMobile ? '100%' : 'clamp(320px, 75vw, 1000px)', 
        maxWidth: '100%', 
        padding: isMobile ? '1.5rem' : 'clamp(1.5rem, 3.5vw, 4.5rem)' 
      }}>
        <div className={styles.badge} style={{ width: 'fit-content', marginBottom: 'clamp(1rem, 2vh, 2.5rem)', fontSize: isMobile ? '0.9rem' : '1.1rem', padding: '0.5rem 1.25rem' }}>🌐 {slides[index].lang} Detected</div>
        <div className={styles.chatContainer} style={{ gap: 'clamp(0.75rem, 1.5vh, 1.5rem)' }}>
          <div className={`${styles.bubble} ${styles.patientBubble} ${styles.fadeInUp} ${styles.largeBubble}`} style={{ fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.5vw, 1.8rem)', padding: isMobile ? '0.75rem 1.25rem' : 'clamp(1rem, 2vh, 2rem) clamp(1.5rem, 2.5vw, 3rem)' }}>{slides[index].text}</div>
          <div className={`${styles.bubble} ${styles.vocalisBubble} ${styles.fadeIn} ${styles.largeBubble}`} style={{ animationDelay: '300ms', fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.5vw, 1.8rem)', padding: isMobile ? '0.75rem 1.25rem' : 'clamp(1rem, 2vh, 2rem) clamp(1.5rem, 2.5vw, 3rem)' }}>{slides[index].response}</div>
        </div>
      </div>
      <div className={styles.pillCloud} style={{ 
        gap: isMobile ? '0.25rem 0.3rem' : '0.5rem',
        padding: isMobile ? '1rem 0' : '3rem 0',
        maxWidth: '1200px'
      }}>
        {pilledLanguages.slice(0, isMobile ? 14 : 26).map((lang, i) => (
          <div key={lang} className={`${styles.pill} ${styles.largePill}`} style={{ 
            opacity: isActive ? 1 : 0, 
            transform: `scale(${isActive ? 1 : 0.9})`,
            transition: `all 0.3s ease ${i * 50}ms`,
            fontSize: isMobile ? '0.6rem' : '0.8rem',
            padding: isMobile ? '0.2rem 0.5rem' : '0.4rem 0.8rem'
          }}>{lang}</div>
        ))}
      </div>
    </div>
  );
};

const Waveform = ({ isActive }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const barCount = isMobile ? 24 : 48;
  
  const waveformData = useMemo(() => {
    return Array.from({ length: barCount }).map(() => ({
      baseHeight: 30 + Math.random() * 40,
      opacity: 0.4 + Math.random() * 0.6,
      animDuration: 0.6 + Math.random() * 1.2
    }));
  }, [barCount]);
  return (
    <div className={styles.waveform} style={{ gap: isMobile ? '3px' : '6px' }}>
      {waveformData.map((data, i) => {
        const height = isActive ? data.baseHeight : 10;
        return (
          <div key={i} className={styles.waveBar} style={{
            height: `${height}px`,
            width: isMobile ? '3px' : '6px',
            backgroundColor: i < (barCount / 2) ? '#38b2ac' : '#f687b3',
            opacity: isActive ? data.opacity : 0.1,
            animation: isActive ? `waveHeight ${data.animDuration}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${i * 0.02}s`,
            borderRadius: '99px'
          }} />
        );
      })}
    </div>
  );
};


const EHRShowcase = ({ isActive, isMobile }) => {
  const [filledIndices, setFilledIndices] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const integrations = useMemo(() => [
    { name: 'Epic', color: '#38b2ac' },
    { name: 'Athenahealth', color: '#3182ce' },
    { name: 'Kareo', color: '#805ad5' },
    { name: 'Dentrix', color: '#2b6cb0' },
    { name: 'PracticeFusion', color: '#dd6b20' },
  ], []);

  const totalSlots = 30; // 5 days * 6 slots
  const emptySlots = useMemo(() => [4, 12, 22], []); // Scattered empty slots
  // Indices that SHOULD be filled eventually (all except emptySlots)
  const targetIndices = useMemo(() => Array.from({ length: totalSlots }, (_, i) => i).filter(i => !emptySlots.includes(i)), [emptySlots, totalSlots]);
  // Random subset for initial state (e.g., 10 slots)
  const initialIndices = useMemo(() => {
    const shuffled = [...targetIndices].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  }, [targetIndices]);

  const patients = [
    "Sarah M.", "James R.", "Priya K.", "Tom H.", "Linda B.", 
    "Carlos G.", "David W.", "Elena R.", "Mike S.", "Anna J.",
    "Kevin L.", "Rachel P.", "Chris B.", "Maria T.", "Steve D.",
    "Laura K.", "Jeff H.", "Susan W.", "Robert F.", "Nancy G.",
    "Daniel S.", "Karen M.", "Jason P.", "Michelle T.", "Brian C.",
    "Betty D.", "George L.", "Emily B.", "Frank K.", "Alice R."
  ];
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

  // Memoize the remaining slots to fill to ensure stability across re-renders
  const remainingToFill = useMemo(() => {
    return targetIndices.filter(i => !initialIndices.includes(i)).sort(() => 0.5 - Math.random());
  }, [targetIndices, initialIndices]);

  useEffect(() => {
    if (!isActive) {
      setFilledIndices([]);
      setShowToast(false);
      return;
    }

    if (prefersReducedMotion) {
      setFilledIndices(targetIndices);
      setShowToast(true);
      return;
    }

    // Start with initial indices
    setFilledIndices(initialIndices);

    // Staggered sync indicators
    const syncTimeouts = integrations.map((_, i) => 
      setTimeout(() => {
        // Staggered sync logic can be added here if needed
      }, 800 + i * 300)
    );

    let currentIdx = 0;
    setFilledIndices(initialIndices);

    // Random calendar fill for remaining slots
    const interval = setInterval(() => {
      if (currentIdx >= remainingToFill.length) {
        clearInterval(interval);
        setShowToast(true);
        return;
      }
      
      const nextIndex = remainingToFill[currentIdx];
      setFilledIndices(prev => [...prev, nextIndex]);
      currentIdx++;
    }, 180); 

    return () => {
      syncTimeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [isActive, prefersReducedMotion, initialIndices, remainingToFill, integrations, targetIndices]);

  useEffect(() => {
    if (showToast && !prefersReducedMotion) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast, prefersReducedMotion]);

  return (
    <div className={styles.ehrCard} style={{ 
      width: '100%',
      maxWidth: '1200px', 
      height: 'auto',
      minHeight: isMobile ? 'auto' : '600px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row', 
      alignItems: 'stretch',
      justifyContent: 'center',
      overflow: 'hidden',
      boxSizing: 'border-box',
      background: 'white',
      borderRadius: isMobile ? '1.5rem' : '2.5rem',
      boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #edf2f7'
    }}>
      {/* EHR Tabs removed as per request */}

      {!isMobile && (
        <div className={styles.ehrLeft} style={{ 
          width: 'clamp(280px, 28vw, 340px)', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem', 
          padding: '2.5rem',
          background: '#f8fafc',
          borderRight: '1px solid #edf2f7'
        }}>
          {integrations.map((item, i) => (
            <div key={item.id || i} className={styles.ehrRow} style={{ 
              opacity: isActive ? 1 : 0, 
              transform: isActive ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.5s ease ${i * 150}ms`,
              width: '100%',
              marginBottom: '0.5rem',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '1rem',
              background: 'white',
              borderRadius: '1.25rem',
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div className={styles.ehrIcon} style={{ background: item.color, width: '24px', height: '24px', borderRadius: '8px', flexShrink: 0 }}></div>
              <div className={styles.ehrName} style={{ fontSize: '1.1rem', fontWeight: 700, flex: 1, whiteSpace: 'nowrap' }}>{item.name}</div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.ehrRight} style={{ 
        padding: isMobile ? '1rem 0.75rem' : '1.5rem 2rem', 
        flex: 1, 
        minWidth: 0, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        <div className={styles.calendarHeader} style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: isMobile ? '2px' : '12px',
          marginBottom: isMobile ? '1rem' : '1.5rem',
          width: '100%'
        }}>
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map(day => (
            <div key={day} className={styles.dayLabel} style={{ fontSize: isMobile ? '0.6rem' : '0.9rem', fontWeight: 800, color: '#94a3b8', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{day}</div>
          ))}
        </div>
        <div className={styles.calendarBody} style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: isMobile ? '2px' : '12px',
          flex: 1,
          width: '100%'
        }}>
          {Array.from({ length: totalSlots }).map((_, i) => {
            const rowIdx = Math.floor(i / 5);
            const actualIdx = i;
            
            const isEmpty = emptySlots.includes(actualIdx);
            const isFilled = filledIndices.includes(actualIdx);
            const patient = patients[actualIdx % patients.length];
            const time = times[rowIdx % times.length];

            return (
              <div key={i} className={`${styles.slot} ${isEmpty ? styles.emptySlot : ""}`} style={{ 
                height: isMobile ? '42px' : 'clamp(70px, 9vh, 95px)', 
                padding: isMobile ? '2px' : '0',
                borderRadius: isMobile ? '0.5rem' : '1rem',
                border: isEmpty ? (isMobile ? '1px dashed #e2e8f0' : '2px dashed #e2e8f0') : 'none',
                background: isEmpty ? 'transparent' : (isFilled ? '#38b2ac' : '#f8fafc'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
                {isEmpty ? (
                  <span style={{ fontSize: isMobile ? '0.5rem' : '0.8rem', fontWeight: 600, color: '#94a3b8' }}>{isMobile ? 'Free' : 'Available'}</span>
                ) : isFilled ? (
                  <div className={styles.appointmentPill} style={{ 
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    position: 'relative',
                    zIndex: 2,
                    animation: 'slotPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                  }}>
                    <div className={styles.patientName} style={{ 
                      fontSize: isMobile ? '0.55rem' : '1.05rem', 
                      fontWeight: 800,
                      color: 'white',
                      textAlign: 'center',
                      lineHeight: '1.2',
                      position: 'relative',
                      zIndex: 10,
                      marginBottom: isMobile ? '0px' : '4px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>{isMobile ? patient.split(' ')[0] : patient}</div>
                    <div style={{ 
                      fontSize: isMobile ? '0.42rem' : '0.8rem', 
                      opacity: 0.95,
                      whiteSpace: 'nowrap',
                      marginTop: isMobile ? '1px' : '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      position: 'relative',
                      zIndex: 5
                    }}>
                      {!isMobile && <span style={{ fontSize: '0.85rem' }}>🕒</span>}
                      {time}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={`${styles.ehrToast} ${showToast ? styles.toastVisible : ""}`} style={{ 
          position: 'absolute',
          bottom: '1.25rem',
          left: '50%',
          transform: showToast ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
          opacity: showToast ? 1 : 0,
          background: '#1e293b',
          color: 'white',
          padding: isMobile ? '0.6rem 1.2rem' : '1rem 2.5rem',
          borderRadius: '99px',
          fontSize: isMobile ? '0.8rem' : '1.1rem',
          fontWeight: 700,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          zIndex: 20,
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          ✅ EHR Integration Synced
        </div>
      </div>
    </div>
  );
};


const CALL_POOL = [
  { name: "Sarah M.", action: "booked appointment", amount: "+$298" },
  { name: "James R.", action: "rescheduled visit", amount: "+$298" },
  { name: "Priya K.", action: "new patient intake", amount: "+$298" },
  { name: "Carlos G.", action: "refill request", amount: "+$149" },
  { name: "Linda B.", action: "follow-up booked", amount: "+$298" },
  { name: "David W.", action: "booked consultation", amount: "+$298" },
  { name: "Elena R.", action: "rescheduled exam", amount: "+$298" },
  { name: "Mike S.", action: "insurance verified", amount: "+$149" },
  { name: "Anna J.", action: "booked cleaning", amount: "+$298" },
  { name: "Kevin L.", action: "emergency triage", amount: "+$298" }
];

const RevenueShowcase = ({ isActive, isMobile }) => {
  const [leftCount, setLeftCount] = useState(142);
  const [rightCount, setRightCount] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [tickerEntries, setTickerEntries] = useState([]);
  const [pulse, setPulse] = useState(false);
  const timeoutsRef = useRef([]);
  const tickerIntervalRef = useRef(null);
  const entryCountRef = useRef(0);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animate = (start, end, duration, setter, easing = 'easeOut') => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      let easedProgress = progress;
      if (easing === 'easeOut') easedProgress = 1 - Math.pow(1 - progress, 3);
      if (easing === 'easeInOut') easedProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const current = Math.floor(start + (end - start) * easedProgress);
      setter(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!isActive) {
      setLeftCount(142); setRightCount(0); setPhase('idle');
      setTickerEntries([]); entryCountRef.current = 0;
      if (tickerIntervalRef.current) clearInterval(tickerIntervalRef.current);
      return;
    }
    if (prefersReducedMotion) {
      setLeftCount(0); setRightCount(42350); setPhase('complete');
      return;
    }
    setPhase('counting');
    timeoutsRef.current.push(setTimeout(() => animate(142, 0, 2000, setLeftCount, 'easeOut'), 100));
    timeoutsRef.current.push(setTimeout(() => animate(0, 42350, 2200, setRightCount, 'easeInOut'), 400));
    timeoutsRef.current.push(setTimeout(() => setPhase('complete'), 2600));

    return () => {
      const currentTimeouts = timeoutsRef.current;
      if (currentTimeouts) {
        currentTimeouts.forEach(clearTimeout);
      }
      if (tickerIntervalRef.current) clearInterval(tickerIntervalRef.current);
    };
  }, [isActive, prefersReducedMotion]);

  useEffect(() => {
    if (isActive && phase === 'counting') {
      tickerIntervalRef.current = setInterval(() => {
        if (entryCountRef.current >= 142) {
          clearInterval(tickerIntervalRef.current);
          return;
        }
        const data = CALL_POOL[entryCountRef.current % CALL_POOL.length];
        const newEntry = { 
          ...data, 
          id: `${Date.now()}-${entryCountRef.current}`,
          timestamp: entryCountRef.current === 0 ? "just now" : `${entryCountRef.current * 2}s ago`
        };
        setTickerEntries(prev => [newEntry, ...prev].slice(0, isMobile ? 3 : 6));
        setPulse(true);
        setTimeout(() => setPulse(false), 200);
        entryCountRef.current++;
      }, 400);
    }
    return () => { if (tickerIntervalRef.current) clearInterval(tickerIntervalRef.current); };
  }, [isActive, phase, isMobile]);

  const bgWash = !isActive ? 'transparent' : 
                 phase === 'counting' ? 'radial-gradient(at left center, rgba(229,62,62,0.04) 0%, transparent 70%)' :
                 'radial-gradient(at center, rgba(56, 178, 172, 0.06) 0%, transparent 100%)';

  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
      paddingTop: isMobile ? '1.5rem' : '0',
      overflow: 'hidden',
      boxSizing: 'border-box',
      background: bgWash,
      transition: 'background 0.8s ease'
    }}>
      <div className={styles.revenueWrapper} style={{ 
        gap: isMobile ? '0.25rem' : 'clamp(1rem, 3vw, 4rem)', 
        width: isMobile ? '100%' : '1000px', 
        flexDirection: isMobile ? 'column' : 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <div className={styles.revenuePanel} style={{ 
          width: isMobile ? '100%' : '300px', 
          flex: 'none',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <div className={styles.contextLabel} style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.5s ease', height: 'auto', fontSize: isMobile ? '0.9rem' : '1.75rem', fontWeight: 900, color: '#94a3b8', whiteSpace: 'nowrap', marginBottom: isMobile ? '0.1rem' : '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Before Vocalis</div>
          <div className={styles.counterLabel} style={{ height: '1.2rem', marginTop: isMobile ? '0.1rem' : '1.5rem', fontSize: isMobile ? '0.65rem' : '1.1rem', whiteSpace: 'nowrap' }}>Missed Calls</div>
          <div style={{ height: isMobile ? '2.5rem' : 'clamp(4rem, 15vh, 10rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: isMobile ? '0.1rem' : '1rem', width: '100%' }}>
            <div className={`${styles.largeCounter} ${leftCount === 0 ? styles.scalePop : ""}`} style={{ 
              fontSize: isMobile ? 'clamp(3.5rem, 12vw, 4.5rem)' : 'clamp(4rem, 8vw, 9rem)', 
              color: leftCount === 0 ? '#38b2ac' : '#e53e3e',
              fontVariantNumeric: 'tabular-nums',
              width: '100%',
              textAlign: 'center'
            }}>
              {leftCount}
            </div>
          </div>
          <div style={{ opacity: leftCount === 0 ? 1 : 0, transition: 'opacity 0.3s ease', height: '2rem', marginTop: '0.25rem' }}>
            <div className={styles.synced} style={{ padding: '0.4rem 1.2rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 800, whiteSpace: 'nowrap' }}>✓ All answered</div>
          </div>
        </div>
        {isMobile ? (
          <hr style={{ width: '60%', border: 'none', borderTop: '1px solid #edf2f7', margin: '0.125rem 0' }} />
        ) : (
          <div className={styles.glowingDivider} style={{ height: '180px', width: '1px', margin: '0 2rem', background: 'linear-gradient(to bottom, transparent, #e2e8f0, transparent)' }} />
        )}
        <div className={styles.revenuePanel} style={{ 
          width: isMobile ? '100%' : '550px', 
          flex: 'none',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <div className={styles.contextLabel} style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.5s ease 0.3s', height: 'auto', fontSize: isMobile ? '0.9rem' : '1.75rem', fontWeight: 900, color: '#38b2ac', whiteSpace: 'nowrap', marginBottom: isMobile ? '0.25rem' : '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>With Vocalis</div>
          <div className={styles.counterLabel} style={{ height: '1.2rem', marginTop: isMobile ? '0.25rem' : '1.5rem', fontSize: isMobile ? '0.65rem' : '1.1rem', whiteSpace: 'nowrap' }}>Revenue Captured</div>
            <div className={styles.largeCounter} style={{ 
              fontSize: isMobile ? 'clamp(3.5rem, 13vw, 5rem)' : 'clamp(4.5rem, 9vw, 9.5rem)', 
              color: '#38b2ac',
              fontVariantNumeric: 'tabular-nums',
              width: '100%',
              textAlign: 'center',
              transform: pulse ? 'scale(1.01)' : 'scale(1)', 
              transition: 'transform 0.1s ease',
              willChange: 'transform',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: isMobile ? '4.5rem' : '10rem'
            }}>
              <span style={{ 
                display: 'inline-flex', 
                justifyContent: 'center', 
                width: 'auto', 
                minWidth: 'fit-content' 
              }}>
                ${rightCount.toLocaleString()}
              </span>
            </div>
          <div style={{ height: '1.5rem' }} />
        </div>
      </div>

      {!isMobile && (
        <div style={{ 
          width: '850px', 
          marginTop: 'clamp(-2rem, -4vh, 0rem)', 
          opacity: isActive ? 1 : 0, 
          transition: 'all 0.6s ease', 
          position: 'relative', 
          zIndex: 10 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <div className={styles.pulse} style={{ background: '#16a34a', width: '8px', height: '8px' }}></div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em' }}>LIVE CALL FEED</span>
          </div>
          <div style={{ 
            height: 'clamp(120px, 20vh, 250px)', 
            overflow: 'hidden', 
            background: '#ffffff', 
            borderRadius: '1.25rem', 
            border: '1px solid #f1f5f9', 
            padding: '0.75rem 0', 
            boxShadow: '0 12px 48px rgba(0,0,0,0.06)' 
          }}>
            {tickerEntries.map((entry) => (
              <div key={entry.id} style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '1rem 2rem', borderBottom: '1px solid #f1f5f9',
                animation: 'fadeInUpEffect 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', background: '#38b2ac', borderRadius: '50%', boxShadow: '0 0 8px rgba(56,178,172,0.4)' }}></div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                  {entry.name} <span style={{ fontWeight: 400, color: '#64748b', marginLeft: '4px' }}>{entry.action}</span>
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#16a34a' }}>{entry.amount}</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{entry.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
};

const HIPAAShowcase = ({ isActive, isMobile }) => {
  const [stage, setStage] = useState(0);
  const timeoutsRef = useRef([]);
  const prefersReducedMotion = 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (!isActive) { setStage(0); return; }
    if (prefersReducedMotion) { setStage(9); return; }
    const steps = [
      [0, 1], [100, 2], [500, 3], [600, 4],
      [750, 5], [870, 6], [990, 7], [1110, 8], [2000, 9]
    ];
    steps.forEach(([time, s]) => {
      timeoutsRef.current.push(setTimeout(() => setStage(s), time));
    });
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [isActive, prefersReducedMotion]);
  const tiles = [
    {
      label: 'AES-256 Encrypted',
      color: '#38b2ac',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#38b2ac" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      )
    },
    {
      label: 'Your Private Server',
      color: '#3182ce',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
          <line x1="6" y1="6" x2="6.01" y2="6"/>
          <line x1="6" y1="18" x2="6.01" y2="18"/>
        </svg>
      )
    },
    {
      label: 'Full Audit Logs',
      color: '#805ad5',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#805ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      )
    },
    {
      label: 'No PHI Stored',
      color: '#f6875b',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f6875b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          <line x1="3" y1="3" x2="21" y2="21"/>
        </svg>
      )
    }
  ];
  return (
    <div style={{ 
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'flex-start',
      paddingTop: isMobile ? '1.5rem' : 'clamp(3rem, 8vh, 6rem)',
      overflow: 'hidden',
      boxSizing: 'border-box',
      gap: isMobile ? '1.5rem' : 'clamp(1rem, 3vh, 2.5rem)', 
      paddingBottom: isMobile ? '1rem' : 'clamp(1rem, 3vh, 3rem)',
    }}>
      <div style={{
        transform: `scale(${stage >= 2 ? (isMobile ? 0.85 : 1.3) : 0})`,
        opacity: stage >= 2 ? 1 : 0,
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
        position: 'relative',
        marginBottom: isMobile ? '1rem' : '2rem'
      }}>
        <svg width="clamp(100px, 18vh, 180px)" height="clamp(115px, 20vh, 210px)" viewBox="0 0 120 140">
          <defs>
            <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38b2ac"/>
              <stop offset="100%" stopColor="#805ad5"/>
            </linearGradient>
          </defs>
          <path d="M60 0 L10 25 V70 C10 108.8 33.3 129.5 60 140 C86.7 129.5 110 108.8 110 70 V25 L60 0Z" fill="url(#sg)" />
          <g transform="translate(48,52)">
            <path d="M8 8 V4 C8 1.8 9.8 0 12 0 C14.2 0 16 1.8 16 4 V8"
              fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"
              style={{ transform: `translateY(${stage >= 3 ? 0 : -6}px)`, transition: stage >= 3 ? 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' : 'none' }}
            />
            <rect x="0" y="8" width="24" height="20" rx="3" fill="white"/>
            <circle cx="12" cy="18" r="3" fill="url(#sg)"/>
          </g>
        </svg>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: isMobile ? '0.75rem' : 'clamp(1rem, 2vw, 2.5rem)', 
        width: isMobile ? '100%' : 'clamp(350px, 95%, 580px)', 
        maxWidth: '100%' 
      }}>
        {tiles.map((tile, i) => {
          const visible = stage >= (5 + i);
          return (
            <div key={i} style={{
              background: 'white',
              border: '1px solid #edf2f7',
              borderRadius: '1rem',
              padding: isMobile ? '0.75rem 0.6rem' : 'clamp(1.25rem, 3vh, 3rem) clamp(1.5rem, 2vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isMobile ? '0.5rem' : 'clamp(0.5rem, 1.2vh, 1.25rem)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              position: 'relative',
              opacity: visible ? 1 : 0,
              transform: `scale(${visible ? 1 : 0.85})`,
              transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)'
            }}>
              {tile.icon}
              <span style={{ fontSize: isMobile ? '0.75rem' : 'clamp(1rem, 1.2vw, 1.25rem)', fontWeight: 700, color: '#1e293b', textAlign: 'center' }}>{tile.label}</span>
            </div>
          );
        })}
      </div>
      <div style={{
        opacity: stage >= 9 ? 1 : 0,
        transform: `scale(${stage >= 9 ? 1 : 0.85})`,
        transition: 'all 0.4s ease',
        border: '2px solid #38b2ac',
        borderRadius: '99px',
        padding: isMobile ? '0.4rem 0.9rem' : '0.6rem 1.4rem', 
        fontSize: isMobile ? '0.72rem' : '0.82rem', 
        color: '#38b2ac',
        fontWeight: 800,
        background: 'white',
        boxShadow: '0 0 20px rgba(56,178,172,0.15)',
        textAlign: 'center',
        maxWidth: '90%'
      }}>
        {isMobile ? "✓ HIPAA Verified" : "✓ HIPAA Verified — Vocalis meets all federal requirements"}
      </div>
    </div>
  );
};

const VocalisCapabilities = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const activeIndexRef = useRef(0);

  // Trigger entering viewport on mobile
  useEffect(() => {
    if (!isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isMobile]);

  // Show swipe hint after a short delay once entered
  useEffect(() => {
    if (isMobile && hasEnteredViewport) {
      const timer = setTimeout(() => {
        setShowSwipeHint(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isMobile, hasEnteredViewport]);

  // Automatically dismiss swipe hint when user swipes left
  useEffect(() => {
    if (mobileIndex > 0) {
      setShowSwipeHint(false);
    }
  }, [mobileIndex]);

  // Auto-hide the popup after 6 seconds
  useEffect(() => {
    if (showSwipeHint) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showSwipeHint]);
  
  const missedDays = useMemo(() => {
    const indices = new Set();
    while(indices.size < 10) {
      indices.add(Math.floor(Math.random() * 35));
    }
    return Array.from(indices);
  }, []);

  const handleCarouselScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, offsetWidth } = carouselRef.current;
    if (offsetWidth <= 0) return;
    const newIndex = Math.round(scrollLeft / offsetWidth);
    if (newIndex !== mobileIndex) setMobileIndex(newIndex);
  }, [mobileIndex]);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      
      // Calculate index based on how far we've scrolled into the 1000vh container
      // The container starts at 0 and ends at -900vh relative to the viewport top when sticky
      const relativeOffset = -rect.top;
      const newIndex = Math.max(0, Math.min(CAPABILITIES.length - 1, Math.floor((relativeOffset + vh / 2) / vh)));
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        activeIndexRef.current = newIndex;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, activeIndex]);

  const renderState = (index, isActive) => {
    const cap = CAPABILITIES[index];
    switch (cap.id) {
      case "247":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '1.5rem' : 'clamp(1rem, 3vw, 4rem)',
            minHeight: 0
          }}>
            {/* Left Info Panel */}
            {!isMobile && (
              <div className={styles.sidePanel} style={{ 
                opacity: isActive ? 1 : 0, 
                transform: `translateX(${isActive ? 0 : -30}px)`,
                transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                width: 'clamp(200px, 22vw, 320px)',
                padding: '2rem'
              }}>
                <div className={styles.infoRow}>
                  <strong>Clinic Status</strong>
                  <span style={{ color: '#e53e3e' }}>● Closed</span>
                </div>
                <div className={styles.infoRow}>
                  <strong>Vocalis AI</strong>
                  <span style={{ color: '#38b2ac' }}>✓ Active</span>
                </div>
                <div className={styles.infoRow}>
                  <strong>Time</strong>
                  <span>11:47 PM</span>
                </div>
              </div>
            )}

            {/* Main Phone Card */}
            <div className={styles.phoneCard} style={{ 
              width: isMobile ? '100%' : 'clamp(320px, 48vw, 600px)', 
              maxWidth: '100%',
              padding: isMobile ? '1.5rem' : 'clamp(1.5rem, 3.5vh, 3.5rem) clamp(2rem, 4vw, 5rem)', 
              transform: isMobile ? 'scale(1)' : `translateX(${isActive ? '0px' : '15px'})`, 
              opacity: isActive ? 1 : 0, 
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transformOrigin: 'center',
              minHeight: isMobile ? '0' : 'clamp(480px, 65vh, 750px)'
            }}>
              <div className={styles.phoneHeader}>
                <div className={styles.badge} style={{ background: '#fffbeb', color: '#b45309' }}>🌙 After Hours Mode</div>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>11:47 PM</div>
              </div>
              <div className={styles.callerRow}>
                <div className={styles.avatar} style={{ background: '#cbd5e0' }}>SM</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#334155', fontSize: '1.5rem' }}>Sarah M.</div>
                  <div style={{ fontSize: '1.1rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Incoming Call <div className={styles.pulse} style={{ width: '10px', height: '10px' }}></div>
                  </div>
                </div>
              </div>
              <div className={styles.chatContainer} style={{ gap: 'clamp(0.75rem, 1.5vh, 1rem)', marginTop: isMobile ? '1rem' : '1.5rem' }}>
                <div key={`c1-${isActive}`} className={`${styles.bubble} ${styles.patientBubble} ${isActive ? styles.fadeInUp : ""}`} style={{ animationDelay: '0ms', fontSize: isMobile ? '0.82rem' : '0.95rem', padding: '0.75rem 1.25rem' }}>Hi, I know it's late... I have a really bad ear infection. Can I get an appointment first thing tomorrow?</div>
                <div key={`c2-${isActive}`} className={`${styles.bubble} ${styles.vocalisBubble} ${isActive ? styles.fadeInUp : ""}`} style={{ animationDelay: '300ms', fontSize: isMobile ? '0.82rem' : '0.95rem', padding: '0.75rem 1.25rem' }}>Of course, Sarah. I can see Dr. Patel has a 8:45 AM opening tomorrow. Should I book that for you?</div>
                <div key={`c3-${isActive}`} className={`${styles.bubble} ${styles.patientBubble} ${isActive ? styles.fadeInUp : ""}`} style={{ animationDelay: '600ms', fontSize: isMobile ? '0.82rem' : '0.95rem', padding: '0.75rem 1.25rem' }}>Yes please, that would be amazing.</div>
              </div>
            </div>
          </div>
        );
      case "multiple":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'flex-start' : 'center',
            paddingTop: isMobile ? '1.5rem' : '0',
            overflow: 'hidden',
            boxSizing: 'border-box',
            flexDirection: isMobile ? 'column' : 'row', 
            gap: isMobile ? '0.5rem' : 'clamp(2rem, 5vw, 6rem)',
            minHeight: 0
          }}>
            <div className={styles.phoneCard} style={{ 
              transform: isMobile ? 'scale(1)' : `translateX(${isActive ? '0' : '-50px'})`, 
              opacity: isActive ? 1 : 0, 
              transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
              width: isMobile ? '100%' : 'clamp(280px, 31vw, 420px)',
              maxWidth: '100%',
              height: isMobile ? 'auto' : 'clamp(400px, 55vh, 520px)',
              padding: isMobile ? '1rem 1.25rem' : '2.8rem'
            }}>
              <div className={styles.badge} style={{ background: '#f0fdf4', color: '#16a34a', marginBottom: isMobile ? '0.5rem' : '1.5rem', fontSize: isMobile ? '0.75rem' : '0.9rem', width: 'fit-content' }}>🟢 Active — Booking</div>
              <div style={{ fontWeight: 700, marginBottom: isMobile ? '0.5rem' : '1rem', color: '#1e293b', fontSize: isMobile ? '0.95rem' : '1.2rem' }}>Maria T. | New Patient</div>
              <div className={styles.chatContainer} style={{ gap: isMobile ? '0.5rem' : '0.75rem' }}>
                <div className={`${styles.bubble} ${styles.patientBubble}`} style={{ opacity: 1, fontSize: isMobile ? '0.78rem' : '1rem', padding: isMobile ? '0.5rem 0.8rem' : '0.6rem 1rem' }}>Hi, I'd like to make my first appointment. I'm a new patient.</div>
                <div className={`${styles.bubble} ${styles.vocalisBubble}`} style={{ opacity: 1, fontSize: isMobile ? '0.78rem' : '1rem', padding: isMobile ? '0.5rem 0.8rem' : '0.6rem 1rem' }}>Welcome, Maria! I'd love to help. Are you looking for a check-up?</div>
                {!isMobile && (
                  <div className={styles.typing} style={{ fontSize: '0.9rem' }}><span>Vocalis is speaking...</span></div>
                )}
              </div>
            </div>
            <div className={styles.phoneCard} style={{ 
              transform: isMobile ? 'scale(1)' : `translateY(${isActive ? '0' : '30px'})`, 
              opacity: isActive ? 1 : 0, 
              transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s', 
              width: isMobile ? '100%' : 'clamp(280px, 31vw, 420px)',
              maxWidth: '100%',
              height: isMobile ? 'auto' : 'clamp(400px, 55vh, 520px)',
              padding: isMobile ? '1rem 1.25rem' : '2.8rem'
            }}>
              <div className={styles.badge} style={{ background: '#f0fdf4', color: '#16a34a', marginBottom: isMobile ? '0.5rem' : '1rem', fontSize: isMobile ? '0.75rem' : '0.9rem', width: 'fit-content' }}>🟢 Active — Rescheduling</div>
              <div style={{ fontWeight: 700, marginBottom: isMobile ? '0.5rem' : '0.75rem', color: '#1e293b', fontSize: isMobile ? '0.95rem' : '1.2rem' }}>James R. | Existing Patient</div>
              <div className={styles.chatContainer} style={{ gap: isMobile ? '0.5rem' : '0.75rem' }}>
                <div className={`${styles.bubble} ${styles.patientBubble}`} style={{ opacity: 1, fontSize: isMobile ? '0.78rem' : '1rem', padding: isMobile ? '0.5rem 0.8rem' : '0.6rem 1rem' }}>I need to reschedule my appointment on Friday. Something came up.</div>
                <div className={`${styles.bubble} ${styles.vocalisBubble}`} style={{ opacity: 1, fontSize: isMobile ? '0.78rem' : '1rem', padding: isMobile ? '0.5rem 0.8rem' : '0.6rem 1rem' }}>No problem! Your Friday 10 AM — would Thursday at 3 PM work?</div>
                {!isMobile && (
                  <div className={styles.typing} style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}><span>Vocalis is speaking...</span></div>
                )}
              </div>
            </div>
            {!isMobile && (
              <div className={styles.phoneCard} style={{ 
                transform: `translateX(${isActive ? '0' : '50px'})`, 
                opacity: isActive ? 1 : 0, 
                transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s', 
                width: 'clamp(280px, 31vw, 420px)',
                height: 'clamp(400px, 55vh, 520px)',
                padding: '2.8rem'
              }}>
                <div className={styles.badge} style={{ background: '#f0fdf4', color: '#16a34a', marginBottom: '1.5rem', fontSize: '0.9rem' }}>🟢 Active — Prescription</div>
                <div style={{ fontWeight: 700, marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.2rem' }}>Sarah L. | Refill Request</div>
                <div className={styles.chatContainer} style={{ gap: '1rem' }}>
                  <div className={`${styles.bubble} ${styles.patientBubble}`} style={{ opacity: 1, fontSize: '1rem', padding: '0.75rem 1.25rem' }}>Hi, I need to refill my prescription for amoxicillin.</div>
                  <div className={`${styles.bubble} ${styles.vocalisBubble}`} style={{ opacity: 1, fontSize: '1rem', padding: '0.75rem 1.25rem' }}>I've sent the request to Dr. Kim for approval.</div>
                  <div className={styles.typing} style={{ fontSize: '0.9rem' }}><span>Vocalis is speaking...</span></div>
                </div>
              </div>
            )}
          </div>
        );
      case "languages":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <LanguageShowcase isActive={isActive} isMobile={isMobile} />
          </div>
        );
      case "hipaa":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <HIPAAShowcase isActive={isActive} isMobile={isMobile} />
          </div>
        );
      case "affordable":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            padding: isMobile ? '1rem' : '2rem',
            minHeight: 0
          }}>
            {/* Premium Card Container */}
            <div style={{
              width: '100%',
              maxWidth: isMobile ? '100%' : '760px',
              background: '#ffffff',
              borderRadius: isMobile ? '1.5rem' : '2rem',
              padding: isMobile ? '1.25rem 1rem' : '2.5rem 3rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)',
              border: '1px solid #edf2f7',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {!isMobile ? (
                /* Desktop Chart Layout */
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                  width: '100%',
                  height: '320px',
                  marginBottom: '2rem',
                  gap: '2.5rem'
                }}>
                  {[
                    { label: "In-House Receptionist", detail: "Avg. salary, benefits & overhead", end: 5000, gradient: "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)", height: '220px' },
                    { label: "Traditional Call Center", detail: "Per-minute fees & agency markup", end: 1500, gradient: "linear-gradient(180deg, #94a3b8 0%, #64748b 100%)", height: '100px' },
                    { label: "Vocalis", detail: "Your Affordable Option", end: 500, gradient: "linear-gradient(180deg, #2dd4bf 0%, #0d9488 100%)", isVocalis: true, height: '50px' }
                  ].map((bar, i) => (
                    <div key={bar.label} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: 1
                    }}>
                      {/* Flex wrapper for price + bar growing bottom-up */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: '260px',
                        width: '100%'
                      }}>
                        {/* Price Counter */}
                        <div style={{
                          fontWeight: 800,
                          color: bar.isVocalis ? '#0f766e' : '#475569',
                          fontSize: bar.isVocalis ? '1.4rem' : '1.15rem',
                          marginBottom: '8px',
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 0.3s ease 0.5s',
                          whiteSpace: 'nowrap'
                        }}>
                          {isActive ? (
                            <AnimatedCounter end={bar.end} prefix="$" suffix="/mo" isActive={isActive} duration={1200} />
                          ) : "$0/mo"}
                        </div>

                        {/* Chart Column */}
                        <div
                          onMouseEnter={() => setHoveredIndex(i)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          style={{
                            height: isActive ? bar.height : '0px',
                            width: '100%',
                            maxWidth: '75px',
                            background: bar.gradient,
                            borderRadius: '12px 12px 0 0',
                            transition: 'height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
                            boxShadow: bar.isVocalis && isActive ? '0 10px 25px rgba(20, 184, 166, 0.3)' : 'none',
                            transform: hoveredIndex === i ? 'scale(1.05)' : 'scale(1)',
                            filter: hoveredIndex === i ? 'brightness(1.05)' : 'brightness(1)',
                            cursor: 'pointer'
                          }}
                        />
                      </div>

                      {/* Primary Label */}
                      <div style={{
                        marginTop: '16px',
                        fontWeight: 800,
                        color: bar.isVocalis ? '#0d9488' : '#334155',
                        fontSize: '0.95rem',
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}>
                        {bar.label}
                      </div>

                      {/* Detail Subtitle */}
                      <div style={{
                        marginTop: '4px',
                        fontSize: '0.72rem',
                        color: '#94a3b8',
                        fontWeight: 600,
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}>
                        {bar.detail}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Mobile Layout - Clean Horizontal Rows */
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  {[
                    { label: "In-House Receptionist", detail: "Avg. salary, benefits & overhead", end: 5000, gradient: "linear-gradient(90deg, #cbd5e1 0%, #94a3b8 100%)", width: '100%' },
                    { label: "Traditional Call Center", detail: "Per-minute fees & agency markup", end: 1500, gradient: "linear-gradient(90deg, #94a3b8 0%, #64748b 100%)", width: '45%' },
                    { label: "Vocalis", detail: "Your Affordable Option", end: 500, gradient: "linear-gradient(90deg, #2dd4bf 0%, #0d9488 100%)", isVocalis: true, width: '22%' }
                  ].map((bar, i) => (
                    <div key={bar.label} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%'
                    }}>
                      {/* Top Label and Price Row */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '6px'
                      }}>
                        <span style={{
                          fontWeight: 800,
                          fontSize: '0.82rem',
                          color: bar.isVocalis ? '#0d9488' : '#334155'
                        }}>
                          {bar.label}
                        </span>
                        <span style={{
                          fontWeight: 900,
                          fontSize: '0.85rem',
                          color: bar.isVocalis ? '#0f766e' : '#475569'
                        }}>
                          {isActive ? (
                            <AnimatedCounter end={bar.end} prefix="$" suffix="/mo" isActive={isActive} duration={1200} />
                          ) : "$0/mo"}
                        </span>
                      </div>

                      {/* Growing Horizontal Bar */}
                      <div style={{
                        height: '14px',
                        width: isActive ? bar.width : '0%',
                        background: bar.gradient,
                        borderRadius: '99px',
                        boxShadow: bar.isVocalis && isActive ? '0 4px 12px rgba(20, 184, 166, 0.25)' : 'none',
                        transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }} />

                      {/* Detail Text */}
                      <span style={{
                        fontSize: '0.68rem',
                        color: '#94a3b8',
                        fontWeight: 500,
                        marginTop: '4px'
                      }}>
                        {bar.detail}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Prominent Savings Callout - Big, centered and mobile compliant */}
              {isActive && (
                <div className={styles.fadeInUp} style={{
                  animationDelay: '1.2s',
                  opacity: 0,
                  padding: isMobile ? '0.75rem 1.25rem' : '1rem 2.5rem',
                  fontSize: isMobile ? '1.05rem' : '1.35rem',
                  borderRadius: '16px',
                  border: '1px solid #bbf7d0',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  boxShadow: '0 8px 24px rgba(22,163,74,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginTop: isMobile ? '1rem' : '1.5rem',
                  position: 'static',
                  fontWeight: 800,
                  color: '#15803d',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: isMobile ? '100%' : '520px',
                  transformOrigin: 'center'
                }}>
                  <span>💰</span> You save <strong style={{ fontWeight: 900, color: '#166534', fontSize: isMobile ? '1.25rem' : '1.65rem' }}>$4,500/mo</strong> with Vocalis
                </div>
              )}
            </div>

            {/* Muted Footnote */}
            <div className={styles.footnote} style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.5s ease 1.5s',
              marginTop: '1.25rem',
              fontSize: isMobile ? '0.62rem' : '0.75rem',
              color: '#94a3b8',
              fontStyle: 'normal',
              textAlign: 'center'
            }}>
              Based on data from the VA, NIH, Salary.com
            </div>
          </div>
        );

      case "ehr":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <EHRShowcase isActive={isActive} isMobile={isMobile} />
          </div>
        );

      case "human":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <div className={styles.audioCard} style={{ 
              width: isMobile ? '100%' : 'clamp(400px, 70vw, 1000px)', 
              maxWidth: '100%',
              padding: isMobile ? '1.5rem' : 'clamp(2rem, 5vh, 4.5rem)',
              minHeight: 0
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '2rem', alignItems: 'center' }}>
                <Waveform isActive={isActive} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : 'clamp(1rem, 3vh, 2.5rem)', position: 'relative', zIndex: 2, marginTop: isMobile ? '1.5rem' : '3.5rem' }}>
                <div key={`h1-wrapper-${isActive}`} style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? '0.75rem' : '1.25rem', opacity: isActive ? 1 : 0, transition: 'opacity 0.5s ease 0.5s' }}>
                  <div className={styles.avatar} style={{ background: '#e6fffa', color: '#38b2ac', width: isMobile ? '36px' : '56px', height: isMobile ? '36px' : '56px', fontSize: isMobile ? '0.8rem' : '1.25rem', fontWeight: 800, border: '2px solid #38b2ac', boxShadow: '0 8px 20px rgba(56,178,172,0.15)', flexShrink: 0 }}>V</div>
                  <div className={`${styles.bubble} ${styles.vocalisBubble} ${isActive ? styles.fadeInUp : ""}`} style={{ animationDelay: '500ms', width: 'fit-content', maxWidth: '85%', padding: isMobile ? '0.75rem 1.25rem' : 'clamp(1rem, 2.5vh, 1.75rem) clamp(1.5rem, 3.5vw, 3rem)', margin: 0 }}>
                    <strong style={{ color: '#38b2ac', fontSize: isMobile ? '0.75rem' : '1rem', display: 'block', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>VOCALIS (AI)</strong>
                    <span style={{ fontSize: isMobile ? '0.82rem' : 'clamp(1.1rem, 1.4vw, 1.5rem)', lineHeight: '1.6' }}>"Good morning! This is Vocalis with Lakewood Family Clinic. How can I help you today?"</span>
                  </div>
                </div>
                
                <div key={`h2-wrapper-${isActive}`} style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? '0.75rem' : '1.25rem', justifyContent: 'flex-end', opacity: isActive ? 1 : 0, transition: 'opacity 0.5s ease 1.5s' }}>
                  <div className={`${styles.bubble} ${styles.patientBubble} ${isActive ? styles.fadeInUp : ""}`} style={{ animationDelay: '1500ms', width: 'fit-content', maxWidth: '85%', background: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0', padding: isMobile ? '0.75rem 1.25rem' : 'clamp(1rem, 2.5vh, 1.75rem) clamp(1.5rem, 3.5vw, 3rem)', margin: 0 }}>
                    <strong style={{ color: '#64748b', fontSize: isMobile ? '0.75rem' : '1rem', display: 'block', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>PATIENT</strong>
                    <span style={{ fontSize: isMobile ? '0.82rem' : 'clamp(1.1rem, 1.4vw, 1.5rem)', lineHeight: '1.6' }}>"Oh wow — I almost thought you were a real person!"</span>
                  </div>
                  <div className={styles.avatar} style={{ background: '#f1f5f9', color: '#64748b', width: isMobile ? '36px' : '56px', height: isMobile ? '36px' : '56px', fontSize: isMobile ? '0.8rem' : '1.25rem', fontWeight: 800, border: '2px solid #e2e8f0', flexShrink: 0 }}>P</div>
                </div>
              </div>

              {/* Decorative backgrounds */}
              {!isMobile && (
                <>
                  <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(56, 178, 172, 0.05) 0%, transparent 70%)', zIndex: 1 }} />
                  <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(246, 135, 179, 0.05) 0%, transparent 70%)', zIndex: 1 }} />
                </>
              )}
            </div>
          </div>
        );

      case "revenue":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <RevenueShowcase isActive={isActive} isMobile={isMobile} />
          </div>
        );

      case "satisfaction":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <div className={styles.reviewCard} style={{ 
              width: isMobile ? '100%' : 'clamp(500px, 80vw, 1100px)', 
              maxWidth: '100%', 
              padding: isMobile ? '1.5rem' : 'clamp(2.5rem, 6vh, 5rem)',
              minHeight: 0,
              transform: isMobile ? 'none' : 'scale(1.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '1rem' : '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span style={{ fontWeight: 800, color: '#64748b', fontSize: isMobile ? '0.75rem' : '1.25rem' }}>Google Review</span>
                </div>
              </div>
              <div className={styles.stars} style={{ gap: '0.4rem', marginBottom: isMobile ? '1rem' : '1.5rem', justifyContent: 'center' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={isActive ? styles.springPop : ""} style={{ animationDelay: `${i * 120}ms`, opacity: 0, fontSize: isMobile ? '1.5rem' : '2.5rem' }}>★</span>
                ))}
              </div>
              <div style={{ marginBottom: isMobile ? '1rem' : '1.5rem', textAlign: isMobile ? 'center' : 'left' }}>
                <strong style={{ fontSize: isMobile ? '1.1rem' : '1.75rem', color: '#1e293b' }}>Maria G.</strong> 
                <span style={{ color: '#94a3b8', marginLeft: '0.75rem', fontSize: isMobile ? '0.75rem' : '1.25rem' }}>2 days ago</span>
                <div style={{ display: isMobile ? 'block' : 'inline-block', background: '#f0fdf4', color: '#16a34a', fontSize: '0.7rem', padding: '0.2rem 0.8rem', borderRadius: '99px', marginLeft: isMobile ? '0' : '1.5rem', marginTop: isMobile ? '0.5rem' : '0', fontWeight: 800, width: isMobile ? 'fit-content' : 'auto', margin: isMobile ? '0.5rem auto 0' : '0 0 0 1.5rem' }}>✓ Verified Patient</div>
              </div>
              <p style={{ fontSize: isMobile ? '0.85rem' : '1.5rem', lineHeight: '1.6', color: '#334155', margin: 0, textAlign: isMobile ? 'center' : 'left' }}>
                "I called at 9 PM expecting voicemail. Instead I got an incredibly helpful assistant that booked my appointment, answered my insurance question, AND sent me a confirmation — all in under 2 minutes."
              </p>
            </div>
            <div className={styles.miniReviews} style={{ flexDirection: 'column', gap: '0.75rem', width: isMobile ? '100%' : 'auto', marginTop: isMobile ? '1rem' : '2rem', alignItems: 'center' }}>
              <div className={`${styles.miniCard} ${isActive ? styles.fadeInUp : ""}`} style={{ animationDelay: '1.5s', opacity: 0, fontSize: isMobile ? '0.7rem' : '1.1rem', padding: '0.5rem 1rem' }}>
                <strong>James T. ★★★★★</strong> — "Answered immediately."
              </div>
              <div className={`${styles.miniCard} ${isActive ? styles.fadeInUp : ""}`} style={{ animationDelay: '1.8s', opacity: 0, fontSize: isMobile ? '0.7rem' : '1.1rem', padding: '0.5rem 1rem' }}>
                <strong>Priya S. ★★★★★</strong> — "Habló conmigo en español."
              </div>
            </div>
          </div>
        );
      case "sick":
        return (
          <div style={{
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: isMobile ? 'flex-start' : 'center',
            paddingTop: isMobile ? '1.5rem' : '0',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <div className={styles.calendarWrapper} style={{ 
              gap: isMobile ? '0.75rem' : 'clamp(2rem, 6vw, 8rem)', 
              width: '100%', 
              justifyContent: 'center', 
              flexDirection: isMobile ? 'column' : 'row', 
              alignItems: 'center', 
              transform: isMobile ? 'none' : 'scale(1.15)',
              marginTop: isMobile ? '0.25rem' : '0'
            }}>
              <div className={styles.calendarCol} style={{ width: 'fit-content' }}>
                <div style={{ fontWeight: 800, color: '#64748b', marginBottom: isMobile ? '0.2rem' : '1.5rem', fontSize: isMobile ? '0.8rem' : '1.5rem', textAlign: 'center' }}>Staff</div>
                <div className={`${styles.calendarGrid} ${styles.traditionalGrid}`} style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: isMobile ? '4px' : '10px' }}>
                  {Array.from({ length: 35 }).map((_, i) => {
                    const isX = missedDays.includes(i);
                    return (
                      <div key={i} className={`${styles.calendarCell} ${isActive ? styles.springPop : ""} ${isX ? styles.shake : ""}`} style={{ 
                        animationDelay: `${i * 30}ms`, 
                        opacity: 0, 
                        color: isX ? '#ef4444' : '#94a3b8', 
                        fontWeight: isX ? 900 : 400,
                        border: isX ? '2px solid #fee2e2' : '1px solid #f1f5f9',
                        width: isMobile ? '28px' : 'clamp(24px, 4vw, 42px)',
                        height: isMobile ? '28px' : 'clamp(24px, 4vw, 42px)',
                        fontSize: isMobile ? '0.8rem' : 'clamp(0.75rem, 2.5vw, 1.25rem)'
                      }}>
                        {isX ? '✕' : '✓'}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className={styles.calendarCol} style={{ width: 'fit-content' }}>
                <div style={{ fontWeight: 800, color: '#38b2ac', marginBottom: isMobile ? '0.2rem' : '1.5rem', fontSize: isMobile ? '0.8rem' : '1.5rem', textAlign: 'center' }}>Vocalis</div>
                <div className={`${styles.calendarGrid} ${styles.vocalisGrid}`} style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: isMobile ? '3px' : '10px' }}>
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className={`${styles.calendarCell} ${isActive ? styles.springPop : ""}`} style={{ 
                      animationDelay: `${i * 25}ms`, 
                      opacity: 0, 
                      color: '#0d9488', 
                      fontWeight: 900,
                      border: isMobile ? '2px solid #ccfbf1' : '3px solid #ccfbf1',
                      width: isMobile ? '28px' : 'clamp(24px, 4vw, 42px)',
                      height: isMobile ? '28px' : 'clamp(24px, 4vw, 42px)',
                      fontSize: isMobile ? '0.8rem' : 'clamp(0.75rem, 2.5vw, 1.25rem)'
                    }}>✓</div>
                  ))}
                </div>
              </div>
            </div>
            {isActive && !isMobile && <div className={`${styles.badge} ${styles.fadeInUp}`} style={{ background: '#38b2ac', color: 'white', marginTop: '3.5rem', fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', padding: '0.75rem 2.5rem', animationDelay: '2s', opacity: 0, boxShadow: '0 15px 35px rgba(56, 178, 172, 0.4)', borderRadius: '99px' }}>100% Uptime</div>}
          </div>
        );

      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <div ref={containerRef} style={{ width: '100vw', height: '100svh', overflow: 'hidden', background: 'transparent', position: 'relative' }}>
        <section
        ref={carouselRef}
        onScroll={handleCarouselScroll}
        style={{
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          overscrollBehaviorX: 'contain',
          width: '100vw',
          height: '100svh',
        }}
      >
        {CAPABILITIES.map((cap, i) => (
            <div key={cap.id} style={{
              minWidth: '100vw',
              width: '100vw',
              height: '100svh',
              scrollSnapAlign: 'start',
              display: 'flex',
              flexDirection: 'column',
              padding: '2.5rem 1rem 1rem',
              boxSizing: 'border-box',
              overflow: 'hidden',
              background: 'transparent',
              justifyContent: 'flex-start'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10, marginBottom: '0.25rem' }}>
                <div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#94a3b8',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.1rem'
                  }}>
                    Vocalis can
                  </div>
                  <div style={{
                    fontSize: 'clamp(2.2rem, 9.5vw, 2.8rem)',
                    fontWeight: 800,
                    color: '#38b2ac',
                    lineHeight: 1.0,
                    letterSpacing: '-0.04em'
                  }}>
                    {cap.text}
                  </div>
                </div>
                <div style={{ 
                  fontSize: '1rem', 
                  color: '#cbd5e0', 
                  fontWeight: 800, 
                  marginTop: '0.2rem', 
                  flexShrink: 0, 
                  paddingLeft: '0.5rem'
                }}>
                  {i + 1}/{CAPABILITIES.length}
                </div>
              </div>
            {/* Visual - Stacked right under header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', minHeight: 0, overflow: 'hidden', width: '100%', padding: '0.25rem 0' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', transform: 'scale(1.05)' }}>
                {renderState(i, i === mobileIndex)}
              </div>
            </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', zIndex: 10, marginTop: '0.5rem' }}>
                <div style={{
                  fontSize: 'clamp(0.65rem, 2.8vw, 0.95rem)',
                  color: '#475569',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  lineHeight: 1.1,
                  fontWeight: 700,
                  maxWidth: '100%',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.02em'
                }}>
                  {cap.tagline}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  {CAPABILITIES.map((_, j) => (
                    <div
                      key={j}
                      onClick={() => {
                        carouselRef.current?.scrollTo({ left: j * carouselRef.current.offsetWidth, behavior: 'smooth' });
                      }}
                      style={{
                        width: mobileIndex === j ? '20px' : '6px',
                        height: '6px',
                        borderRadius: '3px',
                        background: mobileIndex === j ? '#38b2ac' : '#cbd5e0',
                        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>
          </div>
        ))}
      </section>

      {showSwipeHint && (
        <div style={{
          position: 'absolute',
          bottom: '5.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          animation: 'swipeHintFade 3s ease forwards',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#1e293b',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.6rem 1.4rem',
            borderRadius: '99px',
            letterSpacing: '0.01em',
            boxShadow: '0 10px 30px rgba(56, 178, 172, 0.15), 0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid rgba(56, 178, 172, 0.25)',
          }}>
            <span style={{
              display: 'inline-block',
              animation: 'swipeArrow 1.2s ease-in-out infinite',
              fontSize: '1rem'
            }}>👈</span>
            Swipe left to explore
          </div>
        </div>
      )}
    </div>
  );
}

  return (
    <div ref={containerRef} style={{ height: '1000vh' }}>
      <section
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          width: '100%',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          padding: 'clamp(1.5rem, 3vh, 3rem) clamp(2rem, 8%, 10%)',
          overflow: 'hidden',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      >
        {/* ROW 1: Header */}
        <div style={{ gridRow: 1, paddingBottom: 'clamp(0.5rem, 1.5vh, 1.5rem)' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
            fontWeight: 800,
            color: '#2d3748',
            margin: 0,
            lineHeight: 1.2
          }}>
            Vocalis can{' '}
            <span style={{ color: '#38b2ac' }}>
              <Typewriter key={activeIndex} text={CAPABILITIES[activeIndex].text} />
            </span>
          </h2>
        </div>
        {/* ROW 2: Visual — centered figure */}
        <div style={{
          gridRow: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 0,
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
        }}>
          {/* Progress bar */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            height: '3px',
            width: `${((activeIndex + 1) / CAPABILITIES.length) * 100}%`,
            background: 'linear-gradient(90deg, #38b2ac, #f687b3)',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 20
          }} />
          {/* The actual state visual */}
          {renderState(activeIndex, true)}
        </div>
        {/* ROW 3: Tagline */}
        <div style={{
          gridRow: 3,
          textAlign: 'center',
          fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
          color: '#64748b',
          paddingTop: 'clamp(0.5rem, 1vh, 1rem)',
          minHeight: '1.5em',
          fontStyle: 'italic'
        }}>
          {CAPABILITIES[activeIndex].tagline ?? ''}
        </div>
      </section>
    </div>
  );
};

export default VocalisCapabilities;
