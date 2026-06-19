import type { Metadata } from "next";
import GeneratorPageClient from "./GeneratorPageClient";
import Script from "next/script";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title:
    "Color Palette Generator From Your Colors | Create, Customize & Export Palettes",
  description:
    "Generate personalized color palettes from your selected colors, color families, harmonies and styles. Customize hue, saturation, and lightness, then export palettes as HEX, RGB, CSS, Tailwind CSS, SCSS, and more.",
  keywords: [
    "color palette generator",
    "palette generator from colors",
    "generate palette from selected colors",
    "custom color palette generator",
    "brand color palette generator",
    "ui color palette generator",
    "website color palette",
    "accessible color palette",
    "color harmony generator",
    "tailwind color palette",
    "palette export tool",
    "color scheme generator",
    "brand color generator",
    "ui color generator",
    "web color palette generator",
    "color palette creator",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio",
  },
  openGraph: {
    title:
      "Generate Personalized Color Palettes From Your Selected Colors | PalettIQ",
    description:
      "Choose colors, harmonies, and styles to generate personalized color palettes for branding, UI design, websites, and digital products.",
    url: "https://palettiq.net/studio",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Generate Personalized Color Palettes From Your Selected Colors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Generate Personalized Color Palettes From Your Selected Colors | PalettIQ",
    description:
      "Create personalized color palettes using your preferred colors, harmonies, and styles.",
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
            "@type": "SoftwareApplication",
            name: "Color Palette Generator",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
            url: "https://palettiq.net/studio",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Generate personalized color palettes from selected colors, harmonies, and styles.",
            featureList: [
              "Color Palette Generation",
              "Palette Generation From Selected Colors",
              "Harmony Based Palette Generation",
              "Industry Based Palette Generation",
              "Style Based Palette Generation",
              "Palette Export",
              "Color Format Conversion",
              "Palette Visualization",
            ],
          }),
        }}
      />
      <GeneratorPageClient />
    </>
  );
}
