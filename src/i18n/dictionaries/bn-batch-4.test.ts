import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchFour } from "@/i18n/dictionaries/bn-batch-4";

describe("Bengali ratio family batch", () => {
  it("reuses one complete translated schema across four related pages", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchFour)).toHaveLength(4);
    for (const [slug, page] of Object.entries(bnBatchFour)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.values(page.resultLabels).every((label) => label.length > 0)).toBe(true);
    }
  });
});
