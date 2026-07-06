import type { Metadata } from "next";
import ExplorePalettesPageClient from "../../ExplorePalettesPageClient";
import { slugToFilters } from "@/utils/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

function buildTitleLabel(
  slug: string,
  filters: ReturnType<typeof slugToFilters>,
): string {
  const allValues = [
    ...(filters.preferred_colors ?? []),
    ...(filters.saturation_level ?? []),
    ...(filters.brightness_level ?? []),
    ...(filters.moods ?? []),
    ...(filters.harmonies ?? []),
    ...(filters.modes ?? []),
    ...(filters.industries ?? []),
    ...(filters.usecases ?? []),
  ]
    .slice(0, 5)
    .map((v) => v.replace(/_/g, " "))
    .join(", ");

  return allValues || slug.replace(/-/g, " ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filters = slugToFilters(slug);
  const titleLabel = buildTitleLabel(slug, filters);

  return {
    robots: { index: true, follow: true },
    title: `${titleLabel} Color Palettes for Branding, UI Design & Websites`,
    description: `Explore curated ${titleLabel.toLowerCase()} color palettes with HEX, RGB, and HSL color codes. Perfect for branding, websites, mobile apps, UI design, and digital products.`,
    keywords: [
      `${titleLabel.toLowerCase()} color palette`,
      `${titleLabel.toLowerCase()} color palettes`,
      `${titleLabel.toLowerCase()} colors`,
      `${titleLabel.toLowerCase()} color scheme`,
      `${titleLabel.toLowerCase()} color combinations`,
      `${titleLabel.toLowerCase()} palette`,
      "HEX color palette",
      "RGB color palette",
      "HSL color palette",
      "branding color palette",
      "website color palette",
      "UI color palette",
      "free color palettes",
    ],
    alternates: {
      canonical: `https://palettiq.net/explore/palettes/${slug}`,
    },
    openGraph: {
      title: `${titleLabel} Color Palettes | PalettIQ`,
      description: `Explore curated ${titleLabel.toLowerCase()} color palettes with HEX, RGB, and HSL color codes. Perfect for branding, websites, mobile apps, UI design, and digital products.`,
      url: `https://palettiq.net/explore/palettes/${slug}`,
      siteName: "PalettIQ",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/banner.webp",
          width: 1200,
          height: 630,
          alt: `${titleLabel} Color Palettes on PalettIQ`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleLabel} Color Palettes | PalettIQ`,
      description: `Browse free ${titleLabel.toLowerCase()} color palettes. Copy HEX, RGB, HSL instantly.`,
      images: ["/banner.webp"],
      creator: "@palettiq",
    },
  };
}

export default async function SlugPalettesPage({ params }: Props) {
  const { slug } = await params;
  const filters = slugToFilters(slug);
  const titleLabel = buildTitleLabel(slug, filters);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://palettiq.net/explore/palettes/${slug}#webpage`,
        name: `${titleLabel} Color Palettes`,
        description: `Browse free curated ${titleLabel.toLowerCase()} color palettes for branding, UI design, and digital products.`,
        url: `https://palettiq.net/explore/palettes/${slug}`,
        isPartOf: {
          "@id": "https://palettiq.net/#website",
        },
        publisher: {
          "@id": "https://palettiq.net/#organization",
        },
        about: {
          "@type": "Thing",
          name: `${titleLabel} Color Palettes`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Explore Palettes",
              item: "https://palettiq.net/explore/palettes",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: `${titleLabel} Palettes`,
              item: `https://palettiq.net/explore/palettes/${slug}`,
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
      <ExplorePalettesPageClient filters={filters} titleLabel={titleLabel} />
      <section className="sr-only">
        <h2>About {titleLabel} Color Palettes</h2>

        <p>
          Explore curated {titleLabel.toLowerCase()} color palettes designed for
          branding, websites, mobile applications, user interfaces, SaaS
          products, dashboards, landing pages, marketing materials, and creative
          projects.
        </p>

        <p>
          Browse professional {titleLabel.toLowerCase()} color combinations with
          HEX, RGB, and HSL color codes. Find color schemes that help create
          visually consistent brand identities, design systems, and digital
          experiences.
        </p>

        <p>
          PalettIQ provides free access to {titleLabel.toLowerCase()} color
          palettes for designers, developers, marketers, startups, agencies, and
          creative professionals looking for modern and effective color
          inspiration.
        </p>

        <p>
          Discover color palette ideas based on mood, industry, color family,
          saturation level, and use case. Copy colors instantly and use them in
          web design, app design, branding projects, presentations,
          illustrations, and product design workflows.
        </p>
      </section>
    </>
  );
}
