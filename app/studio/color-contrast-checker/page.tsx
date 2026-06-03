import type { Metadata } from "next";
import ContrastPageClient from "../ContrastPageClient";

export const metadata: Metadata = {
  title: "Color Contrast Checker - WCAG AA & AAA Accessibility Free",
  description:
    "Check color contrast ratios for WCAG AA and AAA accessibility compliance instantly. Ensure readable text for all users - test foreground and background color combinations free on PalettIQ.",
  keywords: [
    "color contrast checker",
    "WCAG contrast checker",
    "accessibility contrast checker",
    "WCAG AA compliance",
    "WCAG AAA compliance",
    "text contrast ratio",
    "accessible color combinations",
    "color accessibility tool",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio/color-contrast-checker",
  },
  openGraph: {
    title: "Color Contrast Checker - WCAG AA & AAA Free | PalettIQ",
    description:
      "Check color contrast ratios for WCAG AA and AAA compliance instantly. Ensure readable text for all users. Free on PalettIQ.",
    url: "https://palettiq.net/studio/color-contrast-checker",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ - Color Contrast Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Contrast Checker - WCAG Free | PalettIQ",
    description:
      "Check WCAG AA and AAA color contrast ratios instantly. Free on PalettIQ.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return <ContrastPageClient />;
}
