import type { Metadata } from "next";
import PaletteDetailsPageClient from "./PaletteDetailsPageClient";
import { supabase } from "@/supabase/supabase";
import { nameToSlug } from "@/utils/utils";
import { PublishedPaletteType } from "@/utils/Types";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPalette(id: number) {
  const { data } = await supabase
    .from("palettes")
    .select("*")
    .eq("id", id)
    .eq("status", "Published")
    .single();
  return data as PublishedPaletteType;
}

function getPaletteSeoParts(palette: PublishedPaletteType) {
  const colorNames = (palette.preferred_colors ?? []).join(", ");
  const moodNames = (palette.moods ?? [])
    .map((m: string) => m.replace(/_/g, " "))
    .join(", ");
  const industryNames = (palette.industries ?? [])
    .map((i: string) => i.replace(/_/g, " "))
    .join(", ");
  const usecaseNames = (palette.usecases ?? [])
    .map((u: string) => u.replace(/_/g, " "))
    .join(", ");
  const harmonyNames = (palette.harmonies ?? [])
    .map((h: string) => h.replace(/_/g, " "))
    .join(", ");
  const hexColors = (palette.colors ?? [])
    .map((c: any) => c.color.toUpperCase())
    .join(", ");

  return {
    colorNames,
    moodNames,
    industryNames,
    usecaseNames,
    harmonyNames,
    hexColors,
  };
}

function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = parseInt(slug.split("-")[0]);
  const palette = await getPalette(id);

  if (!palette) {
    return {
      title: "Palette Not Found | PalettIQ",
      description: "This color palette could not be found on PalettIQ.",
    };
  }

  const titleLabel = palette.name;
  const { colorNames, moodNames, usecaseNames } = getPaletteSeoParts(palette);

  const rawDescription =
    palette.description ||
    `Explore the ${titleLabel} color palette featuring ${colorNames} colors. ${moodNames ? `Evokes a ${moodNames} mood.` : ""} ${usecaseNames ? `Perfect for ${usecaseNames}.` : "Perfect for branding, UI design, and digital products."}`;

  const description = truncateAtWord(rawDescription, 155);

  return {
    robots: { index: true, follow: true },
    title: `${titleLabel} Color Palette - Free HEX, RGB & HSL Codes`,
    description,
    keywords: [
      `${titleLabel.toLowerCase()} color palette`,
      `${titleLabel.toLowerCase()} colors`,
      `${titleLabel.toLowerCase()} color scheme`,
      ...(palette.preferred_colors ?? []).map(
        (c: string) => `${c.toLowerCase()} color palette`,
      ),
      ...(palette.moods ?? []).map(
        (m: string) => `${m.replace(/_/g, " ").toLowerCase()} palette`,
      ),
      ...(palette.industries ?? []).map(
        (i: string) => `${i.replace(/_/g, " ").toLowerCase()} color palette`,
      ),
      ...(palette.usecases ?? []).map(
        (u: string) => `${u.replace(/_/g, " ").toLowerCase()} color palette`,
      ),
      "HEX color palette",
      "RGB color palette",
      "HSL color palette",
      "free color palette",
      "UI color palette",
      "branding color palette",
    ],
    alternates: {
      canonical: `https://palettiq.net/palettes/${slug}`,
    },
    openGraph: {
      title: `${titleLabel} Color Palette | PalettIQ`,
      description,
      url: `https://palettiq.net/palettes/${slug}`,
      siteName: "PalettIQ",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/banner.webp",
          width: 1200,
          height: 630,
          alt: `${titleLabel} Color Palette on PalettIQ`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleLabel} Color Palette | PalettIQ`,
      description: `Browse the ${titleLabel} color palette. Copy HEX, RGB, HSL codes instantly.`,
      images: ["/banner.webp"],
      creator: "@palettiq",
    },
  };
}

export default async function page({ params }: Props) {
  const { slug } = await params;
  const id = parseInt(slug.split("-")[0]);
  const palette = await getPalette(id);

  if (!palette) {
    return <PaletteDetailsPageClient id={id} />;
  }

  const {
    colorNames,
    moodNames,
    industryNames,
    usecaseNames,
    harmonyNames,
    hexColors,
  } = getPaletteSeoParts(palette);

  const seoDescription =
    palette.description ||
    `The ${palette.name} color palette featuring ${colorNames} colors for ${
      usecaseNames || "branding and UI design"
    }.`;

  const pageUrl = `https://palettiq.net/palettes/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#creativework`,
        name: `${palette.name} Color Palette`,
        description: seoDescription,
        url: pageUrl,
        keywords: [
          ...(palette.preferred_colors ?? []),
          ...(palette.moods ?? []).map((m: string) => m.replace(/_/g, " ")),
          ...(palette.industries ?? []).map((i: string) =>
            i.replace(/_/g, " "),
          ),
          ...(palette.usecases ?? []).map((u: string) => u.replace(/_/g, " ")),
        ].join(", "),
        color: (palette.colors ?? []).map((c: { color: string }) =>
          c.color.toUpperCase(),
        ),
        genre: "Color Palette",
        datePublished: palette.created_at,
        dateModified: palette.updated_at || palette.created_at,
        about: [
          ...(palette.preferred_colors ?? []),
          ...(palette.moods ?? []).map((m: string) => m.replace(/_/g, " ")),
          ...(palette.harmonies ?? []).map((h: string) => h.replace(/_/g, " ")),
        ],
        creator: {
          "@id": "https://palettiq.net/#organization",
        },
        publisher: {
          "@id": "https://palettiq.net/#organization",
        },
        isPartOf: {
          "@id": "https://palettiq.net/#website",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: `${palette.name} Color Palette`,
        url: pageUrl,
        description: seoDescription,
        isPartOf: {
          "@id": "https://palettiq.net/#website",
        },
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
            name: `${palette.name} Palette`,
            item: pageUrl,
          },
        ],
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
      <PaletteDetailsPageClient id={id} />
      <section className="sr-only">
        <h2>{palette.name} Color Palette</h2>

        <p>
          The {palette.name} color palette features {hexColors}.
          {colorNames && ` Inspired by ${colorNames} color families.`}
        </p>

        {palette.description && <p>{palette.description}</p>}

        {moodNames && (
          <p>
            This palette evokes a {moodNames} mood, making it ideal for brands
            and products that want to communicate these qualities through color.
          </p>
        )}

        {industryNames && (
          <p>
            Designed for the {industryNames}{" "}
            {palette.industries?.length > 1 ? "industries" : "industry"}.
            Perfect for branding, logos, websites, and digital products in these
            sectors.
          </p>
        )}

        {usecaseNames && (
          <p>
            Best suited for {usecaseNames}. Copy HEX, RGB, and HSL color codes
            instantly and use them in your design workflow.
          </p>
        )}

        {harmonyNames && (
          <p>
            Built on a {harmonyNames} color harmony for visually balanced and
            aesthetically pleasing results.
          </p>
        )}

        <p>
          PalettIQ provides free access to curated color palettes for designers,
          developers, marketers, startups, and creative professionals. Browse
          thousands of color combinations and find the perfect palette for your
          next project.
        </p>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from("palettes")
    .select("id, name")
    .eq("status", "Published")
    .order("id", { ascending: true });

  return (data ?? []).map((palette) => ({
    slug: `${palette.id}-${nameToSlug(palette.name)}`,
  }));
}
export const dynamicParams = true;
export const revalidate = 86400;
