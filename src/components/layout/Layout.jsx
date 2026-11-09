import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { VideoProvider } from "../ui/VideoContext";
import { LEGACY_HASHES } from "../../data/site";

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Scroll to a hash target, or to the top on a new page.
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hash) {
      let id = hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Treat malformed fragments as literal IDs. */ }
      // Wait a frame so lazily rendered sections exist.
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    return undefined;
  }, [pathname, hash]);

  // Old public anchors on the homepage keep working.
  if (pathname === "/" && LEGACY_HASHES[hash]) {
    return <Navigate to={LEGACY_HASHES[hash]} replace />;
  }

  return (
    <VideoProvider>
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} key={pathname} style={{ outline: "none" }}>
        <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
    </VideoProvider>
  );
}
