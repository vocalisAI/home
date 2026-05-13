import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollSnap
 * 
 * Provides "soft" scroll snapping. 
 * If the user performs a high-velocity scroll (a "flick"), the page snaps to the next 
 * predefined checkpoint. If they scroll slowly, they can still scrub freely.
 * 
 * @param {Object} options
 * @param {Array<number>} options.snapPoints - Array of scroll Y positions (px) to snap to.
 * @param {number}        options.threshold  - Velocity threshold (px per wheel event) to trigger snap.
 */
export default function useScrollSnap({ snapPoints, threshold = 50 }) {
  const isSnapping = useRef(false);
  const lastWheelTime = useRef(0);
  const touchStartY = useRef(0);

  const getNextSnapPoint = (currentY, deltaY) => {
    if (deltaY > 0) {
      // Scrolling down
      return snapPoints.find(p => p > currentY + 10);
    } else {
      // Scrolling up
      return [...snapPoints].reverse().find(p => p < currentY - 10);
    }
  };

  const handleWheel = useCallback((e) => {
    // If we are already animating a snap, ignore
    if (isSnapping.current) return;

    const deltaY = e.deltaY;
    const absDelta = Math.abs(deltaY);

    // Only trigger on high-velocity "flicks"
    if (absDelta > threshold) {
      const now = Date.now();
      // Debounce: ignore multiple rapid flicks
      if (now - lastWheelTime.current < 500) return;

      const currentY = window.scrollY;
      const targetY = getNextSnapPoint(currentY, deltaY);

      if (targetY !== undefined) {
        isSnapping.current = true;
        lastWheelTime.current = now;

        window.scrollTo({
          top: targetY,
          behavior: "smooth"
        });

        // Unlock after the animation likely finished
        setTimeout(() => {
          isSnapping.current = false;
        }, 1000);

        // Prevent the native scroll from adding to the smooth scroll
        e.preventDefault();
      }
    }
  }, [snapPoints, threshold]);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (isSnapping.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY; // Positive = scrolling down
    const absDelta = Math.abs(deltaY);

    if (absDelta > threshold * 2) { // Higher threshold for touch
      const currentY = window.scrollY;
      const targetY = getNextSnapPoint(currentY, deltaY);

      if (targetY !== undefined) {
        isSnapping.current = true;
        window.scrollTo({
          top: targetY,
          behavior: "smooth"
        });
        setTimeout(() => { isSnapping.current = false; }, 1000);
      }
    }
  }, [snapPoints, threshold]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd]);
}
