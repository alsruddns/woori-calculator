import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs, localizedIndexSlugs, supportedLocalesForCalculator } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";

describe("Bengali calculator publication", () => {
  it("provides translated shared UI and all calculator pages", () => {
    const dictionary = getDictionary("bn");
    expect(dictionary.locale).toBe("bn");
    expect(dictionary.calculators).toHaveProperty("compound-interest");
    expect(localizedIndexSlugs("bn")).toHaveLength(169);
    expect(Object.keys(dictionary.calculators)).toHaveLength(169);
    expect(`${dictionary.home.title} ${dictionary.calculatorList.title} ${dictionary.nav.search}`).toMatch(/[\u0980-\u09FF]/);
    for (const slug of localizedCalculatorSlugs) {
      const page = dictionary.calculators[slug];
      expect(page, slug).toBeTruthy();
      expect(`${page!.name} ${page!.title} ${page!.description} ${page!.howTo}`).toMatch(/[\u0980-\u09FF]/);
      expect(supportedLocalesForCalculator(slug)).toContain("bn");
    }
  });

  it("creates canonical and language alternates for published Bengali pages", () => {
    const page = getDictionary("bn").calculators["compound-interest"]!;
    const metadata = localizedMetadata("bn", "/calculators/compound-interest", page.title, page.description, page.keywords, supportedLocalesForCalculator("compound-interest"));
    expect(metadata.alternates?.canonical).toBe("https://www.woori.today/bn/calculators/compound-interest");
    expect(metadata.alternates?.languages).toMatchObject({ bn: "https://www.woori.today/bn/calculators/compound-interest", "x-default": "https://www.woori.today/ko/calculators/compound-interest" });
    expect(metadata.openGraph?.locale).toBe("bn_BD");
  });
});
