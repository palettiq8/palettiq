import type { Metadata } from "next";
import GeneratorPageClient from "./GeneratorPageClient";

export const metadata: Metadata = {
  title: "Free Color Palette Generator - Create & Export Color Palettes",
  description:
    "Generate beautiful color palettes instantly with PalettIQ. Lock colors, shuffle, control hue, saturation, and lightness - export as HEX, RGB, CSS, Tailwind, and more. Free online color palette generator.",
  keywords: [
    "color palette generator",
    "free color palette generator",
    "online color palette",
    "generate color palette",
    "export color palette",
    "HEX color generator",
    "CSS color palette",
  ],
  alternates: { canonical: "https://palettiq.net/studio" },
  openGraph: {
    title: "Free Color Palette Generator - Create & Export | PalettIQ",
    description:
      "Generate beautiful color palettes instantly. Lock, shuffle, and export as HEX, RGB, CSS, and more. Free on PalettIQ.",
    url: "https://palettiq.net/studio",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ - Free Color Palette Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Color Palette Generator | PalettIQ",
    description:
      "Generate beautiful color palettes instantly. Export as HEX, RGB, CSS, and more. Free.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return <GeneratorPageClient />;
}
