import { describe, expect, it } from "vitest";
import { languageSwitchPath, localizedCalculatorSlugs, localizedIndexSlugs, supportedLocalesForCalculator } from "@/i18n/config";
import { localizedMetadata } from "@/lib/i18n/seo";
import { getDictionary } from "@/i18n/dictionaries";

describe("published Malay dictionary", () => {
  it("provides localized shared UI and a complete translated calculator catalog", () => {
    const malay = getDictionary("ms");
    const english = getDictionary("en");
    expect(malay.common.calculate).toBe("Kira");
    expect(malay.nav.language).toBe("Bahasa");
    expect(malay.categories.finance).toBe("Kewangan");
    expect(localizedIndexSlugs("ms")).toHaveLength(169);
    expect(Object.keys(malay.calculators).sort()).toEqual([...localizedCalculatorSlugs].sort());
    for (const slug of localizedIndexSlugs("ms")) {
      const page = malay.calculators[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(page.description, slug).not.toBe(source.description);
      expect(page.howTo, slug).toBeTruthy();
      expect(page.faqs.length, slug).toBeGreaterThan(0);
      for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
      expect(supportedLocalesForCalculator(slug)).toContain("ms");
    }
  });

  it("publishes Malay canonical, hreflang, and locale currency metadata", () => {
    const page = getDictionary("ms").calculators["compound-interest"]!;
    const metadata = localizedMetadata("ms", "/calculators/compound-interest", page.title, page.description, page.keywords, supportedLocalesForCalculator("compound-interest"));
    expect(metadata.alternates?.canonical).toBe("https://www.woori.today/ms/calculators/compound-interest");
    expect(metadata.alternates?.languages?.ms).toBe("https://www.woori.today/ms/calculators/compound-interest");
    expect(metadata.alternates?.languages?.["x-default"]).toBe("https://www.woori.today/ko/calculators/compound-interest");
    expect(languageSwitchPath("/ko/calculators/compound-interest", "ms")).toBe("/ms/calculators/compound-interest");
  });
});
