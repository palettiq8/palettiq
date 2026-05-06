import type { Metadata } from "next";
import AiGeneratorPageClient from "../AiGeneratorPageClient";

export const metadata: Metadata = {
  title: "AI Color Palette Generator — Generate Palettes with AI Free",
  description:
    "Generate beautiful color palettes instantly using AI. Describe your brand, mood, or industry — PalettIQ's AI color palette generator creates harmonious, design-ready palettes for UI design, branding, and digital products. 100% free.",
  keywords: [
    "AI color palette generator",
    "AI color palette",
    "AI palette generator",
    "generate color palette with AI",
    "AI color scheme",
    "AI color combinations",
    "free AI color palette",
  ],
  alternates: { canonical: "https://palettiq.net/studio/ai-generator" },
  openGraph: {
    title: "AI Color Palette Generator — Free | PalettIQ",
    description:
      "Generate beautiful color palettes instantly using AI. Describe your brand, mood, or industry — get design-ready palettes free on PalettIQ.",
    url: "https://palettiq.net/studio/ai-generator",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ — AI Color Palette Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Color Palette Generator — Free | PalettIQ",
    description: "Generate color palettes instantly with AI. Free on PalettIQ.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return <AiGeneratorPageClient />;
}
