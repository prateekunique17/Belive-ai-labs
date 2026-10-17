/**
 * Footer — Believe AI Labs
 *
 * To add a LinkedIn URL, paste it into LINKEDIN_URL below.
 */
const LINKEDIN_URL = "https://www.linkedin.com/company/believeailabs/posts/?viewAsMember=true"; // ← paste your LinkedIn URL here, e.g. "https://www.linkedin.com/company/believe-ai-labs"

const NAV_LINKS = [
  { label: "HOME",     href: "#top" },
  { label: "ABOUT",    href: "#purpose" },
  { label: "PROJECTS", href: "#purpose" },
  { label: "MEMBERS",  href: "#members" },
  { label: "JOIN US",  href: "#join" },
  { label: "CONTACT",  href: "#contact" },
];

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.96 0-1.74.77-1.74 1.73a1.74 1.74 0 0 0 1.74 1.73c.95 0 1.73-.77 1.73-1.73 0-.96-.78-1.73-1.73-1.73Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">

        {/* ── LEFT: Brand ── */}
        <div className="footer-brand">
          <img
            src="/images/believe-logo-full.jpg"
            alt="Believe AI Labs"
            className="footer-logo-img"
            draggable="false"
          />
          <div className="footer-brand-text">
            <span className="footer-brand-name">BELIEVE AI LABS</span>
            <span className="footer-brand-tagline">IDEAS · PEOPLE · TECHNOLOGY</span>
            <span className="footer-brand-tagline">A BETTER TOMORROW</span>
          </div>
        </div>

        {/* ── CENTER: Navigation ── */}
        <nav className="footer-nav" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="footer-nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── RIGHT: LinkedIn + Copyright ── */}
        <div className="footer-right">
          {LINKEDIN_URL ? (
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-linkedin-btn"
              aria-label="Believe AI Labs on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          ) : (
            <span
              className="footer-linkedin-btn footer-linkedin-placeholder"
              title="LinkedIn URL not yet configured — set LINKEDIN_URL in Footer.jsx"
              aria-label="LinkedIn (URL not yet configured)"
            >
              <LinkedInIcon />
            </span>
          )}

          <p className="footer-copyright">
            © 2026 Believe AI Labs.<br />All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
