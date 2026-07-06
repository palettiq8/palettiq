export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://palettiq.net/#website",
        url: "https://palettiq.net",
        name: "PalettIQ",
        description:
          "Personalized color palette generator and visualizer for designers — create palettes from your colors and harmonies with full HSL control.",
        inLanguage: "en-US",
        publisher: {
          "@id": "https://palettiq.net/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/#webpage",
        url: "https://palettiq.net",
        name: "Color Palette Generator & Visualizer for Designers | PalettIQ",
        description:
          "Generate personalized color palettes from your colors and harmonies, control hue, saturation, and lightness, then visualize on templates or your own SVG.",
        inLanguage: "en-US",
        isPartOf: {
          "@id": "https://palettiq.net/#website",
        },
      },
      {
        "@type": "Brand",
        "@id": "https://palettiq.net/#brand",
        name: "PalettIQ",
        url: "https://palettiq.net",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://palettiq.net/#software",
        name: "PalettIQ",
        url: "https://palettiq.net",
        applicationCategory: "DesignApplication",
        applicationSubCategory: "Color Design Tool",
        operatingSystem: "Web",
        creator: {
          "@id": "https://palettiq.net/#organization",
        },
        brand: {
          "@id": "https://palettiq.net/#brand",
        },
        description:
          "Personalized color design tools for designers: generate palettes from your colors and harmonies with full HSL control, visualize on templates or custom SVG uploads, extract colors, check contrast, and generate gradients and shadows.",
        screenshot: "https://palettiq.net/banner.webp",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Generate color palettes from selected colors and harmonies",
          "Full HSL (hue, saturation, lightness) control",
          "Color palette visualizer with ready-made templates",
          "Visualize palettes on custom uploaded SVG designs",
          "CSS gradient generator",
          "Color contrast checker",
          "Image color extractor",
          "Online color picker",
          "CSS shadow generator",
          "Explore ready-made color palettes and shades",
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://palettiq.net/#organization",
        name: "PalettIQ",
        url: "https://palettiq.net",
        description:
          "PalettIQ builds personalized color design tools for designers.",
        logo: {
          "@type": "ImageObject",
          url: "https://palettiq.net/logo.svg",
        },
        sameAs: [
          "https://x.com/palettiq",
          "https://www.pinterest.com/palettiq8/_created/",
          "https://www.instagram.com/palett.iq/",
          "https://www.linkedin.com/company/palettiq/",
          "https://www.facebook.com/profile.php?id=61589009866760",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
