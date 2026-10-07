import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site-config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { hasLocalizedCalculator, localePath, locales } from "@/i18n/config";

const translatedSlugs = publishedCalculatorPages
  .map(({ slug }) => slug)
  .filter(hasLocalizedCalculator);

function languageAlternates(path: string) {
  return Object.fromEntries([
    ...locales.map((locale) => [locale, `${siteConfig.url}${localePath(locale, path)}`] as const),
    ["x-default", `${siteConfig.url}${localePath("ko", path)}`] as const,
  ]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const landingEntries: MetadataRoute.Sitemap = locales.flatMap((locale) => ["", "/calculators"].map((path) => ({
    url: `${siteConfig.url}${localePath(locale, path)}`,
    changeFrequency: path ? "monthly" as const : "weekly" as const,
    priority: path ? 0.6 : locale === "ko" ? 1 : 0.8,
    alternates: { languages: languageAlternates(path) },
  })));

  const legalEntries: MetadataRoute.Sitemap = ["/about", "/privacy", "/terms"].map((path) => ({
    url: `${siteConfig.url}${localePath("ko", path)}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const translatedCalculatorEntries: MetadataRoute.Sitemap = translatedSlugs.flatMap((slug) => {
    const page = publishedCalculatorPages.find((calculator) => calculator.slug === slug)!;
    const path = `/calculators/${slug}`;
    return locales.map((locale) => ({
      url: `${siteConfig.url}${localePath(locale, path)}`,
      lastModified: new Date(`${page.updatedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: languageAlternates(path) },
    }));
  });

  const koreanOnlyEntries: MetadataRoute.Sitemap = publishedCalculatorPages
    .filter(({ slug }) => !hasLocalizedCalculator(slug))
    .map((page) => ({
      url: `${siteConfig.url}${localePath("ko", `/calculators/${page.slug}`)}`,
      lastModified: new Date(`${page.updatedAt}T00:00:00.000Z`),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...landingEntries, ...legalEntries, ...translatedCalculatorEntries, ...koreanOnlyEntries];
}
