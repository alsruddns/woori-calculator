import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchThirteen } from "@/i18n/dictionaries/bn-batch-13";
import { bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali France calculator batch", () => {
  it("matches every page schema and uses the shared country result dictionary", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchThirteen)).toHaveLength(4);
    for (const [slug, page] of Object.entries(bnBatchThirteen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnGlobalCountryResultLabels).sort());
      expect(page.description).toContain("ফ্রান্স");
    }
  });
});
