import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { filipinoCalculatorContent, remainingFilipinoCalculatorSlugs, translatedFilipinoCalculatorSlugs } from "@/i18n/dictionaries/fil-progress";

describe("Filipino translation progress", () => {
  it("tracks every calculator exactly once without publishing incomplete content", () => {
    expect(Object.keys(filipinoCalculatorContent).length).toBe(67);
    expect(translatedFilipinoCalculatorSlugs.length).toBe(67);
    expect(remainingFilipinoCalculatorSlugs.length).toBe(localizedCalculatorSlugs.length - 67);
    expect(new Set([...translatedFilipinoCalculatorSlugs, ...remainingFilipinoCalculatorSlugs]).size).toBe(localizedCalculatorSlugs.length);
    expect(remainingFilipinoCalculatorSlugs[0]).toBe("germany-gross-net-salary-calculator");
  });
});
