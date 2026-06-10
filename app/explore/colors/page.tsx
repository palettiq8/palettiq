import type { Metadata } from "next";
import ExploreColorsPageClient from "../ExploreColorsPageClient";

export const metadata: Metadata = {
  title: "Color Shades Explorer - Complete Color Scales Free",
  description:
    "Explore 32 curated color scales with complete shade systems from 100 to 1200. Browse HEX codes for red, blue, green, and more - perfect for UI design, branding, and digital products. Free on PalettIQ.",
  keywords: [
    "color shades",
    "color scale",
    "color tints and shades",
    "HEX color shades",
    "color 100 to 1200",
    "UI color scale",
    "design color shades",
    "color explorer",
  ],
  alternates: { canonical: "https://palettiq.net/explore/colors" },
  openGraph: {
    title: "Color Shades Explorer - Complete Color Scales | PalettIQ",
    description:
      "Explore 32 curated color scales with complete shade systems. Browse HEX codes for UI design, branding, and digital products. Free on PalettIQ.",
    url: "https://palettiq.net/explore/colors",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "PalettIQ - Color Shades Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Shades Explorer - Free | PalettIQ",
    description:
      "Explore 32 color scales with complete shade systems. Free on PalettIQ.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return <ExploreColorsPageClient />;
}
