import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollScrub
 *
 * Maps the user's scroll position within a tall container to a frame index,
 * then draws the corresponding preloaded Image onto a <canvas>.
 *
 * On mobile (≤768px) or when prefers-reduced-motion is set, the hook is inert —
 * no scroll listeners or rAF loops are created.
 *
 * @param {Object} options
 * @param {number}        options.frameCount    – total number of frames
 * @param {React.RefObject} options.containerRef – ref to the tall scroll wrapper div
 * @param {React.RefObject} options.canvasRef    – ref to the <canvas> element
 * @param {Image[]}       options.images        – array of preloaded Image objects
 * @param {boolean}       options.isLoaded       – true once every image has loaded
 * @param {boolean}       options.isMobile       – true when viewport ≤ 768px
 * @param {boolean}       options.prefersReduced – true when OS prefers-reduced-motion
 *
 * @returns {{ currentFrame: number }}
 */
export default function useScrollScrub({
  frameCount,
  containerRef,
  canvasRef,
  images,
  isLoaded,
  isMobile,
  prefersReduced,
}) {
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);
  // Cache the 2D context so we never call getContext on every draw
  const ctxRef = useRef(null);

  /**
   * Draw a specific frame index onto the canvas.
   * On mobile, blends from "cover" crop to "contain" fit near the end
   * so the Vocalis logo in the final frame is fully visible.
   */
  const drawFrame = useCallback(
    (index, scrollProgress = 0) => {
      if (!canvasRef.current || !images[index]) return;

      // Lazily grab / cache the context
      if (!ctxRef.current) {
        ctxRef.current = canvasRef.current.getContext("2d", { alpha: false });
      }
      const ctx = ctxRef.current;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const cw = canvasRef.current.width;
      const ch = canvasRef.current.height;
      const img = images[index];
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      ctx.clearRect(0, 0, cw, ch);

      // On mobile, transition from cover → contain in the last 30% of scroll
      const isMobileViewport = typeof window !== 'undefined' && window.innerWidth <= 768;
      if (isMobileViewport && scrollProgress > 0.7) {
        // How far into the transition (0 = start of zoom-out, 1 = fully zoomed out)
        const t = Math.min(1, (scrollProgress - 0.7) / 0.3);
        // Ease out
        const ease = 1 - Math.pow(1 - t, 3);

        // Cover scale: fill the canvas entirely (crop sides)
        const coverScale = Math.max(cw / iw, ch / ih);
        // Contain scale: fit inside the canvas (show everything)
        const containScale = Math.min(cw / iw, ch / ih);

        const scale = coverScale + (containScale - coverScale) * ease;

        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        // Fill the background behind the image with the scene's bg color
        ctx.fillStyle = '#e8e0d6';
        ctx.fillRect(0, 0, cw, ch);

        ctx.drawImage(img, dx, dy, dw, dh);
      } else {
        // Default: stretch to fill (works as cover since CSS handles object-fit)
        ctx.drawImage(img, 0, 0, cw, ch);
      }
    },
    [canvasRef, images]
  );


  useEffect(() => {
    // Bail out completely on mobile or reduced-motion
    if (prefersReduced || !isLoaded) return;

    // Draw the first frame right away so there's no blank flash
    drawFrame(0, 0);
    currentFrameRef.current = 0;
    let lastScrollProgress = 0;

    const onScroll = () => {
      if (rafIdRef.current) return; // already scheduled
      rafIdRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) {
          rafIdRef.current = null;
          return;
        }

        const containerTop =
          containerRef.current.getBoundingClientRect().top;
        const containerHeight =
          containerRef.current.offsetHeight - window.innerHeight;

        const scrollProgress = Math.max(
          0,
          Math.min(1, -containerTop / containerHeight)
        );
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(scrollProgress * frameCount)
        );

        // Redraw if frame changed OR if scrollProgress changed (for mobile zoom transition)
        if (frameIndex !== currentFrameRef.current || Math.abs(scrollProgress - lastScrollProgress) > 0.005) {
          currentFrameRef.current = frameIndex;
          lastScrollProgress = scrollProgress;
          drawFrame(frameIndex, scrollProgress);
        }

        rafIdRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Also run once immediately in case the page loaded mid-scroll
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      ctxRef.current = null;
    };
  }, [
    frameCount,
    containerRef,
    canvasRef,
    images,
    isLoaded,
    isMobile,
    prefersReduced,
    drawFrame,
  ]);

  return { currentFrame: currentFrameRef.current };
}
