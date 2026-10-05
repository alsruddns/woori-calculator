import { describe, expect, it } from "vitest";
import { calculateMargin, calculateMarkup, calculateUnitPrice, calculateVat } from "@/calculators/tax/calculate";

describe("tax and price calculators", () => {
  it("calculates 10 percent VAT and whole-won rounding", () => {
    expect(calculateVat({ amount: "12345", mode: "supply" })).toMatchObject({ results: [{ value: 12345 }, { value: 1235 }, { value: 13580 }] });
    expect(calculateVat({ gross: "11000", mode: "gross" })).toMatchObject({ results: [{ value: 10000 }, { value: 1000 }, { value: 11000 }] });
    for (const gross of [0, 1, 11_000, 11_001, 11_050, 1_000_001]) {
      const result = calculateVat({ gross: String(gross), mode: "gross" });
      expect("results" in result && typeof result.results[0]!.value === "number" && typeof result.results[1]!.value === "number" ? result.results[0]!.value + result.results[1]!.value : NaN).toBe(Math.round(gross));
    }
    expect(calculateVat({ amount: "-1", mode: "supply" })).toHaveProperty("error");
  });

  it.each([0, 1, 9, 10, 11, 99, 101, 11000, 11001, 11050, 1_000_001, 99_999_999])("keeps reverse VAT parts reconciled for %s won", (gross) => {
    const outcome = calculateVat({ gross: String(gross), mode: "gross" });
    expect("results" in outcome).toBe(true);
    if ("results" in outcome) {
      expect(outcome.results[0]!.value as number + (outcome.results[1]!.value as number)).toBe(Math.round(gross));
    }
  });

  it("computes unit prices and validates zero quantities", () => {
    expect(calculateUnitPrice({ total: "10000", quantity: "3", mode: "unit" })).toMatchObject({ results: [{ value: 3333.33 }] });
    expect(calculateUnitPrice({ total: "10000", quantity: "0", mode: "unit" })).toHaveProperty("error");
    expect(calculateUnitPrice({ total: "10000", quantity: "3", mode: "unit" })).toMatchObject({ results: [{ value: 3333.33 }] });
  });

  it("distinguishes margin rate from markup rate", () => {
    expect(calculateMargin({ cost: "60", sale: "100" })).toMatchObject({ results: [{ value: 40 }, { value: 40 }] });
    expect(calculateMarkup({ cost: "60", sale: "100" })).toMatchObject({ results: [{ value: 40 }, { value: 66.67 }] });
    expect(calculateMargin({ cost: "0", sale: "100" })).toMatchObject({ results: [{ value: 100 }, { value: 100 }] });
    expect(calculateMargin({ cost: "100", sale: "50" })).toMatchObject({ results: [{ value: -50 }, { value: -100 }] });
    expect(calculateMarkup({ cost: "0", sale: "100" })).toHaveProperty("error");
  });
});
