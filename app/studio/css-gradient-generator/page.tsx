import type { Metadata } from "next";
import GradientPageClient from "../GradientPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title: "CSS Gradient Generator - Linear, Radial & Conic",
  description:
    "Create custom CSS gradients with full control over colors, stops, and direction. Generate, preview, and export ready-to-use CSS gradient code instantly.",
  keywords: [
    "css gradient generator",
    "gradient generator",
    "linear gradient generator",
    "radial gradient generator",
    "conic gradient generator",
    "css gradient maker",
    "gradient color generator",
    "gradient editor",
    "gradient color stops",
    "gradient css code",
    "background gradient generator",
    "web gradient generator",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio/css-gradient-generator",
  },
  openGraph: {
    title: "CSS Gradient Generator | Linear, Radial & Conic Gradient Builder",
    description:
      "Create and customize CSS gradients with adjustable color stops, directions, radial controls, and export-ready CSS code.",
    url: "https://palettiq.net/studio/css-gradient-generator",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "CSS Gradient Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Gradient Generator | PalettIQ",
    description:
      "Create linear, radial, and conic gradients with export-ready CSS code.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://palettiq.net/studio/css-gradient-generator#software",
        name: "CSS Gradient Generator",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: "https://palettiq.net/studio/css-gradient-generator",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Create custom linear, radial, and conic gradients with export-ready CSS code.",
        creator: {
          "@id": "https://palettiq.net/#organization",
        },
        featureList: [
          "Linear Gradient Generator",
          "Radial Gradient Generator",
          "Conic Gradient Generator",
          "Gradient Stop Editor",
          "CSS Gradient Export",
          "Gradient Presets",
          "Random Gradient Generator",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/studio/css-gradient-generator#webpage",
        url: "https://palettiq.net/studio/css-gradient-generator",
        name: "CSS Gradient Generator - Linear, Radial & Conic",
        description:
          "Create custom CSS gradients with full control over colors, stops, and direction. Generate, preview, and export ready-to-use CSS gradient code instantly.",
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
      <GradientPageClient />
    </>
  );
}
