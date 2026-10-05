import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteConfig } from "@/constants/site-config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { localizedCalculatorSlugs } from "@/i18n/config";

describe("crawl metadata routes", () => {
  it("lists exactly the real static pages and published calculators once", () => {
    const entries = sitemap();
    const urls = entries.map(({ url }) => url);
    expect(entries).toHaveLength(publishedCalculatorPages.length + 5 + localizedCalculatorSlugs.length * 3 + 6);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith(siteConfig.url))).toBe(true);
    for (const page of publishedCalculatorPages) {
      expect(urls).toContain(`${siteConfig.url}/calculators/${page.slug}`);
    }
    for (const slug of localizedCalculatorSlugs) {
      for (const locale of ["en", "ja", "zh"]) expect(urls).toContain(`${siteConfig.url}/${locale}/calculators/${slug}`);
      const localeEntry = entries.find(({ url }) => url === `${siteConfig.url}/en/calculators/${slug}`);
      expect(localeEntry?.alternates?.languages).toMatchObject({
        ko: `${siteConfig.url}/calculators/${slug}`,
        en: `${siteConfig.url}/en/calculators/${slug}`,
        ja: `${siteConfig.url}/ja/calculators/${slug}`,
        zh: `${siteConfig.url}/zh/calculators/${slug}`,
      });
    }
    for (const locale of ["en", "ja", "zh"]) {
      expect(urls).toContain(`${siteConfig.url}/${locale}`);
      expect(urls).toContain(`${siteConfig.url}/${locale}/calculators`);
    }
    expect(urls.some((url) => url.endsWith("/calculators/salary"))).toBe(false);
    expect(urls.some((url) => url.includes("localhost"))).toBe(false);
  });

  it("allows public crawling and points robots to the production sitemap", () => {
    const policy = robots();
    expect(policy.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(policy.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    expect(policy.host).toBe(siteConfig.url);
  });
});
