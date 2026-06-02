import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://palettiq.net";
  const isProd = process.env.NODE_ENV === "production";

  return {
    rules: [
      {
        userAgent: "*",
        // Allows crawling the whole site in production; blocks everything in dev/staging
        allow: isProd ? "/" : [],
        disallow: [
          "/api/",
          "/dashboard/",
          "/_next/",
          "/settings/", // Blocks /settings and all sub-routes like /settings/feedback
          "/settings/feedback", // Explicit fallback
          "/settings/updates", // Explicit fallback
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
