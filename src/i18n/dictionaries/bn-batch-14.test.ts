import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchFourteen } from "@/i18n/dictionaries/bn-batch-14";
import { bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali Netherlands calculator batch", () => {
  it("matches page schemas and uses the shared country result vocabulary", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchFourteen)).toHaveLength(4);
    for (const [slug, page] of Object.entries(bnBatchFourteen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnGlobalCountryResultLabels).sort());
      expect(page.description).toContain("নেদারল্যান্ডস");
    }
  });
});
