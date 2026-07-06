import type { Metadata } from "next";
import ExploreColorsPageClient from "../ExploreColorsPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Color Shades Explorer - Complete Color Scales Free",
  description:
    "Explore 32 curated color scales with complete shade systems from 100 to 1200. Copy HEX codes for UI design, branding, and digital products. Free.",
  keywords: [
    "color shades",
    "color scale",
    "color tints and shades",
    "HEX color shades",
    "color 100 to 1200",
    "UI color scale",
    "design color shades",
    "color explorer",
  ],
  alternates: { canonical: "https://palettiq.net/explore/colors" },
  openGraph: {
    title: "Color Shades Explorer - Complete Color Scales | PalettIQ",
    description:
      "Explore 32 curated color scales with complete shade systems. Browse HEX codes for UI design, branding, and digital products. Free on PalettIQ.",
    url: "https://palettiq.net/explore/colors",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ - Color Shades Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Shades Explorer - Free | PalettIQ",
    description:
      "Explore 32 color scales with complete shade systems. Free on PalettIQ.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://palettiq.net/explore/colors#webpage",
        name: "Color Shades Explorer",
        description:
          "Explore 32 curated color scales with complete shade systems from 100 to 1200 for UI design and branding.",
        url: "https://palettiq.net/explore/colors",
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
      <ExploreColorsPageClient />
    </>
  );
}
