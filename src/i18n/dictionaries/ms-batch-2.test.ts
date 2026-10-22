import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchTwo } from "@/i18n/dictionaries/ms-batch-2";

describe("Malay calculator translation batch two", () => {
  it("contains complete Malay copy matching the source fields, options and result keys", () => {
    const english = getDictionary("en");
    const expected = ["percentile", "probability", "fraction", "decimal-fraction", "unit-price", "unit-converter", "dday", "workdays", "time-arithmetic", "tip-calculator", "trip-split", "fuel-efficiency", "vehicle-cost", "taxi-fare", "dividend"] as const;
    expect(Object.keys(msBatchTwo).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchTwo[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description.length).toBeGreaterThan(35);
      expect(page.faqs).toHaveLength(2);
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
