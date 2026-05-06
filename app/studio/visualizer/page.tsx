import type { Metadata } from "next";
import VisualizerPageClient from "../VisualizerPageClient";

export const metadata: Metadata = {
  title: "Color Palette Visualizer — Preview Colors on Real UI Free",
  description:
    "Preview your color palette on real UI components — buttons, cards, navbars, and layouts. See exactly how your colors work in UI design before shipping. Free color palette visualizer on PalettIQ.",
  keywords: [
    "color palette visualizer",
    "UI color preview",
    "color palette UI preview",
    "color scheme visualizer",
    "palette preview tool",
    "color design preview",
    "UI color palette tool",
  ],
  alternates: { canonical: "https://palettiq.net/studio/visualizer" },
  openGraph: {
    title:
      "Color Palette Visualizer — Preview Colors on Real UI Free | PalettIQ",
    description:
      "Preview your color palette on real UI components instantly. See how colors work in design before shipping. Free on PalettIQ.",
    url: "https://palettiq.net/studio/visualizer",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ — Color Palette Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Palette Visualizer — Free | PalettIQ",
    description:
      "Preview your color palette on real UI components instantly. Free on PalettIQ.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return <VisualizerPageClient />;
}
