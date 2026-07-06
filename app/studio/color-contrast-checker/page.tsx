import type { Metadata } from "next";
import ContrastPageClient from "../ContrastPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title: "Color Contrast Checker - WCAG AA & AAA Tool",
  description:
    "Check color contrast ratios instantly for WCAG AA and AAA compliance. Test text and background combinations for accessible UI designs.",
  keywords: [
    "color contrast checker",
    "WCAG contrast checker",
    "accessibility contrast checker",
    "WCAG AA compliance",
    "WCAG AAA compliance",
    "text contrast ratio",
    "accessible color combinations",
    "foreground background contrast",
    "website accessibility checker",
    "UI accessibility tool",
    "contrast ratio calculator",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio/color-contrast-checker",
  },
  openGraph: {
    title: "Color Contrast Checker | WCAG AA & AAA Accessibility Tool",
    description:
      "Check color contrast ratios instantly for WCAG AA and AAA accessibility compliance. Test text and background colors for readable and accessible designs.",
    url: "https://palettiq.net/studio/color-contrast-checker",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ Color Contrast Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Contrast Checker | WCAG Accessibility Tool",
    description:
      "Check WCAG AA and AAA color contrast ratios instantly for accessible UI and web design.",
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
        "@id": "https://palettiq.net/studio/color-contrast-checker#software",
        name: "Color Contrast Checker",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: "https://palettiq.net/studio/color-contrast-checker",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Check color contrast ratios for WCAG AA and AAA accessibility compliance. Test foreground and background color combinations, improve readability, and create accessible user interfaces.",
        creator: {
          "@id": "https://palettiq.net/#organization",
        },
        featureList: [
          "WCAG AA Contrast Checker",
          "WCAG AAA Contrast Checker",
          "Contrast Ratio Calculator",
          "Foreground and Background Color Testing",
          "Accessibility Preview",
          "Random Contrast Pair Generator",
          "Complementary Contrast Mode",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/studio/color-contrast-checker#webpage",
        url: "https://palettiq.net/studio/color-contrast-checker",
        name: "Color Contrast Checker - WCAG AA & AAA Tool",
        description:
          "Check color contrast ratios instantly for WCAG AA and AAA compliance. Test text and background combinations for accessible UI designs.",
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
      <ContrastPageClient />
    </>
  );
}
