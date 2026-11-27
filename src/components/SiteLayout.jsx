import { lazy, Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import DepthGauge from "./DepthGauge.jsx";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
import { initRevealObserver, runViewTransition } from "../motion/reveal.js";
import { trackEvent } from "../utils/analytics.js";

const ChatWidget = lazy(() => import("./ChatWidget.jsx"));

export default function SiteLayout() {
  const { pathname } = useLocation();
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [formFocused, setFormFocused] = useState(false);

  /* Smooth scroll-reveal observer across route changes (non-blocking if GSAP deferred) */
  useEffect(() => {
    const cleanup = initRevealObserver(document);
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [pathname]);

  /* Smooth anchor jumps using View Transitions API with graceful fallback */
  useEffect(() => {
    const onHashClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      runViewTransition(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", hash);
      });
    };
    document.addEventListener("click", onHashClick);
    return () => document.removeEventListener("click", onHashClick);
  }, []);

  /* Header scrolled class + mobile sticky bar threshold (after hero) */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      document.body.classList.toggle("has-scrolled", y > 24);
      setShowMobileBar(y > 460);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  /* Hide mobile bottom bar whenever a form field is focused so keyboard/fields stay unobstructed */
  useEffect(() => {
    const onFocusIn = (event) => {
      if (event.target.closest("form")) setFormFocused(true);
    };
    const onFocusOut = (event) => {
      if (event.target.closest("form")) {
        window.setTimeout(() => {
          const active = document.activeElement;
          setFormFocused(Boolean(active && active.closest("form")));
        }, 60);
      }
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const mobileBarVisible = showMobileBar && !formFocused;

  return (
    <div id="top" className="site-shell">
      <DepthGauge />
      <Header />
      <main id="main" key={pathname} className="page-transition-stage">
        <Outlet />
      </main>
      <Footer />

      <div
        className={`mobile-sticky-cta${mobileBarVisible ? " is-visible" : ""}`}
        aria-label="Quick contact"
        aria-hidden={!mobileBarVisible}
      >
        <a
          className="mobile-sticky-call"
          href={site.phoneLink}
          tabIndex={mobileBarVisible ? 0 : -1}
          onClick={() => trackEvent("click_to_call", { source: "mobile_sticky_bar" })}
        >
          <Icon name="phone" size={18} />
          <span>Call</span>
        </a>
        <Link
          className="mobile-sticky-estimate"
          to="/contact"
          tabIndex={mobileBarVisible ? 0 : -1}
          onClick={() => trackEvent("quote_click", { source: "mobile_sticky_bar" })}
        >
          <Icon name="arrowRight" size={18} />
          <span>Free Quote</span>
        </Link>
      </div>

      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}
