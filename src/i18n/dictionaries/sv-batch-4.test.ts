import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { svBatchFour } from "@/i18n/dictionaries/sv-batch-4";

describe("Swedish calculator translation batch four", () => {
  it("covers fifteen statistics, investment, pay and time pages with matching schemas", () => {
    const source = getDictionary("en").calculators;
    expect(Object.keys(svBatchFour)).toHaveLength(15);
    for (const [slug, page] of Object.entries(svBatchFour)) {
      const original = source[slug as keyof typeof source];
      if (!original) throw new Error(`Missing English source schema: ${slug}`);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(original.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(original.options).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(original.resultLabels).sort());
      expect(page.title, slug).not.toBe(original.title);
      for (const [key, field] of Object.entries(original.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
    }
  });
});
