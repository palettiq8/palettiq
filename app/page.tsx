import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import BodySection from "@/components/client/BodySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator From Your Selected Colors | PalettIQ",

  description:
    "Generate personalized color palettes from your selected colors, moods, industries, and styles. Create accessible color schemes, gradients, and brand-ready palettes for UI design, branding, and creative projects.",

  alternates: {
    canonical: "https://palettiq.net",
  },

  openGraph: {
    title: "Generate Color Palettes From Your Selected Colors | PalettIQ",

    description:
      "Choose colors, moods, industries, and styles to generate beautiful, accessible color palettes tailored to your project.",

    url: "https://palettiq.net",

    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ Color Palette Generator",
      },
    ],
  },

  twitter: {
    title: "Generate Color Palettes From Your Selected Colors | PalettIQ",

    description:
      "Create personalized color palettes using your preferred colors, moods, industries, and styles.",

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
