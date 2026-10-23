import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { bengaliCalculatorContent, remainingBengaliCalculatorSlugs, translatedBengaliCalculatorSlugs } from "@/i18n/dictionaries/bn-progress";

describe("Bengali translation progress", () => {
  it("tracks workbench translations without making incomplete pages public", () => {
    expect(Object.keys(bengaliCalculatorContent)).toHaveLength(169);
    expect(translatedBengaliCalculatorSlugs).toHaveLength(169);
    expect(remainingBengaliCalculatorSlugs).toHaveLength(localizedCalculatorSlugs.length - 169);
    expect(new Set([...translatedBengaliCalculatorSlugs, ...remainingBengaliCalculatorSlugs]).size).toBe(localizedCalculatorSlugs.length);
  });
});
