import type { Metadata } from "next";
import GeneratorPageClient from "./GeneratorPageClient";

export const metadata: Metadata = {
  title: "Color Palette Generator",
  description:
    "Generate stunning color palettes instantly. Lock colors, shuffle, and export in HEX, RGB, or CSS. Free online tool.",
  alternates: { canonical: "https://palettiq.net/studio" },
  openGraph: {
    title: "Color Palette Generator | PalettIQ",
    url: "https://palettiq.net/studio",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <GeneratorPageClient />;
}
