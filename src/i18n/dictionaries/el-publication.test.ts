import { describe, expect, it } from "vitest";
import { calculatorSupportsLocale, localePath, localizedCalculatorSlugs, localizedIndexSlugs, supportedLocales, supportedLocalesForCalculator } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";
import { defaultCurrencyByLocale } from "@/lib/formatter/currency";
import { remainingGreekCalculatorSlugs, translatedGreekCalculatorSlugs } from "@/i18n/dictionaries/el-progress";

describe("Greek locale publication", () => {
  it("publishes all 169 translated calculator pages with Greek metadata and EUR defaults", () => {
    const greek = getDictionary("el");
    const english = getDictionary("en");
    expect(supportedLocales).toContain("el");
    expect(defaultCurrencyByLocale.el).toBe("EUR");
    expect(translatedGreekCalculatorSlugs).toHaveLength(169);
    expect(remainingGreekCalculatorSlugs).toEqual([]);
    expect(localizedIndexSlugs("el")).toEqual(localizedCalculatorSlugs);

    for (const slug of localizedCalculatorSlugs) {
      const page = greek.calculators[slug];
      const source = english.calculators[slug];
      expect(page, slug).toBeDefined();
      expect(calculatorSupportsLocale(slug, "el"), slug).toBe(true);
      expect(supportedLocalesForCalculator(slug), slug).toContain("el");
      expect(page!.title, slug).not.toBe(source?.title);
      expect(Object.keys(page!.fields).sort(), slug).toEqual(Object.keys(source!.fields).sort());
      expect(Object.keys(page!.options).sort(), slug).toEqual(Object.keys(source!.options).sort());
      expect(Object.keys(page!.resultLabels).sort(), slug).toEqual(Object.keys(source!.resultLabels).sort());
    }

    const page = greek.calculators["compound-interest"]!;
    const metadata = localizedMetadata("el", "/calculators/compound-interest", page.title, page.description, page.keywords, supportedLocalesForCalculator("compound-interest"));
    expect(metadata.alternates?.canonical).toBe("https://www.woori.today/el/calculators/compound-interest");
    expect(metadata.alternates?.languages?.el).toBe("https://www.woori.today/el/calculators/compound-interest");
    expect(metadata.alternates?.languages?.["x-default"]).toBe("https://www.woori.today/ko/calculators/compound-interest");
    expect(localePath("el", "/calculators/compound-interest")).toBe("/el/calculators/compound-interest");
  });
});
