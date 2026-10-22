import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { remainingUkrainianCalculatorSlugs, translatedUkrainianCalculatorSlugs, ukrainianCalculatorContent } from "@/i18n/dictionaries/uk-progress";

describe("Ukrainian translation workbench", () => {
  it("tracks translated pages without publishing an incomplete locale", () => {
    expect(Object.keys(ukrainianCalculatorContent)).toHaveLength(53);
    expect(translatedUkrainianCalculatorSlugs).toHaveLength(53);
    expect(remainingUkrainianCalculatorSlugs).toHaveLength(localizedCalculatorSlugs.length - 53);
    expect(new Set([...translatedUkrainianCalculatorSlugs, ...remainingUkrainianCalculatorSlugs]).size).toBe(localizedCalculatorSlugs.length);
  });
});
