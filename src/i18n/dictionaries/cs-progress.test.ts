import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { czechCalculatorContent, remainingCzechCalculatorSlugs, translatedCzechCalculatorSlugs } from "@/i18n/dictionaries/cs-progress";

describe("Czech translation progress", () => {
  it("tracks only the calculator pages with completed Czech content", () => {
    expect(translatedCzechCalculatorSlugs).toHaveLength(85);
    expect(remainingCzechCalculatorSlugs).toHaveLength(84);
    expect(Object.keys(czechCalculatorContent)).toHaveLength(85);
    expect(translatedCzechCalculatorSlugs.length + remainingCzechCalculatorSlugs.length).toBe(localizedCalculatorSlugs.length);
  });
});
