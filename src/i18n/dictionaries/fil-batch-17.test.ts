import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchSeventeen } from "@/i18n/dictionaries/fil-batch-17";

describe("Filipino calculator batch seventeen", () => {
  it("matches source calculator keys and distinguishes Philippine policy pages", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchSeventeen)).toHaveLength(20);
    for (const [slug, page] of Object.entries(filBatchSeventeen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.title).not.toBe(source.title);
    }
    for (const slug of ["philippines-gross-net-salary-calculator", "philippines-income-tax-calculator", "philippines-sss-calculator", "philippines-philhealth-calculator", "philippines-pagibig-calculator"]) {
      expect(filBatchSeventeen[slug]!.resultNote).toContain("para sa Pilipinas");
      expect(filBatchSeventeen[slug]!.faqs[0]!.answer).toContain("Hindi");
    }
  });
});
