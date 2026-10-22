import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchTen } from "@/i18n/dictionaries/fil-batch-10";

const slugs = ["germany-vacation-pay-calculator", "spain-gross-net-salary-calculator", "spain-irpf-calculator", "spain-vat-calculator", "spain-severance-pay-calculator", "france-gross-net-salary-calculator", "france-income-tax-calculator", "france-vat-calculator", "france-overtime-pay-calculator"] as const;

describe("Filipino calculator translation batch ten", () => {
  it("translates European policy pages with locale-specific policy bases", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchTen).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchTen[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultNote).toMatch(/Germany|Spain|France/);
      expect(page.faqs[0]?.answer).toContain("Pilipinas");
    }
  });
});
