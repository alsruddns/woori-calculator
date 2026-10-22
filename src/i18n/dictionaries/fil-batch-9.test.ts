import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchNine } from "@/i18n/dictionaries/fil-batch-9";

const slugs = ["germany-gross-net-salary-calculator", "germany-income-tax-calculator", "germany-vat-calculator", "germany-overtime-pay-calculator"] as const;

describe("Filipino calculator translation batch nine", () => {
  it("translates Germany-specific calculators and preserves source keys", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchNine).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchNine[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultNote).toContain("Germany");
    }
  });
});
