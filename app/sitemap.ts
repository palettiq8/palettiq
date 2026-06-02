import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://palettiq.net";

  // Use a fixed date for static/legal pages so search engines know they haven't actually changed today.
  const staticLogDate = new Date("2026-06-01");

  return [
    // 1.0 - Core Homepage
    {
      url: baseUrl,
      lastModified: new Date(), // Stays fresh as the homepage likely aggregates new content
      changeFrequency: "daily",
      priority: 1.0,
    },
    // 0.9 - Highly Dynamic Explore Content
    {
      url: `${baseUrl}/explore/palettes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore/colors`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore/gradients`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    // 0.8 - Studio Tools (Code/features change less often than user content)
    {
      url: `${baseUrl}/studio`,
      lastModified: staticLogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/studio/online-color-picker`,
      lastModified: staticLogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/studio/css-gradient-generator`,
      lastModified: staticLogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/studio/color-contrast-checker`,
      lastModified: staticLogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/studio/color-extractor`,
      lastModified: staticLogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/studio/css-shadow-generator`,
      lastModified: staticLogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/studio/color-palette-visualizer`,
      lastModified: staticLogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // 0.5 - General Information
    {
      url: `${baseUrl}/about-us`,
      lastModified: staticLogDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/help-center`,
      lastModified: new Date(), // If FAQs change often, keep dynamic, otherwise use staticLogDate
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // 0.3 - Legal Documents (Rarely change)
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: staticLogDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: staticLogDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: staticLogDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // REMOVED: /settings, /settings/feedback, /settings/updates to protect user privacy and crawl budget.
  ];
}
