import type { MetadataRoute } from "next";
import { siteUrl } from "@/constants/site-config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { localizedCalculatorSlugs, localePath } from "@/i18n/config";

const staticPaths = ["/", "/calculators", "/about", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: siteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.5,
  }));

  const calculatorEntries: MetadataRoute.Sitemap = publishedCalculatorPages.map((calculator) => ({
    url: siteUrl(`/calculators/${calculator.slug}`),
    lastModified: new Date(`${calculator.updatedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const localeEntries: MetadataRoute.Sitemap = localizedCalculatorSlugs.flatMap((slug) => ["en", "ja", "zh"].map((locale) => {
    const path = `/calculators/${slug}`;
    return {
      url: siteUrl(localePath(locale as "en" | "ja" | "zh", path)),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: {
        ko: siteUrl(path),
        en: siteUrl(localePath("en", path)),
        ja: siteUrl(localePath("ja", path)),
        zh: siteUrl(localePath("zh", path)),
        "x-default": siteUrl(path),
      } },
    };
  }));

  const localizedLandingEntries: MetadataRoute.Sitemap = ["en", "ja", "zh"].flatMap((locale) => ["/", "/calculators"].map((path) => ({
    url: siteUrl(localePath(locale as "en" | "ja" | "zh", path)),
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 0.8 : 0.6,
    alternates: { languages: {
      ko: siteUrl(path),
      en: siteUrl(localePath("en", path)),
      ja: siteUrl(localePath("ja", path)),
      zh: siteUrl(localePath("zh", path)),
      "x-default": siteUrl(path),
    } },
  })));

  return [...staticEntries, ...calculatorEntries, ...localeEntries, ...localizedLandingEntries];
}
