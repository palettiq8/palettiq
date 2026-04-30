import type { Metadata } from "next";
import ExtractorPageClient from "../ExtractorPageClient";

export const metadata: Metadata = {
  title: "Extract Colors from Image",
  description:
    "Upload any image and extract its dominant color palette instantly. Get HEX codes from photos. Free color extractor.",
  alternates: { canonical: "https://palettiq.net/studio/extractor" },
  openGraph: {
    title: "Extract Colors from Image | PalettIQ",
    url: "https://palettiq.net/studio/extractor",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <ExtractorPageClient />;
}
