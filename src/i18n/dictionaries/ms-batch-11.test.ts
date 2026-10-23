import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchEleven } from "@/i18n/dictionaries/ms-batch-11";

describe("Malay US calculator batch", () => {
  it("translates US-specific calculations and validates all shared result keys", () => {
    const english = getDictionary("en");
    const expected = ["us-paycheck-calculator", "us-income-tax-calculator", "us-sales-tax-calculator", "us-401k-calculator", "us-roth-ira-calculator", "us-capital-gains-tax-calculator"] as const;
    expect(Object.keys(msBatchEleven).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchEleven[slug]!;
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
      expect(`${page.name} ${page.title} ${page.description} ${page.howTo}`).toContain("AS");
    }
  });
});
