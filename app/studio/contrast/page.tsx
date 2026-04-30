import type { Metadata } from "next";
import ContrastPageClient from "../ContrastPageClient";

export const metadata: Metadata = {
  title: "Color Contrast Checker — WCAG",
  description:
    "Check color contrast ratios for WCAG AA and AAA accessibility compliance. Ensure readable text for all users. Free tool.",
  alternates: { canonical: "https://palettiq.net/studio/contrast" },
  openGraph: {
    title: "Color Contrast Checker — WCAG | PalettIQ",
    url: "https://palettiq.net/studio/contrast",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <ContrastPageClient />;
}
