import { describe, expect, it } from "vitest";
import { elBatchSix } from "@/i18n/dictionaries/el-batch-6";
import { getDictionary } from "@/i18n/dictionaries";

describe("Greek calculator translation batch six", () => {
  it("translates transport, Korean policy, and Japanese policy calculator copy with exact schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(elBatchSix)).toHaveLength(13);
    for (const [slug, page] of Object.entries(elBatchSix)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.faqs).toHaveLength(2);
      expect(/[Α-Ωα-ωΆΈΉΊΌΎΏΪΫάέήίόύώϊϋΐΰ]/u.test(page.description)).toBe(true);
    }
  });
});
