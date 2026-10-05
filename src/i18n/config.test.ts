import { describe, expect, it } from "vitest";
import { hasLocale, hasLocalizedCalculator, languageSwitchPath, localeConfig, localePath, localizedCalculatorSlugs, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";

describe("locale routing and translated calculator catalog", () => {
  it("accepts only supported locale keys and localized calculator slugs", () => {
    for (const locale of locales) expect(hasLocale(locale)).toBe(true);
    expect(hasLocale("fr")).toBe(false);
    for (const slug of localizedCalculatorSlugs) expect(hasLocalizedCalculator(slug)).toBe(true);
    expect(hasLocalizedCalculator("salary")).toBe(false);
  });

  it("keeps Korean paths and prefixes the other supported locales", () => {
    expect(localePath("ko", "/calculators/percentage")).toBe("/calculators/percentage");
    expect(localePath("en", "/calculators/percentage")).toBe("/en/calculators/percentage");
    expect(localePath("ja", "/calculators/age")).toBe("/ja/calculators/age");
    expect(localePath("zh", "/calculators/area")).toBe("/zh/calculators/area");
    expect(localePath("en", "/")).toBe("/en");
  });

  it("switches language to the same translated tool or a safe localized landing", () => {
    expect(languageSwitchPath("/calculators/loan-interest", "en")).toBe("/en/calculators/loan-interest");
    expect(languageSwitchPath("/ja/calculators/area", "zh")).toBe("/zh/calculators/area");
    expect(languageSwitchPath("/calculators/social-insurance", "en")).toBe("/en/calculators");
    expect(languageSwitchPath("/privacy", "ja")).toBe("/ja/calculators");
    expect(languageSwitchPath("/zh", "ko")).toBe("/");
  });

  it("provides complete localized content for all launch calculator translations", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const dictionary = getDictionary(locale);
      const titles = localizedCalculatorSlugs.map((slug) => dictionary.calculators[slug].title);
      const descriptions = localizedCalculatorSlugs.map((slug) => dictionary.calculators[slug].description);
      expect(new Set(titles).size).toBe(titles.length);
      expect(new Set(descriptions).size).toBe(descriptions.length);
      expect(dictionary.calculators).toHaveProperty("percentage");
      for (const slug of localizedCalculatorSlugs) {
        const page = dictionary.calculators[slug];
        expect(page.name.length).toBeGreaterThan(0);
        expect(page.title.length).toBeGreaterThan(0);
        expect(page.description.length).toBeGreaterThan(0);
        expect(page.howTo.length).toBeGreaterThan(0);
        expect(page.formula.length).toBeGreaterThan(0);
        expect(page.example.question.length).toBeGreaterThan(0);
        expect(page.faqs.length).toBeGreaterThan(0);
        expect(page.related).not.toContain(slug);
        for (const related of page.related) expect(localizedCalculatorSlugs).toContain(related);
      }
    }
  });

  it("uses locale specific canonical, hreflang, html and Open Graph values", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const metadata = localizedMetadata(locale, "/calculators/percentage", "Title", "Description");
      expect(metadata.alternates?.canonical).toContain(`/${locale}/calculators/percentage`);
      expect(metadata.alternates?.languages).toMatchObject({
        ko: "https://woori.today/calculators/percentage",
        en: "https://woori.today/en/calculators/percentage",
        ja: "https://woori.today/ja/calculators/percentage",
        zh: "https://woori.today/zh/calculators/percentage",
      });
      expect(localeConfig[locale].ogLocale).toMatch(/^(en_US|ja_JP|zh_CN)$/);
    }
    expect(localeConfig.zh.htmlLang).toBe("zh-CN");
  });
});
