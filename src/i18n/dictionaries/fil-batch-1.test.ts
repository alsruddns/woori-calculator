import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchOne } from "@/i18n/dictionaries/fil-batch-1";

const slugs = ["compound-interest", "percentage", "discount", "date-difference", "age", "area", "average", "weighted-average", "bmi", "cagr", "change-rate", "simple-interest", "savings-interest", "median", "percentile"] as const;

describe("Filipino calculator translation batch one", () => {
  it("translates each page and preserves source form, option, and result keys", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchOne).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchOne[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(page.description, slug).not.toBe(source.description);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      for (const key of Object.keys(source.fields)) expect(page.fields[key]?.label, slug + "." + key).not.toBe(source.fields[key]?.label);
      for (const key of Object.keys(source.options)) expect(Object.keys(page.options[key] ?? {}).sort(), slug + "." + key).toEqual(Object.keys(source.options[key] ?? {}).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(expect.arrayContaining(Object.keys(source.resultLabels).sort()));
      expect(page.howTo, slug).toBeTruthy();
      expect(page.formula, slug).toBeTruthy();
      expect(page.faqs.length, slug).toBeGreaterThan(0);
    }
  });
});
