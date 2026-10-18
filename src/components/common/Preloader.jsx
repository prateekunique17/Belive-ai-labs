import { useEffect, useRef } from "react";
import gsap from "gsap";
import BelieveLogo from "./BelieveLogo";

export default function Preloader({ onComplete }) {
  const loaderRef = useRef(null);
  const nameRef = useRef(null);
  const lineRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const tl = gsap.timeline({
      onComplete: () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        if (onComplete) onComplete();
      },
    });

    // 1. Initial state
    gsap.set(nameRef.current, { opacity: 0, y: 30 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(taglineRef.current, { opacity: 0, y: 15 });

    // 2. Site name appears centered in a large ultra-light font
    tl.to(nameRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: "power3.out",
    })
      // 3. Horizontal line draws left to right beneath the name (slight pause tuned from 1.5s -> 0.9s)
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.75,
          ease: "power2.inOut",
        },
        "+=0.9"
      )
      // 4. Then tagline fades in below
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
      // Brief pause to take in the branding (tuned from 0.4s -> 0.25s)
      .to({}, { duration: 0.25 })
      // 5. Black curtain wipes upward to reveal the page (tuned from 1.1s -> 0.85s)
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="preloader-overlay">
      <div className="preloader-content">
        <div ref={nameRef} className="preloader-name">
          <BelieveLogo size="large" showSubtitle={true} />
        </div>

        <div ref={lineRef} className="preloader-line" />

        <p ref={taglineRef} className="preloader-tagline">
          WHERE IDEAS TAKE BIRTH · A BRIGHTER TOMORROW
        </p>
      </div>
    </div>
  );
}