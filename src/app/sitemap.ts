import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site-config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { localizedCalculatorSlugs, localePath } from "@/i18n/config";

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

  const localeEntries: MetadataRoute.Sitemap = localizedCalculatorSlugs.flatMap((slug) => ["en", "ja", "zh"].map((locale) => {
    const path = `/calculators/${slug}`;
    return {
      url: new URL(localePath(locale as "en" | "ja" | "zh", path), siteConfig.url).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: {
        ko: new URL(path, siteConfig.url).toString(),
        en: new URL(localePath("en", path), siteConfig.url).toString(),
        ja: new URL(localePath("ja", path), siteConfig.url).toString(),
        zh: new URL(localePath("zh", path), siteConfig.url).toString(),
        "x-default": new URL(path, siteConfig.url).toString(),
      } },
    };
  }));

  const localizedLandingEntries: MetadataRoute.Sitemap = ["en", "ja", "zh"].flatMap((locale) => ["/", "/calculators"].map((path) => ({
    url: new URL(localePath(locale as "en" | "ja" | "zh", path), siteConfig.url).toString(),
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 0.8 : 0.6,
    alternates: { languages: {
      ko: new URL(path, siteConfig.url).toString(),
      en: new URL(localePath("en", path), siteConfig.url).toString(),
      ja: new URL(localePath("ja", path), siteConfig.url).toString(),
      zh: new URL(localePath("zh", path), siteConfig.url).toString(),
      "x-default": new URL(path, siteConfig.url).toString(),
    } },
  })));

  return [...staticEntries, ...calculatorEntries, ...localeEntries, ...localizedLandingEntries];
}
