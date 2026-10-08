import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site-config";
import { getCalculatorPage } from "@/data/calculator-content";
import { calculatorRegistry } from "@/data/calculators/registry";
import { hasLocalizedCalculator, localePath, locales } from "@/i18n/config";
import { localizedLanguageAlternates } from "@/lib/i18n/seo";
import type { CalculatorDefinition } from "@/types/calculator";

export function createSitemapEntries(calculators: readonly CalculatorDefinition[] = calculatorRegistry): MetadataRoute.Sitemap {
  const landingEntries: MetadataRoute.Sitemap = locales.map((locale) => {
    const path = "/calculators";
    return {
      url: `${siteConfig.url}${localePath(locale, path)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: localizedLanguageAlternates(path) },
    };
  });

  const detailEntries: MetadataRoute.Sitemap = calculators
    .filter(({ isPublished, slug }) => isPublished && hasLocalizedCalculator(slug))
    .flatMap(({ slug }) => {
      const path = `/calculators/${slug}`;
      const page = getCalculatorPage(slug);
      return locales.map((locale) => ({
        url: `${siteConfig.url}${localePath(locale, path)}`,
        ...(page ? { lastModified: new Date(`${page.updatedAt}T00:00:00.000Z`) } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: localizedLanguageAlternates(path) },
      }));
    });

  return [...landingEntries, ...detailEntries];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemapEntries();
}
