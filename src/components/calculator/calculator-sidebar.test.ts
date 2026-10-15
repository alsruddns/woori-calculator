import { describe, expect, it } from "vitest";
import { restoredSidebarScrollTop } from "@/components/calculator/calculator-sidebar";

describe("restoredSidebarScrollTop", () => {
  it("restores a valid position for the same locale", () => {
    expect(restoredSidebarScrollTop({ basePath: "/ko/calculators", scrollTop: 1100 }, "/ko/calculators", 1600)).toBe(1100);
  });

  it("does not carry the position across locales", () => {
    expect(restoredSidebarScrollTop({ basePath: "/ko/calculators", scrollTop: 1100 }, "/en/calculators", 1600)).toBeNull();
  });

  it("clamps positions to the available sidebar content and rejects invalid values", () => {
    expect(restoredSidebarScrollTop({ basePath: "/ko/calculators", scrollTop: 1100 }, "/ko/calculators", 700)).toBe(700);
    expect(restoredSidebarScrollTop({ basePath: "/ko/calculators", scrollTop: -1 }, "/ko/calculators", 700)).toBeNull();
    expect(restoredSidebarScrollTop({ basePath: "/ko/calculators", scrollTop: Infinity }, "/ko/calculators", 700)).toBeNull();
    expect(restoredSidebarScrollTop(null, "/ko/calculators", 700)).toBeNull();
  });
});
