import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchSix } from "@/i18n/dictionaries/fil-batch-6";

describe("Filipino calculator translation batch six", () => {
  it("translates pace and preserves calculator keys", () => {
    const page = filBatchSix.pace!;
    const source = getDictionary("en").calculators.pace!;
    expect(page.title).not.toBe(source.title);
    expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
    expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
    for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label).not.toBe(field.label);
  });
});
