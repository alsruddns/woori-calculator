import { describe, expect, it } from "vitest";
import { newCalculatorPages } from "@/data/calculator-content/new-tools";
import { getDictionary } from "@/i18n/dictionaries";
import { locales } from "@/i18n/config";

describe("new calculator translations", () => {
  it("provides translated names, fields, formulas, examples, and labels in all fifteen locales", () => {
    const korean = getDictionary("ko");
    for (const locale of locales) {
      const dictionary = getDictionary(locale);
      for (const page of newCalculatorPages) {
        const content = dictionary.calculators[page.slug as keyof typeof dictionary.calculators];
        expect(content, `${page.slug}:${locale}`).toBeDefined();
        expect(content!.name.length).toBeGreaterThan(2);
        expect(content!.description.length).toBeGreaterThan(20);
        expect(content!.formula.length).toBeGreaterThan(10);
        expect(content!.example.answer.length).toBeGreaterThan(10);
        for (const field of page.fields) expect(content!.fields[field.name]?.label, `${page.slug}:${locale}:field.${field.name}`).toBeTruthy();
        for (const [key, label] of Object.entries(content!.resultLabels)) expect(label, `${page.slug}:${locale}:result.${key}`).not.toBe(key);
        if (locale !== "ko") expect(content!.name).not.toBe(korean.calculators[page.slug as keyof typeof korean.calculators]!.name);
      }
    }
  });
});
