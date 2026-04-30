export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://palettiq.net/#website",
        url: "https://palettiq.net",
        name: "PalettIQ",
        description: "Color Palette Generator for Designers and Developers",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://palettiq.net/explore/palettes?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "PalettIQ",
        url: "https://palettiq.net",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Color Palette Generator",
          "AI Color Generator",
          "Gradient Generator",
          "Color Contrast Checker",
          "Image Color Extractor",
          "CSS Shadow Generator",
          "Color Visualizer",
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
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
