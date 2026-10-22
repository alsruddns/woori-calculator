import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { csBatchSix } from "@/i18n/dictionaries/cs-batch-6";

describe("Czech calculator translation batch six", () => {
  it("matches every probability and statistics input and result field", () => {
    const english = getDictionary("en");
    expect(Object.keys(csBatchSix)).toHaveLength(2);
    for (const [slug, page] of Object.entries(csBatchSix)) {
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
