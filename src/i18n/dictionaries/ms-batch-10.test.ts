import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchTen } from "@/i18n/dictionaries/ms-batch-10";

describe("Malay China, Taiwan and Italy calculator batch", () => {
  it("localizes each jurisdiction and matches source fields, options and results", () => {
    const english = getDictionary("en");
    const expected = ["china-gross-net-salary-calculator", "china-individual-income-tax-calculator", "china-social-insurance-calculator", "china-vat-calculator", "taiwan-gross-net-salary-calculator", "taiwan-income-tax-calculator", "taiwan-labor-insurance-calculator", "taiwan-vat-calculator", "italy-gross-net-salary-calculator", "italy-income-tax-calculator", "italy-vat-calculator"] as const;
    expect(Object.keys(msBatchTen).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchTen[slug]!;
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
      const country = slug.startsWith("china-") ? "China" : slug.startsWith("taiwan-") ? "Taiwan" : "Itali";
      expect(`${page.name} ${page.title} ${page.description} ${page.howTo}`).toContain(country);
    }
  });
});
