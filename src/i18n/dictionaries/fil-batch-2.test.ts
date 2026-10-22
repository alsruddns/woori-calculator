import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchTwo } from "@/i18n/dictionaries/fil-batch-2";

const slugs = ["probability", "fraction", "decimal-fraction", "unit-price", "unit-converter", "dday", "workdays", "time-arithmetic", "tip-calculator", "trip-split", "fuel-efficiency", "vehicle-cost", "taxi-fare", "dividend", "profit-loss"] as const;

describe("Filipino calculator translation batch two", () => {
  it("translates all pages and preserves field, option, and result keys", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchTwo).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchTwo[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(page.description, slug).not.toBe(source.description);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      for (const key of Object.keys(source.fields)) {
        expect(page.fields[key]?.label, slug + "." + key).not.toBe(source.fields[key]?.label);
      }
      for (const key of Object.keys(source.options)) {
        expect(Object.keys(page.options[key] ?? {}).sort(), slug + "." + key).toEqual(Object.keys(source.options[key] ?? {}).sort());
        for (const option of Object.keys(source.options[key] ?? {})) {
          expect(page.options[key]?.[option], slug + "." + key + "." + option).not.toBe(source.options[key]?.[option]);
        }
      }
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      for (const label of Object.values(page.resultLabels)) expect(label).toBeTruthy();
      expect(page.howTo, slug).toBeTruthy();
      expect(page.formula, slug).toBeTruthy();
      expect(page.example.question, slug).toBeTruthy();
      expect(page.example.answer, slug).toBeTruthy();
      expect(page.faqs.length, slug).toBeGreaterThan(0);
      expect(page.validation, slug).toBeTruthy();
      expect(page.resultNote, slug).toBeTruthy();
    }
  });
});
