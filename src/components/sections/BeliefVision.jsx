// BeliefVision.jsx – "Our Belief & Vision" section for Believe AI Labs
// Layout: Two-column (left: text + 3 mini-cards | right: cinematic image + quote)

const PILLARS = [
  {
    index: "01",
    title: "People First",
    body: "Technology should augment human potential, not replace it.",
    tag: "PEOPLE · IMPACT",
  },
  {
    index: "02",
    title: "Bold Innovation",
    body: "We pursue ambitious ideas that solve meaningful real-world problems.",
    tag: "IDEAS · SOLUTIONS",
  },
  {
    index: "03",
    title: "Open & Collaborative",
    body: "We believe in open knowledge, shared innovation, and global collaboration.",
    tag: "COMMUNITY · GROWTH",
  },
];

export default function BeliefVision() {
  return (
    <section
      className="bv-section"
      id="belief"
      aria-labelledby="bv-heading"
    >
      <div className="bv-inner">
        {/* ── LEFT COLUMN ── */}
        <div className="bv-left" data-reveal>
          {/* Eyebrow */}
          <p className="bv-eyebrow">004 // BELIEF &amp; VISION</p>

          {/* Main heading */}
          <h2 className="bv-heading" id="bv-heading">
            OUR<br />
            BELIEF &amp; <span className="bv-heading-accent">VISION</span>
          </h2>

          {/* Accent line + description */}
          <div className="bv-desc-row">
            <div className="bv-accent-bar" aria-hidden="true" />
            <p className="bv-description">
              We believe technology is most powerful when it serves people.
              Our vision is to build a more intelligent, inclusive, and resilient
              future through research, open collaboration, and real-world
              solutions.
            </p>
          </div>

          {/* Three pillar mini-cards */}
          <div className="bv-pillars-grid" role="list">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.index}
                className="bv-pillar-card"
                role="listitem"
              >
                {/* Index + rule */}
                <div className="bv-pillar-header" aria-hidden="true">
                  <span className="bv-pillar-index">[{pillar.index}]</span>
                  <span className="bv-pillar-rule" />
                </div>

                {/* Card body */}
                <h3 className="bv-pillar-title">{pillar.title}</h3>
                <p className="bv-pillar-body">{pillar.body}</p>

                {/* Card footer */}
                <div className="bv-pillar-footer">
                  <span className="bv-pillar-tag">{pillar.tag}</span>
                  <span className="bv-pillar-arrow" aria-hidden="true">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="bv-right" data-reveal>
          {/* Cinematic image frame */}
          <div className="bv-image-frame parallax-box">
            <img
              src="/images/belief-vision.jpg"
              alt="A solitary figure gazes at mountains from a modern architectural space — representing the vision of Believe AI Labs"
              className="bv-parallax-img parallax-img"
              loading="lazy"
            />
            {/* Gradient overlay for contrast */}
            <div className="bv-image-overlay" aria-hidden="true" />

            {/* Quote overlay pinned to the bottom of the image */}
            <blockquote className="bv-image-quote">
              <p className="bv-quote-text">
                "A more intelligent future is possible when people, ideas, and
                technology move in the same direction."
              </p>
              <cite className="bv-quote-cite">— BELIEVE AI LABS</cite>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bv-bottom-bar" aria-hidden="true">
        <span className="bv-bottom-label">BELIEVE AI LABS</span>
        <span className="bv-bottom-index">004</span>
      </div>
    </section>
  );
}
