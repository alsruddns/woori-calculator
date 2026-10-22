import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchThirteen } from "@/i18n/dictionaries/fil-batch-13";

const slugs = ["vietnam-gross-net-salary-calculator", "vietnam-personal-income-tax-calculator", "vietnam-social-insurance-calculator", "china-gross-net-salary-calculator", "china-individual-income-tax-calculator", "china-social-insurance-calculator", "china-vat-calculator", "taiwan-gross-net-salary-calculator", "taiwan-income-tax-calculator", "taiwan-labor-insurance-calculator", "taiwan-vat-calculator"] as const;

describe("Filipino calculator translation batch thirteen", () => {
  it("translates Asia policy pages and preserves their country basis and schema", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchThirteen).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchThirteen[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultNote).toContain("Philippine");
    }
  });
});
