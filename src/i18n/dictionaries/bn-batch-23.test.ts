import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchTwentyThree } from "@/i18n/dictionaries/bn-batch-23";
import { bnUsCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali United Kingdom calculator batch", () => {
  it("matches all six country page schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTwentyThree)).toHaveLength(6);
    for (const [slug, page] of Object.entries(bnBatchTwentyThree)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnUsCountryResultLabels).sort());
      expect(page.description).toContain("যুক্তরাজ্যের");
    }
  });
});
