import React, { useState, useEffect, useRef, useCallback } from "react";
import useScrollScrub from "../../hooks/useScrollScrub";
import styles from "../../scss/WhatIsVocalis.module.scss";

const FRAME_COUNT = 90;
const FRAME_WIDTH = 1024;
const FRAME_HEIGHT = 1024;

const getFramePath = (i) =>
  `/frames/anatomy/transition_${String(i + 1).padStart(3, "0")}.jpg`;

// getFramePath(0) and getFramePath(FRAME_COUNT - 1) removed as unused constants

const WhatIsVocalis = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 992px)");
    setIsMobile(mqMobile.matches);
    const handleMobile = (e) => setIsMobile(e.matches);
    mqMobile.addEventListener("change", handleMobile);

    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mqMotion.matches);
    const handleMotion = (e) => setPrefersReduced(e.matches);
    mqMotion.addEventListener("change", handleMotion);

    return () => {
      mqMobile.removeEventListener("change", handleMobile);
      mqMotion.removeEventListener("change", handleMotion);
    };
  }, []);

  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const preloadImages = useCallback(() => {
    const imgs = new Array(FRAME_COUNT);
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === FRAME_COUNT) {
        setImages(imgs);
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = handleLoad;
      img.onerror = handleLoad;
      imgs[i] = img;
    }
  }, []);

  useEffect(() => {
    if (!prefersReduced) {
      preloadImages();
    }
  }, [prefersReduced, preloadImages]);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useScrollScrub({
    frameCount: FRAME_COUNT,
    containerRef,
    canvasRef,
    images,
    isLoaded,
    isMobile,
    prefersReduced,
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isMobile || prefersReduced) return;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, prefersReduced]);

  const showFirstText = scrollProgress < 0.5;

  const firstText = (
    <>
      <h2 className={styles.definitionHeader}>vocalis</h2>
      <p className={styles.phonetic}>/ˈvoʊkælɪs/ — [vo·cal·is]</p>
      <p className={styles.bodyText}>
        The vocalis is the thin, innermost muscle of the vocal folds that regulates vocal cord tension and pitch.
      </p>
    </>
  );

  const secondText = (
    <>
      <p className={styles.bodyText}>
        We chose the name <strong>Vocalis</strong> because we build leading voice production models with hyper-realistic, human-centered speech. Just as the vocalis muscle fine-tunes pitch and tone, our technology refines communication — helping healthcare systems sound clear, natural, and present at every moment.
      </p>
    </>
  );

  const [mobileFrame, setMobileFrame] = useState(0);
  const mobileIntervalRef = useRef(null);
  const mobileSectionRef = useRef(null);

  useEffect(() => {
    if (!isMobile || prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Play once or loop? User said "like how the animation is". 
          // Let's do a smooth loop or a ping-pong.
          let frame = 0;
          let direction = 1;
          mobileIntervalRef.current = setInterval(() => {
            setMobileFrame(frame);
            frame += direction;
            if (frame >= FRAME_COUNT - 1 || frame <= 0) {
              direction *= -1;
            }
          }, 45); // ~22fps
        } else {
          if (mobileIntervalRef.current) clearInterval(mobileIntervalRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (mobileSectionRef.current) observer.observe(mobileSectionRef.current);
    return () => {
      if (mobileIntervalRef.current) clearInterval(mobileIntervalRef.current);
      observer.disconnect();
    };
  }, [isMobile, prefersReduced]);

  if (isMobile || prefersReduced) {
    return (
      <section id="what-is-vocalis" className={styles.mobileWrapper} ref={mobileSectionRef}>
        <div className={styles.mobileImageWrap} style={{ position: 'relative', aspectRatio: '1/1' }}>
          <img
            src={getFramePath(mobileFrame)}
            alt="Vocalis muscle anatomy transition"
            className={styles.mobileImage}
            style={{ 
              width: '100%', 
              height: 'auto',
              mixBlendMode: 'multiply'
            }}
          />
        </div>
        <div className={styles.mobileTextWrap}>
          <div className={styles.mobileTextSection}>{firstText}</div>
          <div className={styles.mobileTextSection}>{secondText}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="what-is-vocalis" className={styles.wrapper} ref={containerRef}>
      <div className={styles.sticky}>
        {/* Left Side: Canvas Animation */}
        <div className={styles.canvasContainer}>
          <canvas
            ref={canvasRef}
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT}
            className={`${styles.canvas} ${isLoaded ? styles.canvasVisible : ""}`}
            style={{
              transform: `scale(${1 + scrollProgress * 0.15})`,
              transformOrigin: 'center center'
            }}
            aria-label="Scroll-driven animation showing the vocalis muscle glowing red"
            role="img"
          />
        </div>

        {/* Right Side: Fading Text */}
        <div className={styles.textContainer}>
          <div
            className={`${styles.textSection} ${
              showFirstText ? styles.textSectionVisible : ""
            }`}
          >
            {firstText}
          </div>
          <div
            className={`${styles.textSection} ${
              !showFirstText ? styles.textSectionVisible : ""
            }`}
          >
            {secondText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsVocalis;
