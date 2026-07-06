import type { Metadata } from "next";
import ExploreGradientsPageClient from "../ExploreGradientsPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  title: "CSS Gradients — Linear, Radial & Conic",
  description:
    "Browse thousands of free CSS gradients — linear, radial, and conic. Filter by color and copy gradient code instantly for UI design and branding.",
  keywords: [
    "CSS gradients",
    "linear gradient",
    "radial gradient",
    "conic gradient",
    "CSS gradient generator",
    "gradient color combinations",
    "free CSS gradients",
    "gradient for UI design",
    "gradient background CSS",
  ],
  alternates: { canonical: "https://palettiq.net/explore/gradients" },
  openGraph: {
    title: "Explore CSS Gradients - Linear, Radial & Conic | PalettIQ",
    description:
      "Browse thousands of CSS gradients including linear, radial, and conic styles. Copy gradient code instantly. Free on PalettIQ.",
    url: "https://palettiq.net/explore/gradients",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ - Explore CSS Gradients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore CSS Gradients - Free | PalettIQ",
    description:
      "Browse linear, radial, and conic CSS gradients. Copy code instantly. Free on PalettIQ.",
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
        "@id": "https://palettiq.net/explore/gradients#webpage",
        name: "Explore CSS Gradients",
        description:
          "Browse thousands of free CSS gradients including linear, radial, and conic styles for UI design and branding.",
        url: "https://palettiq.net/explore/gradients",
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
      <ExploreGradientsPageClient />
    </>
  );
}
