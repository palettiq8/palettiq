"use client";

import HomeHeroSection from "../server/HomeHeroSection";
import HomeFeaturesSection from "../server/HomeFeaturesSection";
import HomeColorFamilySection from "./HomeColorFamilySection";
import HomeFAQSection from "../server/HomeFAQSection";

export default function BodySection() {
  return (
    <div className="w-full py-13 max-sm:py-8 px-4">
      <HomeHeroSection />
      <HomeFeaturesSection />
      <HomeColorFamilySection />
      <HomeFAQSection />
    </div>
  );
}
