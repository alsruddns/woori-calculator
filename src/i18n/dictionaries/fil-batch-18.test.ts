import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchEighteen } from "@/i18n/dictionaries/fil-batch-18";

describe("Filipino calculator batch eighteen", () => {
  it("translates the final 12 calculator schemas and every result label", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchEighteen)).toHaveLength(12);
    for (const [slug, page] of Object.entries(filBatchEighteen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultLabels).not.toEqual(source.resultLabels);
    }
  });
});
