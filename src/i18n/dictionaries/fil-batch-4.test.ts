import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchFour } from "@/i18n/dictionaries/fil-batch-4";

const slugs = ["ratio", "proportion", "aspect-ratio", "scale-ratio"] as const;

describe("Filipino calculator translation batch four", () => {
  it("translates each ratio tool and preserves all dynamic field, option, and result keys", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchFour).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchFour[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      for (const [key, sourceField] of Object.entries(source.fields)) expect(page.fields[key]?.label).not.toBe(sourceField.label);
      for (const [group, choices] of Object.entries(source.options)) {
        expect(Object.keys(page.options[group] ?? {}).sort()).toEqual(Object.keys(choices).sort());
        for (const [key, label] of Object.entries(choices)) expect(page.options[group]?.[key]).not.toBe(label);
      }
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.faqs.length).toBeGreaterThan(0);
    }
  });
});
