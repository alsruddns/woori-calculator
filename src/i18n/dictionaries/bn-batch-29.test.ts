import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocalizedCalculator } from "@/i18n/config";
import { bnBatchTwentyNine } from "@/i18n/dictionaries/bn-batch-29";

describe("Bengali general calculator batch", () => {
  it("matches all twelve calculator schemas and has Bengali content", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTwentyNine)).toHaveLength(12);
    for (const [slug, page] of Object.entries(bnBatchTwentyNine)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.related.every(hasLocalizedCalculator)).toBe(true);
      expect(`${page.name} ${page.title} ${page.description} ${page.howTo} ${Object.values(page.fields).map((field) => field.label).join(" ")}`).toMatch(/[\u0980-\u09FF]/);
    }
  });
});
