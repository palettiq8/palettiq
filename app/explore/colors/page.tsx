import type { Metadata } from "next";
import ExploreGradientsPageClient from "../ExploreGradientsPageClient";

export const metadata: Metadata = {
  title: "Explore & Discover Colors Online",
  description:
    "Explore a vast collection of colors with HEX, RGB, and HSL values. Find the perfect color for your next project. Free.",
  alternates: { canonical: "https://palettiq.net/explore/colors" },
  openGraph: {
    title: "Explore & Discover Colors Online | PalettIQ",
    url: "https://palettiq.net/explore/colors",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <ExploreGradientsPageClient />;
}
