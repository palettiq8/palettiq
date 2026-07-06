import type { Metadata } from "next";
import { gradientSlugToColors } from "@/utils/utils";
import ExploreGradientsPageClient from "../../ExploreGradientsPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

function buildGradientLabel(slug: string): string {
  const colors = gradientSlugToColors(slug);
  return colors.join(", ") || slug.replace(/-/g, " ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = buildGradientLabel(slug);

  return {
    robots: { index: true, follow: true },
    title: `${label} CSS Gradients for Websites, UI Design & Branding`,
    description: `Explore curated ${label.toLowerCase()} CSS gradients with linear, radial, and conic styles. Copy CSS gradient code instantly for websites, mobile apps, UI design, branding, and digital products.`,
    keywords: [
      `${label.toLowerCase()} gradient`,
      `${label.toLowerCase()} gradients`,
      `${label.toLowerCase()} CSS gradient`,
      `${label.toLowerCase()} gradient background`,
      `${label.toLowerCase()} color gradient`,
      "CSS gradients",
      "linear gradient",
      "radial gradient",
      "conic gradient",
      "gradient generator",
      "gradient backgrounds",
      "UI gradients",
      "website gradients",
      "branding gradients",
      "free CSS gradients",
    ],
    alternates: {
      canonical: `https://palettiq.net/explore/gradients/${slug}`,
    },
    openGraph: {
      title: `${label} CSS Gradients | PalettIQ`,
      description: `Browse free ${label.toLowerCase()} CSS gradients for UI design and branding.`,
      url: `https://palettiq.net/explore/gradients/${slug}`,
      siteName: "PalettIQ",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/banner.webp",
          width: 1200,
          height: 630,
          alt: `${label} CSS Gradients on PalettIQ`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${label} CSS Gradients | PalettIQ`,
      description: `Browse free ${label.toLowerCase()} CSS gradients. Copy code instantly.`,
      images: ["/banner.webp"],
      creator: "@palettiq",
    },
  };
}

export default async function SlugGradientsPage({ params }: Props) {
  const { slug } = await params;
  const colors = gradientSlugToColors(slug);
  const label = buildGradientLabel(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://palettiq.net/explore/gradients/${slug}#webpage`,
        name: `${label} CSS Gradients`,
        description: `Browse curated ${label.toLowerCase()} CSS gradients for websites, branding, UI design, mobile applications, and digital products.`,
        url: `https://palettiq.net/explore/gradients/${slug}`,
        isPartOf: {
          "@id": "https://palettiq.net/#website",
        },
        publisher: {
          "@id": "https://palettiq.net/#organization",
        },
        about: {
          "@type": "Thing",
          name: `${label} CSS Gradients`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Explore Gradients",
              item: "https://palettiq.net/explore/gradients",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: `${label} Gradients`,
              item: `https://palettiq.net/explore/gradients/${slug}`,
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ExploreGradientsPageClient activeColors={colors} titleLabel={label} />

      <section className="sr-only">
        <h2>{label} CSS Gradients</h2>

        <p>
          Explore curated {label.toLowerCase()} CSS gradients for websites,
          mobile applications, user interfaces, dashboards, SaaS products,
          landing pages, branding projects, and digital products.
        </p>

        <p>
          Browse professional gradient color combinations including linear,
          radial, and conic gradients. Copy CSS gradient code instantly and use
          it in modern web design and application development.
        </p>

        <p>
          PalettIQ provides free access to {label.toLowerCase()} gradient
          collections for designers, developers, startups, agencies, marketers,
          and creative professionals.
        </p>

        <p>
          Discover modern gradient backgrounds, color transitions, website
          gradients, UI gradients, and branding gradients for digital products
          and creative projects.
        </p>
      </section>
    </>
  );
}
