import type { Metadata } from "next";
import PickerPageClient from "../PickerPageClient";

export const metadata: Metadata = {
  title: "Color Picker — HEX, RGB, HSL",
  description:
    "Pick any color and instantly get HEX, RGB, HSL, and CMYK values. Find harmonies, tints, and shades. Free color picker.",
  alternates: { canonical: "https://palettiq.net/studio/picker" },
  openGraph: {
    title: "Color Picker — HEX, RGB, HSL | PalettIQ",
    url: "https://palettiq.net/studio/picker",
    images: [{ url: "/banner.png", width: 1200, height: 630 }],
  },
};

export default function page() {
  return <PickerPageClient />;
}
