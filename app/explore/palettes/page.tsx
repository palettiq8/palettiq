import type { Metadata } from "next";
import ExplorePalettesPageClient from "../ExplorePalettesPageClient";
import Script from "next/script";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "Explore Color Palettes - Browse & Download Free",
  description:
    "Explore thousands of curated color palettes for branding, UI design, and digital products. Filter by mood, industry, color family, and style. Copy HEX, RGB, HSL codes instantly. 100% free.",
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
    images: [
      {
        url: "/banner.png",
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
      "Browse thousands of curated color palettes. Filter by mood, industry, and style. Free to use.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Explore Color Palettes",
            description:
              "Browse thousands of curated color palettes for branding, UI design, websites, mobile apps, and digital products.",
            url: "https://palettiq.net/explore/palettes",
            isPartOf: {
              "@type": "WebSite",
              name: "PalettIQ",
              url: "https://palettiq.net",
            },
          }),
        }}
      />
      <ExplorePalettesPageClient />
    </>
  );
}
