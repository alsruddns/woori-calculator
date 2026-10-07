import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site-config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { localizedCalculatorSlugs, localePath } from "@/i18n/config";

const staticPaths = ["/", "/calculators", "/about", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteConfig.serviceBaseUrl}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.5,
  }));

  const calculatorEntries: MetadataRoute.Sitemap = publishedCalculatorPages.map((calculator) => ({
    url: `${siteConfig.serviceBaseUrl}/${calculator.slug}`,
    lastModified: new Date(`${calculator.updatedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const publicLocalizedSlugs = localizedCalculatorSlugs.filter((slug) => publishedCalculatorPages.some((page) => page.slug === slug));
  const localeEntries: MetadataRoute.Sitemap = publicLocalizedSlugs.flatMap((slug) => ["en", "ja", "zh"].map((locale) => {
    return {
      url: `${siteConfig.serviceBaseUrl}/${locale}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: {
        ko: `${siteConfig.serviceBaseUrl}/${slug}`,
        en: `${siteConfig.serviceBaseUrl}/en/${slug}`,
        ja: `${siteConfig.serviceBaseUrl}/ja/${slug}`,
        zh: `${siteConfig.serviceBaseUrl}/zh/${slug}`,
        "x-default": `${siteConfig.serviceBaseUrl}/${slug}`,
      } },
    };
  }));

  const localizedLandingEntries: MetadataRoute.Sitemap = ["en", "ja", "zh"].flatMap((locale) => ["/", "/calculators"].map((path) => ({
    url: `${siteConfig.serviceBaseUrl}${localePath(locale as "en" | "ja" | "zh", path === "/" ? "" : path)}`,
    changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
    priority: path === "/" ? 0.8 : 0.6,
    alternates: { languages: {
      ko: `${siteConfig.serviceBaseUrl}${path === "/" ? "" : path}`,
      en: `${siteConfig.serviceBaseUrl}${localePath("en", path)}`,
      ja: `${siteConfig.serviceBaseUrl}${localePath("ja", path)}`,
      zh: `${siteConfig.serviceBaseUrl}${localePath("zh", path)}`,
      "x-default": `${siteConfig.serviceBaseUrl}${path === "/" ? "" : path}`,
    } },
  })));

  return [...staticEntries, ...calculatorEntries, ...localeEntries, ...localizedLandingEntries];
}
