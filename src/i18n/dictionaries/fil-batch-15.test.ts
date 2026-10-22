import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchFifteen } from "@/i18n/dictionaries/fil-batch-15";

const slugs = ["us-paycheck-calculator", "us-income-tax-calculator", "us-sales-tax-calculator", "us-401k-calculator", "us-roth-ira-calculator", "us-capital-gains-tax-calculator", "spain-freelancer-tax-calculator", "france-social-contribution-calculator", "uk-gross-net-salary-calculator", "uk-income-tax-calculator", "uk-national-insurance-calculator", "uk-vat-calculator"] as const;

describe("Filipino calculator translation batch fifteen", () => {
  it("translates US and UK input options and shares the complete result label schema", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchFifteen).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchFifteen[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultNote).toMatch(/United States|United Kingdom|Spain|France/);
      expect(page.resultNote).toContain("Philippine");
    }
  });
});
