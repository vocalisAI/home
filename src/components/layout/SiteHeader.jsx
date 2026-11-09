import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV, DEMO_HREF } from "../../data/site";
import { Chevron, Menu, Close } from "../ui/Icons";
import SeeItLive from "../ui/SeeItLive";

function DesktopNav() {
  const [open, setOpen] = useState(null);
  const wrapRef = useRef(null);
  const triggerRefs = useRef({});
  const location = useLocation();
  useEffect(() => setOpen(null), [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (open === null) return undefined;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        triggerRefs.current[open]?.focus();
        setOpen(null);
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav className="nav" aria-label="Primary" ref={wrapRef}>
      {NAV.map((item) =>
        item.items ? (
          <div className="nav__item" key={item.label}>
            <button
              type="button"
              className="nav__trigger"
              aria-expanded={open === item.label}
              aria-controls={`menu-${item.label}`}
              ref={(el) => (triggerRefs.current[item.label] = el)}
              onClick={() => setOpen(open === item.label ? null : item.label)}
            >
              {item.label}
              <Chevron className="nav__chev" width={16} height={16} />
            </button>
            {open === item.label && (
              <div className="nav__panel" id={`menu-${item.label}`}>
                {item.items.map((s) => (
                  <Link key={s.to} to={s.to} onClick={() => setOpen(null)}>
                    {s.label}
                    {s.note && <small>{s.note}</small>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <NavLink key={item.label} to={item.to} className="nav__link">
            {item.label}
          </NavLink>
        )
      )}
    </nav>
  );
}

function MobileMenu({ onClose }) {
  const [openGroup, setOpenGroup] = useState(null);
  return (
    <div className="mobile-menu" id="mobile-menu">
      <div className="container">
        <nav aria-label="Mobile">
          {NAV.map((item) =>
            item.items ? (
              <div className="mobile-menu__group" key={item.label}>
                <button
                  type="button"
                  className="mobile-menu__trigger"
                  aria-expanded={openGroup === item.label}
                  onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                >
                  {item.label}
                  <Chevron className="nav__chev" style={{ transform: openGroup === item.label ? "rotate(180deg)" : "none" }} />
                </button>
                {openGroup === item.label && (
                  <div className="mobile-menu__sub">
                    {item.items.map((s) => (
                      <Link key={s.to} to={s.to} onClick={onClose}>
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mobile-menu__group" key={item.label}>
                <Link className="mobile-menu__link" to={item.to} onClick={onClose}>
                  {item.label}
                </Link>
              </div>
            )
          )}
        </nav>
        <div className="mobile-menu__actions">
          <SeeItLive variant="ghost" />
          <Link className="btn btn--primary" to={DEMO_HREF} onClick={onClose}>
            Book a demo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const location = useLocation();
  const wasOpen = useRef(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close on navigation.
  useEffect(() => setMenuOpen(false), [location.pathname, location.search, location.hash]);

  // Escape closes the mobile menu; focus returns to the toggle.
  useEffect(() => {
    if (!menuOpen) {
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return undefined;
    }
    wasOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = [...document.querySelectorAll("main, footer")];
    const previousInert = background.map((el) => el.inert);
    background.forEach((el) => { el.inert = true; });
    const focusable = () => [...headerRef.current.querySelectorAll('a[href], button')].filter((el) => el.getClientRects().length && !el.disabled);
    headerRef.current.querySelector(".mobile-menu button, .mobile-menu a")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
      if (e.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1080px)");
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.body.style.overflow = previousOverflow;
      background.forEach((el, i) => { el.inert = previousInert[i]; });
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`site-header${scrolled || menuOpen ? " is-scrolled" : ""}`}>
      <div className="container site-header__bar">
        <Link to="/" className="brand" aria-label="Vocalis home">
          <img src="/brand/vocalis-mark-256.png" alt="" width="38" height="34" />
          Vocalis
        </Link>
        <DesktopNav />
        <SeeItLive variant="ghost" size="sm" className="site-header__live" />
        <Link className="btn btn--primary btn--sm site-header__cta" to={DEMO_HREF}>
          Book a demo
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <Close /> : <Menu />}
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
