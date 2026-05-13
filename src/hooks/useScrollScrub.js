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
   */
  const drawFrame = useCallback(
    (index) => {
      if (!canvasRef.current || !images[index]) return;

      // Lazily grab / cache the context
      if (!ctxRef.current) {
        ctxRef.current = canvasRef.current.getContext("2d", { alpha: false });
      }
      const ctx = ctxRef.current;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(images[index], 0, 0, canvasRef.current.width, canvasRef.current.height);
    },
    [canvasRef, images]
  );

  useEffect(() => {
    // Bail out completely on mobile or reduced-motion
    if (prefersReduced || !isLoaded) return;

    // Draw the first frame right away so there's no blank flash
    drawFrame(0);
    currentFrameRef.current = 0;

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

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
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
