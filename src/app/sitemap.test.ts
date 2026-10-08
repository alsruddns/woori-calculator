import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/constants/site-config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { hasLocalizedCalculator, localePath, locales } from "@/i18n/config";

describe("crawl metadata routes", () => {
  it("lists only calculator-owned locale landings and published calculators exactly once", () => {
    const entries = sitemap();
    const urls = entries.map(({ url }) => url);
    const publicLocalizedSlugs = publishedCalculatorPages.map(({ slug }) => slug).filter(hasLocalizedCalculator);
    expect(entries).toHaveLength(locales.length + publishedCalculatorPages.length + publicLocalizedSlugs.length * 3);
    expect(new Set(urls).size).toBe(urls.length);
    expect(siteConfig.url).toBe("https://www.woori.today");
    expect(urls.every((url) => url.startsWith("https://www.woori.today/"))).toBe(true);
    expect(urls.some((url) => /^https:\/\/www\.woori\.today\/(?:ko|en|ja|zh)(?:\/|$)$/.test(url))).toBe(false);
    expect(urls.some((url) => /\/(?:about|privacy|terms)(?:\/|$)/.test(url))).toBe(false);
    expect(urls.some((url) => url.includes("/calculator/"))).toBe(false);

    for (const locale of locales) {
      expect(urls).toContain(`${siteConfig.url}${localePath(locale, "/calculators")}`);
    }
    expect(urls.every((url) => /\/(ko|en|ja|zh)\/calculators(?:\/|$)/.test(url))).toBe(true);
    for (const calculator of publishedCalculatorPages) {
      const koUrl = `${siteConfig.url}${localePath("ko", `/calculators/${calculator.slug}`)}`;
      expect(urls).toContain(koUrl);
      const entriesForSlug = entries.filter(({ url }) => url.endsWith(`/calculators/${calculator.slug}`));
      if (hasLocalizedCalculator(calculator.slug)) {
        for (const locale of locales) expect(urls).toContain(`${siteConfig.url}${localePath(locale, `/calculators/${calculator.slug}`)}`);
        expect(entriesForSlug).toHaveLength(locales.length);
        expect(entriesForSlug[0]?.alternates?.languages).toMatchObject({
          ko: koUrl,
          en: `${siteConfig.url}/en/calculators/${calculator.slug}`,
          ja: `${siteConfig.url}/ja/calculators/${calculator.slug}`,
          zh: `${siteConfig.url}/zh/calculators/${calculator.slug}`,
          "x-default": koUrl,
        });
      } else {
        expect(entriesForSlug).toHaveLength(1);
        expect(entriesForSlug[0]?.alternates).toBeUndefined();
      }
    }
    expect(urls.some((url) => url.endsWith("/calculators/salary"))).toBe(false);
    expect(urls.some((url) => url.includes("localhost"))).toBe(false);
  });

});
