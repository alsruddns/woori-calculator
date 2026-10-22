import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchNine } from "@/i18n/dictionaries/bn-batch-9";

describe("Bengali daily life and Korean policy batch", () => {
  it("matches every source field, option, and result schema", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchNine)).toHaveLength(9);
    for (const [slug, page] of Object.entries(bnBatchNine)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.name).not.toBe(source.name);
      expect(page.title).not.toBe(source.title);
    }
  });
});
