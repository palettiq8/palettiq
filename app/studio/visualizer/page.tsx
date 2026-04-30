import type { Metadata } from "next";
import VisualizerPageClient from "../VisualizerPageClient";

export const metadata: Metadata = {
  title: "Color Palette UI Visualizer",
  description:
    "Preview your color palette on real UI components — buttons, cards, and layouts. See how colors look in design. Free tool.",
  alternates: { canonical: "https://palettiq.net/studio/visualizer" },
  openGraph: {
    title: "Color Palette UI Visualizer | PalettIQ",
    url: "https://palettiq.net/studio/visualizer",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <VisualizerPageClient />;
}
