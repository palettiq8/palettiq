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
          "Generate personalized color palettes from selected colors, moods, industries, and styles.",
        inLanguage: "en-US",
        publisher: {
          "@id": "https://palettiq.net/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://palettiq.net/#webpage",
        url: "https://palettiq.net",
        name: "Color Palette Generator From Your Selected Colors | PalettIQ",
        description:
          "Generate personalized color palettes from selected colors, moods, industries, and styles for branding, UI design, websites, and digital products.",
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
          "Generate personalized color palettes from selected colors, moods, industries, and styles. Create accessible color schemes for branding, UI design, websites, and digital products.",
        screenshot: "https://palettiq.net/banner.webp",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Generate color palettes from selected colors",
          "Color harmony generation",
          "Accessible color palette creation",
          "Gradient generator",
          "Color contrast checker",
          "Image color extractor",
          "CSS shadow generator",
          "Color visualization tools",
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://palettiq.net/#organization",
        name: "PalettIQ",
        url: "https://palettiq.net",
        logo: {
          "@type": "ImageObject",
          url: "https://palettiq.net/logo.svg",
        },
        sameAs: [
          "https://x.com/palettiq",
          "https://www.pinterest.com/palettiq8",
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
