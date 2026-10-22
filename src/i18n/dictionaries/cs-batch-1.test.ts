import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { csBatchOne } from "@/i18n/dictionaries/cs-batch-1";

describe("Czech calculator translation batch one", () => {
  it("contains translated pages with matching fields, options, and result keys", () => {
    const english = getDictionary("en");
    expect(Object.keys(csBatchOne)).toHaveLength(10);
    for (const [slug, page] of Object.entries(csBatchOne)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
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
      for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
    }
  });
});
