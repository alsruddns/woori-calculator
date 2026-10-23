import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { roBatchTwentyThree } from "@/i18n/dictionaries/ro-batch-23";

describe("Romanian calculator translation batch twenty-three", () => {
  it("translates Australia, Singapore, Hong Kong, and Malaysia pages against their source schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(roBatchTwentyThree)).toHaveLength(16);
    for (const [slug, page] of Object.entries(roBatchTwentyThree)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(page.description.length, slug).toBeGreaterThan(35);
      expect(page.faqs.length, slug).toBeGreaterThanOrEqual(2);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      for (const [group, values] of Object.entries(source.options)) {
        expect(Object.keys(page.options[group] ?? {}).sort(), `${slug}.${group}`).toEqual(Object.keys(values).sort());
      }
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      for (const [key, field] of Object.entries(source.fields)) {
        expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
      }
      for (const [label, translated] of Object.entries(page.resultLabels)) {
        expect(translated, `${slug}.${label}`).not.toBe(label);
      }
    }
  });
});
