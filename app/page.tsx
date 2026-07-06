import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import BodySection from "@/components/client/BodySection";
import type { Metadata } from "next";
import { homeFAQQuestions } from "@/utils/Items";

export const metadata: Metadata = {
  title: "Color Palette Generator & Visualizer for Designers",

  description:
    "Generate personalized color palettes from your colors and harmonies, control HSL, then visualize them on templates or your own SVG. Explore ready-made palettes.",

  alternates: {
    canonical: "https://palettiq.net",
  },

  openGraph: {
    title: "Color Palette Generator & Visualizer | PalettIQ",
    description:
      "Choose your colors and harmonies, fine-tune hue, saturation, and lightness, then visualize your palette on templates or your own SVG.",
    url: "https://palettiq.net",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ - Color Palette Generator & Visualizer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Color Palette Generator & Visualizer | PalettIQ",
    description:
      "Create personalized color palettes with full HSL control, then visualize them on templates or your own SVG.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": "https://palettiq.net/#faqpage",
        mainEntity: homeFAQQuestions.map((q) => ({
          "@type": "Question",
          name: q.title,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.content,
          },
        })),
      },
    ],
  };

  return (
    <CommonHeaderFooterSection>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <BodySection />
    </CommonHeaderFooterSection>
  );
}
