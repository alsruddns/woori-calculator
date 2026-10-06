import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteConfig, siteUrl } from "@/constants/site-config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { localizedCalculatorSlugs } from "@/i18n/config";

describe("crawl metadata routes", () => {
  it("lists exactly the real static pages and published calculators once", () => {
    const entries = sitemap();
    const urls = entries.map(({ url }) => url);
    expect(entries).toHaveLength(publishedCalculatorPages.length + 5 + localizedCalculatorSlugs.length * 3 + 6);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith(`${siteConfig.url}/calculator`) && new URL(url).pathname.startsWith("/calculator"))).toBe(true);
    for (const page of publishedCalculatorPages) {
      expect(urls).toContain(siteUrl(`/calculators/${page.slug}`));
    }
    for (const slug of localizedCalculatorSlugs) {
      for (const locale of ["en", "ja", "zh"]) expect(urls).toContain(siteUrl(`/${locale}/calculators/${slug}`));
      const localeEntry = entries.find(({ url }) => url === siteUrl(`/en/calculators/${slug}`));
      expect(localeEntry?.alternates?.languages).toMatchObject({
        ko: siteUrl(`/calculators/${slug}`),
        en: siteUrl(`/en/calculators/${slug}`),
        ja: siteUrl(`/ja/calculators/${slug}`),
        zh: siteUrl(`/zh/calculators/${slug}`),
      });
    }
    for (const locale of ["en", "ja", "zh"]) {
      expect(urls).toContain(siteUrl(`/${locale}`));
      expect(urls).toContain(siteUrl(`/${locale}/calculators`));
    }
    expect(urls.some((url) => url.endsWith("/calculators/salary"))).toBe(false);
    expect(urls.some((url) => url.includes("localhost"))).toBe(false);
  });

  it("allows public crawling and points robots to the production sitemap", () => {
    const policy = robots();
    expect(policy.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(policy.sitemap).toBe(siteUrl("/sitemap.xml"));
    expect(policy.host).toBe(siteConfig.url);
  });
});
