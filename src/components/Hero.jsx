import BelieveLogo from "./BelieveLogo";

export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* Ambient space vignette — the SVG arc + flare below carry the "orbit"
          visual on their own, so no photo layer competing with the text */}
      <div className="hero-atmosphere" />

      {/* Blue atmosphere rim glow + sunburst spike — entrance animated by GSAP in App.jsx */}
      <svg
        className="hero-horizon-glow"
        viewBox="0 0 1500 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* mostly dark/dim along its length, brightening sharply only where
              it meets the flare (~71% across) rather than an even glow */}
          <linearGradient id="arcBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(15,25,38,0.06)" />
            <stop offset="42%" stopColor="rgba(35,60,95,0.18)" />
            <stop offset="62%" stopColor="rgba(85,145,200,0.42)" />
            <stop offset="71%" stopColor="rgba(170,220,255,0.72)" />
            <stop offset="84%" stopColor="rgba(195,230,255,0.42)" />
            <stop offset="100%" stopColor="rgba(60,100,145,0.14)" />
          </linearGradient>
          <linearGradient id="arcHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(70,110,150,0.04)" />
            <stop offset="48%" stopColor="rgba(85,130,175,0.14)" />
            <stop offset="64%" stopColor="rgba(165,215,250,0.48)" />
            <stop offset="71%" stopColor="#f0f8ff" />
            <stop offset="79%" stopColor="rgba(215,240,255,0.62)" />
            <stop offset="100%" stopColor="rgba(80,125,170,0.1)" />
          </linearGradient>
          <filter id="arcBlurSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="arcBlurTight" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        </defs>

        {/* soft outer atmosphere bleed */}
        <ellipse cx="750" cy="350" rx="750" ry="350" fill="none" stroke="url(#arcBase)" strokeWidth="28" filter="url(#arcBlurSoft)" />

        {/* ring's own thickness / base tone */}
        <ellipse cx="750" cy="350" rx="748" ry="348" fill="none" stroke="url(#arcBase)" strokeWidth="9" />

        {/* crisp bright highlight riding the lit top surface of the ring */}
        <ellipse cx="750" cy="347" rx="745" ry="345" fill="none" stroke="url(#arcHighlight)" strokeWidth="2.4" filter="url(#arcBlurTight)" />
      </svg>
      <svg className="hero-sun-flare" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="flareBloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="30%" stopColor="#dceeff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8fc4ff" stopOpacity="0" />
          </radialGradient>
          <filter id="flareSoften" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>

        {/* ambient bloom behind the spikes */}
        <circle cx="50" cy="50" r="36" fill="url(#flareBloom)" />

        {/* four-point diffraction spike — thin, needle-like blades, not a chunky shuriken */}
        <polygon
          points="99,50 55.7,55.7 50,99 44.3,55.7 1,50 44.3,44.3 50,1 55.7,44.3"
          fill="#ffffff"
          filter="url(#flareSoften)"
        />

        {/* bright core */}
        <circle cx="50" cy="50" r="2.4" fill="#ffffff" />
      </svg>

      {/* CENTER LOGO — entrance animated by GSAP in App.jsx */}
      <div className="hero-center">
        <BelieveLogo
          size="large"
          showSubtitle={true}
        />
      </div>

      {/* LEFT STATEMENT — entrance animated by GSAP in App.jsx */}
      <div className="hero-statement hero-left">
        <p>WHERE IDEAS BEGIN</p>
        <p>RESEARCH DRIVES INNOVATION</p>
        <p>TECHNOLOGY CREATES IMPACT</p>

        <div className="hero-accent-line" />
      </div>

      {/* RIGHT STATEMENT — entrance animated by GSAP in App.jsx */}
      <div className="hero-statement hero-right">
        <p>SOFTWARE</p>
        <p>HARDWARE</p>
        <p>AI</p>
        <p>BUILT FOR TOMORROW</p>

        <div className="hero-accent-line" />
      </div>

      {/* SCROLL INDICATOR — entrance animated by GSAP, line by CSS keyframe */}
      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </div>

    </section>
  );
}