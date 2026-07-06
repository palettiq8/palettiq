import type { Metadata } from "next";
import PickerPageClient from "../PickerPageClient";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  category: "Design Tools",
  title: "Online Color Picker - HEX, RGB, HSL, CMYK & More",
  description:
    "Pick any color and instantly convert between HEX, RGB, HSL, CMYK, LAB, LCH, and XYZ. Explore color harmonies, tints, shades, and tones.",
  keywords: [
    "online color picker",
    "color picker",
    "hex color picker",
    "rgb color picker",
    "hsl color picker",
    "cmyk color picker",
    "hex to rgb",
    "color converter",
    "color format converter",
    "lab color converter",
    "lch color converter",
    "xyz color converter",
    "color harmonies",
    "color tints and shades",
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
    siteName: "PalettIQ",
    locale: "en_US",
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
    creator: "@palettiq",
  },
};

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://palettiq.net/studio/online-color-picker#software",
        name: "Online Color Picker",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: "https://palettiq.net/studio/online-color-picker",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Pick any color and instantly convert between HEX, RGB, RGBA, HSL, HSV, HWB, CMYK, LAB, LCH, and XYZ color formats while exploring harmonies, tints, shades, and tones.",
        creator: {
          "@id": "https://palettiq.net/#organization",
        },
        featureList: [
          "HEX Color Picker",
          "RGB Color Picker",
          "RGBA Converter",
          "HSL Converter",
          "HSV Converter",
          "HWB Converter",
          "CMYK Converter",
          "LAB Converter",
          "LCH Converter",
          "XYZ Converter",
          "Color Harmony Generator",
          "Color Tint, Shade, and Tone Generator",
          "Color History Tracking",
          "Color Export Tool",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/studio/online-color-picker#webpage",
        url: "https://palettiq.net/studio/online-color-picker",
        name: "Online Color Picker - HEX, RGB, HSL, CMYK & More",
        description:
          "Pick any color and instantly convert between HEX, RGB, HSL, CMYK, LAB, LCH, and XYZ. Explore color harmonies, tints, shades, and tones.",
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
      <PickerPageClient />
    </>
  );
}
