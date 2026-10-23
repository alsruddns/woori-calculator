import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { csBatchNine } from "@/i18n/dictionaries/cs-batch-9";

describe("Czech calculator translation batch nine", () => {
  it("validates the ratio and statistics pages against their source schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(csBatchNine)).toHaveLength(8);
    for (const [slug, page] of Object.entries(csBatchNine)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
      for (const [group, options] of Object.entries(source.options)) {
        expect(Object.keys(page.options[group] ?? {}).sort(), `${slug}.${group}`).toEqual(Object.keys(options).sort());
      }
    }
  });
});
