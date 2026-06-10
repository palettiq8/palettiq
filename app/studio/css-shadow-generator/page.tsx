import type { Metadata } from "next";
import ShadowPageClient from "../ShadowPageClient";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CSS Shadow Generator - Box Shadow & Text Shadow Generator Free",
  description:
    "Create CSS box shadows and text shadows visually. Adjust blur, spread, offset, color, opacity, and inset settings. Generate layered shadows and copy production-ready CSS code instantly with PalettIQ.",
  keywords: [
    "CSS shadow generator",
    "box shadow generator",
    "text shadow generator",
    "CSS box shadow",
    "CSS text shadow",
    "box shadow CSS generator",
    "text shadow CSS generator",
    "shadow generator online",
    "CSS shadow maker",
    "box shadow tool",
    "shadow CSS code generator",
    "layered box shadow",
    "inset shadow generator",
    "free shadow generator",
    "CSS design tool",
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
              "Create CSS box shadows and text shadows visually. Adjust blur, spread, offset, color, opacity, and inset settings. Generate layered shadows and copy production-ready CSS code instantly.",
            featureList: [
              "CSS Box Shadow Generator",
              "CSS Text Shadow Generator",
              "Visual Shadow Editor",
              "Multiple Shadow Layers",
              "Blur Radius Control",
              "Spread Radius Control",
              "Horizontal Offset Control",
              "Vertical Offset Control",
              "Shadow Color Picker",
              "Inset Shadow Support",
              "Live Shadow Preview",
              "Container View",
              "Output View",
              "Responsive Shadow Preview",
              "Export Shadow Settings",
              "Copy CSS Code",
              "Production Ready CSS Output",
              "Box Shadow Playground",
              "Text Shadow Playground",
              "Free Online Shadow Generator",
            ],
          }),
        }}
      />
      <ShadowPageClient />
    </>
  );
}
