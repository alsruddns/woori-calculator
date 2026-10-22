import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchEight } from "@/i18n/dictionaries/fil-batch-8";

const slugs = ["japan-consumption-tax-calculator", "japan-annual-salary-calculator", "japan-monthly-salary-calculator", "japan-overtime-pay-calculator", "japan-night-holiday-pay-calculator"] as const;

describe("Filipino calculator translation batch eight", () => {
  it("translates Japan-specific pages and clearly identifies their jurisdiction", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchEight).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchEight[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultNote).toContain("Japan");
    }
  });
});
