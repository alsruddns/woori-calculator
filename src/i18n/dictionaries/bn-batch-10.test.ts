import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchTen } from "@/i18n/dictionaries/bn-batch-10";

describe("Bengali Japanese calculator batch", () => {
  it("matches all source field, option, and result keys", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTen)).toHaveLength(5);
    for (const [slug, page] of Object.entries(bnBatchTen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.name).not.toBe(source.name);
      expect(page.title).not.toBe(source.title);
    }
  });
});
