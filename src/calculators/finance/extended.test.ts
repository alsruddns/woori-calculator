import { describe, expect, it } from "vitest";
import { calculateAffordableLoan, calculateDividend, calculatePrepaymentFee, calculateProfitLoss, calculateRefinance, calculateSalaryConversion } from "@/calculators/finance/extended";

describe("extended static finance calculators", () => {
  it("converts monthly and annual gross pay over twelve months", () => {
    expect(calculateSalaryConversion({ mode: "monthly", amount: "3000000" })).toMatchObject({ results: [{ value: 3000000 }, { value: 36000000 }] });
    expect(calculateSalaryConversion({ mode: "annual", amount: "36000000" })).toMatchObject({ results: [{ value: 3000000 }, { value: 36000000 }] });
  });
  it("calculates gross dividends and price-based yield", () => {
    expect(calculateDividend({ shares: "100", perShare: "500", payments: "2", price: "10000" })).toMatchObject({ results: [{ value: 50000 }, { value: 100000 }, { value: 10 }] });
  });
  it("calculates profit, break-even and rejects invalid inputs", () => {
    expect(calculateProfitLoss({ buy: "100", sell: "120", quantity: "10", buyCost: "0", sellCost: "0" })).toMatchObject({ results: [{ value: 1000 }, { value: 1200 }, { value: 200 }, { value: 20 }, { value: 100 }] });
    expect(calculateProfitLoss({ buy: "0", sell: "1", quantity: "1", buyCost: "0", sellCost: "0" })).toHaveProperty("error");
  });
  it("estimates loan comparison, user-entered fee and affordable principal", () => {
    expect(calculateRefinance({ balance: "10000000", oldRate: "0", oldMonths: "10", newRate: "0", newMonths: "10", fees: "0" })).toMatchObject({ results: [{ value: 10000000 }, { value: 10000000 }, { value: 0 }, { value: 0 }] });
    expect(calculatePrepaymentFee({ amount: "10000000", rate: "1" })).toMatchObject({ results: [{ value: 100000 }] });
    const affordable = calculateAffordableLoan({ payment: "100000", rate: "0", months: "12" });
    expect("results" in affordable && affordable.results[0]?.value).toBe(1200000);
  });
});
