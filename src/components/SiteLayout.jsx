import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../motion/useReducedMotion";
import { motionConfig } from "../motion/config";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
/* [NEW] Vanilla JS IntersectionObserver & View Transitions helper */
import { initRevealObserver, runViewTransition } from "../motion/reveal.js";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const [showMobileBar, setShowMobileBar] = useState(false);

  /* [NEW] Initialize one-shot scroll reveals on route navigation */
  useEffect(() => {
    return initRevealObserver(document);
  }, [pathname]);

  /* [NEW] Smooth anchor transitions via View Transitions API with graceful fallback */
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

  useEffect(() => {
    if (pathname === "/") {
      const onScroll = () => document.body.classList.toggle("has-scrolled", window.scrollY > 24);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }
    document.body.classList.remove("has-scrolled");
    return undefined;
  }, [pathname]);

  useEffect(() => {
    const updateMobileBar = () => setShowMobileBar(window.scrollY > 420);
    updateMobileBar();
    window.addEventListener("scroll", updateMobileBar, { passive: true });
    return () => window.removeEventListener("scroll", updateMobileBar);
  }, [pathname]);

  return (
    <div id="top" className="site-shell">
      <Header />
      <main id="main">
        {/* [UPDATED] CSS fade stage fallback for route transitions */}
        <div key={pathname} className="page-transition-stage">
          <Outlet />
        </div>
      </main>
      <Footer />
      <motion.div
        className="mobile-sticky-cta"
        aria-label="Quick contact"
        initial={false}
        animate={showMobileBar ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : motionConfig.duration.ui, ease: motionConfig.ease }}
        aria-hidden={!showMobileBar}
      >
        <a className="mobile-sticky-call" href={site.phoneLink} tabIndex={showMobileBar ? 0 : -1}><Icon name="phone" size={18} />Call</a>
        <Link className="mobile-sticky-estimate" to="/contact" tabIndex={showMobileBar ? 0 : -1}><Icon name="arrowRight" size={18} />Free estimate</Link>
      </motion.div>
    </div>
  );
}
