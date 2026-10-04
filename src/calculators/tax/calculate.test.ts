import { describe, expect, it } from "vitest";
import { calculateMargin, calculateMarkup, calculateUnitPrice, calculateVat } from "@/calculators/tax/calculate";

describe("tax and price calculators", () => {
  it("calculates 10 percent VAT and whole-won rounding", () => {
    expect(calculateVat({ amount: "12345", mode: "supply" })).toMatchObject({ results: [{ value: 12345 }, { value: 1235 }, { value: 13580 }] });
    expect(calculateVat({ gross: "11000", mode: "gross" })).toMatchObject({ results: [{ value: 10000 }, { value: 1000 }, { value: 11000 }] });
  });

  it("computes unit prices and validates zero quantities", () => {
    expect(calculateUnitPrice({ total: "10000", quantity: "3", mode: "unit" })).toMatchObject({ results: [{ value: 3333.33 }] });
    expect(calculateUnitPrice({ total: "10000", quantity: "0", mode: "unit" })).toHaveProperty("error");
  });

  it("distinguishes margin rate from markup rate", () => {
    expect(calculateMargin({ cost: "60", sale: "100" })).toMatchObject({ results: [{ value: 40 }, { value: 40 }] });
    expect(calculateMarkup({ cost: "60", sale: "100" })).toMatchObject({ results: [{ value: 40 }, { value: 66.67 }] });
  });
});
