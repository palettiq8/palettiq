import type { Metadata } from "next";
import ShadowPageClient from "../ShadowPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title: "CSS Shadow Generator - Box & Text Shadow",
  description:
    "Create CSS box shadows and text shadows visually. Adjust blur, spread, offset, and color, then copy production-ready CSS code instantly.",
  keywords: [
    "CSS shadow generator",
    "box shadow generator",
    "text shadow generator",
    "CSS box shadow",
    "CSS text shadow",
    "shadow generator online",
    "CSS shadow maker",
    "box shadow tool",
    "layered box shadow",
    "inset shadow generator",
    "free shadow generator",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio/css-shadow-generator",
  },
  openGraph: {
    title:
      "CSS Shadow Generator - Box Shadow & Text Shadow Generator | PalettIQ",
    description:
      "Create box shadows and text shadows visually. Adjust blur, spread, offset, color, and inset settings. Copy ready-to-use CSS instantly.",
    url: "https://palettiq.net/studio/css-shadow-generator",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ CSS Shadow Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Shadow Generator Free | PalettIQ",
    description:
      "Generate box shadows and text shadows visually. Copy production-ready CSS instantly.",
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
        "@id": "https://palettiq.net/studio/css-shadow-generator#software",
        name: "CSS Shadow Generator",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: "https://palettiq.net/studio/css-shadow-generator",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Create CSS box shadows and text shadows visually. Adjust blur, spread, offset, color, opacity, and inset settings, then copy production-ready CSS code instantly.",
        creator: {
          "@id": "https://palettiq.net/#organization",
        },
        featureList: [
          "CSS Box Shadow Generator",
          "CSS Text Shadow Generator",
          "Multiple Shadow Layers",
          "Blur and Spread Radius Control",
          "Horizontal and Vertical Offset Control",
          "Shadow Color Picker",
          "Inset Shadow Support",
          "Live Shadow Preview",
          "Container and Output View",
          "Copy Production-Ready CSS Code",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/studio/css-shadow-generator#webpage",
        url: "https://palettiq.net/studio/css-shadow-generator",
        name: "CSS Shadow Generator - Box & Text Shadow",
        description:
          "Create CSS box shadows and text shadows visually. Adjust blur, spread, offset, and color, then copy production-ready CSS code instantly.",
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
      <ShadowPageClient />
    </>
  );
}
