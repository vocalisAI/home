import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import VideoDialog from "./VideoDialog";

const VideoContext = createContext({ open: () => {} });
export const useVideo = () => useContext(VideoContext);

/** One player for the whole site, mounted when a visitor opens it. */
export function VideoProvider({ children }) {
  const [isOpen, setOpen] = useState(false);
  const opener = useRef(null);
  const open = useCallback((event) => {
    opener.current = event.currentTarget;
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open }), [open]);
  return (
    <VideoContext.Provider value={value}>
      {children}
      {isOpen && <VideoDialog onClose={close} opener={opener.current} />}
    </VideoContext.Provider>
  );
}
