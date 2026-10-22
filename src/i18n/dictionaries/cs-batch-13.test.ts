import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { csBatchThirteen } from "@/i18n/dictionaries/cs-batch-13";

describe("Czech calculator translation batch thirteen", () => {
  it("validates the stock averaging page against all mode, field, and result keys", () => {
    const english = getDictionary("en");
    const page = csBatchThirteen["stock-average-price"]!;
    const source = english.calculators["stock-average-price"]!;
    expect(Object.keys(csBatchThirteen)).toHaveLength(1);
    expect(page.title).not.toBe(source.title);
    expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
    expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
    expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
    for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label, key).not.toBe(field.label);
    for (const [group, options] of Object.entries(source.options)) {
      expect(Object.keys(page.options[group] ?? {}).sort(), group).toEqual(Object.keys(options).sort());
      for (const [key, label] of Object.entries(options)) expect(page.options[group]?.[key], `${group}.${key}`).not.toBe(label);
    }
    expect(page.resultNote).toContain("investiční doporučení");
  });
});
