import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchSeventeen } from "@/i18n/dictionaries/bn-batch-17";
import { bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali Vietnam calculator batch", () => {
  it("matches country page keys and shared result translations", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchSeventeen)).toHaveLength(3);
    for (const [slug, page] of Object.entries(bnBatchSeventeen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnGlobalCountryResultLabels).sort());
      expect(page.description).toContain("ভিয়েতনামের");
    }
  });
});
