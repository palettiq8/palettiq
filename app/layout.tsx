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
    default: "Color Palette Generator & Visualizer | PalettIQ",
    template: "%s | PalettIQ",
  },
  description:
    "Generate personalized color palettes from your colors and harmonies with full HSL control. Visualize on templates or your own SVG, and explore ready-made palettes.",
  keywords: [
    "color palette generator",
    "personalized color palette generator",
    "hsl color palette generator",
    "color harmony generator",
    "color palette visualizer",
    "visualize color palette on svg",
    "explore color palettes",
    "ready made color palettes",
    "color shades generator",
    "accessible color palette",
  ],
  authors: [{ name: "PalettIQ", url: "https://palettiq.net" }],
  creator: "PalettIQ",
  category: "design",
  openGraph: {
    title: "Color Palette Generator & Visualizer | PalettIQ",
    description:
      "Choose your colors and harmonies, fine-tune hue, saturation, and lightness, then visualize your palette on templates or your own SVG.",
    url: "https://palettiq.net",
    siteName: "PalettIQ",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ - Color Palette Generator & Visualizer",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Worldwide",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Palette Generator & Visualizer | PalettIQ",
    description:
      "Create personalized color palettes with full HSL control, then visualize them on templates or your own SVG.",
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
