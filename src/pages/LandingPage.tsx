import React from "react";
import Hero from "../components/Hero";
import IntroSection from "../components/IntroSection";
import AccessData from "../components/AccessData";
import LethalLines from "../components/LethalLines";

type Props = {};

const LandingPage: React.FC<Props> = (props: Props) => {

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
