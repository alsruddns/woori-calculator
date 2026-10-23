import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { roBatchFive } from "@/i18n/dictionaries/ro-batch-5";

describe("Romanian calculator translation batch five", () => {
  it("translates each page and matches all source fields, options, and results", () => {
    const english = getDictionary("en");
    expect(Object.keys(roBatchFive)).toHaveLength(10);
    for (const [slug, page] of Object.entries(roBatchFive)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(localizedCalculatorSlugs).toContain(slug);
      expect(page.title, slug).not.toBe(source.title);
      expect(page.description.length, slug).toBeGreaterThan(35);
      expect(page.faqs.length, slug).toBeGreaterThanOrEqual(2);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      for (const [group, values] of Object.entries(source.options)) expect(Object.keys(page.options[group] ?? {}).sort(), `${slug}.${group}`).toEqual(Object.keys(values).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      for (const [field, value] of Object.entries(source.fields)) expect(page.fields[field]?.label, `${slug}.${field}`).not.toBe(value.label);
    }
  });
});
