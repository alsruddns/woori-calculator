import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { malayCalculatorContent, remainingMalayCalculatorSlugs, translatedMalayCalculatorSlugs } from "@/i18n/dictionaries/ms-progress";

describe("Malay translation workbench progress", () => {
  it("tracks translated and remaining calculators without publishing incomplete coverage", () => {
    expect(translatedMalayCalculatorSlugs).toHaveLength(141);
    expect(remainingMalayCalculatorSlugs).toHaveLength(28);
    expect(new Set(Object.keys(malayCalculatorContent)).size).toBe(141);
    expect(translatedMalayCalculatorSlugs.length + remainingMalayCalculatorSlugs.length).toBe(localizedCalculatorSlugs.length);
  });
});
