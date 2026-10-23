import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchEighteen } from "@/i18n/dictionaries/bn-batch-18";
import { bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali China calculator batch", () => {
  it("matches source fields, options, and common result labels", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchEighteen)).toHaveLength(4);
    for (const [slug, page] of Object.entries(bnBatchEighteen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnGlobalCountryResultLabels).sort());
      expect(page.description).toContain("চীনের");
    }
  });
});
