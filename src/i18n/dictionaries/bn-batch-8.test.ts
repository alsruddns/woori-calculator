import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchEight } from "@/i18n/dictionaries/bn-batch-8";

describe("Bengali lending and salary batch", () => {
  it("matches source fields, options, and result keys for all nine pages", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchEight)).toHaveLength(9);
    for (const [slug, page] of Object.entries(bnBatchEight)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.name).not.toBe(source.name);
      expect(page.title).not.toBe(source.title);
    }
  });
});
