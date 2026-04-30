import type { Metadata } from "next";
import AiGeneratorPageClient from "../AiGeneratorPageClient";

export const metadata: Metadata = {
  title: "AI Color Palette Generator",
  description:
    "Generate unique color palettes using AI. Describe your mood or brand and get instant color combinations. 100% free.",
  alternates: { canonical: "https://palettiq.net/studio/ai-generator" },
  openGraph: {
    title: "AI Color Palette Generator | PalettIQ",
    url: "https://palettiq.net/studio/ai-generator",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <AiGeneratorPageClient />;
}
