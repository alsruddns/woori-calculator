import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { remainingRomanianCalculatorSlugs, romanianCalculatorContent, translatedRomanianCalculatorSlugs } from "@/i18n/dictionaries/ro-progress";

describe("Romanian translation progress", () => {
  it("tracks translated pages without publishing an incomplete Romanian locale", () => {
    expect(translatedRomanianCalculatorSlugs).toHaveLength(62);
    expect(remainingRomanianCalculatorSlugs).toHaveLength(localizedCalculatorSlugs.length - 62);
    expect(Object.keys(romanianCalculatorContent)).toHaveLength(62);
    expect(translatedRomanianCalculatorSlugs.length + remainingRomanianCalculatorSlugs.length).toBe(localizedCalculatorSlugs.length);
  });
});
