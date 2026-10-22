import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { remainingGreekCalculatorSlugs, translatedGreekCalculatorSlugs } from "@/i18n/dictionaries/el-progress";

describe("Greek calculator translation progress", () => {
  it("contains a complete translated entry for every localized calculator", () => {
    expect(translatedGreekCalculatorSlugs).toHaveLength(169);
    expect(translatedGreekCalculatorSlugs).toEqual(localizedCalculatorSlugs);
    expect(remainingGreekCalculatorSlugs).toEqual([]);
  });
});
