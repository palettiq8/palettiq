import type { Metadata } from "next";
import ExplorePalettesPageClient from "../ExplorePalettesPageClient";

export const metadata: Metadata = {
  title: "Explore Color Palettes - Browse & Download Free",
  description:
    "Explore thousands of curated color palettes for branding, UI design, and digital products. Filter by mood, industry, color family, and style. Copy HEX, RGB, HSL codes instantly. 100% free.",
  keywords: [
    "color palettes",
    "color palette library",
    "browse color palettes",
    "free color palettes",
    "color palettes for designers",
    "color palettes for branding",
    "UI color palettes",
  ],
  alternates: { canonical: "https://palettiq.net/explore/palettes" },
  openGraph: {
    title: "Explore Color Palettes - Browse & Download Free | PalettIQ",
    description:
      "Explore thousands of curated color palettes for branding, UI design, and digital products. Free to use.",
    url: "https://palettiq.net/explore/palettes",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ - Explore Color Palettes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Color Palettes - Free | PalettIQ",
    description:
      "Browse thousands of curated color palettes. Filter by mood, industry, and style. Free to use.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return <ExplorePalettesPageClient />;
}
