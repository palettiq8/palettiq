import type { Metadata } from "next";
import VisualizerPageClient from "../VisualizerPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title: "Color Palette Visualizer | Preview on Real UI Designs",
  description:
    "Preview color palettes on ready-made UI templates or upload your own SVG design to see exactly how your colors will look in production.",
  keywords: [
    "color palette visualizer",
    "ui color palette visualizer",
    "color palette preview",
    "website color palette preview",
    "design system color preview",
    "color scheme visualizer",
    "brand color visualizer",
    "svg color palette visualizer",
    "visualize color palette on svg",
    "upload svg and test colors",
    "svg recolor tool",
    "logo color visualizer",
    "illustration color visualizer",
    "ui design color testing",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio/color-palette-visualizer",
  },
  openGraph: {
    title:
      "Color Palette Visualizer | Preview Color Palettes on Real UI Designs",
    description:
      "Upload your own SVG files and preview color palettes on real UI components, dashboards, forms, logos, illustrations, and design systems.",
    url: "https://palettiq.net/studio/color-palette-visualizer",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "Color Palette Visualizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Color Palette Visualizer | Preview Color Palettes on Real UI Designs",
    description:
      "Upload SVG files and preview color palettes on real UI components, logos, illustrations, and websites before implementation.",
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
        "@id": "https://palettiq.net/studio/color-palette-visualizer#software",
        name: "Color Palette Visualizer",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: "https://palettiq.net/studio/color-palette-visualizer",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Preview color palettes on real UI components and upload custom SVG files to visualize colors on logos, illustrations, icons, dashboards, forms, buttons, cards, and complete design systems.",
        creator: {
          "@id": "https://palettiq.net/#organization",
        },
        featureList: [
          "Color Palette Visualization on Ready-Made UI Templates",
          "Custom SVG Upload Support",
          "SVG Color Preview",
          "Logo Color Visualization",
          "Illustration Color Preview",
          "UI Component Preview (Buttons, Cards, Forms, Dashboards)",
          "Website Layout Color Testing",
          "Design System Testing",
          "Color Locking and Shuffling",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/studio/color-palette-visualizer#webpage",
        url: "https://palettiq.net/studio/color-palette-visualizer",
        name: "Color Palette Visualizer | Preview on Real UI Designs",
        description:
          "Preview color palettes on ready-made UI templates or upload your own SVG design to see exactly how your colors will look in production.",
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
      <VisualizerPageClient />
    </>
  );
}
