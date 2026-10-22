import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchTwo } from "@/i18n/dictionaries/bn-batch-2";

describe("Bengali calculator batch two", () => {
  it("translates five common finance calculator schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTwo)).toHaveLength(5);
    for (const [slug, page] of Object.entries(bnBatchTwo)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
    }
  });
});
