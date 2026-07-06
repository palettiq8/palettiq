import type { Metadata } from "next";
import GeneratorPageClient from "./GeneratorPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title: "Color Palette Generator - Create & Export Palettes",
  description:
    "Generate personalized color palettes from your colors and harmonies. Adjust hue, saturation, and lightness, then export as HEX, RGB, CSS, Tailwind, and SCSS.",
  keywords: [
    "color palette generator",
    "palette generator from colors",
    "generate palette from selected colors",
    "custom color palette generator",
    "hsl color palette generator",
    "brand color palette generator",
    "ui color palette generator",
    "website color palette",
    "accessible color palette",
    "color harmony generator",
    "tailwind color palette",
    "palette export tool",
    "color scheme generator",
    "brand color generator",
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
      "Choose colors and harmonies, then fine-tune hue, saturation, and lightness to generate personalized color palettes for branding, UI design, and websites.",
    url: "https://palettiq.net/studio",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
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
      "Create personalized color palettes using your preferred colors, harmonies, and full HSL control.",
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
        "@id": "https://palettiq.net/studio#software",
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
          "Generate personalized color palettes from selected colors and harmonies, with full control over hue, saturation, and lightness.",
        creator: {
          "@id": "https://palettiq.net/#organization",
        },
        featureList: [
          "Color Palette Generation from Selected Colors",
          "Harmony-Based Palette Generation",
          "HSL (Hue, Saturation, Lightness) Control",
          "Drag-and-Drop Color Reordering",
          "Color Locking",
          "Undo/Redo History",
          "Palette Export in Multiple Formats (HEX, RGB, CSS, Tailwind, SCSS)",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/studio#webpage",
        url: "https://palettiq.net/studio",
        name: "Color Palette Generator - Create & Export Palettes",
        description:
          "Generate personalized color palettes from your colors and harmonies. Adjust hue, saturation, and lightness, then export as HEX, RGB, CSS, Tailwind, and SCSS.",
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
      <GeneratorPageClient />
    </>
  );
}
