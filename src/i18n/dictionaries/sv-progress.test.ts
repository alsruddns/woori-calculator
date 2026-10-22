import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { remainingSwedishCalculatorSlugs, swedishCalculatorContent, translatedSwedishCalculatorSlugs } from "@/i18n/dictionaries/sv-progress";

describe("Swedish translation workbench progress", () => {
  it("tracks complete batches without publishing a partial catalog", () => {
    expect(translatedSwedishCalculatorSlugs).toHaveLength(45);
    expect(remainingSwedishCalculatorSlugs).toHaveLength(124);
    expect(new Set(Object.keys(swedishCalculatorContent)).size).toBe(45);
    expect(translatedSwedishCalculatorSlugs.length + remainingSwedishCalculatorSlugs.length).toBe(localizedCalculatorSlugs.length);
  });
});
