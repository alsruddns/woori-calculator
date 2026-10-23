import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchTwentyEight } from "@/i18n/dictionaries/bn-batch-28";
import { bnUsCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali UAE and New Zealand calculator batch", () => {
  it("matches all eight country page schemas and has Bengali content", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTwentyEight)).toHaveLength(8);
    for (const [slug, page] of Object.entries(bnBatchTwentyEight)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnUsCountryResultLabels).sort());
      expect(`${page.name} ${page.title} ${page.description} ${page.howTo}`).toMatch(/[\u0980-\u09FF]/);
    }
  });
});
