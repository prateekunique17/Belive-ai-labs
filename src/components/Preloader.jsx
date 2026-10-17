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
      duration: 0.8,
      ease: "power3.out",
    })
      // 3. After 1.5 seconds, a thin horizontal line draws left to right beneath the name
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power2.inOut",
        },
        "+=1.5"
      )
      // 4. Then a short tagline fades in below
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      // Small pause to take in the branding
      .to({}, { duration: 0.4 })
      // 5. Then the black screen does a curtain wipe upward to reveal the page
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1.1,
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