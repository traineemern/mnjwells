import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";

export default function SiteLayout() {
  const { pathname } = useLocation();

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

  return (
    <div id="top" className="site-shell">
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <div className="mobile-sticky-cta" aria-label="Quick contact">
        <a className="mobile-sticky-call" href={site.phoneLink}><Icon name="phone" size={18} />Call</a>
        <Link className="mobile-sticky-estimate" to="/contact"><Icon name="arrowRight" size={18} />Free estimate</Link>
      </div>
    </div>
  );
}
