import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchNineteen } from "@/i18n/dictionaries/bn-batch-19";
import { bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali Taiwan calculator batch", () => {
  it("matches source page fields, options, and shared result labels", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchNineteen)).toHaveLength(4);
    for (const [slug, page] of Object.entries(bnBatchNineteen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnGlobalCountryResultLabels).sort());
      expect(page.description).toContain("তাইওয়ানের");
    }
  });
});
