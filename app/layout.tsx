import type { Metadata } from "next";
import { primary } from "@/utils/Fonts";
import "./globals.css";
import MainLayoutWrapper from "@/components/client/MainLayoutWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/server/JsonLd";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://palettiq.net"),
  applicationName: "PalettIQ",
  publisher: "PalettIQ",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
  },
  manifest: "/site.webmanifest",
  title: {
    default:
      "Color Palette Generator & Color Schemes From Your Colors | PalettIQ",
    template: "%s | PalettIQ",
  },
  description:
    "Generate color palettes from your selected colors, moods, industries, and styles. Create accessible color schemes, gradients, and brand-ready palettes tailored to your project.",
  keywords: [
    "color palette generator",
    "palette generator from colors",
    "color scheme generator",
    "brand color palette",
    "accessible color palette",
    "ui color palette",
    "color combinations",
    "color harmony generator",
    "design color tool",
    "palette generator for designers",
    "generate palette from selected colors",
    "website color palette",
    "branding color palette",
  ],
  authors: [{ name: "PalettIQ", url: "https://palettiq.net" }],
  creator: "PalettIQ",
  category: "design",
  openGraph: {
    title: "Generate Color Palettes From Your Selected Colors | PalettIQ",
    description:
      "Choose colors, moods, industries, and styles to generate beautiful, accessible color palettes tailored to your project.",
    url: "https://palettiq.net",
    siteName: "PalettIQ",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ - Color Palette Generator",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Worldwide",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generate Color Palettes From Your Colors | PalettIQ",
    description:
      "Create personalized color palettes using your preferred colors, moods, industries, and styles.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  verification: {
    google: "VzQRAgdpO9iImT7gSbOKOscjal8aBnahKHIMxbWe5DE",
  },
  icons: {
    icon: [{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  other: {
    "google-adsense-account": "ca-pub-6991544978459968",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${primary.className} antialiased bg-white`}
        suppressHydrationWarning={true}
      >
        <JsonLd />
        <Analytics />
        <SpeedInsights />
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6991544978459968"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </html>
  );
}
