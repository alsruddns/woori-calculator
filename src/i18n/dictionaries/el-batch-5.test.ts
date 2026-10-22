import { describe, expect, it } from "vitest";
import { elBatchFive } from "@/i18n/dictionaries/el-batch-5";
import { getDictionary } from "@/i18n/dictionaries";

describe("Greek calculator translation batch five", () => {
  it("provides Greek calculator content and preserves every form and result key", () => {
    const english = getDictionary("en");
    expect(Object.keys(elBatchFive)).toHaveLength(15);
    for (const [slug, page] of Object.entries(elBatchFive)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.faqs).toHaveLength(2);
      expect(/[Α-Ωα-ωΆΈΉΊΌΎΏΪΫάέήίόύώϊϋΐΰ]/u.test(page.title)).toBe(true);
    }
  });
});
