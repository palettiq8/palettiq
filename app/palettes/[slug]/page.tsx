import type { Metadata } from "next";
import Script from "next/script";
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
  const colorNames = (palette.preferred_colors ?? []).join(", ");
  const moodNames = (palette.moods ?? [])
    .map((m: string) => m.replace(/_/g, " "))
    .join(", ");
  const usecaseNames = (palette.usecases ?? [])
    .map((u: string) => u.replace(/_/g, " "))
    .join(", ");

  const description = (
    palette.description ||
    `Explore the ${titleLabel} color palette featuring ${colorNames} colors. ${moodNames ? `Evokes a ${moodNames} mood.` : ""} ${usecaseNames ? `Perfect for ${usecaseNames}.` : "Perfect for branding, UI design, and digital products."}`
  ).slice(0, 155);

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
      canonical: `http://localhost:3000/palettes/${slug}`,
    },
    openGraph: {
      title: `${titleLabel} Color Palette | PalettIQ`,
      description,
      url: `http://localhost:3000/palettes/${slug}`,
      images: [
        {
          url: "http://localhost:3000/banner.png",
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
      images: ["http://localhost:3000/banner.png"],
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

  const colorNames = (palette?.preferred_colors ?? []).join(", ");
  const moodNames = (palette?.moods ?? [])
    .map((m: string) => m.replace(/_/g, " "))
    .join(", ");
  const industryNames = (palette?.industries ?? [])
    .map((i: string) => i.replace(/_/g, " "))
    .join(", ");
  const usecaseNames = (palette?.usecases ?? [])
    .map((u: string) => u.replace(/_/g, " "))
    .join(", ");
  const harmonyNames = (palette?.harmonies ?? [])
    .map((h: string) => h.replace(/_/g, " "))
    .join(", ");
  const hexColors = (palette?.colors ?? [])
    .map((c: any) => c.color.toUpperCase())
    .join(", ");

  const seoDescription =
    palette.description ||
    `The ${palette.name} color palette featuring ${colorNames} colors for ${
      usecaseNames || "branding and UI design"
    }.`;

  return (
    <>
      {palette && (
        <>
          <Script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: `${palette.name} Color Palette`,
                mainEntity: {
                  "@type": "Thing",
                  name: `${palette.name} Color Palette`,
                },
                description: seoDescription,
                url: `http://localhost:3000/palettes/${slug}`,

                keywords: [
                  ...(palette.preferred_colors ?? []),
                  ...(palette.moods ?? []).map((m: string) =>
                    m.replace(/_/g, " "),
                  ),
                  ...(palette.industries ?? []).map((i: string) =>
                    i.replace(/_/g, " "),
                  ),
                  ...(palette.usecases ?? []).map((u: string) =>
                    u.replace(/_/g, " "),
                  ),
                ].join(", "),

                color: (palette.colors ?? []).map((c: { color: string }) =>
                  c.color.toUpperCase(),
                ),

                genre: "Color Palette",

                datePublished: palette.created_at,
                dateModified: palette.updated_at || palette.created_at,

                about: [
                  ...(palette.preferred_colors ?? []),
                  ...(palette.moods ?? []).map((m: string) =>
                    m.replace(/_/g, " "),
                  ),
                  ...(palette.harmonies ?? []).map((h: string) =>
                    h.replace(/_/g, " "),
                  ),
                ],

                creator: {
                  "@type": "Organization",
                  name: "PalettIQ",
                  url: "http://localhost:3000",
                },

                publisher: {
                  "@type": "Organization",
                  name: "PalettIQ",
                  url: "http://localhost:3000",
                },

                isPartOf: {
                  "@type": "WebSite",
                  name: "PalettIQ",
                  url: "http://localhost:3000",
                },
              }),
            }}
          />

          <Script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                desctiption: seoDescription,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Explore Palettes",
                    item: "http://localhost:3000/explore/palettes",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: `${palette.name} Palette`,
                    item: `http://localhost:3000/palettes/${slug}`,
                  },
                ],
              }),
            }}
          />

          <Script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: `${palette.name} Color Palette`,
                url: `http://localhost:3000/palettes/${slug}`,
                description: seoDescription,
                isPartOf: {
                  "@type": "WebSite",
                  name: "PalettIQ",
                  url: "http://localhost:3000",
                },
              }),
            }}
          />
        </>
      )}
      <PaletteDetailsPageClient id={id} />
      {palette && (
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
              and products that want to communicate these qualities through
              color.
            </p>
          )}

          {industryNames && (
            <p>
              Designed for the {industryNames}{" "}
              {palette.industries?.length > 1 ? "industries" : "industry"}.
              Perfect for branding, logos, websites, and digital products in
              these sectors.
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
            PalettIQ provides free access to curated color palettes for
            designers, developers, marketers, startups, and creative
            professionals. Browse thousands of color combinations and find the
            perfect palette for your next project.
          </p>
        </section>
      )}
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
