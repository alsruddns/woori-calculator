import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchThree } from "@/i18n/dictionaries/bn-batch-3";

describe("Bengali calculator batch three", () => {
  it("matches the source schemas for six date, measurement, and statistics pages", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchThree)).toHaveLength(6);
    for (const [slug, page] of Object.entries(bnBatchThree)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
    }
  });
});
