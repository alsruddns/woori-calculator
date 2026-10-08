import { describe, expect, it } from "vitest";
import { isAdsEnabled } from "@/lib/ads/enabled";

describe("ad feature flag", () => {
  it.each([undefined, "", "false", "False", "1", "yes"])('keeps ads disabled for %s', (value) => {
    expect(isAdsEnabled(value)).toBe(false);
  });

  it('enables ads only for the exact value "true"', () => {
    expect(isAdsEnabled("true")).toBe(true);
  });
});
