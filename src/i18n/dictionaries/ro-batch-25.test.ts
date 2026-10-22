import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { roBatchTwentyFive } from "@/i18n/dictionaries/ro-batch-25";

describe("Romanian calculator translation batch twenty-five", () => {
  it("translates the final seven calculator pages against their source schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(roBatchTwentyFive)).toHaveLength(7);
    for (const [slug, page] of Object.entries(roBatchTwentyFive)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(page.description.length, slug).toBeGreaterThan(35);
      expect(page.faqs.length, slug).toBeGreaterThanOrEqual(2);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
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
