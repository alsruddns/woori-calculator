import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { csBatchEleven } from "@/i18n/dictionaries/cs-batch-11";

describe("Czech calculator translation batch eleven", () => {
  it("validates the finance pages against their source schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(csBatchEleven)).toHaveLength(4);
    for (const [slug, page] of Object.entries(csBatchEleven)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
    }
  });
});
