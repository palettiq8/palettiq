import type { Metadata } from "next";
import ExtractorPageClient from "../ExtractorPageClient";

export const metadata: Metadata = {
  title: "Color Extractor — Extract Colors from Any Image Free",
  description:
    "Upload any image and instantly extract its dominant color palette with HEX, RGB, and HSL codes. Perfect for brand color matching, mood board creation, and UI design. Free color extractor on PalettIQ.",
  keywords: [
    "color extractor",
    "extract colors from image",
    "image color picker",
    "dominant color extractor",
    "color palette from image",
    "brand color extractor",
    "photo color picker",
  ],
  alternates: { canonical: "https://palettiq.net/studio/color-extractor" },
  openGraph: {
    title: "Color Extractor — Extract Colors from Any Image Free | PalettIQ",
    description:
      "Upload any image and extract its dominant color palette instantly. Get HEX, RGB, and HSL codes free on PalettIQ.",
    url: "https://palettiq.net/studio/color-extractor",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ — Color Extractor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Extractor — Free | PalettIQ",
    description:
      "Extract dominant colors from any image instantly. Get HEX codes free on PalettIQ.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return <ExtractorPageClient />;
}
