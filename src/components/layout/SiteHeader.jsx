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
  useEffect(() => setOpen(null), [location.key]);

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
    <nav className="nav" aria-label="Primary" ref={wrapRef} onBlur={(e) => {
      if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(null);
    }}>
      {NAV.map((item, i) =>
        item.items ? (
          <div className="nav__item" key={item.label}>
            <button
              type="button"
              className="nav__trigger"
              aria-expanded={open === item.label}
              aria-controls={`site-nav-${i}`}
              ref={(el) => (triggerRefs.current[item.label] = el)}
              onClick={() => setOpen(open === item.label ? null : item.label)}
            >
              {item.label}
              <Chevron className="nav__chev" width={16} height={16} />
            </button>
            <div className="nav__panel" id={`site-nav-${i}`} hidden={open !== item.label}>
              {item.items.map((s) => (
                <Link key={s.to} to={s.to}>
                  {s.label}
                  {s.note && <small>{s.note}</small>}
                </Link>
              ))}
            </div>
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

function MobileMenu() {
  const [openGroup, setOpenGroup] = useState(null);
  return (
    <div className="mobile-menu__content">
      <div className="container">
        <nav aria-label="Mobile">
          {NAV.map((item, i) =>
            item.items ? (
              <div className="mobile-menu__group" key={item.label}>
                <button
                  type="button"
                  className="mobile-menu__trigger"
                  aria-expanded={openGroup === item.label}
                  aria-controls={`mobile-nav-${i}`}
                  onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                >
                  {item.label}
                  <Chevron className="nav__chev" style={{ transform: openGroup === item.label ? "rotate(180deg)" : "none" }} />
                </button>
                <div className="mobile-menu__sub" id={`mobile-nav-${i}`} hidden={openGroup !== item.label}>
                  {item.items.map((s) => (
                    <Link key={s.to} to={s.to}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mobile-menu__group" key={item.label}>
                <NavLink className="mobile-menu__link" to={item.to}>
                  {item.label}
                </NavLink>
              </div>
            )
          )}
        </nav>
        <div className="mobile-menu__actions">
          <SeeItLive variant="ghost" />
          <Link className="btn btn--primary" to={DEMO_HREF}>
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
  const headerRef = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close on navigation.
  useEffect(() => setMenuOpen(false), [location.key]);

  // Escape closes the mobile menu; focus returns to the toggle.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDown = (e) => {
      if (!headerRef.current?.contains(e.target) && !e.target.closest("dialog")) setMenuOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape" && !e.defaultPrevented && !document.querySelector("dialog[open]")) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => {
      if (toggleRef.current?.getClientRects().length === 0) setMenuOpen(false);
    });
    resize?.observe(toggleRef.current);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      resize?.disconnect();
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`site-header${scrolled || menuOpen ? " is-scrolled" : ""}`} onBlur={(e) => {
      if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget) &&
          !e.relatedTarget.closest?.("dialog")) setMenuOpen(false);
    }}>
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
      <div className="mobile-menu" id="mobile-menu" hidden={!menuOpen}>
        {menuOpen && <MobileMenu />}
      </div>
    </header>
  );
}
