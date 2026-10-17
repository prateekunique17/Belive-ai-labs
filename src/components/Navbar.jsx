import { useState, useEffect } from "react";
import BelieveLogo from "./BelieveLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);

      const sections = ["home", "purpose"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-hero-top"}`}>
      {/* Brand on left: blends seamlessly with the hero banner at top, appears when scrolled */}
      <a
        href="#home"
        className={`navbar-brand-link ${!scrolled ? "brand-at-top" : ""}`}
        aria-label="Believe AI Labs Home"
      >
        <BelieveLogo size="small" showSubtitle={true} />
      </a>

      {/* Navigation Links on right */}
      <nav className="navbar-nav">
        <a
          href="#home"
          className={`nav-link ${activeSection === "home" ? "active" : ""}`}
        >
          HOME
        </a>
        <a
          href="#purpose"
          className={`nav-link ${activeSection === "purpose" ? "active" : ""}`}
        >
          ABOUT
        </a>

        <a href="#purpose" className="join-btn">
          <span>JOIN US</span>
        </a>
      </nav>
    </header>
  );
}