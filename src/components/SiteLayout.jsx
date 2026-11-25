import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "../motion/useReducedMotion";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const [showMobileBar, setShowMobileBar] = useState(false);

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
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <motion.div
        className="mobile-sticky-cta"
        aria-label="Quick contact"
        initial={false}
        animate={showMobileBar ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!showMobileBar}
      >
        <a className="mobile-sticky-call" href={site.phoneLink} tabIndex={showMobileBar ? 0 : -1}><Icon name="phone" size={18} />Call</a>
        <Link className="mobile-sticky-estimate" to="/contact" tabIndex={showMobileBar ? 0 : -1}><Icon name="arrowRight" size={18} />Free estimate</Link>
      </motion.div>
    </div>
  );
}
