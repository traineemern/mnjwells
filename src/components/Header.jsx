import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
import { trackEvent } from "../utils/analytics.js";
import PictureAsset from "./PictureAsset.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQs" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const focusable = panel ? panel.querySelectorAll('a[href], button:not([disabled])') : [];
    focusable[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === "Tab" && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="header-inner page-wrap">
        <Link className="brand" to="/" aria-label="M&J Water Wells home">
          <PictureAsset
            base="logo"
            alt={site.name}
            width={204}
            height={105}
            loading="eager"
            className="brand-logo-image"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="header-call"
            href={site.phoneLink}
            onClick={() => trackEvent("click_to_call", { source: "header" })}
          >
            <Icon name="phone" size={16} />
            <span>{site.phone}</span>
          </a>
          <Link
            className="header-cta"
            to="/contact"
            onClick={() => trackEvent("quote_click", { source: "header" })}
          >
            <span>Get a Free Quote</span>
            <Icon name="arrowRight" size={15} />
          </Link>
        </div>

        <button
          ref={triggerRef}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} size={23} />
        </button>
      </div>

      {open ? (
        <button
          className="mobile-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <nav
        ref={panelRef}
        id="mobile-navigation"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-modal={open ? "true" : undefined}
        role={open ? "dialog" : undefined}
        aria-hidden={!open}
      >
        <div className="mobile-nav-top">
          <strong>Explore</strong>
          <button
            type="button"
            className="icon-button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          >
            <Icon name="close" />
          </button>
        </div>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
          >
            {label}
            <Icon name="arrowRight" size={18} />
          </NavLink>
        ))}
        <a
          className="button button-primary mobile-nav-cta"
          href={site.phoneLink}
          onClick={() => trackEvent("click_to_call", { source: "mobile_menu" })}
        >
          <Icon name="phone" size={17} /> Call {site.phone}
        </a>
      </nav>
    </header>
  );
}
