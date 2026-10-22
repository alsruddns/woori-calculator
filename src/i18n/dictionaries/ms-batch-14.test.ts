import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchFourteen } from "@/i18n/dictionaries/ms-batch-14";

describe("Malay batch 14 localized calculator schemas", () => {
  it("covers all remaining calculator pages and matches source input and result schemas", () => {
    const source = getDictionary("en").calculators;
    expect(Object.keys(msBatchFourteen)).toHaveLength(13);
    for (const [slug, translated] of Object.entries(msBatchFourteen)) {
      const original = source[slug as keyof typeof source];
      if (!original) throw new Error(`Missing English source schema for ${slug}`);
      expect(Object.keys(translated.fields).sort(), slug).toEqual(Object.keys(original.fields).sort());
      expect(Object.keys(translated.options).sort(), slug).toEqual(Object.keys(original.options).sort());
      for (const key of Object.keys(original.options)) {
        expect(Object.keys(translated.options[key] ?? {}).sort(), `${slug}.${key}`).toEqual(Object.keys(original.options[key] ?? {}).sort());
      }
      expect(Object.keys(translated.resultLabels).sort(), slug).toEqual(Object.keys(original.resultLabels).sort());
      expect(translated.title.length, slug).toBeGreaterThan(8);
      expect(translated.description.length, slug).toBeGreaterThan(30);
    }
  });
});
