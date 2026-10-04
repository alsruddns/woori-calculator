import { describe, expect, it } from "vitest";
import { calculateCompoundInterest, calculateDepositInterest, calculateDsr, calculateLoanInterest, calculateSavingsInterest, calculateSimpleInterest } from "@/calculators/finance/calculate";

describe("finance calculator functions", () => {
  it("calculates monthly compound interest and zero-rate simple interest", () => {
    expect(calculateCompoundInterest({ principal: "1000000", rate: "12", years: "1", frequency: "12" })).toMatchObject({ results: [{ value: 1126825 }, { value: 126825 }] });
    expect(calculateSimpleInterest({ principal: "1000000", rate: "0", years: "2" })).toMatchObject({ results: [{ value: 0 }, { value: 1000000 }] });
  });

  it("calculates deposit and monthly installment estimates", () => {
    expect(calculateDepositInterest({ principal: "10000000", rate: "3.6", months: "12" })).toMatchObject({ results: [{ value: 360000 }, { value: 10360000 }] });
    expect(calculateSavingsInterest({ monthly: "100000", rate: "12", months: "12" })).toMatchObject({ results: [{ value: 1200000 }, { value: 66000 }, { value: 1266000 }] });
  });

  it("amortizes all loan methods and rejects invalid terms", () => {
    expect(calculateLoanInterest({ principal: "12000000", rate: "0", months: "12", method: "equal-payment" })).toMatchObject({ results: [{ value: 1000000 }, { value: 0 }, { value: 12000000 }] });
    expect(calculateLoanInterest({ principal: "12000000", rate: "12", months: "12", method: "bullet" })).toMatchObject({ results: [{ value: 120000 }, { value: 1440000 }, { value: 13440000 }] });
    expect(calculateLoanInterest({ principal: "-1", rate: "5", months: "12" })).toHaveProperty("error");
  });

  it("calculates simple DSR and rejects zero income", () => {
    expect(calculateDsr({ income: "50000000", repayment: "10000000" })).toMatchObject({ results: [{ value: 20 }] });
    expect(calculateDsr({ income: "0", repayment: "10000000" })).toHaveProperty("error");
  });
});
