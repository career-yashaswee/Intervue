import React from "react";
import { Hero } from "./components/Hero";
import StakeHolder from "./StakeHolder";
import { FeaturesSectionDemo } from "./Features";

function LandingPage() {
  return (
    <div className="h-fit w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8"></p>
      <Hero />
      <FeaturesSectionDemo /> <StakeHolder />
    </div>
  );
}

export default LandingPage;
