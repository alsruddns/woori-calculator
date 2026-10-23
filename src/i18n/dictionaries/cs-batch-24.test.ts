import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { csBatchTwentyFour } from "@/i18n/dictionaries/cs-batch-24";

describe("Czech calculator translation batch twenty-four", () => {
  it("validates Italy and United States pages against their source schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(csBatchTwentyFour)).toHaveLength(5);
    for (const [slug, page] of Object.entries(csBatchTwentyFour)) {
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
      expect(page.description.toLocaleLowerCase("cs-CZ"), slug).toMatch(/it[aá]l|usa|americ|spojen/);
      expect(page.resultNote.toLocaleLowerCase("cs-CZ"), slug).toMatch(/it[aá]l|usa|americ|spojen/);
    }
  });
});
