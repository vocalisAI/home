import React, { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { VideoProvider } from "../ui/VideoContext";
import { LEGACY_HASHES } from "../../data/site";
import { pageFor } from "../../data/pages";
import { updatePageHead } from "../../lib/seo";

function RouteContent() {
  const { pathname, hash, search, key } = useLocation();
  const previous = useRef(null);
  useEffect(() => updatePageHead(pageFor(pathname)), [pathname]);

  // This runs after lazy routes have committed, when their headings and anchors exist.
  useEffect(() => {
    const last = previous.current;
    previous.current = { pathname, hash, search, key };
    const main = document.getElementById("main");
    if (!main || last?.key === key) return;
    let target;
    if (hash && (last?.hash !== hash || last?.pathname !== pathname ||
        last?.search === search || !main.contains(document.activeElement))) {
      let id = hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Treat malformed fragments as literal IDs. */ }
      const anchor = document.getElementById(id);
      if (anchor && main.contains(anchor)) target = anchor.querySelector("h2, h3") || anchor;
    }
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start", behavior: "instant" });
    } else if (last && (last.pathname !== pathname || (!main.contains(document.activeElement) &&
        (last.search !== search || document.activeElement.closest("header"))))) {
      const heading = main.querySelector("h1") || main;
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash, search, key]);

  return <Outlet />;
}

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Old public anchors on the homepage keep working.
  if (pathname === "/" && LEGACY_HASHES[hash]) {
    return <Navigate to={LEGACY_HASHES[hash]} replace />;
  }

  return (
    <VideoProvider>
      <a className="skip-link" href="#main" onClick={(e) => {
        e.preventDefault();
        const main = document.getElementById("main");
        main?.focus({ preventScroll: true });
        main?.scrollIntoView({ block: "start", behavior: "instant" });
      }}>
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
          <RouteContent />
        </Suspense>
      </main>
      <SiteFooter />
    </VideoProvider>
  );
}
