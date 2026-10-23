import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchEleven } from "@/i18n/dictionaries/fil-batch-11";

const slugs = ["netherlands-gross-net-salary-calculator", "netherlands-vat-calculator", "netherlands-30-percent-ruling-calculator", "netherlands-holiday-allowance-calculator", "india-gst-calculator", "india-sip-calculator"] as const;

describe("Filipino calculator translation batch eleven", () => {
  it("preserves all keys and states the applicable country basis", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchEleven).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchEleven[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultNote).toMatch(/Netherlands|India/);
      expect(page.resultNote).toContain("Philippine");
    }
  });
});
