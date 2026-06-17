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
    "Preview color palettes on real UI components and upload your own SVG illustrations, icons, logos, and graphics to instantly visualize color palettes. Test colors on buttons, cards, dashboards, forms, layouts, websites, apps, and design systems before implementation.",
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
    "svg color palette visualizer",
    "svg color preview",
    "svg recolor tool",
    "svg palette preview",
    "upload svg and test colors",
    "svg color testing",
    "logo color visualizer",
    "illustration color visualizer",
    "brand color preview",
    "svg design color preview",
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
              "Preview color palettes on real UI components and upload custom SVG files to visualize colors on logos, illustrations, icons, dashboards, forms, buttons, cards, and complete design systems.",
            featureList: [
              "Color Palette Visualization",
              "SVG Upload Support",
              "SVG Color Preview",
              "Logo Color Visualization",
              "Illustration Color Preview",
              "UI Component Preview",
              "Dashboard Color Preview",
              "Button Color Preview",
              "Card Color Preview",
              "Form Color Preview",
              "Layout Color Testing",
              "Website Color Preview",
              "Design System Testing",
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
