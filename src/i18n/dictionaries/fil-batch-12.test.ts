import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchTwelve } from "@/i18n/dictionaries/fil-batch-12";

const slugs = ["india-ppf-calculator", "india-nps-calculator", "india-gross-net-salary-calculator", "india-income-tax-calculator", "brazil-gross-net-salary-calculator", "brazil-inss-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator", "brazil-thirteenth-salary-calculator"] as const;

describe("Filipino calculator translation batch twelve", () => {
  it("preserves the source schema and labels the applicable tax jurisdiction", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchTwelve).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchTwelve[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultNote).toMatch(/India|Brazil/);
      expect(page.resultNote).toContain("Philippine");
    }
  });
});
