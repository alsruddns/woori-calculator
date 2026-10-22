import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchEight } from "@/i18n/dictionaries/ms-batch-8";

describe("Malay Spain, France and Netherlands calculator batch", () => {
  it("translates country-specific pages and preserves the full source schemas", () => {
    const english = getDictionary("en");
    const expected = ["spain-gross-net-salary-calculator", "spain-irpf-calculator", "spain-vat-calculator", "spain-severance-pay-calculator", "france-gross-net-salary-calculator", "france-income-tax-calculator", "france-vat-calculator", "france-overtime-pay-calculator", "netherlands-gross-net-salary-calculator", "netherlands-vat-calculator", "netherlands-30-percent-ruling-calculator", "netherlands-holiday-allowance-calculator"] as const;
    expect(Object.keys(msBatchEight).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchEight[slug]!;
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
      const country = slug.startsWith("spain-") ? "Sepanyol" : slug.startsWith("france-") ? "Perancis" : "Belanda";
      expect(`${page.name} ${page.title} ${page.description} ${page.example.answer}`).toContain(country);
    }
  });
});
