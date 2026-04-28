import type { Metadata } from "next";
import { primary } from "@/utils/Fonts";
import "./globals.css";
import MainLayoutWrapper from "@/components/client/MainLayoutWrapper";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "PalettIQ - Designers & Brands",
  description:
    "PalettIQ helps designers, developers, and businesses create beautiful, accessible color palettes and brand kits. Generate, explore, and export perfect color combinations with ease. Simplify your design workflow.",
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
        <Analytics />
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
