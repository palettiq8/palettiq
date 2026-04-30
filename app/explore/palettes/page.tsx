import type { Metadata } from "next";
import ExplorePalettesPageClient from "../ExplorePalettesPageClient";

export const metadata: Metadata = {
  title: "Color Palettes — Browse & Download",
  description:
    "Browse thousands of curated color palettes. Filter by mood, industry, and style. Copy HEX codes instantly. Free to use.",
  alternates: { canonical: "https://palettiq.net/explore/palettes" },
  openGraph: {
    title: "Color Palettes — Browse & Download | PalettIQ",
    url: "https://palettiq.net/explore/palettes",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <ExplorePalettesPageClient />;
}