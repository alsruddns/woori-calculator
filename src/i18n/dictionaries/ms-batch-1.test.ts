import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchOne } from "@/i18n/dictionaries/ms-batch-1";
import { localizedCalculatorSlugs } from "@/i18n/config";

describe("Malay calculator translation batch one", () => {
  it("contains complete, non-English localized content and matching source schemas", () => {
    const english = getDictionary("en");
    const expected = ["percentage", "discount", "loan-interest", "compound-interest", "vat", "date-difference", "age", "area", "simple-interest", "savings-interest", "change-rate", "average", "weighted-average", "cagr", "median"] as const;
    expect(Object.keys(msBatchOne).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchOne[slug]!;
      const source = english.calculators[slug]!;
      expect(localizedCalculatorSlugs).toContain(slug);
      expect(page.title).not.toBe(source.title);
      expect(page.description.length).toBeGreaterThan(35);
      expect(page.faqs).toHaveLength(2);
      expect(page.related.length).toBeGreaterThan(0);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      for (const [group, values] of Object.entries(source.options)) {
        expect(Object.keys(page.options[group] ?? {}).sort()).toEqual(Object.keys(values).sort());
      }
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.values(page.resultLabels).every(Boolean)).toBe(true);
    }
  });
});
