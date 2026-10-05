import { describe, expect, it } from "vitest";
import { calculateCompoundInterest, calculateDepositInterest, calculateDsr, calculateDti, calculateLoanInterest, calculateLtv, calculateSavingsInterest, calculateSimpleInterest, calculateStockAveragePrice } from "@/calculators/finance/calculate";

describe("finance calculator functions", () => {
  it("calculates stock average price and all requested investment results", () => {
    expect(calculateStockAveragePrice({ existingQuantity: "10", existingAveragePrice: "10000", additionalQuantity: "10", additionalPrice: "8000" })).toMatchObject({
      results: [
        { label: "기존 투자금액", value: 100000 }, { label: "추가 투자금액", value: 80000 }, { label: "총 보유 수량", value: 20 },
        { label: "총 투자금액", value: 180000 }, { label: "새로운 평균단가", value: 9000 }, { label: "평균단가 변화액", value: -1000 }, { label: "평균단가 변화율", value: -10 },
      ],
    });
  });

  it("handles zero existing quantity and rejects zero totals, zero reference price, negatives, and huge values", () => {
    expect(calculateStockAveragePrice({ existingQuantity: "0", existingAveragePrice: "0", additionalQuantity: "2", additionalPrice: "1500" })).toMatchObject({ results: [{ value: 0 }, { value: 3000 }, { value: 2 }, { value: 3000 }, { value: 1500 }, { value: 0 }, { value: 0 }] });
    expect(calculateStockAveragePrice({ existingQuantity: "0", existingAveragePrice: "0", additionalQuantity: "0", additionalPrice: "0" })).toHaveProperty("error");
    expect(calculateStockAveragePrice({ existingQuantity: "1", existingAveragePrice: "0", additionalQuantity: "1", additionalPrice: "10" })).toMatchObject({ error: expect.any(String), field: "existingAveragePrice" });
    expect(calculateStockAveragePrice({ existingQuantity: "-1", existingAveragePrice: "10", additionalQuantity: "1", additionalPrice: "10" })).toHaveProperty("error");
    expect(calculateStockAveragePrice({ existingQuantity: "1e308", existingAveragePrice: "1e308", additionalQuantity: "1", additionalPrice: "1" })).toHaveProperty("error");
  });

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
    expect(calculateLoanInterest({ principal: "12000000", rate: "12", months: "12", method: "equal-payment" })).toMatchObject({ results: [{ value: 1066185 }, { value: 794226 }, { value: 12794226 }] });
    expect(calculateLoanInterest({ principal: "12000000", rate: "12", months: "12", method: "equal-principal" })).toMatchObject({ results: [{ value: 1120000 }, { value: 780000 }, { value: 12780000 }] });
    expect(calculateLoanInterest({ principal: "12000000", rate: "0", months: "1", method: "equal-payment" })).toMatchObject({ results: [{ value: 12000000 }, { value: 0 }, { value: 12000000 }] });
    expect(calculateLoanInterest({ principal: "12000000", rate: "12", months: "1", method: "bullet" })).toMatchObject({ results: [{ label: "만기 상환액", value: 12120000 }, { value: 120000 }, { value: 12120000 }] });
    expect(calculateLoanInterest({ principal: "12000000", rate: "5.5", months: "360", method: "equal-payment" })).toHaveProperty("results");
    expect(calculateLoanInterest({ principal: "12000000", rate: "5", months: "0" })).toHaveProperty("error");
  });

  it("calculates simple DSR and rejects zero income", () => {
    expect(calculateDsr({ income: "50000000", repayment: "10000000" })).toMatchObject({ results: [{ value: 20 }] });
    expect(calculateDsr({ income: "0", repayment: "10000000" })).toHaveProperty("error");
    expect(calculateDti({ income: "50000000", mortgage: "10000000", otherInterest: "1000000" })).toMatchObject({ results: [{ value: 22 }] });
    expect(calculateLtv({ homePrice: "0", loan: "1" })).toHaveProperty("error");
    expect(calculateLtv({ homePrice: "100", loan: "120" })).toMatchObject({ results: [{ value: 120 }] });
  });

  it("handles zero, fractional periods, and rejects invalid policy inputs", () => {
    expect(calculateCompoundInterest({ principal: "0", rate: "0", years: "0", frequency: "1" })).toMatchObject({ results: [{ value: 0 }, { value: 0 }] });
    expect(calculateCompoundInterest({ principal: "100000", rate: "12", years: "1", frequency: "12" })).toMatchObject({ results: [{ value: 112683 }, { value: 12683 }] });
    expect(calculateDepositInterest({ principal: "10000", rate: "12", months: "6" })).toMatchObject({ results: [{ value: 600 }, { value: 10600 }] });
    expect(calculateSavingsInterest({ monthly: "10000", rate: "0", months: "1" })).toMatchObject({ results: [{ value: 10000 }, { value: 0 }, { value: 10000 }] });
    expect(calculateSavingsInterest({ monthly: "10000", rate: "5", months: "1.5" })).toHaveProperty("error");
    expect(calculateSimpleInterest({ principal: "10000", rate: "5", years: "-1" })).toHaveProperty("error");
    expect(calculateDsr({ income: "100", repayment: "0" })).toMatchObject({ results: [{ value: 0 }] });
  });

  it.each(["equal-payment", "equal-principal", "bullet"])("keeps zero-rate loan totals equal to principal for %s", (method) => {
    const outcome = calculateLoanInterest({ principal: "9000000", rate: "0", months: "360", method });
    expect("results" in outcome && outcome.results[1]?.value).toBe(0);
    expect("results" in outcome && outcome.results[2]?.value).toBe(9000000);
  });

  it.each([
    ["equal-payment", 100000],
    ["equal-principal", 100000],
    ["bullet", 100000],
  ])("calculates one-month 12 percent loan interest for %s", (method, interest) => {
    const outcome = calculateLoanInterest({ principal: "10000000", rate: "12", months: "1", method });
    expect("results" in outcome && outcome.results[1]?.value).toBe(interest);
    expect("results" in outcome && outcome.results[2]?.value).toBe(10_100_000);
  });
});
