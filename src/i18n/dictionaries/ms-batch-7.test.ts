import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchSeven } from "@/i18n/dictionaries/ms-batch-7";

describe("Malay Japan and Germany calculator batch", () => {
  it("translates jurisdiction-sensitive pages and preserves source schemas", () => {
    const english = getDictionary("en");
    const expected = ["japan-consumption-tax-calculator", "japan-annual-salary-calculator", "japan-monthly-salary-calculator", "japan-overtime-pay-calculator", "japan-night-holiday-pay-calculator", "germany-gross-net-salary-calculator", "germany-income-tax-calculator", "germany-vat-calculator", "germany-overtime-pay-calculator", "germany-vacation-pay-calculator"] as const;
    expect(Object.keys(msBatchSeven).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchSeven[slug]!;
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
    for (const slug of expected) {
      const page = msBatchSeven[slug]!;
      const jurisdiction = slug.startsWith("japan-") ? "Jepun" : "Jerman";
      expect(`${page.name} ${page.title} ${page.description} ${page.example.answer}`).toContain(jurisdiction);
    }
  });
});
