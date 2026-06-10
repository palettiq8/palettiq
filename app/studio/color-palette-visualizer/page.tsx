import type { Metadata } from "next";
import VisualizerPageClient from "../VisualizerPageClient";
import Script from "next/script";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title: "Color Palette Visualizer | Preview Color Palettes on Real UI Designs",
  description:
    "Preview color palettes on real UI components including buttons, cards, dashboards, navigation bars, forms, and layouts. Test colors before applying them to websites, apps, and design systems.",
  keywords: [
    "color palette visualizer",
    "ui color palette visualizer",
    "color palette preview",
    "ui color preview",
    "website color palette preview",
    "design system color preview",
    "color scheme visualizer",
    "ui design color testing",
    "brand color visualizer",
    "palette preview tool",
    "design color preview",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio/color-palette-visualizer",
  },
  openGraph: {
    title:
      "Color Palette Visualizer | Preview Color Palettes on Real UI Designs",
    description:
      "Preview color palettes on buttons, cards, dashboards, forms, and layouts before using them in your projects.",
    url: "https://palettiq.net/studio/color-palette-visualizer",
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
      "Preview color palettes on real UI components before applying them to websites and apps.",
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
              "Preview color palettes on real UI components including buttons, cards, forms, dashboards, and layouts.",
            featureList: [
              "Color Palette Visualization",
              "UI Component Preview",
              "Dashboard Color Preview",
              "Button Color Preview",
              "Card Color Preview",
              "Form Color Preview",
              "Layout Color Testing",
              "Real World Palette Simulation",
              "Palette Comparison",
            ],
          }),
        }}
      />
      <VisualizerPageClient />
    </>
  );
}
