import { MetadataRoute } from "next";
import {
  preferredColors,
  moods,
  industries,
  colorHarmonies,
  useCases,
} from "@/utils/Items";
import {
  filtersToSlug,
  filtersToGradientSlug,
  nameToSlug,
} from "@/utils/utils";
import { supabase } from "@/supabase/supabase";

const paletteSlugs = [
  ...preferredColors.map((color) =>
    filtersToSlug({ preferred_colors: [color.name] }),
  ),
  ...moods.map((mood) => filtersToSlug({ moods: [mood] })),
  ...industries.map((industry) => filtersToSlug({ industries: [industry] })),
  ...colorHarmonies.map((harmony) =>
    filtersToSlug({ harmonies: [harmony.title] }),
  ),
  ...useCases.map((usecase) => filtersToSlug({ usecases: [usecase] })),
  ...preferredColors.flatMap((color) =>
    moods.map((mood) =>
      filtersToSlug({ preferred_colors: [color.name], moods: [mood] }),
    ),
  ),
].filter(Boolean);

const uniquePaletteSlugs = [...new Set(paletteSlugs)];

const singleGradientSlugs = preferredColors.map((color) =>
  filtersToGradientSlug([color.name]),
);
const dualGradientSlugs = preferredColors.flatMap((colorA, index) =>
  preferredColors
    .slice(index + 1)
    .map((colorB) => filtersToGradientSlug([colorA.name, colorB.name])),
);
const uniqueGradientSlugs = [
  ...new Set([...singleGradientSlugs, ...dualGradientSlugs].filter(Boolean)),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://palettiq.net";
  const homepageLastModified = new Date("2026-06-04");
  const exploreLastModified = new Date("2026-06-10");
  const staticLastModified = new Date("2026-06-02");

  const { data: palettes } = await supabase
    .from("palettes")
    .select("id, name, updated_at, created_at")
    .eq("status", "Published")
    .order("id", { ascending: true });

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: homepageLastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore/palettes`,
      lastModified: exploreLastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore/colors`,
      lastModified: exploreLastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore/gradients`,
      lastModified: exploreLastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/studio`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/studio/online-color-picker`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/studio/css-gradient-generator`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/studio/color-contrast-checker`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/studio/color-extractor`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/studio/css-shadow-generator`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/studio/color-palette-visualizer`,
      lastModified: staticLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/help-center`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: staticLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: staticLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: staticLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const dynamicPaletteUrls: MetadataRoute.Sitemap = uniquePaletteSlugs.map(
    (slug) => ({
      url: `${baseUrl}/explore/palettes/${slug}`,
      lastModified: exploreLastModified,
      changeFrequency: "weekly",
      priority: slug.split("-").length <= 2 ? 0.8 : 0.7,
    }),
  );

  const dynamicGradientUrls: MetadataRoute.Sitemap = uniqueGradientSlugs.map(
    (slug) => ({
      url: `${baseUrl}/explore/gradients/${slug}`,
      lastModified: exploreLastModified,
      changeFrequency: "weekly",
      priority: slug.split("-").length === 1 ? 0.8 : 0.7,
    }),
  );

  const paletteDetailUrls: MetadataRoute.Sitemap = (palettes ?? []).map(
    (palette) => ({
      url: `${baseUrl}/palettes/${palette.id}-${nameToSlug(palette.name)}`,
      lastModified: new Date(palette.updated_at || palette.created_at),
      changeFrequency: "weekly",
      priority: 0.85,
    }),
  );

  return [
    ...staticUrls,
    ...dynamicPaletteUrls,
    ...dynamicGradientUrls,
    ...paletteDetailUrls,
  ];
}
