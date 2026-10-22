import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { filipinoCalculatorContent, remainingFilipinoCalculatorSlugs, translatedFilipinoCalculatorSlugs } from "@/i18n/dictionaries/fil-progress";

describe("Filipino translation progress", () => {
  it("tracks every calculator exactly once without publishing incomplete content", () => {
    expect(Object.keys(filipinoCalculatorContent).length).toBe(71);
    expect(translatedFilipinoCalculatorSlugs.length).toBe(71);
    expect(remainingFilipinoCalculatorSlugs.length).toBe(localizedCalculatorSlugs.length - 71);
    expect(new Set([...translatedFilipinoCalculatorSlugs, ...remainingFilipinoCalculatorSlugs]).size).toBe(localizedCalculatorSlugs.length);
    expect(remainingFilipinoCalculatorSlugs[0]).toBe("germany-vacation-pay-calculator");
  });
});
