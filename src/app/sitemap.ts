import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turnitaroundbusiness.com";

const publicPaths = [
  "/",
  "/about",
  "/services",
  "/services/capacity-building",
  "/services/strategic-advisory",
  "/services/accounting",
  "/case-studies",
  "/insights",
  "/blog",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return publicPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
