import {
  Hero,
  Purpose,
  Principles,
  Members,
  BeliefVision,
  JoinUs,
  Contact,
} from "../components/sections";

export default function HomePage({ appRef }) {
  return (
    <main ref={appRef} id="top" className="site-main">
      <Hero />
      <Purpose />
      <Principles />
      <Members />
      <BeliefVision />
      <JoinUs />
      <Contact />
    </main>
  );
}
