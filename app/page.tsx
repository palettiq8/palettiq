import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import BodySection from "@/components/client/BodySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PalettIQ — Free Color Palette Generator for Designers",
  description:
    "Generate beautiful, accessible color palettes instantly with PalettIQ. Color picker, gradient generator, AI palettes, contrast checker — all free.",
  keywords: [
    "free color palette generator",
    "color palette for designers",
    "AI color palette",
    "gradient generator free",
    "contrast checker",
    "color picker online",
  ],
  alternates: { canonical: "https://palettiq.net" },
  openGraph: {
    title: "PalettIQ — Free Color Palette Generator for Designers",
    description:
      "Generate beautiful, accessible color palettes instantly. Color picker, gradient generator, AI palettes — all free.",
    url: "https://palettiq.net",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ — Free Color Palette Generator",
      },
    ],
  },
  twitter: {
    title: "PalettIQ — Free Color Palette Generator for Designers",
    description:
      "Generate beautiful, accessible color palettes instantly. All free.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return (
    <CommonHeaderFooterSection>
      <BodySection />
    </CommonHeaderFooterSection>
  );
}
