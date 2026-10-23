import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocalizedCalculator } from "@/i18n/config";
import { ukBatchFive } from "@/i18n/dictionaries/uk-batch-5";

describe("Ukrainian calculator batch five", () => {
  it("translates calculator content and preserves every source schema", () => {
    const english = getDictionary("en");
    expect(Object.keys(ukBatchFive)).toHaveLength(15);
    for (const [slug, page] of Object.entries(ukBatchFive)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.related.every(hasLocalizedCalculator)).toBe(true);
      expect(`${page.name} ${page.title} ${page.description} ${page.howTo} ${page.formula} ${Object.values(page.fields).map((field) => field.label).join(" ")}`).toMatch(/[А-Яа-яІіЇїЄєҐґ]/);
    }
  });
});
