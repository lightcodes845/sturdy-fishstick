import React, {useEffect} from "react";
import Hero from "../components/Hero";
import IntroSection from "../components/IntroSection";
import AccessData from "../components/AccessData";
import LethalLines from "../components/LethalLines";

type Props = {};

const LandingPage: React.FC<Props> = () => {
    useEffect(() => {
        document.body.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

  return (
    <div style={{ marginTop: "95px" }}>
      <Hero />
      <IntroSection />
      <AccessData />
      <LethalLines />
    </div>
  );
};

export default LandingPage;
