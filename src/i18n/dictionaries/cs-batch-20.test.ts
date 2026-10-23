import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { csBatchTwenty } from "@/i18n/dictionaries/cs-batch-20";

describe("Czech calculator translation batch twenty", () => {
  it("validates India and Brazil pages against their source schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(csBatchTwenty)).toHaveLength(5);
    for (const [slug, page] of Object.entries(csBatchTwenty)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      for (const [key, field] of Object.entries(source.fields)) {
        expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
      }
      for (const [group, options] of Object.entries(source.options)) {
        expect(Object.keys(page.options[group] ?? {}).sort(), `${slug}.${group}`).toEqual(Object.keys(options).sort());
      }
      expect(page.description.toLocaleLowerCase("cs-CZ"), slug).toMatch(/indi|braz/);
      expect(page.resultNote.toLocaleLowerCase("cs-CZ"), slug).toMatch(/indi|braz/);
    }
  });
});
