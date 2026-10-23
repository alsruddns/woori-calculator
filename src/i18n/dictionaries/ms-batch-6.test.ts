import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchSix } from "@/i18n/dictionaries/ms-batch-6";

describe("Malay calculator translation batch six", () => {
  it("translates South Korea policy pages with their jurisdiction stated and matches source schemas", () => {
    const english = getDictionary("en");
    const expected = ["annual-leave-allowance", "withholding-tax-3-3", "utility-bill", "unemployment-benefit", "minimum-wage", "severance-pay", "social-insurance"] as const;
    expect(Object.keys(msBatchSix).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchSix[slug]!;
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
    }
    for (const slug of ["annual-leave-allowance", "withholding-tax-3-3", "unemployment-benefit", "minimum-wage", "severance-pay", "social-insurance"] as const) {
      const page = msBatchSix[slug]!;
      expect(`${page.title} ${page.description} ${page.example.answer}`).toContain("Korea");
    }
  });
});
