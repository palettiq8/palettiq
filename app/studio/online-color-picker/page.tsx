import type { Metadata } from "next";
import PickerPageClient from "../PickerPageClient";

export const metadata: Metadata = {
  title: "Online Color Picker — HEX, RGB, HSL, CMYK & More Free",
  description:
    "Pick any color and instantly get HEX, RGB, HSL, CMYK, LAB, LCH, and XYZ values. Explore color tints, shades, tones, and harmonies — all free on PalettIQ's online color picker.",
  keywords: [
    "color picker",
    "online color picker",
    "HEX color picker",
    "RGB color picker",
    "HSL color picker",
    "CMYK color picker",
    "color tints and shades",
    "color harmonies",
  ],
  alternates: { canonical: "https://palettiq.net/studio/online-color-picker" },
  openGraph: {
    title: "Online Color Picker — HEX, RGB, HSL, CMYK & More | PalettIQ",
    description:
      "Pick any color and get HEX, RGB, HSL, CMYK values instantly. Explore tints, shades, tones, and harmonies. Free on PalettIQ.",
    url: "https://palettiq.net/studio/online-color-picker",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ — Online Color Picker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Color Picker — Free | PalettIQ",
    description:
      "Pick any color and get HEX, RGB, HSL, CMYK values instantly. Free on PalettIQ.",
    images: ["/banner.webp"],
  },
};

export default function page() {
  return <PickerPageClient />;
}
