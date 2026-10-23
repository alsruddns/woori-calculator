import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchFive } from "@/i18n/dictionaries/bn-batch-5";

describe("Bengali finance and business batch", () => {
  it("matches source field, option, and result schemas for all nine pages", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchFive)).toHaveLength(9);
    for (const [slug, page] of Object.entries(bnBatchFive)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.name).not.toBe(source.name);
      expect(page.title).not.toBe(source.title);
    }
  });
});
