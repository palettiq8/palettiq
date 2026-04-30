import type { Metadata } from "next";
import ShadowPageClient from "../ShadowPageClient";

export const metadata: Metadata = {
  title: "CSS Shadow Generator — Box & Text",
  description:
    "Build custom CSS box shadows and text shadows visually. Adjust blur, spread, color, and offset. Copy CSS code instantly. Free online tool.",
  alternates: { canonical: "https://palettiq.net/studio/shadow" },
  openGraph: {
    title: "CSS Shadow Generator — Box & Text | PalettIQ",
    url: "https://palettiq.net/studio/shadow",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <ShadowPageClient />;
}
