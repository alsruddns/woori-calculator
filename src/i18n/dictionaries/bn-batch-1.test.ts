import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchOne } from "@/i18n/dictionaries/bn-batch-1";

describe("Bengali calculator batch one", () => {
  it("translates all nine calculator field, option, and result schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchOne)).toHaveLength(9);
    for (const [slug, page] of Object.entries(bnBatchOne)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
    }
  });
});
