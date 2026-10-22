import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchFour } from "@/i18n/dictionaries/ms-batch-4";

describe("Malay calculator translation batch four", () => {
  it("contains complete localized content matching the source schemas", () => {
    const english = getDictionary("en");
    const expected = ["deposit-interest", "loan-refinance", "prepayment-fee", "loan-affordability", "ltv", "dti", "dsr", "inflation-adjusted-return-calculator", "dividend-growth-calculator", "stock-profit-after-fees-calculator", "position-size-calculator", "stop-loss-take-profit-calculator", "loan-early-repayment-calculator", "rent-vs-buy-calculator", "electricity-cost-calculator"] as const;
    expect(Object.keys(msBatchFour).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchFour[slug]!;
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
