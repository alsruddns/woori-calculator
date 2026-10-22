import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchTwentySix } from "@/i18n/dictionaries/bn-batch-26";
import { bnUsCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali Singapore and Hong Kong calculator batch", () => {
  it("matches all seven country page schemas and has Bengali content", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTwentySix)).toHaveLength(7);
    for (const [slug, page] of Object.entries(bnBatchTwentySix)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnUsCountryResultLabels).sort());
      expect(`${page.name} ${page.title} ${page.description} ${page.howTo}`).toMatch(/[\u0980-\u09FF]/);
    }
  });
});
