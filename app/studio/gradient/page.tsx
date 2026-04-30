import type { Metadata } from "next";
import GradientPageClient from "../GradientPageClient";

export const metadata: Metadata = {
  title: "CSS Gradient Generator Online",
  description:
    "Create beautiful linear and radial CSS gradients. Copy ready-to-use CSS code instantly. Free gradient maker tool.",
  alternates: { canonical: "https://palettiq.net/studio/gradient" },
  openGraph: {
    title: "CSS Gradient Generator Online | PalettIQ",
    url: "https://palettiq.net/studio/gradient",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <GradientPageClient />;
}
