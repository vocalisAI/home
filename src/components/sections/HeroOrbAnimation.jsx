import React, { useState, useEffect, useRef, useCallback } from "react";
import useScrollScrub from "../../hooks/useScrollScrub";
import styles from "../../scss/HeroOrbAnimation.module.scss";

/* ──────────────────────────────────────────────
   Constants
   ────────────────────────────────────────────── */
const FRAME_COUNT = 192;
const FRAME_WIDTH = 1714;
const FRAME_HEIGHT = 964;

const getFramePath = (i) =>
  `/orb-frames/frame_${String(i + 1).padStart(3, "0")}.jpg`;

/* First frame — used as placeholder while desktop frames preload */
const START_FRAME_PATH = getFramePath(0);
/* Last frame — used as static fallback on mobile / reduced-motion */
const END_FRAME_PATH = getFramePath(FRAME_COUNT - 1);

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
const HeroOrbAnimation = ({ onProgressChange }) => {
  /* ── Responsive & a11y detection ──────────── */
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 768px)");
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

  /* ── Frame preloading (desktop only) ──────── */
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const preloadImages = useCallback(() => {
    const imgs = new Array(FRAME_COUNT);
    const loadedRef = { count: 0 };
    const step = isMobile ? 3 : 1;
    const targetCount = Math.ceil(FRAME_COUNT / step);

    const handleLoad = () => {
      loadedRef.count++;
      setLoadProgress(Math.round((loadedRef.count / targetCount) * 100));
      if (loadedRef.count === targetCount) {
        // Fill the gaps for skipped frames
        for (let i = 0; i < FRAME_COUNT; i++) {
          if (!imgs[i]) {
            const nearest = Math.floor(i / step) * step;
            imgs[i] = imgs[nearest];
          }
        }
        setImages(imgs);
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i += step) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = handleLoad;
      img.onerror = handleLoad;
      imgs[i] = img;
    }
  }, [isMobile]);

  useEffect(() => {
    if (!prefersReduced) {
      preloadImages();
    }
  }, [prefersReduced, preloadImages]);

  /* ── Refs ──────────────────────────────────── */
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  /* ── Scroll-scrub hook ────────────────────── */
  useScrollScrub({
    frameCount: FRAME_COUNT,
    containerRef,
    canvasRef,
    images,
    isLoaded,
    isMobile,
    prefersReduced,
  });

  /* ── Draw first frame immediately once loaded */
  useEffect(() => {
    if (isLoaded && canvasRef.current && images[0]) {
      const ctx = canvasRef.current.getContext("2d", { alpha: false });
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(images[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [isLoaded, images]);

  /* ── Track scroll progress for CTA fade-in & navbar hide ── */
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (prefersReduced) {
      if (onProgressChange) onProgressChange(1);
      return;
    }

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      setScrollProgress(progress);
      if (onProgressChange) onProgressChange(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once on mount
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, prefersReduced, onProgressChange]);

  /* CTAs become visible in the last 20% of the scroll */
  const ctaVisible = scrollProgress > 0.8;

  /* ── CTA buttons (shared) ─────────────────── */
  const ctaButtons = (
    <div className={styles.ctaGroup}>
      <a href="#contact" className={styles.cta}>
        Book a Demo
      </a>
      <a href="#contact" className={styles.ctaSecondary}>
        Hear a Sample Call
      </a>
    </div>
  );

  /* ─────────────────────────────────────────────
     MOBILE — static text hero (no scroll animation)
     ───────────────────────────────────────────── */
  if (isMobile || prefersReduced) {
    return (
      <section id="hero" className={styles.mobileWrapper}>
        <div className={styles.mobileHeroContent}>
          <span className={styles.mobileEyebrow}>Introducing</span>
          <h1 className={styles.mobileHeadline}>
            Vocalis
          </h1>
          <p className={styles.mobileSubheadline}>
            Your HIPAA-Compliant Receptionist
          </p>
          <p className={styles.mobileDescription}>
            AI-powered phone reception that answers every call, books appointments, and never takes a day off.
          </p>
          <div className={styles.mobileCta}>{ctaButtons}</div>
        </div>
      </section>
    );
  }


  /* ─────────────────────────────────────────────
     DESKTOP — full-screen scroll-driven canvas
     ───────────────────────────────────────────── */
  return (
    <section id="hero" className={styles.wrapper} ref={containerRef}>
      <div className={styles.sticky}>
        {/* Placeholder — visible while frames load */}
        <div
          className={`${styles.placeholder} ${isLoaded ? styles.placeholderHidden : ""}`}
          style={{ backgroundImage: `url(${START_FRAME_PATH})` }}
          aria-hidden="true"
        >
          {!isLoaded && (
            <div className={styles.loadingIndicator}>
              <div className={styles.loadingBar}>
                <div
                  className={styles.loadingFill}
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className={styles.loadingText}>
                Loading experience… {loadProgress}%
              </span>
            </div>
          )}
        </div>

        {/* Full-screen canvas */}
        <canvas
          ref={canvasRef}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          className={`${styles.canvas} ${isLoaded ? styles.canvasVisible : ""}`}
          aria-label="Scroll-driven animation showing a glowing orb in a clinic lobby"
          role="img"
        />

        {/* Floating CTAs that fade in near the end of the animation */}
        <div
          className={`${styles.floatingCta} ${ctaVisible ? styles.floatingCtaVisible : ""}`}
        >
          {ctaButtons}
        </div>

        {/* Scroll hint at the very start */}
        {scrollProgress < 0.05 && isLoaded && (
          <div className={styles.scrollHint}>
            <span className={styles.scrollHintText}>Scroll to explore</span>
            <div className={styles.scrollHintChevron}>
              <i className="fas fa-chevron-down" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroOrbAnimation;
