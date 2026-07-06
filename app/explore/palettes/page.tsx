import type { Metadata } from "next";
import ExplorePalettesPageClient from "../ExplorePalettesPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Explore Color Palettes - Browse & Download Free",
  description:
    "Explore thousands of curated color palettes for branding, UI design, and digital products. Filter by mood, industry, use case, and color. Copy HEX, RGB, HSL codes instantly. 100% free.",
  keywords: [
    "color palettes",
    "color palette library",
    "browse color palettes",
    "free color palettes",
    "color palettes for designers",
    "color palettes for branding",
    "UI color palettes",
  ],
  alternates: { canonical: "https://palettiq.net/explore/palettes" },
  openGraph: {
    title: "Explore Color Palettes - Browse & Download Free | PalettIQ",
    description:
      "Explore thousands of curated color palettes for branding, UI design, and digital products. Free to use.",
    url: "https://palettiq.net/explore/palettes",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Explore Free Color Palettes on PalettIQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Color Palettes - Free | PalettIQ",
    description:
      "Browse thousands of curated color palettes. Filter by mood, industry, and use case. Free to use.",
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
        "@id": "https://palettiq.net/explore/palettes#webpage",
        name: "Explore Color Palettes",
        description:
          "Browse thousands of curated color palettes for branding, UI design, websites, mobile apps, and digital products.",
        url: "https://palettiq.net/explore/palettes",
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
      <ExplorePalettesPageClient />
    </>
  );
}
