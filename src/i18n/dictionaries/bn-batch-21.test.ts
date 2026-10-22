import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchTwentyOne } from "@/i18n/dictionaries/bn-batch-21";
import { bnUsCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali United States calculator batch", () => {
  it("matches all six page schemas and shared result labels", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTwentyOne)).toHaveLength(6);
    for (const [slug, page] of Object.entries(bnBatchTwentyOne)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnUsCountryResultLabels).sort());
      expect(page.description).toContain("যুক্তরাষ্ট্রের");
    }
  });
});
