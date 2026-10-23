import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchTwelve } from "@/i18n/dictionaries/bn-batch-12";
import { bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali Spain calculator batch", () => {
  it("matches every source schema and reuses country result labels", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTwelve)).toHaveLength(4);
    for (const [slug, page] of Object.entries(bnBatchTwelve)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnGlobalCountryResultLabels).sort());
      expect(page.name).not.toBe(source.name);
      expect(page.description).toContain("স্পেন");
    }
  });
});
