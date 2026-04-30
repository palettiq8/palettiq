import type { Metadata } from "next";
import ExploreGradientsPageClient from "../ExploreGradientsPageClient";

export const metadata: Metadata = {
  title: "CSS Gradients — Browse & Copy",
  description:
    "Browse beautiful CSS gradients ready to copy and use. Filter by style and color. Free gradient collection for designers.",
  alternates: { canonical: "https://palettiq.net/explore/gradients" },
  openGraph: {
    title: "CSS Gradients — Browse & Copy | PalettIQ",
    url: "https://palettiq.net/explore/gradients",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <ExploreGradientsPageClient />;
}
