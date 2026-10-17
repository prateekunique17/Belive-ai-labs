const PRINCIPLES = [
  {
    num: "01",
    tag: "VISION & COURAGE",
    heading: "Dream Without Limits",
    description:
      "Think beyond what is expected. Have the courage to imagine something bigger and push past conventional boundaries.",
    footer: "VISION · COURAGE",
  },
  {
    num: "02",
    tag: "VALUE & IMPACT",
    heading: "Build With Purpose",
    description:
      "Don't create just to create. Build things that solve real problems, create genuine value, and truly matter.",
    footer: "PURPOSE · VALUE",
  },
  {
    num: "03",
    tag: "HONOR & REPUTATION",
    heading: "Stand By Your Word",
    description:
      "Your word is your reputation. Be honest, dependable, and fully accountable for everything you say and do.",
    footer: "HONOR · CHARACTER",
  },
  {
    num: "04",
    tag: "EXCELLENCE & LEGACY",
    heading: "Leave Things Better",
    description:
      "Whatever you touch — yourself, your work, or the people around you — leave it better than you found it.",
    footer: "GROWTH · LEGACY",
  },
];

export default function Principles() {
  return (
    <section className="principles-section" id="principles" aria-labelledby="principles-heading">

      {/* ── SECTION HEADER ── */}
      <div className="principles-header" data-reveal>
        <div className="principles-header-left">
          <p className="principles-eyebrow">001 // PHILOSOPHY &amp; VALUES</p>
          <h2 className="principles-heading" id="principles-heading">
            OUR PRINCIPLES
          </h2>
        </div>
        <p className="principles-subtext">
          The four foundational pillars of Believe AI Labs — guiding how we
          think, build, and leave a lasting mark.
        </p>
      </div>

      {/* ── DIVIDER ── */}
      <div className="principles-divider" aria-hidden="true" />

      {/* ── CARDS GRID ── */}
      <div className="principles-grid">
        {PRINCIPLES.map((p) => (
          <article
            key={p.num}
            className="principle-card"
            tabIndex={0}
            aria-label={`Principle ${p.num}: ${p.heading}`}
          >
            {/* Card top row: number + tag pill */}
            <div className="pc-top-row">
              <span className="pc-num">[{p.num}]</span>
              <span className="pc-tag">{p.tag}</span>
            </div>

            {/* Main content */}
            <div className="pc-body">
              <h3 className="pc-heading">{p.heading}</h3>
              <p className="pc-desc">{p.description}</p>
            </div>

            {/* Card footer: keywords + arrow */}
            <div className="pc-footer">
              <span className="pc-footer-label">{p.footer}</span>
              <span className="pc-arrow" aria-hidden="true">→</span>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
