import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { csBatchEight } from "@/i18n/dictionaries/cs-batch-8";

describe("Czech calculator translation batch eight", () => {
  it("validates the investment and planning pages against source schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(csBatchEight)).toHaveLength(5);
    for (const [slug, page] of Object.entries(csBatchEight)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
      for (const [group, options] of Object.entries(source.options)) expect(Object.keys(page.options[group] ?? {}).sort(), `${slug}.${group}`).toEqual(Object.keys(options).sort());
    }
  });
});
