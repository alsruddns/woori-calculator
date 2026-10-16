import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("disabled ads", () => {
  it("does not mount an ad slot or placeholder when ads are disabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADS_ENABLED", "false");
    vi.resetModules();
    const { AdSlot } = await import("@/components/ads/AdSlot");
    expect(AdSlot({ placement: "inline", size: "rectangle" })).toBeNull();
  });
});
