import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { svBatchOne } from "@/i18n/dictionaries/sv-batch-1";

describe("Swedish calculator translation batch one", () => {
  it("contains complete Swedish content and matches source input and result schemas", () => {
    const english = getDictionary("en");
    const expected = ["percentage", "discount", "loan-interest", "compound-interest", "vat", "date-difference", "age", "area", "simple-interest", "savings-interest", "change-rate", "average", "weighted-average", "cagr", "median"] as const;
    expect(Object.keys(svBatchOne).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = svBatchOne[slug]!;
      const source = english.calculators[slug]!;
      expect(localizedCalculatorSlugs).toContain(slug);
      expect(page.title, slug).not.toBe(source.title);
      expect(page.description.length, slug).toBeGreaterThan(35);
      expect(page.faqs, slug).toHaveLength(2);
      expect(page.related.length, slug).toBeGreaterThan(0);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      for (const [group, values] of Object.entries(source.options)) {
        expect(Object.keys(page.options[group] ?? {}).sort(), `${slug}.${group}`).toEqual(Object.keys(values).sort());
      }
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.values(page.resultLabels).every(Boolean), slug).toBe(true);
      for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
    }
  });
});
