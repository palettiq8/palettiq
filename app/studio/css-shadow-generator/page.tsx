import type { Metadata } from "next";
import ShadowPageClient from "../ShadowPageClient";

export const metadata: Metadata = {
  title: "CSS Shadow Generator — Box Shadow & Text Shadow Free",
  description:
    "Create beautiful CSS box shadows and text shadows visually with PalettIQ's free CSS shadow generator. Adjust blur, spread, offset, color, and inset — copy ready-to-use CSS shadow code instantly for UI design and web projects.",
  keywords: [
    "CSS shadow generator",
    "box shadow generator",
    "text shadow generator",
    "CSS box shadow",
    "CSS text shadow",
    "box shadow maker",
    "free shadow generator",
    "CSS shadow tool",
  ],
  alternates: { canonical: "https://palettiq.net/studio/css-shadow-generator" },
  openGraph: {
    title: "CSS Shadow Generator — Box Shadow & Text Shadow Free | PalettIQ",
    description:
      "Create CSS box shadows and text shadows visually. Adjust blur, spread, offset, and color — copy CSS code instantly. Free on PalettIQ.",
    url: "https://palettiq.net/studio/css-shadow-generator",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ — CSS Shadow Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Shadow Generator — Free | PalettIQ",
    description:
      "Create CSS box shadows and text shadows visually. Copy code instantly. Free on PalettIQ.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return <ShadowPageClient />;
}
