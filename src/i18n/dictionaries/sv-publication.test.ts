import { describe, expect, it } from "vitest";
import { supportedLocalesForCalculator, localizedCalculatorSlugs, localeConfig } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultCurrencyByLocale } from "@/lib/formatter/currency";

describe("Swedish calculator publication", () => {
  it("publishes the complete translated catalog with Swedish defaults", () => {
    const dictionary = getDictionary("sv");
    expect(dictionary.locale).toBe("sv");
    expect(Object.keys(dictionary.calculators)).toHaveLength(169);
    expect(Object.keys(dictionary.calculators).sort()).toEqual([...localizedCalculatorSlugs].sort());
    expect(defaultCurrencyByLocale.sv).toBe("SEK");
    expect(localeConfig.sv.hreflang).toBe("sv");
    for (const slug of localizedCalculatorSlugs) expect(supportedLocalesForCalculator(slug)).toContain("sv");
    expect(dictionary.common.calculate).toBe("Beräkna");
    expect(dictionary.nav.language).toBe("Språk");
  });
});
