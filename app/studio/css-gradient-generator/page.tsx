import type { Metadata } from "next";
import GradientPageClient from "../GradientPageClient";

export const metadata: Metadata = {
  title: "CSS Gradient Generator — Linear, Radial & Conic Gradients Free",
  description:
    "Create beautiful CSS gradients instantly with PalettIQ's free CSS gradient generator. Design linear, radial, and conic gradients — copy ready-to-use CSS code for UI design, branding, and digital products.",
  keywords: [
    "CSS gradient generator",
    "linear gradient generator",
    "radial gradient generator",
    "conic gradient generator",
    "CSS gradient maker",
    "free gradient generator",
    "gradient color picker",
    "gradient CSS code",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio/css-gradient-generator",
  },
  openGraph: {
    title: "CSS Gradient Generator — Linear, Radial & Conic Free | PalettIQ",
    description:
      "Create beautiful CSS gradients instantly. Design linear, radial, and conic gradients — copy CSS code free on PalettIQ.",
    url: "https://palettiq.net/studio/css-gradient-generator",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ — CSS Gradient Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Gradient Generator — Free | PalettIQ",
    description:
      "Create linear, radial, and conic CSS gradients instantly. Free on PalettIQ.",
    images: ["/banner.webp"],
  },
};
export default function page() {
  return <GradientPageClient />;
}
