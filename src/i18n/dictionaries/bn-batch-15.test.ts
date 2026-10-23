import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchFifteen } from "@/i18n/dictionaries/bn-batch-15";
import { bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali India calculator batch", () => {
  it("matches page keys and shares translated country result labels", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchFifteen)).toHaveLength(6);
    for (const [slug, page] of Object.entries(bnBatchFifteen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnGlobalCountryResultLabels).sort());
      expect(page.description).toContain("ভারতের");
    }
  });
});
