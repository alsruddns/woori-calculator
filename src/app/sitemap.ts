import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site-config";
import { publishedCalculatorPages } from "@/data/calculator-content";

const staticPaths = ["/", "/calculators", "/about", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.5,
  }));

  const calculatorEntries: MetadataRoute.Sitemap = publishedCalculatorPages.map((calculator) => ({
    url: new URL(`/calculators/${calculator.slug}`, siteConfig.url).toString(),
    lastModified: new Date(`${calculator.updatedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...calculatorEntries];
}
