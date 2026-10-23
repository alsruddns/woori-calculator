import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { svBatchTwo } from "@/i18n/dictionaries/sv-batch-2";

describe("Swedish calculator translation batch two", () => {
  it("covers fifteen finance and household pages with matching field and result keys", () => {
    const source = getDictionary("en").calculators;
    expect(Object.keys(svBatchTwo)).toHaveLength(15);
    for (const [slug, page] of Object.entries(svBatchTwo)) {
      const original = source[slug as keyof typeof source];
      if (!original) throw new Error(`Missing English source schema: ${slug}`);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(original.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(original.options).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(original.resultLabels).sort());
      expect(page.title, slug).not.toBe(original.title);
      expect(page.description.length, slug).toBeGreaterThan(35);
      for (const [key, field] of Object.entries(original.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
    }
  });
});
