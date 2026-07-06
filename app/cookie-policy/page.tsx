import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how PalettIQ handles cookies and tracking technologies, including current usage status and future plans for user control.",
  alternates: {
    canonical: "https://palettiq.net/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | PalettIQ",
    description:
      "Learn how PalettIQ handles cookies and tracking technologies, and how you can control them.",
    url: "https://palettiq.net/cookie-policy",
    siteName: "PalettIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ Cookie Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | PalettIQ",
    description:
      "Learn how PalettIQ handles cookies and tracking technologies.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
};

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/cookie-policy#webpage",
        url: "https://palettiq.net/cookie-policy",
        name: "Cookie Policy | PalettIQ",
        description:
          "Learn how PalettIQ handles cookies and tracking technologies, including current usage status and future plans for user control.",
        inLanguage: "en-US",
        isPartOf: {
          "@id": "https://palettiq.net/#website",
        },
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
      <div className="w-full h-max max-w-350 mx-auto py-20 max-xl:px-4 max-sm:py-10">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Cookie Policy
        </h1>
        <div className="max-w-350 mx-auto mt-20 max-sm:mt-10 p-10 max-xl:p-6 border border-gray-200 rounded-xl bg-white">
          <div className="w-full mt-5 space-y-8">
            <p className="text-gray-800 leading-relaxed">
              This section explains how PalettIQ handles cookies and similar
              technologies.
            </p>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">
                1. Cookie Usage
              </h2>
              <p className="text-gray-800 leading-relaxed">
                PalettIQ does not use cookies to store your personal data or
                track your activity across other websites. However, we use
                Google AdSense to display advertisements, which may set cookies
                for ad delivery, measurement, and personalization. You can
                control or disable these cookies through your browser settings
                or Google's Ad Settings.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">
                2. Purpose of Cookies (Future Use)
              </h2>
              <p className="text-gray-800 leading-relaxed">
                If cookies are introduced in the future, they will only be used
                to improve performance, enhance user experience, and support
                platform features such as preferences or analytics.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">
                3. User Control Over Cookies
              </h2>
              <p className="text-gray-800 leading-relaxed">
                You have full control over cookies through your browser settings
                and Google's Ad Settings, and can manage or disable them at any
                time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CommonHeaderFooterSection>
  );
}
