import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchFourteen } from "@/i18n/dictionaries/fil-batch-14";

const slugs = ["italy-gross-net-salary-calculator", "italy-income-tax-calculator", "italy-vat-calculator"] as const;

describe("Filipino calculator translation batch fourteen", () => {
  it("translates Italy policy calculators and preserves schema", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchFourteen).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchFourteen[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultNote).toContain("Italy");
    }
  });
});
