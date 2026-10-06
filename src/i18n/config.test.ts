import { describe, expect, it } from "vitest";
import { hasLocale, hasLocalizedCalculator, languageSwitchPath, localeConfig, localePath, localizedCalculatorSlugs, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";
import { matchesCalculatorSearch } from "@/lib/i18n/search";
import { siteConfig } from "@/constants/site-config";

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

  it("provides complete localized content and unique search metadata for all translated calculators", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const dictionary = getDictionary(locale);
      const titles = localizedCalculatorSlugs.map((slug) => dictionary.calculators[slug]!.title);
      const descriptions = localizedCalculatorSlugs.map((slug) => dictionary.calculators[slug]!.description);
      expect(new Set(titles).size).toBe(titles.length);
      expect(new Set(descriptions).size).toBe(descriptions.length);
      expect(dictionary.calculators).toHaveProperty("percentage");
      for (const slug of localizedCalculatorSlugs) {
        const page = dictionary.calculators[slug]!;
        expect(page.name.length).toBeGreaterThan(0);
        expect(page.title.length).toBeGreaterThan(0);
        expect(page.description.length).toBeGreaterThan(0);
        expect(page.keywords?.length).toBeGreaterThan(0);
        expect(page.howTo.length).toBeGreaterThan(0);
        expect(page.formula.length).toBeGreaterThan(0);
        expect(page.example.question.length).toBeGreaterThan(0);
        expect(page.faqs.length).toBeGreaterThan(0);
        expect(Object.keys(page.resultLabels).length).toBeGreaterThan(0);
        expect(Object.keys(page.fields).length).toBeGreaterThan(0);
        const visibleCopy = [page.name, page.title, page.description, page.howTo, page.formula, page.example.question, page.example.answer, page.validation, page.resultNote, ...page.keywords!, ...page.faqs.flatMap(({ question, answer }) => [question, answer]), ...Object.values(page.fields).map(({ label }) => label), ...Object.values(page.options).flatMap(Object.values), ...Object.values(page.resultLabels)];
        expect(visibleCopy.some((value) => /[\uAC00-\uD7AF]/.test(value))).toBe(false);
        expect(page.related).not.toContain(slug);
        for (const related of page.related) expect(localizedCalculatorSlugs).toContain(related);
      }
    }
  });

  it.each(localizedCalculatorSlugs.flatMap((slug) => (["en", "ja", "zh"] as const).map((locale) => [slug, locale] as const)))("has locale-specific canonical and hreflang for %s (%s)", (slug, locale) => {
    const page = getDictionary(locale).calculators[slug]!;
    const metadata = localizedMetadata(locale, `/calculators/${slug}`, page.title, page.description, page.keywords);
    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/${locale}/calculators/${slug}`);
    expect(metadata.alternates?.languages).toMatchObject({
      ko: `${siteConfig.url}/calculators/${slug}`,
      en: `${siteConfig.url}/en/calculators/${slug}`,
      ja: `${siteConfig.url}/ja/calculators/${slug}`,
      zh: `${siteConfig.url}/zh/calculators/${slug}`,
      "x-default": `${siteConfig.url}/calculators/${slug}`,
    });
  });

  it("searches with translated names, slugs, and locale-specific keywords", () => {
    expect(matchesCalculatorSearch({ name: "Simple Interest Calculator", slug: "simple-interest", keywords: ["interest calculator"] }, "INTEREST")).toBe(true);
    expect(matchesCalculatorSearch({ name: "複利計算", slug: "compound-interest", keywords: ["利息"] }, "利息")).toBe(true);
    expect(matchesCalculatorSearch({ name: "贷款利息计算器", slug: "loan-interest", keywords: ["贷款"] }, "贷款")).toBe(true);
    expect(matchesCalculatorSearch({ name: "BMI Calculator", slug: "bmi", keywords: ["body mass index"] }, "body mass")).toBe(true);
    expect(matchesCalculatorSearch({ name: "Ratio Calculator", slug: "ratio" }, "unrelated")).toBe(false);
  });

  it.each(localizedCalculatorSlugs)("provides search keywords and only localized related links for %s", (slug) => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const page = getDictionary(locale).calculators[slug]!;
      expect(page.keywords?.length).toBeGreaterThan(0);
      expect(new Set(page.related).size).toBe(page.related.length);
      for (const related of page.related) expect(getDictionary(locale).calculators[related]).toBeDefined();
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
