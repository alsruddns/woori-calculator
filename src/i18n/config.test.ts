import { describe, expect, it } from "vitest";
import { calculatorSupportsLocale, existingLocales, hasLocale, hasLocalizedCalculator, languageSwitchPath, localeConfig, localePath, localizedCalculatorSlugs, locales, phaseOneTranslatedCalculatorSlugs, supportedLocalesForCalculator } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";
import { matchesCalculatorSearch } from "@/lib/i18n/search";

describe("locale routing and translated calculator catalog", () => {
  it("accepts only supported locale keys and localized calculator slugs", () => {
    for (const locale of locales) expect(hasLocale(locale)).toBe(true);
    expect(hasLocale("fr")).toBe(true);
    expect(locales).toHaveLength(15);
    expect(localeConfig["pt-br"].hreflang).toBe("pt-BR");
    expect(localeConfig["zh-tw"].hreflang).toBe("zh-TW");
    for (const slug of localizedCalculatorSlugs) expect(hasLocalizedCalculator(slug)).toBe(true);
    expect(hasLocalizedCalculator("salary")).toBe(false);
  });

  it("prefixes all supported locale paths, including Korean", () => {
    expect(localePath("ko", "/calculators/percentage")).toBe("/ko/calculators/percentage");
    expect(localePath("en", "/calculators/percentage")).toBe("/en/calculators/percentage");
    expect(localePath("ja", "/calculators/age")).toBe("/ja/calculators/age");
    expect(localePath("zh", "/calculators/area")).toBe("/zh/calculators/area");
    expect(localePath("ko")).toBe("/ko");
    expect(localePath("en", "/")).toBe("/en");
  });

  it("switches language to the same translated tool or a safe localized landing", () => {
    expect(languageSwitchPath("/ko/calculators/loan-interest", "es")).toBe("/en/calculators/loan-interest");
    expect(languageSwitchPath("/en/calculators/loan-interest", "ko")).toBe("/ko/calculators/loan-interest");
    expect(languageSwitchPath("/ja/calculators/area", "zh-tw")).toBe("/zh-tw/calculators/area");
    expect(languageSwitchPath("/ko/calculators/social-insurance", "en")).toBe("/en/calculators/social-insurance");
    expect(languageSwitchPath("/ko/privacy", "ja")).toBe("/ko/calculators");
    expect(languageSwitchPath("/zh", "ko")).toBe("/ko");
    expect(languageSwitchPath("/ko/calculators/fraction", "ja")).toBe("/ja/calculators/fraction");
  });

  it("provides complete translated UI and all first ten calculator pages in the 11 added locales", () => {
    const newLocales = locales.filter((locale) => !existingLocales.includes(locale as typeof existingLocales[number]));
    const commonKeys = Object.keys(getDictionary("en").common).sort();
    for (const locale of newLocales) {
      const dictionary = getDictionary(locale);
      expect(Object.keys(dictionary.common).sort()).toEqual(commonKeys);
      expect(dictionary.calculatorList.title).not.toBe(getDictionary("en").calculatorList.title);
      for (const slug of phaseOneTranslatedCalculatorSlugs) {
        const page = dictionary.calculators[slug]!;
        const english = getDictionary("en").calculators[slug]!;
        expect(page.title).toBeTruthy();
        expect(page.description).toBeTruthy();
        expect(page.name).toBeTruthy();
        expect(page.howTo).toBeTruthy();
        expect(page.formula).toBeTruthy();
        expect(page.example.question).toBeTruthy();
        expect(page.faqs.length).toBeGreaterThan(0);
        expect(Object.keys(page.fields).length).toBeGreaterThan(0);
        expect(page.name).not.toBe(english.name);
        expect(page.title).not.toBe(english.title);
        expect(page.description).not.toBe(english.description);
        expect(page.howTo).not.toBe(english.howTo);
        expect(page.formula).not.toBe(english.formula);
        expect(page.example.question).not.toBe(english.example.question);
        expect(page.example.answer).not.toBe(english.example.answer);
        for (const key of Object.keys(page.fields)) expect(page.fields[key]?.label).not.toBe(english.fields[key]?.label);
        for (const key of Object.keys(page.resultLabels)) {
          const sourceLabel = english.resultLabels[key];
          if (!sourceLabel || /^[A-Z0-9%/²]+$/.test(sourceLabel)) continue;
          expect(page.resultLabels[key]).not.toBe(sourceLabel);
        }
      }
    }
    expect(phaseOneTranslatedCalculatorSlugs).toHaveLength(10);
    expect(supportedLocalesForCalculator("compound-interest")).toEqual(locales);
    expect(supportedLocalesForCalculator("fraction")).toEqual(existingLocales);
  });

  it("uses route locales for canonicals and BCP 47 locale keys for alternates", () => {
    for (const slug of phaseOneTranslatedCalculatorSlugs) {
      const content = getDictionary("pt-br").calculators[slug]!;
      const meta = localizedMetadata("pt-br", `/calculators/${slug}`, content.title, content.description, content.keywords, locales);
      expect(meta.alternates?.canonical).toBe(`https://www.woori.today/pt-br/calculators/${slug}`);
      expect(meta.alternates?.languages?.["pt-BR"]).toBe(`https://www.woori.today/pt-br/calculators/${slug}`);
      expect(meta.alternates?.languages?.["zh-TW"]).toBe(`https://www.woori.today/zh-tw/calculators/${slug}`);
      expect(meta.alternates?.languages?.["x-default"]).toBe(`https://www.woori.today/ko/calculators/${slug}`);
    }
  });

  it("reports every published calculator with locale support metadata", () => {
    const missing = localizedCalculatorSlugs.flatMap((slug) => locales
      .filter((locale) => !calculatorSupportsLocale(slug, locale))
      .map((locale) => `${slug}:${locale}`));
    expect(missing.length).toBeGreaterThan(0);
    expect(missing).toContain("fraction:es");
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
    expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/${slug}`);
    expect(metadata.alternates?.languages).toMatchObject({
      ko: `https://www.woori.today/ko/calculators/${slug}`,
      en: `https://www.woori.today/en/calculators/${slug}`,
      ja: `https://www.woori.today/ja/calculators/${slug}`,
      zh: `https://www.woori.today/zh/calculators/${slug}`,
      "x-default": `https://www.woori.today/ko/calculators/${slug}`,
    });
    expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
  });

  it("canonicalizes Korean calculator pages under /ko with a Korean x-default", () => {
    const metadata = localizedMetadata("ko", "/calculators/loan-interest", "Title", "Description");
    expect(metadata.alternates?.canonical).toBe("https://www.woori.today/ko/calculators/loan-interest");
    expect(metadata.alternates?.languages).toMatchObject({
      ko: "https://www.woori.today/ko/calculators/loan-interest",
      "x-default": "https://www.woori.today/ko/calculators/loan-interest",
    });
    expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
    expect(metadata.openGraph?.locale).toBe("ko_KR");
  });

  it("searches with translated names, slugs, and locale-specific keywords", () => {
    expect(matchesCalculatorSearch({ name: "Simple Interest Calculator", slug: "simple-interest", keywords: ["interest calculator"] }, "INTEREST")).toBe(true);
    expect(matchesCalculatorSearch({ name: "複利計算", slug: "compound-interest", keywords: ["利息"] }, "利息")).toBe(true);
    expect(matchesCalculatorSearch({ name: "贷款利息计算器", slug: "loan-interest", keywords: ["贷款"] }, "贷款")).toBe(true);
    expect(matchesCalculatorSearch({ name: "BMI Calculator", slug: "bmi", keywords: ["body mass index"] }, "body mass")).toBe(true);
    expect(matchesCalculatorSearch({ name: "Ratio Calculator", slug: "ratio" }, "unrelated")).toBe(false);
  });

  it("provides complete natural fraction content, calculator labels, and SEO metadata in all locales", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const page = getDictionary(locale).calculators.fraction!;
      expect(page.name).toMatch(locale === "en" ? /Fraction Calculator/ : locale === "ja" ? /分数/ : /分数/);
      expect(page.title).toContain(page.name);
      expect(page.description.length).toBeGreaterThan(20);
      expect(page.howTo).toContain(page.description);
      expect(page.faqs.length).toBeGreaterThanOrEqual(3);
      expect(Object.keys(page.fields)).toEqual(expect.arrayContaining(["aNumerator", "aDenominator", "operation", "bNumerator", "bDenominator"]));
      expect(Object.keys(page.options.operation ?? {})).toEqual(["add", "subtract", "multiply", "divide"]);
      expect(Object.keys(page.resultLabels).filter((label) => label.startsWith("__result_")).sort()).toEqual(["__result_0", "__result_1", "__result_2"]);
      expect(page.related).toEqual(expect.arrayContaining(["percentage", "ratio"]));
      const metadata = localizedMetadata(locale, "/calculators/fraction", page.title, page.description, page.keywords);
      expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/fraction`);
      expect(metadata.alternates?.languages).toMatchObject({
        ko: "https://www.woori.today/ko/calculators/fraction",
        en: "https://www.woori.today/en/calculators/fraction",
        ja: "https://www.woori.today/ja/calculators/fraction",
        zh: "https://www.woori.today/zh/calculators/fraction",
        "x-default": "https://www.woori.today/ko/calculators/fraction",
      });
      expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
    }
  });

  it("provides complete standard deviation content and locale SEO metadata", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const page = getDictionary(locale).calculators["standard-deviation"]!;
      expect(page.name).toBe(locale === "en" ? "Standard Deviation Calculator" : locale === "ja" ? "標準偏差計算機" : "标准差计算器");
      expect(page.title).toBe(locale === "en"
        ? "Standard Deviation Calculator | Mean, Variance and Standard Deviation"
        : locale === "ja"
          ? "標準偏差計算機 | 平均・分散・標準偏差を計算"
          : "标准差计算器 | 平均值、方差和标准差计算");
      expect(page.title).toContain(page.name);
      expect(page.description.length).toBeGreaterThan(20);
      expect(page.keywords).toContain(locale === "zh" ? "标准差计算器" : locale === "ja" ? "標準偏差 計算" : "standard deviation calculator");
      expect(page.fields.numbers?.label).toBeTruthy();
      expect(page.fields.mode?.label).toBeTruthy();
      expect(page.options.mode).toMatchObject({ population: expect.any(String), sample: expect.any(String) });
      expect(page.resultLabels).toMatchObject({ "__result_0": expect.any(String), "__result_1": expect.any(String), "__result_2": expect.any(String), "__result_3": expect.any(String) });
      expect(page.faqs.length).toBeGreaterThanOrEqual(3);
      expect(page.related).toContain("average");
      const metadata = localizedMetadata(locale, "/calculators/standard-deviation", page.title, page.description, page.keywords);
      expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/standard-deviation`);
      expect(metadata.alternates?.languages).toMatchObject({
        ko: "https://www.woori.today/ko/calculators/standard-deviation",
        en: "https://www.woori.today/en/calculators/standard-deviation",
        ja: "https://www.woori.today/ja/calculators/standard-deviation",
        zh: "https://www.woori.today/zh/calculators/standard-deviation",
        "x-default": "https://www.woori.today/ko/calculators/standard-deviation",
      });
      expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
      expect(metadata.openGraph?.title).toBe(page.title);
      expect(metadata.keywords).toEqual(page.keywords);
    }
  });

  it("provides complete median content and locale SEO metadata", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const page = getDictionary(locale).calculators.median!;
      expect(page.name).toBe(locale === "en" ? "Median Calculator" : locale === "ja" ? "中央値計算機" : "中位数计算器");
      expect(page.title).toBe(locale === "en"
        ? "Median Calculator | Calculate the Median of a Number Set"
        : locale === "ja"
          ? "中央値計算機 | 数値データの中央値を計算"
          : "中位数计算器 | 计算一组数字的中位数");
      expect(page.shortName.length).toBeGreaterThan(0);
      expect(page.fields.numbers?.label).toBeTruthy();
      expect(page.resultLabels).toMatchObject({ "__result_0": expect.any(String), "__result_1": expect.any(String), "__result_2": expect.any(String) });
      expect(page.faqs.length).toBeGreaterThanOrEqual(2);
      expect(page.related).toContain("average");
      const metadata = localizedMetadata(locale, "/calculators/median", page.title, page.description, page.keywords);
      expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/median`);
      expect(metadata.alternates?.languages).toMatchObject({
        ko: "https://www.woori.today/ko/calculators/median",
        en: "https://www.woori.today/en/calculators/median",
        ja: "https://www.woori.today/ja/calculators/median",
        zh: "https://www.woori.today/zh/calculators/median",
        "x-default": "https://www.woori.today/ko/calculators/median",
      });
      expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
    }
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
      expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/percentage`);
      expect(metadata.alternates?.languages).toMatchObject({
        ko: "https://www.woori.today/ko/calculators/percentage",
        en: "https://www.woori.today/en/calculators/percentage",
        ja: "https://www.woori.today/ja/calculators/percentage",
        zh: "https://www.woori.today/zh/calculators/percentage",
        "x-default": "https://www.woori.today/ko/calculators/percentage",
      });
      expect(localeConfig[locale].ogLocale).toMatch(/^(en_US|ja_JP|zh_CN)$/);
    }
    expect(localeConfig.zh.htmlLang).toBe("zh-CN");
  });
});
