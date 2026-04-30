import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import BodySection from "@/components/client/BodySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PalettIQ — Free Color Palette Generator for Designers",
  description:
    "Generate beautiful, accessible color palettes instantly with PalettIQ. Color picker, gradient generator, AI palettes, contrast checker — all free.",
  alternates: { canonical: "https://palettiq.net" },
};

export default function page() {
  return (
    <CommonHeaderFooterSection>
      <BodySection />
    </CommonHeaderFooterSection>
  );
}
