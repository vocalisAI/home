import React from "react";
import { useVideo } from "./VideoContext";
import { Play } from "./Icons";

/** The same button everywhere, so people keep meeting it. */
export default function SeeItLive({ variant = "glass", size, className = "" }) {
  const { open } = useVideo();
  return (
    <button type="button" className={`btn btn--${variant}${size === "sm" ? " btn--sm" : ""}${className ? ` ${className}` : ""}`} onClick={open}>
      <Play width={14} height={14} /> See it live
    </button>
  );
}
