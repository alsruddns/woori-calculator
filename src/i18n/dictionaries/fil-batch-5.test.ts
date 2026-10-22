import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchFive } from "@/i18n/dictionaries/fil-batch-5";

const slugs = ["weighted-average", "tenure", "pregnancy", "utility-bill", "salary-conversion", "hourly-wage", "product-margin"] as const;

describe("Filipino calculator translation batch five", () => {
  it("translates pages and preserves all source content keys", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchFive).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchFive[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label).not.toBe(field.label);
      for (const [group, choices] of Object.entries(source.options)) {
        expect(Object.keys(page.options[group] ?? {}).sort()).toEqual(Object.keys(choices).sort());
        for (const [key, label] of Object.entries(choices)) expect(page.options[group]?.[key]).not.toBe(label);
      }
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.howTo).toBeTruthy();
      expect(page.formula).toBeTruthy();
      expect(page.faqs.length).toBeGreaterThan(0);
    }
  });
});
