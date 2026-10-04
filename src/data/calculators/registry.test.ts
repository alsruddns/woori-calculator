import { describe, expect, it } from "vitest";
import { calculatorRegistry, publishedCalculators } from "@/data/calculators/registry";

describe("calculator registry", () => {
  it("does not publish calculators before their pages are ready", () => {
    expect(publishedCalculators).toEqual([]);
    expect(calculatorRegistry).toEqual([]);
  });
});
