import type { Metadata } from "next";
import ExtractorPageClient from "../ExtractorPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title: "Color Extractor - Extract HEX, RGB & HSL Colors",
  description:
    "Upload any image and instantly extract dominant colors with HEX, RGB, and HSL values. Generate palettes from photos, logos, and artwork.",
  keywords: [
    "color extractor",
    "extract colors from image",
    "image color picker",
    "dominant color extractor",
    "color palette from image",
    "brand color extractor",
    "photo color picker",
    "extract hex colors",
    "image palette generator",
    "logo color extractor",
    "extract rgb colors",
    "extract hsl colors",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio/color-extractor",
  },
  openGraph: {
    title:
      "Color Extractor From Images | Extract HEX, RGB & HSL Colors | PalettIQ",
    description:
      "Upload images and instantly extract dominant colors with HEX, RGB, and HSL values. Create color palettes from photos, logos, screenshots, artwork, and brand assets.",
    url: "https://palettiq.net/studio/color-extractor",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Color Extractor From Images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Extractor From Images | Extract HEX, RGB & HSL Colors",
    description:
      "Extract dominant colors from images and generate color palettes instantly.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://palettiq.net/studio/color-extractor#software",
        name: "Color Extractor",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: "https://palettiq.net/studio/color-extractor",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Extract colors from images and generate color palettes with HEX, RGB, and HSL values.",
        creator: {
          "@id": "https://palettiq.net/#organization",
        },
        featureList: [
          "Image Color Extraction",
          "Dominant Color Detection",
          "HEX Color Extraction",
          "RGB Color Extraction",
          "HSL Color Extraction",
          "Palette Generation From Images",
          "Palette Export",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/studio/color-extractor#webpage",
        url: "https://palettiq.net/studio/color-extractor",
        name: "Color Extractor - Extract HEX, RGB & HSL Colors",
        description:
          "Upload any image and instantly extract dominant colors with HEX, RGB, and HSL values. Generate palettes from photos, logos, and artwork.",
        isPartOf: {
          "@id": "https://palettiq.net/#website",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ExtractorPageClient />
    </>
  );
}
