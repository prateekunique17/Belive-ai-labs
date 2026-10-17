import { useState, useEffect, useRef } from "react";

// Social Icons
function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.96 0-1.74.77-1.74 1.73a1.74 1.74 0 0 0 1.74 1.73c.95 0 1.73-.77 1.73-1.73 0-.96-.78-1.73-1.73-1.73Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

// Reusable Portrait Component with fail-safe fallback placeholder and dual-path resolution
function MemberPortrait({ image, name, badge, isModal = false }) {
  const [prevImage, setPrevImage] = useState(image);
  const [currentSrc, setCurrentSrc] = useState(image);
  const [attempt, setAttempt] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Synchronize state when the image prop changes without triggering cascading renders in useEffect
  if (image !== prevImage) {
    setPrevImage(image);
    setCurrentSrc(image);
    setAttempt(0);
    setImgError(false);
  }

  const handleError = () => {
    // If the image fails on first attempt, auto-check alternative common directory paths
    if (attempt === 0 && currentSrc) {
      if (currentSrc.startsWith("/images/members/")) {
        // Try /members/...
        setCurrentSrc(currentSrc.replace("/images/members/", "/members/"));
        setAttempt(1);
        return;
      } else if (currentSrc.startsWith("/members/")) {
        // Try /images/members/...
        setCurrentSrc(currentSrc.replace("/members/", "/images/members/"));
        setAttempt(1);
        return;
      }
    }
    // If fallback path also fails or no image specified, display clean placeholder
    setImgError(true);
  };

  const showPlaceholder = !currentSrc || imgError;

  return (
    <div
      className={`member-portrait-wrapper ${
        isModal ? "modal-portrait-wrapper" : "card-portrait-wrapper"
      }`}
    >
      {badge && <span className="member-role-badge">{badge}</span>}
      {!showPlaceholder ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={name}
          className="member-portrait-img"
          onError={handleError}
          loading="lazy"
        />
      ) : (
        <div
          className="member-portrait-placeholder"
          aria-label={`Photo placeholder for ${name}`}
        >
          <div className="placeholder-silhouette" aria-hidden="true">
            <svg
              width={isModal ? "48" : "36"}
              height={isModal ? "48" : "36"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span className="placeholder-label">PHOTO TO BE ADDED</span>
        </div>
      )}
    </div>
  );
}

// ── MEMBER DATA REPOSITORY ──
// Configurable fields for member images and social URLs.
const MEMBERS_DATA = [
  {
    id: "prateek-kumar",
    name: "Prateek Kumar",
    roleBadge: "FOUNDER",
    category: "FOUNDER · COO",
    description:
      "Guiding the overarching vision, strategy, and strategic direction of Believe AI Labs.",
    biography:
      "As Founder of Believe AI Labs, Prateek steers the long-term vision, architectural thesis, and strategic horizon of the organization. He focuses on pioneering high-conviction research directions and uniting world-class builders to turn breakthrough ideas into enduring reality.",
    focusAreas: [
      "Long-Term Vision & Strategic Horizons",
      "Fundamental AI Thesis & Lab Direction",
      "High-Conviction Research Ecosystems",
    ],
    quote: "“True conviction is not about predicting the future, but having the resolve to build it.”",
    image: "/images/members/prateek-kumar.jpeg",
    linkedin: "https://www.linkedin.com/in/prateekunique17/",
    github: "",
  },
  {
    id: "dhruv-gaur",
    name: "Dhruv Gaur",
    roleBadge: "CO-FOUNDER",
    category: "CO-FOUNDER · CTO",
    description:
      "Spearheading growth, operational execution, and collective initiatives.",
    biography:
      "As Co-Founder, Dhruv drives the operational backbone of Believe AI Labs. He focuses on scaling member initiatives, optimizing resource allocation, and ensuring every project originates with clear ownership and executable milestones.",
    focusAreas: [
      "Operational Scaling & Execution",
      "Cross-Functional Project Operations",
      "Member Ecosystem & Growth",
    ],
    quote: "“Effort is the only currency that produces unshakeable results.”",
    image: "/images/members/dhruv-gaur.jpeg",
    linkedin: "https://www.linkedin.com/in/dhruv-gaur-80675535a/",
    github: "https://github.com/Dhrugaur",
  },
  {
    id: "anshul-sharma",
    name: "Anshul Sharma",
    roleBadge: "CPO",
    category: "CHIEF PRODUCT OFFICER",
    description:
      "Leading product architecture, user experience, and technical product design.",
    biography:
      "As Chief Product Officer, Anshul translates complex artificial intelligence paradigms into intuitive, high-impact products. He orchestrates end-to-end product architecture, design ergonomics, and seamless user experiences across all lab initiatives.",
    focusAreas: [
      "End-to-End Product Architecture",
      "Human-AI Interface & Experience Design",
      "Technical Ergonomics & Usability",
    ],
    quote: "“Great products bridge the invisible line between complex algorithms and effortless human utility.”",
    image: "/images/members/anshul-sharma.jpeg",
    linkedin: "",
    github: "",
  },
  {
    id: "tanmay",
    name: "Tanmay Arora",
    roleBadge: "CRO",
    category: "CHIEF RESEARCH OFFICER",
    description:
      "Directing artificial intelligence research, core algorithms, and future tech models.",
    biography:
      "As Chief Research Officer, Tanmay leads foundational intelligence research and model innovation at Believe AI Labs. His work explores neural algorithmic efficiency, frontier architectures, and translating bleeding-edge theoretical advances into practical computational frameworks.",
    focusAreas: [
      "Frontier Intelligence & Foundational Models",
      "Neural Algorithmic Optimization",
      "Core AI Architectures & Model Systems",
    ],
    quote: "“Pushing boundaries requires questioning the assumptions everyone else takes for granted.”",
    image: "/images/members/tanmay.jpeg",
    linkedin: "https://www.linkedin.com/in/tanmay-arora-3220b0366/",
    github: "",
  },
];

export default function Members() {
  const [selectedMember, setSelectedMember] = useState(null);
  const previouslyFocusedElementRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleOpenModal = (member, triggerElement) => {
    previouslyFocusedElementRef.current = triggerElement;
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  // Keyboard navigation & body scroll locking for modal
  useEffect(() => {
    if (!selectedMember) {
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  return (
    <section
      className="members-section"
      id="members"
      aria-labelledby="members-heading"
    >
      {/* ── SECTION HEADER ── */}
      <div className="members-header" data-reveal>
        <div className="members-header-left">
          <h2 className="members-heading" id="members-heading">
            MEMBERS
          </h2>
        </div>
        <p className="members-subtext">
          A selective collective driving vision, product innovation, and
          intelligence to bridge the gap from idea to impact. Click any profile to
          view details.
        </p>
      </div>

      {/* ── DIVIDER ── */}
      <div className="members-divider" aria-hidden="true" />

      {/* ── CARDS GRID ── */}
      <div className="members-grid">
        {MEMBERS_DATA.map((member) => (
          <article
            key={member.id}
            className="member-card"
            tabIndex={0}
            role="button"
            aria-label={`View profile of ${member.name}, ${member.roleBadge}`}
            onClick={(e) => handleOpenModal(member, e.currentTarget)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenModal(member, e.currentTarget);
              }
            }}
          >
            {/* Portrait area */}
            <MemberPortrait
              image={member.image}
              name={member.name}
              badge={member.roleBadge}
              isModal={false}
            />

            {/* Member Details */}
            <div className="member-card-content">
              <span className="member-card-category">{member.category}</span>
              <h3 className="member-card-name">{member.name}</h3>
              <p className="member-card-desc">{member.description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* ── BOTTOM PILL FOOTER ── */}
      <div className="members-pill-footer" aria-hidden="true">
        <span className="members-society-pill">
          BELIEVE AI LABS · PRIVATE SOCIETY LEADERSHIP
        </span>
      </div>

      {/* ── INTERACTIVE PROFILE MODAL ── */}
      {selectedMember && (
        <div
          className="members-modal-backdrop"
          onClick={handleCloseModal}
          role="presentation"
        >
          <div
            className="members-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-member-name"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Circular Close Button */}
            <button
              ref={closeButtonRef}
              className="members-modal-close"
              onClick={handleCloseModal}
              aria-label="Close profile modal"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Body: Two-column layout */}
            <div className="members-modal-body">
              {/* Left Column: Large Portrait */}
              <div className="members-modal-portrait-col">
                <MemberPortrait
                  image={selectedMember.image}
                  name={selectedMember.name}
                  badge={selectedMember.roleBadge}
                  isModal={true}
                />
              </div>

              {/* Right Column: Information & Details */}
              <div className="members-modal-info-col">
                <span className="modal-category">{selectedMember.category}</span>
                <h3 className="modal-name" id="modal-member-name">
                  {selectedMember.name}
                </h3>

                <p className="modal-bio">{selectedMember.biography}</p>

                {/* Key Focus Areas */}
                <div className="modal-focus-section">
                  <h4 className="modal-focus-label">// KEY FOCUS AREAS</h4>
                  <ul className="modal-focus-list">
                    {selectedMember.focusAreas.map((area, idx) => (
                      <li key={idx} className="modal-focus-item">
                        <span className="focus-bullet" aria-hidden="true" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quotation */}
                {selectedMember.quote && (
                  <blockquote className="modal-quote-box">
                    {selectedMember.quote}
                  </blockquote>
                )}

                {/* Social Profiles / Connect Links */}
                <div className="modal-social-section">
                  <span className="modal-social-label">CONNECT:</span>
                  <div className="modal-social-links">
                    {selectedMember.linkedin ? (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-social-btn"
                        aria-label={`${selectedMember.name} on LinkedIn`}
                      >
                        <LinkedInIcon />
                        <span>LinkedIn</span>
                      </a>
                    ) : (
                      <span
                        className="modal-social-btn disabled"
                        aria-label="LinkedIn profile not yet linked"
                        title="LinkedIn profile link to be added"
                      >
                        <LinkedInIcon />
                        <span>LinkedIn</span>
                      </span>
                    )}

                    {selectedMember.github ? (
                      <a
                        href={selectedMember.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-social-btn"
                        aria-label={`${selectedMember.name} on GitHub`}
                      >
                        <GitHubIcon />
                        <span>GitHub</span>
                      </a>
                    ) : (
                      <span
                        className="modal-social-btn disabled"
                        aria-label="GitHub profile not yet linked"
                        title="GitHub profile link to be added"
                      >
                        <GitHubIcon />
                        <span>GitHub</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="members-modal-footer">
              <span className="modal-footer-left">
                BELIEVE AI LABS EXECUTIVE PROFILE
              </span>
              <button
                className="modal-footer-close-btn"
                onClick={handleCloseModal}
              >
                CLOSE PROFILE [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
