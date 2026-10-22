import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { filipinoCalculatorContent, remainingFilipinoCalculatorSlugs, translatedFilipinoCalculatorSlugs } from "@/i18n/dictionaries/fil-progress";

describe("Filipino translation progress", () => {
  it("tracks every calculator exactly once without publishing incomplete content", () => {
    expect(Object.keys(filipinoCalculatorContent).length).toBe(80);
    expect(translatedFilipinoCalculatorSlugs.length).toBe(80);
    expect(remainingFilipinoCalculatorSlugs.length).toBe(localizedCalculatorSlugs.length - 80);
    expect(new Set([...translatedFilipinoCalculatorSlugs, ...remainingFilipinoCalculatorSlugs]).size).toBe(localizedCalculatorSlugs.length);
    expect(remainingFilipinoCalculatorSlugs[0]).toBe("netherlands-gross-net-salary-calculator");
  });
});
