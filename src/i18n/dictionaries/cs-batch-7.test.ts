import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { csBatchSeven } from "@/i18n/dictionaries/cs-batch-7";

describe("Czech calculator translation batch seven", () => {
  it("contains every unit category and conversion choice in the source schema", () => {
    const source = getDictionary("en").calculators["unit-converter"]!;
    const page = csBatchSeven["unit-converter"]!;
    expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
    expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
    expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
    for (const [group, options] of Object.entries(source.options)) expect(Object.keys(page.options[group] ?? {}).sort(), group).toEqual(Object.keys(options).sort());
    for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label, key).not.toBe(field.label);
  });
});
