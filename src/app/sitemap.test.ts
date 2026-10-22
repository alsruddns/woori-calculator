import { describe, expect, it } from "vitest";
import sitemap, { createSitemapEntries } from "@/app/sitemap";
import { siteConfig } from "@/constants/site-config";
import { calculatorRegistry } from "@/data/calculators/registry";
import { calculatorSupportsLocale, localeConfig, localePath, locales, supportedLocales, phaseOneTranslatedCalculatorSlugs, phaseTranslatedCalculatorSlugs, supportedLocalesForCalculator } from "@/i18n/config";

describe("calculator sitemap locale completeness", () => {
  it("includes only supported routes and links only supported hreflang alternates", () => {
    const entries = sitemap();
    const urls = entries.map(({ url }) => url);
    const published = calculatorRegistry.filter(({ isPublished }) => isPublished);
    const expectedDetailCount = published.reduce((count, { slug }) => count + supportedLocalesForCalculator(slug).length, 0);
    expect(expectedDetailCount).toBe(published.length * locales.length + 70);
    expect(entries).toHaveLength(expectedDetailCount + supportedLocales.length);
    expect(new Set(urls).size).toBe(urls.length);
    for (const locale of supportedLocales) expect(urls).toContain(`${siteConfig.url}${localePath(locale, "/calculators")}`);

    for (const { slug, isPublished } of published) {
      if (!isPublished) continue;
      const supported = supportedLocalesForCalculator(slug);
      const rows = entries.filter(({ url }) => url.endsWith(`/calculators/${slug}`));
      expect(rows).toHaveLength(supported.length);
      for (const locale of locales) expect(urls.includes(`${siteConfig.url}${localePath(locale, `/calculators/${slug}`)}`)).toBe(calculatorSupportsLocale(slug, locale));
      const alternates = rows[0]?.alternates?.languages ?? {};
      expect(Object.keys(alternates).sort()).toEqual([...supported.map((locale) => localeConfig[locale].hreflang), "x-default"].sort());
      const alternateMap = alternates as Record<string, string>;
      for (const locale of supported) expect(alternateMap[localeConfig[locale].hreflang]).toBe(`${siteConfig.url}${localePath(locale, `/calculators/${slug}`)}`);
      expect(alternateMap["x-default"]).toBe(`${siteConfig.url}/ko/calculators/${slug}`);
    }
    expect(supportedLocalesForCalculator("median")).toEqual([...locales, "ru"]);
    expect(supportedLocalesForCalculator("age")).toEqual([...locales, "ru"]);
    expect(supportedLocalesForCalculator("fraction")).toEqual([...locales, "ru"]);
    expect(urls).toContain(`${siteConfig.url}/es/calculators/median`);
    expect(urls).toContain(`${siteConfig.url}/es/calculators/fraction`);
    expect(urls).toContain(`${siteConfig.url}/pt-br/calculators/compound-interest`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/compound-interest`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/percentage`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/savings-interest`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/median`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/tip-calculator`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/calorie-per-serving`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/vat`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/pace`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/standard-deviation`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/stock-average-price`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/stop-loss-take-profit-calculator`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/loan-early-repayment-calculator`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/rent-vs-buy-calculator`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/electricity-cost-calculator`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/travel-budget-calculator`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/ratio`);
    expect(urls).toContain(`${siteConfig.url}/ru/calculators/scale-ratio`);
    expect(urls).not.toContain(`${siteConfig.url}/ru/calculators/minimum-wage`);
    expect(entries.find(({ url }) => url.endsWith("/pt-br/calculators/fraction"))?.alternates?.languages?.["pt-BR"]).toBe(`${siteConfig.url}/pt-br/calculators/fraction`);
    expect(entries.find(({ url }) => url.endsWith("/zh-tw/calculators/fraction"))?.alternates?.languages?.["zh-TW"]).toBe(`${siteConfig.url}/zh-tw/calculators/fraction`);
    expect(urls.every((url) => url.startsWith("https://www.woori.today/"))).toBe(true);
  });

  it("excludes unpublished and unsupported calculator URLs", () => {
    const calculator = calculatorRegistry[0]!;
    const entries = createSitemapEntries([...calculatorRegistry, { ...calculator, id: "unpublished-test", slug: "unpublished-test", isPublished: false }, { ...calculator, id: "unsupported-test", slug: "unsupported-test", isPublished: true }]);
    expect(entries.some(({ url }) => url.includes("unpublished-test"))).toBe(false);
    expect(entries.some(({ url }) => url.includes("unsupported-test"))).toBe(false);
  });

  it("has all published calculator translations for each added locale", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(phaseOneTranslatedCalculatorSlugs).toHaveLength(10);
    expect(phaseTranslatedCalculatorSlugs).toHaveLength(calculatorRegistry.length);
    for (const locale of locales.filter((value) => !["ko", "en", "ja", "zh"].includes(value))) {
      for (const slug of phaseTranslatedCalculatorSlugs) {
        expect(calculatorSupportsLocale(slug, locale)).toBe(true);
        expect(urls).toContain(`${siteConfig.url}${localePath(locale, `/calculators/${slug}`)}`);
      }
    }
  });
});
