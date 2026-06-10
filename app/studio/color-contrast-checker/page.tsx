import type { Metadata } from "next";
import ContrastPageClient from "../ContrastPageClient";
import Script from "next/script";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title: "Color Contrast Checker | WCAG AA & AAA Accessibility Contrast Tool",
  description:
    "Check color contrast ratios instantly for WCAG AA and AAA accessibility compliance. Test text and background color combinations, improve readability, and create accessible UI designs.",
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
            featureList: [
              "WCAG AA Contrast Checker",
              "WCAG AAA Contrast Checker",
              "Contrast Ratio Calculator",
              "Foreground and Background Color Testing",
              "Accessibility Preview",
              "Random Contrast Pair Generator",
              "Complementary Contrast Mode",
            ],
          }),
        }}
      />
      <ContrastPageClient />
    </>
  );
}
