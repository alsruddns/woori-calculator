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

  it("solves target return with the required formula and recomputes the whole-share outcome", () => {
    const input = { mode: "target", currentQuantity: "100", currentAveragePrice: "50000", currentReturn: "-30", targetReturn: "-20", priceMode: "return" };
    const result = calculateStockAveragePrice(input);
    expect(result).toMatchObject({ results: [
      { label: "계산상 필요한 추가 매수수량", value: 71.43 },
      { label: "정수 주식 기준 필요한 매수수량", value: 72 },
      { label: "정수 수량 기준 추가 투자금액", value: 2520000 },
      { label: "물타기 후 총 보유수량", value: 172 },
      { label: "물타기 후 새로운 평균단가", value: 43720.93 },
      { label: "정수 수량 매수 후 실제 예상 손익률", value: -19.95 },
    ] });
    if (!("results" in result)) throw new Error("Expected a successful target return calculation");

    const directPrice = calculateStockAveragePrice({ ...input, priceMode: "price", currentPrice: "35000" });
    expect(directPrice).toMatchObject({ results: result.results });
    const q = 100;
    const a = 50000;
    const p = 35000;
    const n = p / (1 - 0.2);
    const expected = q * (a - n) / (n - p);
    expect(result.results[0]?.value).toBe(Number(expected.toFixed(2)));
  });

  it("handles equal returns and reports targets that cannot be reached or require unnecessary buying", () => {
    expect(calculateStockAveragePrice({ mode: "target", currentQuantity: "100", currentAveragePrice: "50000", currentPrice: "35000", targetReturn: "-30", priceMode: "price" })).toMatchObject({ results: [{ value: 0 }, { value: 0 }] });
    const unreachable = "현재 가격으로 추가 매수하는 것만으로는 유한한 매수수량으로 해당 목표 손익률에 정확히 도달할 수 없습니다.";
    expect(calculateStockAveragePrice({ mode: "target", currentQuantity: "100", currentAveragePrice: "50000", currentPrice: "35000", targetReturn: "0", priceMode: "price" })).toMatchObject({ error: unreachable });
    expect(calculateStockAveragePrice({ mode: "target", currentQuantity: "100", currentAveragePrice: "50000", currentPrice: "35000", targetReturn: "5", priceMode: "price" })).toMatchObject({ error: unreachable });
    expect(calculateStockAveragePrice({ mode: "target", currentQuantity: "100", currentAveragePrice: "50000", currentPrice: "35000", targetReturn: "-40", priceMode: "price" })).toHaveProperty("error");
  });

  it("validates target-mode quantities, prices, and percentages without exposing non-finite results", () => {
    const base = { mode: "target", currentQuantity: "100", currentAveragePrice: "50000", currentPrice: "35000", targetReturn: "-20", priceMode: "price" };
    for (const override of [
      { currentQuantity: "0" }, { currentAveragePrice: "0" }, { currentPrice: "0" }, { currentPrice: "-1" },
      { targetReturn: "-100" }, { targetReturn: "NaN" }, { targetReturn: "Infinity" },
      { currentPrice: "NaN" }, { currentQuantity: "Infinity" },
    ]) expect(calculateStockAveragePrice({ ...base, ...override })).toHaveProperty("error");
    expect(calculateStockAveragePrice({ ...base, currentReturn: "-100", priceMode: "return" })).toHaveProperty("error");
    expect(calculateStockAveragePrice({ ...base, currentReturn: "NaN", priceMode: "return" })).toHaveProperty("error");
    expect(calculateStockAveragePrice({ ...base, currentQuantity: "1e308", currentAveragePrice: "1e308", currentPrice: "1e308" })).toHaveProperty("error");
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
    expect(calculateCompoundInterest({ principal: "1000000", rate: "1000", years: "200", frequency: "365" })).toHaveProperty("error");
    expect(calculateCompoundInterest({ principal: "1000000", rate: "5", years: "200", frequency: "1" })).toHaveProperty("results");
    expect(calculateCompoundInterest({ principal: "1000000", rate: "1000.01", years: "1" })).toHaveProperty("error");
    expect(calculateSimpleInterest({ principal: "1000000", rate: "5", years: "200" })).toHaveProperty("results");
    expect(calculateSimpleInterest({ principal: "1000000", rate: "5", years: "200.1" })).toHaveProperty("error");
  });

  it("keeps period detail endpoints identical to the existing finance summaries", () => {
    const compound = calculateCompoundInterest({ principal: "1000000", rate: "10", years: "5", frequency: "1" });
    expect(compound).toMatchObject({ results: [{ value: 1610510 }, { value: 610510 }] });
    if (!("results" in compound) || !compound.table) throw new Error("Expected compound detail rows");
    expect(compound.table.rows).toHaveLength(5);
    expect(Math.round(Number(compound.table.rows.at(-1)?.[4]))).toBe(compound.results[0]?.value);
    expect(Math.round(Number(compound.table.rows.at(-1)?.[3]))).toBe(compound.results[1]?.value);

    const simple = calculateSimpleInterest({ principal: "1000000", rate: "10", years: "5" });
    const deposit = calculateDepositInterest({ principal: "1000000", rate: "10", months: "60" });
    const savings = calculateSavingsInterest({ monthly: "100000", rate: "10", months: "60" });
    for (const outcome of [simple, deposit, savings]) {
      if (!("results" in outcome) || !outcome.table) throw new Error("Expected period rows");
      expect(Math.round(Number(outcome.table.rows.at(-1)?.at(-1)))).toBe(outcome.results.at(-1)?.value);
    }
    const fractional = calculateCompoundInterest({ principal: "1000000", rate: "10", years: "2.5", frequency: "12" });
    if (!("results" in fractional) || !fractional.table) throw new Error("Expected fractional period rows");
    expect(fractional.table.rows.at(-1)?.[0]).toBe(2.5);
    expect(Math.round(Number(fractional.table.rows.at(-1)?.[4]))).toBe(fractional.results[0]?.value);
    const partialMonth = calculateCompoundInterest({ principal: "1000000", rate: "10", years: "0.1", frequency: "12" });
    if (!("results" in partialMonth) || !partialMonth.table) throw new Error("Expected partial-month detail row");
    expect(partialMonth.table.rows.at(-1)?.[0]).toBeCloseTo(1.2);
    expect(Math.round(Number(partialMonth.table.rows.at(-1)?.[4]))).toBe(partialMonth.results[0]?.value);
  });

  it.each(["equal-payment", "equal-principal", "bullet"])("loan schedule totals reconcile for %s", (method) => {
    const outcome = calculateLoanInterest({ principal: "12000000", rate: "12", months: "24", method });
    if (!("results" in outcome) || !outcome.table) throw new Error("Expected repayment schedule");
    expect(outcome.table.rows.reduce((sum, row) => sum + Number(row[2]), 0)).toBe(12000000);
    expect(outcome.table.rows.reduce((sum, row) => sum + Number(row[3]), 0)).toBe(outcome.results[1]?.value);
    expect(outcome.table.rows.at(-1)?.[4]).toBe(0);
  });

  it("calculates deposit and monthly installment estimates", () => {
    expect(calculateDepositInterest({ principal: "10000000", rate: "3.6", months: "12" })).toMatchObject({ results: [{ value: 360000 }, { value: 10360000 }] });
    expect(calculateSavingsInterest({ monthly: "100000", rate: "12", months: "12" })).toMatchObject({ results: [{ value: 1200000 }, { value: 66000 }, { value: 1266000 }] });
    expect(calculateSavingsInterest({ monthly: "1000", rate: "5", months: "2400" })).toHaveProperty("results");
    expect(calculateSavingsInterest({ monthly: "1000", rate: "5", months: "2401" })).toHaveProperty("error");
    expect(calculateDepositInterest({ principal: "1000", rate: "5", months: "2400" })).toHaveProperty("results");
    expect(calculateDepositInterest({ principal: "1000", rate: "5", months: "2401" })).toHaveProperty("error");
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
    expect(calculateLoanInterest({ principal: "1000", rate: "100", months: "1200" })).toHaveProperty("results");
    expect(calculateLoanInterest({ principal: "1000", rate: "100.01", months: "1200" })).toHaveProperty("error");
    expect(calculateLoanInterest({ principal: "1000", rate: "5", months: "1201" })).toHaveProperty("error");
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

  it("caps stock quantities and prevents excessive target purchases", () => {
    expect(calculateStockAveragePrice({ existingQuantity: "1000000000", existingAveragePrice: "1", additionalQuantity: "0", additionalPrice: "1" })).toHaveProperty("results");
    expect(calculateStockAveragePrice({ existingQuantity: "1000000001", existingAveragePrice: "1", additionalQuantity: "0", additionalPrice: "1" })).toHaveProperty("error");
    expect(calculateStockAveragePrice({ existingQuantity: "1000000000", existingAveragePrice: "1", additionalQuantity: "1", additionalPrice: "1" })).toHaveProperty("error");
    expect(calculateStockAveragePrice({ mode: "target", currentQuantity: "1000000000", currentAveragePrice: "100", currentPrice: "50", targetReturn: "-1", priceMode: "price" })).toHaveProperty("error");
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
