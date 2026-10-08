import { describe, expect, it } from "vitest";
import sitemap, { createSitemapEntries } from "@/app/sitemap";
import { siteConfig } from "@/constants/site-config";
import { calculatorRegistry } from "@/data/calculators/registry";
import { hasLocalizedCalculator, localePath, locales } from "@/i18n/config";

describe("calculator sitemap", () => {
  it("includes every published calculator with localized content in all supported locales", () => {
    const entries = sitemap();
    const urls = entries.map(({ url }) => url);
    const publicLocalizedCalculators = calculatorRegistry.filter(({ isPublished, slug }) => isPublished && hasLocalizedCalculator(slug));
    const detailEntries = entries.filter(({ url }) => /\/calculators\/[^/]+$/.test(url));

    expect(siteConfig.url).toBe("https://www.woori.today");
    expect(entries).toHaveLength(publicLocalizedCalculators.length * locales.length + locales.length);
    expect(detailEntries).toHaveLength(publicLocalizedCalculators.length * locales.length);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://www.woori.today/"))).toBe(true);

    for (const locale of locales) {
      const listUrl = `${siteConfig.url}${localePath(locale, "/calculators")}`;
      const listEntry = entries.find(({ url }) => url === listUrl);
      expect(listEntry).toBeDefined();
      expect(listEntry?.alternates?.languages).toMatchObject({
        ko: `${siteConfig.url}/ko/calculators`,
        en: `${siteConfig.url}/en/calculators`,
        ja: `${siteConfig.url}/ja/calculators`,
        zh: `${siteConfig.url}/zh/calculators`,
        "x-default": `${siteConfig.url}/ko/calculators`,
      });
    }

    for (const calculator of publicLocalizedCalculators) {
      const koreanUrl = `${siteConfig.url}/ko/calculators/${calculator.slug}`;
      const entriesForSlug = entries.filter(({ url }) => url.endsWith(`/calculators/${calculator.slug}`));
      expect(entriesForSlug).toHaveLength(locales.length);
      for (const locale of locales) {
        expect(urls).toContain(`${siteConfig.url}${localePath(locale, `/calculators/${calculator.slug}`)}`);
      }
      expect(entriesForSlug[0]?.alternates?.languages).toMatchObject({
        ko: koreanUrl,
        en: `${siteConfig.url}/en/calculators/${calculator.slug}`,
        ja: `${siteConfig.url}/ja/calculators/${calculator.slug}`,
        zh: `${siteConfig.url}/zh/calculators/${calculator.slug}`,
        "x-default": koreanUrl,
      });
    }

    expect(urls.every((url) => /^https:\/\/www\.woori\.today\/(ko|en|ja|zh)\/calculators(?:\/|$)/.test(url))).toBe(true);
    expect(urls.some((url) => /https:\/\/www\.woori\.today\/(?:calculator\/|calculators\/)/.test(url))).toBe(false);
  });

  it("excludes unpublished and unsupported calculators without sitemap edits", () => {
    const calculator = calculatorRegistry[0]!;
    const entries = createSitemapEntries([
      ...calculatorRegistry,
      { ...calculator, id: "unpublished-test", slug: "unpublished-test", isPublished: false },
      { ...calculator, id: "unsupported-test", slug: "unsupported-test", isPublished: true },
    ]);
    const urls = entries.map(({ url }) => url);

    expect(urls.some((url) => url.includes("unpublished-test"))).toBe(false);
    expect(urls.some((url) => url.includes("unsupported-test"))).toBe(false);
    expect(entries).toHaveLength(sitemap().length);
  });
});
