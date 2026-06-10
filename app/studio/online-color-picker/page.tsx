import type { Metadata } from "next";
import PickerPageClient from "../PickerPageClient";
import Script from "next/script";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title:
    "Online Color Picker | HEX, RGB, HSL, CMYK, LAB, LCH & XYZ Color Converter",
  description:
    "Pick any color and instantly convert between HEX, RGB, RGBA, HSL, HSV, HWB, CMYK, LAB, LCH, and XYZ. Explore color harmonies, tints, shades, and tones with PalettIQ's free online color picker.",
  keywords: [
    "online color picker",
    "color picker",
    "hex color picker",
    "rgb color picker",
    "hsl color picker",
    "cmyk color picker",
    "hex to rgb",
    "rgb to hex",
    "color converter",
    "color format converter",
    "lab color converter",
    "lch color converter",
    "xyz color converter",
    "color harmonies",
    "color tints",
    "color shades",
    "color tones",
    "web color picker",
    "ui color picker",
    "free color picker",
  ],
  alternates: {
    canonical: "https://palettiq.net/studio/online-color-picker",
  },
  openGraph: {
    title:
      "Online Color Picker | HEX, RGB, HSL, CMYK, LAB, LCH & XYZ Converter",
    description:
      "Pick any color and instantly get HEX, RGB, RGBA, HSL, HSV, HWB, CMYK, LAB, LCH, and XYZ values. Explore harmonies, tints, shades, and tones for UI design, branding, and creative projects.",
    url: "https://palettiq.net/studio/online-color-picker",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ Online Color Picker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Online Color Picker | HEX, RGB, HSL, CMYK, LAB, LCH & XYZ Converter",
    description:
      "Pick colors, convert formats, generate harmonies, tints, shades, and tones instantly with PalettIQ.",
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
            name: "Online Color Picker",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
            url: "https://palettiq.net/studio/online-color-picker",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "HEX color picker",
              "RGB color picker",
              "RGBA converter",
              "HSL converter",
              "HSV converter",
              "HWB converter",
              "CMYK converter",
              "LAB converter",
              "LCH converter",
              "XYZ converter",
              "Color harmony generator",
              "Color tint generator",
              "Color shade generator",
              "Color tone generator",
              "Color history tracking",
              "Color export tool",
            ],
            description:
              "Pick any color and instantly convert between HEX, RGB, RGBA, HSL, HSV, HWB, CMYK, LAB, LCH, and XYZ color formats while exploring harmonies, tints, shades, and tones.",
          }),
        }}
      />
      <PickerPageClient />
    </>
  );
}
