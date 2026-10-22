import { describe, expect, it } from "vitest";
import { elBatchNine } from "@/i18n/dictionaries/el-batch-9";
import { getDictionary } from "@/i18n/dictionaries";

describe("Greek calculator translation batch nine", () => {
  it("translates China, Taiwan, Italy and US calculator copy with exact input and result schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(elBatchNine)).toHaveLength(16);
    for (const [slug, page] of Object.entries(elBatchNine)) {
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
