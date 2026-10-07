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
    const publicLocalizedSlugs = localizedCalculatorSlugs.filter((slug) => publishedCalculatorPages.some((page) => page.slug === slug));
    expect(entries).toHaveLength(publishedCalculatorPages.length + 5 + publicLocalizedSlugs.length * 3 + 6);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith(`${siteConfig.serviceBaseUrl}/`) || url === siteConfig.serviceBaseUrl)).toBe(true);
    expect(urls.every((url) => !url.includes("//calculator//") && !url.startsWith(`${siteConfig.url}/calculators`))).toBe(true);
    expect(urls.filter((url) => publishedCalculatorPages.some((page) => url === `${siteConfig.serviceBaseUrl}/${page.slug}`))).toHaveLength(publishedCalculatorPages.length);
    const englishLanding = entries.find(({ url }) => url === `${siteConfig.serviceBaseUrl}/en`);
    expect(englishLanding?.alternates?.languages).toMatchObject({
      ko: siteConfig.serviceBaseUrl,
      en: `${siteConfig.serviceBaseUrl}/en`,
      ja: `${siteConfig.serviceBaseUrl}/ja`,
      zh: `${siteConfig.serviceBaseUrl}/zh`,
      "x-default": siteConfig.serviceBaseUrl,
    });
    for (const page of publishedCalculatorPages) {
      expect(urls).toContain(`${siteConfig.serviceBaseUrl}/${page.slug}`);
    }
    for (const slug of publicLocalizedSlugs) {
      for (const locale of ["en", "ja", "zh"]) expect(urls).toContain(`${siteConfig.serviceBaseUrl}/${locale}/${slug}`);
      const localeEntry = entries.find(({ url }) => url === `${siteConfig.serviceBaseUrl}/en/${slug}`);
      expect(localeEntry?.alternates?.languages).toMatchObject({
        ko: `${siteConfig.serviceBaseUrl}/${slug}`,
        en: `${siteConfig.serviceBaseUrl}/en/${slug}`,
        ja: `${siteConfig.serviceBaseUrl}/ja/${slug}`,
        zh: `${siteConfig.serviceBaseUrl}/zh/${slug}`,
        "x-default": `${siteConfig.serviceBaseUrl}/${slug}`,
      });
    }
    for (const locale of ["en", "ja", "zh"]) {
      expect(urls).toContain(`${siteConfig.serviceBaseUrl}/${locale}`);
      expect(urls).toContain(`${siteConfig.serviceBaseUrl}/${locale}/calculators`);
    }
    expect(urls.some((url) => url.endsWith("/calculators/salary"))).toBe(false);
    expect(urls.some((url) => url.includes("localhost"))).toBe(false);
  });

  it("allows public crawling and points robots to the production sitemap", () => {
    const policy = robots();
    expect(policy.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(policy.sitemap).toBe(`${siteConfig.serviceBaseUrl}/sitemap.xml`);
    expect(policy.host).toBe(siteConfig.url);
  });
});
