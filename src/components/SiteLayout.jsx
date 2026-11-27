import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "../motion/useReducedMotion";
import { motionConfig } from "../motion/config";
import PageTransition from "../motion/PageTransition";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ChatWidget from "./ChatWidget.jsx";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
/* [NEW] View Transitions API helper for smooth anchor navigation */
import { runViewTransition } from "../motion/reveal.js";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const [showMobileBar, setShowMobileBar] = useState(false);

  /* [NEW] Smooth anchor transitions via View Transitions API with fallback */
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
        {/* [UPDATED] Motion AnimatePresence route transitions + PageTransition GSAP ScrollTrigger lifecycle */}
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
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
      <ChatWidget />
    </div>
  );
}
