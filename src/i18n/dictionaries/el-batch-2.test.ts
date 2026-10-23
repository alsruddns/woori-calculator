import { describe, expect, it } from "vitest";
import { elBatchTwo } from "@/i18n/dictionaries/el-batch-2";
import { getDictionary } from "@/i18n/dictionaries";

describe("Greek calculator translation batch two", () => {
  it("contains complete Greek copy and exact source schemas for each translated calculator", () => {
    const english = getDictionary("en");
    expect(Object.keys(elBatchTwo)).toHaveLength(15);
    for (const [slug, page] of Object.entries(elBatchTwo)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.faqs.length).toBeGreaterThanOrEqual(2);
      expect(/[Α-Ωα-ωΆΈΉΊΌΎΏΪΫάέήίόύώϊϋΐΰ]/u.test(page.description)).toBe(true);
    }
  });
});
