import { describe, expect, it } from "vitest";
import { elBatchThree } from "@/i18n/dictionaries/el-batch-3";
import { getDictionary } from "@/i18n/dictionaries";

describe("Greek ratio calculator translation batch", () => {
  it("translates every ratio mode and preserves its shared input and result schema", () => {
    const english = getDictionary("en");
    expect(Object.keys(elBatchThree)).toHaveLength(4);
    for (const [slug, page] of Object.entries(elBatchThree)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.faqs).toHaveLength(2);
    }
  });
});
