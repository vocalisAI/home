import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import VideoDialog from "./VideoDialog";

const VideoContext = createContext({ open: () => {} });
export const useVideo = () => useContext(VideoContext);

/** One full-screen player for the whole site. Any "See it live" button calls open(). Nothing plays until someone clicks. */
export function VideoProvider({ children }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open }), [open]);
  return (
    <VideoContext.Provider value={value}>
      {children}
      <VideoDialog open={isOpen} onClose={close} />
    </VideoContext.Provider>
  );
}
