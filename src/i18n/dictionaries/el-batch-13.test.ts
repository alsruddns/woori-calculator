import { describe, expect, it } from "vitest";
import { elBatchThirteen } from "@/i18n/dictionaries/el-batch-13";
import { getDictionary } from "@/i18n/dictionaries";

describe("Greek calculator translation batch thirteen", () => {
  it("translates the final twelve general finance and planning tools with matching schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(elBatchThirteen)).toHaveLength(12);
    for (const [slug, page] of Object.entries(elBatchThirteen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.faqs).toHaveLength(2);
      expect(page.faqs[0]?.question).toMatch(/χρησιμοποιούνται τα αποτελέσματα/u);
    }
  });
});
