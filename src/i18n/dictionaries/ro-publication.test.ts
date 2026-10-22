import { describe, expect, it } from "vitest";
import { localizedIndexSlugs, localizedCalculatorSlugs, supportedLocales, supportedLocalesForCalculator } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";
import { defaultCurrencyByLocale } from "@/lib/formatter/currency";
import { remainingRomanianCalculatorSlugs, translatedRomanianCalculatorSlugs } from "@/i18n/dictionaries/ro-progress";

describe("Romanian locale publication", () => {
  it("publishes all 169 translated calculator pages with Romanian metadata and RON defaults", () => {
    const romanian = getDictionary("ro");
    const english = getDictionary("en");
    expect(supportedLocales).toContain("ro");
    expect(defaultCurrencyByLocale.ro).toBe("RON");
    expect(translatedRomanianCalculatorSlugs).toHaveLength(169);
    expect(remainingRomanianCalculatorSlugs).toEqual([]);
    expect(localizedIndexSlugs("ro")).toEqual(localizedCalculatorSlugs);

    for (const slug of localizedCalculatorSlugs) {
      const page = romanian.calculators[slug];
      const source = english.calculators[slug];
      expect(page, slug).toBeDefined();
      expect(supportedLocalesForCalculator(slug), slug).toContain("ro");
      expect(page!.title, slug).not.toBe(source?.title);
      expect(Object.keys(page!.fields).sort(), slug).toEqual(Object.keys(source!.fields).sort());
      expect(Object.keys(page!.options).sort(), slug).toEqual(Object.keys(source!.options).sort());
      expect(Object.keys(page!.resultLabels).sort(), slug).toEqual(Object.keys(source!.resultLabels).sort());
    }

    const page = romanian.calculators["compound-interest"]!;
    const metadata = localizedMetadata("ro", "/calculators/compound-interest", page.title, page.description, page.keywords, supportedLocalesForCalculator("compound-interest"));
    expect(metadata.alternates?.canonical).toBe("https://www.woori.today/ro/calculators/compound-interest");
    expect(metadata.alternates?.languages?.ro).toBe("https://www.woori.today/ro/calculators/compound-interest");
    expect(metadata.alternates?.languages?.["x-default"]).toBe("https://www.woori.today/ko/calculators/compound-interest");
  });
});
