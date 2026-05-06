import type { Metadata } from "next";
import { primary } from "@/utils/Fonts";
import "./globals.css";
import MainLayoutWrapper from "@/components/client/MainLayoutWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/server/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://palettiq.net"),
  title: {
    default: "PalettIQ — Color Palette Generator for Designers",
    template: "%s | PalettIQ",
  },
  description:
    "Generate beautiful, accessible color palettes instantly. Explore colors, gradients, and design tools — all in one place. Free forever.",
  keywords: [
    "PalettIQ",
    "color palette generator",
    "color scheme tool",
    "gradient generator",
    "color picker",
    "design color tool",
    "accessible color palette",
    "brand color generator",
  ],
  authors: [{ name: "PalettIQ", url: "https://palettiq.net" }],
  creator: "PalettIQ",
  category: "design",
  openGraph: {
    title: "PalettIQ — Color Palette Generator for Designers",
    description:
      "Generate beautiful, accessible color palettes instantly. Free design color tool.",
    url: "https://palettiq.net",
    siteName: "PalettIQ",
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: "PalettIQ — Color Palette Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PalettIQ — Color Palette Generator",
    description: "Generate beautiful color palettes instantly. Free forever.",
    images: ["/banner.webp"],
    creator: "@palettiq",
  },
  alternates: {
    canonical: "https://palettiq.net",
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
    </html>
  );
}
