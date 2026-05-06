import type { Metadata } from "next";
import ExploreGradientsPageClient from "../ExploreGradientsPageClient";

export const metadata: Metadata = {
  title: "Explore CSS Gradients — Linear, Radial & Conic Gradients Free",
  description:
    "Explore thousands of beautiful CSS gradients including linear, radial, and conic styles. Browse by color family, copy CSS gradient code instantly for UI design, branding, and digital products. Free on PalettIQ.",
  keywords: [
    "CSS gradients",
    "linear gradient",
    "radial gradient",
    "conic gradient",
    "CSS gradient generator",
    "gradient color combinations",
    "free CSS gradients",
    "gradient for UI design",
  ],
  alternates: { canonical: "https://palettiq.net/explore/gradients" },
  openGraph: {
    title: "Explore CSS Gradients — Linear, Radial & Conic | PalettIQ",
    description:
      "Browse thousands of CSS gradients including linear, radial, and conic styles. Copy gradient code instantly. Free on PalettIQ.",
    url: "https://palettiq.net/explore/gradients",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ — Explore CSS Gradients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore CSS Gradients — Free | PalettIQ",
    description:
      "Browse linear, radial, and conic CSS gradients. Copy code instantly. Free on PalettIQ.",
    images: ["/banner.webp"],
  },
};
export default function page() {
  return <ExploreGradientsPageClient />;
}
