import { describe, expect, it } from "vitest";
import { elBatchEight } from "@/i18n/dictionaries/el-batch-8";
import { getDictionary } from "@/i18n/dictionaries";

describe("Greek calculator translation batch eight", () => {
  it("localizes Indian, Brazilian, Vietnamese, Chinese, and Dutch policy calculators", () => {
    const english = getDictionary("en");
    expect(Object.keys(elBatchEight)).toHaveLength(16);
    for (const [slug, page] of Object.entries(elBatchEight)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.faqs).toHaveLength(2);
      expect(page.resultNote).toMatch(/ελλην/u);
    }
  });
});
