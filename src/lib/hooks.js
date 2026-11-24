import { useCallback, useSyncExternalStore } from "react";

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useMediaQuery(query) {
  const subscribe = useCallback((onChange) => {
    const media = window.matchMedia?.(query);
    media?.addEventListener("change", onChange);
    return () => media?.removeEventListener("change", onChange);
  }, [query]);
  return useSyncExternalStore(subscribe, () => window.matchMedia?.(query).matches ?? false, () => false);
}
