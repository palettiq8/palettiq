import Accordion from "@/components/client/Accordion";
import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import type { Metadata } from "next";
import {
  exportAndUsageQuestions,
  generalQuestions,
  paletteAndColorsQuestions,
  paletteFiltersQuestions,
  settingsAndPreferencesQuestions,
  updateAndAccountsQuestions,
} from "@/utils/Items";

export const metadata: Metadata = {
  title: "Help Center & FAQs",
  description:
    "Find answers about PalettIQ's color palette generator, filters, exports, settings, and account. Browse frequently asked questions by category.",
  alternates: {
    canonical: "https://palettiq.net/help-center",
  },
  openGraph: {
    title: "Help Center & FAQs | PalettIQ",
    description:
      "Find answers about PalettIQ's color palette generator, filters, exports, settings, and account.",
    url: "https://palettiq.net/help-center",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ Help Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Center & FAQs | PalettIQ",
    description: "Find answers about PalettIQ's features and account.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

export default function page() {
  const allQuestions = [
    ...generalQuestions,
    ...paletteAndColorsQuestions,
    ...paletteFiltersQuestions,
    ...exportAndUsageQuestions,
    ...settingsAndPreferencesQuestions,
    ...updateAndAccountsQuestions,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/help-center#webpage",
        url: "https://palettiq.net/help-center",
        name: "Help Center & FAQs | PalettIQ",
        description:
          "Find answers about PalettIQ's color palette generator, filters, exports, settings, and account.",
        inLanguage: "en-US",
        isPartOf: {
          "@id": "https://palettiq.net/#website",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://palettiq.net/help-center#faqpage",
        mainEntity: allQuestions.map((q) => ({
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
      <div className="w-full h-max max-w-350 mx-auto py-20 max-sm:py-10">
        <h1 className="text-4xl font-bold text-gray-900 text-center">FAQs</h1>
        <div className="w-full">
          <Accordion
            title="General Questions"
            accordionData={generalQuestions}
          />
          <Accordion
            title="Palettes & Colors"
            accordionData={paletteAndColorsQuestions}
          />
          <Accordion title="Filters" accordionData={paletteFiltersQuestions} />
          <Accordion
            title="Export & Usage"
            accordionData={exportAndUsageQuestions}
          />
          <Accordion
            title="Settings & Preferences"
            accordionData={settingsAndPreferencesQuestions}
          />
          <Accordion
            title="Updates & Account"
            accordionData={updateAndAccountsQuestions}
          />
        </div>
      </div>
    </CommonHeaderFooterSection>
  );
}
