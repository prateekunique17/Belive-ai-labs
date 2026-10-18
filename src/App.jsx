import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./styles/App.css";
import "./styles/Sections.css";

import { Preloader, Footer, TermsModal } from "./components/common";
import { HomePage } from "./pages";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const appRef = useRef(null);

  // Prevent browser from restoring scroll position in the middle of page on reload
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Lock scroll during preloader, release and ensure top position when complete
  useEffect(() => {
    if (loading) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      ScrollTrigger.clearScrollMemory?.();
      ScrollTrigger.refresh();
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    const hoverCleanups = [];

    const ctx = gsap.context(() => {
      /* =========================================
         HERO ELEMENTS — immediate clean presentation
      ========================================= */

      gsap.to([".hero-horizon-glow", ".hero-sun-flare"], {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });


      /* =========================================
         SUN FLARE + ARC — idle twinkle loop
         Starts once the entrance settles (delay > entrance's
         0.35s delay + 1.8s duration) so the two never fight
         over the same scale/opacity properties.
      ========================================= */

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion) {
        gsap.to(".hero-sun-flare", {
          scale: 1.16,
          duration: 2.4,
          delay: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".hero-horizon-glow", {
          opacity: 0.78,
          duration: 3.6,
          delay: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }


      /* =========================================
         SCROLL INDICATOR
      ========================================= */

      gsap.fromTo(
        ".hero-scroll",
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.6,
          ease: "power2.out",
        }
      );


      /* =========================================
         SECTION SCROLL REVEALS
      ========================================= */

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 46 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          }
        );
      });


      /* =========================================
         CASCADE LIST STAGGER (process / values)
      ========================================= */

      gsap.utils.toArray(".cascade-list").forEach((list) => {
        gsap.fromTo(
          list.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: list,
              start: "top 88%",
            },
          }
        );
      });


      /* =========================================
         IMAGE PARALLAX (section imagery)
      ========================================= */

      gsap.utils.toArray(".parallax-box .parallax-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".parallax-box"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });


      /* =========================================
         IMAGE HOVER SCALE (1.05x)
         Applied via GSAP (not CSS :hover) so it composes
         cleanly with the scroll-driven parallax transform
         already running on the same element.
      ========================================= */

      gsap.utils.toArray(".parallax-box").forEach((frame) => {
        const img = frame.querySelector(".parallax-img");
        if (!img) return;

        const onEnter = () =>
          gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });

        frame.addEventListener("mouseenter", onEnter);
        frame.addEventListener("mouseleave", onLeave);

        hoverCleanups.push(() => {
          frame.removeEventListener("mouseenter", onEnter);
          frame.removeEventListener("mouseleave", onLeave);
        });
      });

    }, appRef);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [loading]);


  return (
    <div className="believe-app-root">

      {loading && (
        <Preloader
          onComplete={() => setLoading(false)}
        />
      )}

      <HomePage appRef={appRef} />
      <Footer onOpenTerms={() => setIsTermsOpen(true)} />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

    </div>
  );
}

export default App;