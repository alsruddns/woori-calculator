import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { japanPolicy2026 as policy } from "@/data/policies/japan/2026";

const MAX_YEN = 1_000_000_000_000_000;
const amount = (input: Record<string, string>, key: string): number | undefined => {
  const value = Number((input[key] ?? "").replace(/,/g, "").trim());
  return (input[key] ?? "").trim() && Number.isFinite(value) && value >= 0 && value <= MAX_YEN ? value : undefined;
};
const invalid = (field: string): CalculatorOutcome => ({ error: "入力値を確認してください。", field });
const yen = (value: number) => Math.round(value);

export const calculateJapanConsumptionTax: CalculatorFunction = (input) => {
  const value = amount(input, input.mode === "inclusive" ? "gross" : "net");
  const rate = input.rate === "8" ? policy.consumptionTax.reduced : input.rate === "10" || !input.rate ? policy.consumptionTax.standard : undefined;
  if (!rate) return invalid("rate");
  if (value === undefined) return invalid(input.mode === "inclusive" ? "gross" : "net");
  const roundedInput = yen(value);
  if (input.mode === "inclusive") {
    const net = yen(roundedInput / (1 + rate));
    return { results: [{ label: "税抜価格", value: net, unit: "円" }, { label: "消費税", value: roundedInput - net, unit: "円" }, { label: "税込価格", value: roundedInput, unit: "円" }], note: "税込額を1円単位に丸めてから税抜額を逆算し、差額を消費税とします。" };
  }
  const tax = yen(roundedInput * rate);
  return { results: [{ label: "税抜価格", value: roundedInput, unit: "円" }, { label: "消費税", value: tax, unit: "円" }, { label: "税込価格", value: roundedInput + tax, unit: "円" }], note: "入力額と消費税をそれぞれ1円単位に四捨五入します。" };
};

function salaryIncomeDeduction(salary: number): number {
  const band = policy.payroll.salaryDeductions.find(({ max }) => salary <= max)!;
  return Math.min(salary, yen(salary * band.ratio + band.fixed));
}

export function calculateJapanPayrollAnnual(annualSalary: number, ageGroup: string) {
  const employmentIncome = Math.max(0, annualSalary - salaryIncomeDeduction(annualSalary));
  const care = ageGroup === "40plus" ? policy.payroll.careInsuranceEmployeeProxy : 0;
  const health = yen(annualSalary * policy.payroll.healthInsuranceEmployeeProxy);
  const pension = yen(annualSalary * policy.payroll.employeesPension);
  const employment = yen(annualSalary * policy.payroll.employmentInsuranceGeneral);
  const careInsurance = yen(annualSalary * care);
  const socialInsurance = health + pension + employment + careInsurance;
  const totalIncome = employmentIncome;
  const basicDeduction = policy.payroll.basicDeductions.find(({ maxIncome }) => totalIncome <= maxIncome)!.amount;
  const taxableIncome = Math.max(0, Math.floor((employmentIncome - socialInsurance - basicDeduction) / 1000) * 1000);
  const bracket = [...policy.payroll.incomeTaxBrackets].reverse().find(({ min }) => taxableIncome >= min)!;
  const incomeTax = yen(Math.max(0, taxableIncome * bracket.rate - bracket.deduction) * (1 + policy.payroll.reconstructionSurtax));
  // Resident tax is a simplified next-year estimate; personal deductions and municipal variance are omitted.
  const residentTaxBase = Math.max(0, employmentIncome - 430_000 - socialInsurance);
  const residentTax = yen(residentTaxBase * policy.payroll.residentIncomeRate) + (residentTaxBase > 0 ? policy.payroll.residentFlatLevy : 0);
  return { employmentIncome, health, pension, employment, careInsurance, socialInsurance, incomeTax, residentTax, totalDeductions: socialInsurance + incomeTax + residentTax, takeHome: Math.max(0, annualSalary - socialInsurance - incomeTax - residentTax) };
}

export const calculateJapanAnnualSalary: CalculatorFunction = (input) => {
  const salary = amount(input, "annualSalary");
  if (salary === undefined) return invalid("annualSalary");
  const result = calculateJapanPayrollAnnual(salary, input.ageGroup ?? "under40");
  return { results: [
    { label: "給与所得控除後の所得", value: result.employmentIncome, unit: "円" },
    { label: "所得税（復興特別所得税を含む推定）", value: result.incomeTax, unit: "円" },
    { label: "住民税（翌年度の簡易推定）", value: result.residentTax, unit: "円" },
    { label: "社会保険料（概算）", value: result.socialInsurance, unit: "円" },
    { label: "控除合計", value: result.totalDeductions, unit: "円" },
    { label: "年間手取り目安", value: result.takeHome, unit: "円" },
    { label: "月平均手取り目安", value: yen(result.takeHome / 12), unit: "円" },
  ], note: "2026年分の概算です。健康保険料は本人負担5%の仮定、40歳以上は介護保険料0.8%を加算。扶養・地域・標準報酬月額・賞与等は個別計算していません。" };
};

export const calculateJapanMonthlySalary: CalculatorFunction = (input) => {
  const monthly = amount(input, "monthlySalary");
  if (monthly === undefined || monthly > MAX_YEN / 12) return invalid("monthlySalary");
  const annualized = monthly * 12;
  const annual = calculateJapanPayrollAnnual(annualized, input.ageGroup ?? "under40");
  return { results: [
    { label: "年換算総支給額", value: yen(annualized), unit: "円" },
    { label: "月平均所得税", value: yen(annual.incomeTax / 12), unit: "円" },
    { label: "月平均住民税（翌年度の簡易推定）", value: yen(annual.residentTax / 12), unit: "円" },
    { label: "月平均社会保険料", value: yen(annual.socialInsurance / 12), unit: "円" },
    { label: "月平均控除合計", value: yen(annual.totalDeductions / 12), unit: "円" },
    { label: "月給手取り目安", value: yen(annual.takeHome / 12), unit: "円" },
  ], note: "月給を12倍して年額推定を行い、各項目を12で割った月平均です。賞与、扶養、地域差、個人の保険条件は反映しません。" };
};

function wage(input: Record<string, string>): number | undefined {
  if (input.wageMode === "monthly") {
    const monthly = amount(input, "monthlySalary");
    const hours = amount(input, "monthlyHours");
    return monthly !== undefined && hours !== undefined && hours > 0 ? monthly / hours : undefined;
  }
  return amount(input, "hourlyWage");
}
function wageInvalidField(input: Record<string, string>) { return input.wageMode === "monthly" ? "monthlySalary" : "hourlyWage"; }

export const calculateJapanOvertimePay: CalculatorFunction = (input) => {
  const baseWage = wage(input);
  const hours = amount(input, "overtimeHours");
  const over60 = amount(input, "over60Hours") ?? 0;
  const overtimeRate = amount(input, "overtimeRate");
  if (baseWage === undefined) return invalid(wageInvalidField(input));
  if (hours === undefined) return invalid("overtimeHours");
  if (input.over60Hours && amount(input, "over60Hours") === undefined) return invalid("over60Hours");
  if (overtimeRate === undefined || overtimeRate > 200) return invalid("overtimeRate");
  const basePay = yen(baseWage * (hours + over60));
  const premium = yen(baseWage * (hours * overtimeRate / 100 + over60 * Math.max(50, overtimeRate) / 100));
  return { results: [{ label: "時間外労働の基本賃金分", value: basePay, unit: "円" }, { label: "割増賃金分", value: premium, unit: "円" }, { label: "残業代合計目安", value: basePay + premium, unit: "円" }], note: "月60時間を超える部分は50%以上の割増率で計算します。入力した割増率が50%を超える場合はその率を使用します。" };
};

export const calculateJapanNightHolidayPay: CalculatorFunction = (input) => {
  const baseWage = wage(input);
  if (baseWage === undefined) return invalid(wageInvalidField(input));
  const keys = ["overtimeHours", "over60Hours", "nightOnlyHours", "holidayHours", "overtimeNightHours", "over60NightHours", "holidayNightHours"] as const;
  const values = Object.fromEntries(keys.map((key) => [key, amount(input, key) ?? 0])) as Record<(typeof keys)[number], number>;
  for (const key of keys) if (input[key] && amount(input, key) === undefined) return invalid(key);
  const overtimeRate = amount(input, "overtimeRate");
  const nightRate = amount(input, "nightRate");
  const holidayRate = amount(input, "holidayRate");
  if (overtimeRate === undefined || nightRate === undefined || holidayRate === undefined || overtimeRate > 200 || nightRate > 200 || holidayRate > 200) return invalid("overtimeRate");
  const ordinaryHours = values.overtimeHours + values.over60Hours + values.nightOnlyHours + values.holidayHours + values.overtimeNightHours + values.over60NightHours + values.holidayNightHours;
  const basePay = yen(baseWage * ordinaryHours);
  const overtimePremium = yen(baseWage * (overtimeRate / 100 * (values.overtimeHours + values.overtimeNightHours) + Math.max(50, overtimeRate) / 100 * (values.over60Hours + values.over60NightHours)));
  const nightPremium = yen(baseWage * nightRate / 100 * (values.nightOnlyHours + values.overtimeNightHours + values.over60NightHours + values.holidayNightHours));
  const holidayPremium = yen(baseWage * holidayRate / 100 * (values.holidayHours + values.holidayNightHours));
  const premium = overtimePremium + nightPremium + holidayPremium;
  return { results: [{ label: "基本賃金分", value: basePay, unit: "円" }, { label: "時間外割増分", value: overtimePremium, unit: "円" }, { label: "深夜割増分", value: nightPremium, unit: "円" }, { label: "法定休日割増分", value: holidayPremium, unit: "円" }, { label: "割増合計", value: premium, unit: "円" }, { label: "手当合計目安", value: basePay + premium, unit: "円" }], note: "深夜時間を時間外・休日の該当時間にも入力すると割増を加算します。法定休日労働は通常の時間外割増と区分し、深夜割増は重ねて加算します。月60時間超の時間外分は50%以上です。" };
};
