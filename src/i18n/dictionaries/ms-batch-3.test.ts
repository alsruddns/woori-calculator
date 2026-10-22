import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchThree } from "@/i18n/dictionaries/ms-batch-3";

describe("Malay calculator translation batch three", () => {
  it("contains complete Malay copy matching source field, option and result schemas", () => {
    const english = getDictionary("en");
    const expected = ["profit-loss", "margin", "markup", "product-margin", "calorie-per-serving", "standard-deviation", "bmi", "pace", "fuel-cost", "tenure", "pregnancy", "salary-conversion", "hourly-wage", "break-even-point-calculator", "stock-average-price"] as const;
    expect(Object.keys(msBatchThree).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchThree[slug]!;
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
