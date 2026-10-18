export default function Purpose() {
  return (
    <section className="purpose-section" id="purpose">
      {/* Subtle overlay ensuring perfect contrast across display sizes */}
      <div className="purpose-bg-overlay" aria-hidden="true" />

      <div className="purpose-container">
        <div className="purpose-content" data-reveal>
          {/* Top tag row: 000 — IDEAS INTO REALITY */}
          <div className="purpose-tag-row">
            <span className="purpose-index">000</span>
            <span className="purpose-tag-line" aria-hidden="true" />
            <span className="purpose-tag-label">IDEAS INTO REALITY</span>
          </div>

          {/* Main title: Ideas into Impact. */}
          <h2 className="purpose-main-heading">
            Ideas into<br />Impact.
          </h2>

          {/* Subtitles: brand & descriptor */}
          <div className="purpose-subtitles">
            <p className="purpose-sub-brand">BELIEVE AI LABS</p>
            <p className="purpose-sub-meta">RESEARCH · AI · ENGINEERING</p>
          </div>

          {/* Italic quotation with vertical accent bar */}
          <blockquote className="purpose-quote">
            <div className="purpose-quote-bar" aria-hidden="true" />
            <p className="purpose-quote-text">
              “We turn ambitious ideas into thoughtful research, meaningful technology, and solutions built for the real world.”
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}