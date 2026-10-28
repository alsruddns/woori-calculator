import { countryRates } from "@/data/country-rates";
import type { CalculatorOutcome } from "@/types/calculator-page";

const number = (input: Record<string, string>, key: string, fallback = 0) => {
  const value = Number((input[key] ?? "").replace(/,/g, "").trim());
  return Number.isFinite(value) ? value : fallback;
};
const fail = (field: string, message = "Enter valid non-negative values."): CalculatorOutcome => ({ error: message, field });
const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const valid = (value: number) => Number.isFinite(value) && value >= 0;
const progressive = (income: number, brackets: readonly { upTo: number; rate: number }[]) => {
  let tax = 0;
  let floor = 0;
  for (const bracket of brackets) {
    const portion = Math.max(0, Math.min(income, bracket.upTo) - floor);
    tax += portion * bracket.rate / 100;
    floor = bracket.upTo;
    if (income <= bracket.upTo) break;
  }
  return tax;
};
const germanTax = (rawIncome: number) => {
  const x = Math.floor(rawIncome);
  if (x <= 12348) return 0;
  if (x <= 17799) { const y = (x - 12348) / 10000; return (914.51 * y + 1400) * y; }
  if (x <= 69878) { const z = (x - 17799) / 10000; return (173.10 * z + 2397) * z + 1034.87; }
  if (x <= 277825) return 0.42 * x - 11135.63;
  return 0.45 * x - 19470.38;
};
const brazilInss = (monthly: number) => {
  const caps = [1621, 2902.84, 4354.27, 8475.55];
  const rates = [0.075, 0.09, 0.12, 0.14];
  let result = 0;
  let floor = 0;
  for (let i = 0; i < caps.length; i += 1) {
    const top = caps[i]!;
    result += Math.max(0, Math.min(monthly, top) - floor) * rates[i]!;
    floor = top;
    if (monthly <= top) break;
  }
  return Math.min(result, 8475.55 * 0.14);
};
const brazilIrrf = (base: number) => {
  const rows = [{ max: 2428.8, deduction: 0, rate: 0 }, { max: 2826.65, deduction: 182.16, rate: 7.5 }, { max: 3751.05, deduction: 394.16, rate: 15 }, { max: 4664.68, deduction: 675.49, rate: 22.5 }, { max: Infinity, deduction: 908.73, rate: 27.5 }];
  const row = rows.find(({ max }) => base <= max)!;
  const due = Math.max(0, base * row.rate / 100 - row.deduction);
  const relief = base <= 5000 ? due : base <= 7350 ? Math.max(0, 978.62 - 0.133145 * base) : 0;
  return Math.max(0, due - relief);
};

export function calculateCountrySpecific(slug: string, input: Record<string, string>): CalculatorOutcome | undefined {
  const countryPrefix: Record<string, string> = { germany: "DE", spain: "ES", france: "FR", netherlands: "NL", india: "IN", brazil: "BR", vietnam: "VN", china: "CN", taiwan: "TW", italy: "IT" };
  const page = countryRates[countryPrefix[slug.split("-")[0]!] ?? ""];
  if (!page) return undefined;
  const required = slug.endsWith("-vat-calculator") || slug.endsWith("-gst-calculator") ? "amount" : slug.endsWith("-income-tax-calculator") || slug.endsWith("-irpf-calculator") || slug.endsWith("-irrf-calculator") || slug.endsWith("-personal-income-tax-calculator") || slug.endsWith("-individual-income-tax-calculator") ? (slug.endsWith("-irrf-calculator") ? "salary" : "income") : slug.endsWith("-sip-calculator") || slug.endsWith("-ppf-calculator") || slug.endsWith("-nps-calculator") ? "monthlyDeposit" : "salary";
  if (!input[required]?.trim()) return fail(required);
  const amountKey = ["amount", "salary", "income", "monthlyDeposit"].find((key) => input[key]?.trim());
  const amount = amountKey ? number(input, amountKey) : 0;
  if (!valid(amount)) return fail("amount");
  const make = (results: { label: string; value: number; unit?: string }[], note?: string): CalculatorOutcome => ({ results: results.map((result) => ({ ...result, value: round(result.value) })), ...(note ? { note } : {}) });
  const country = page.countryCode;

  if (slug.endsWith("-vat-calculator") || slug.endsWith("-gst-calculator")) {
    const rate = number(input, "rate", page.vatRate ?? 0);
    if (!valid(amount) || !valid(rate) || rate > 100) return fail("rate");
    const inclusive = input.direction === "inclusive";
    const net = inclusive ? amount / (1 + rate / 100) : amount;
    const tax = inclusive ? amount - net : amount * rate / 100;
    return make([{ label: "Tax-exclusive amount", value: net, unit: page.currency }, { label: "Tax", value: tax, unit: page.currency }, { label: "Tax-inclusive total", value: net + tax, unit: page.currency }], "The applicable rate depends on the product/service classification and local rules.");
  }
  if (slug.endsWith("-overtime-pay-calculator")) {
    const hours = number(input, "hours"); const multiplier = number(input, "multiplier", 1.5);
    if (!valid(amount) || !valid(hours) || !valid(multiplier) || multiplier > 5) return fail("hours");
    const pay = amount * hours * multiplier;
    return make([{ label: "Base pay", value: amount * hours, unit: page.currency }, { label: "Overtime premium", value: pay - amount * hours, unit: page.currency }, { label: "Estimated overtime pay", value: pay, unit: page.currency }]);
  }
  if (slug.endsWith("-vacation-pay-calculator") || slug.endsWith("-holiday-allowance-calculator")) {
    const rate = number(input, "rate", country === "NL" ? 8 : 0);
    if (!valid(amount) || !valid(rate) || rate > 100) return fail("rate");
    return make([{ label: "Annual base pay", value: amount, unit: page.currency }, { label: "Allowance rate", value: rate }, { label: "Estimated allowance", value: amount * rate / 100, unit: page.currency }], country === "DE" ? "Germany has no generally fixed statutory vacation-bonus rate; enter the employer/collective-agreement amount as a percentage." : undefined);
  }
  if (slug.endsWith("-severance-pay-calculator")) {
    const years = number(input, "years"); const daysPerYear = number(input, "daysPerYear", 20);
    if (!valid(amount) || !valid(years) || !valid(daysPerYear) || daysPerYear > 45) return fail("years");
    const daily = amount * 12 / 365;
    return make([{ label: "Daily salary basis", value: daily, unit: page.currency }, { label: "Service years", value: years }, { label: "Estimated severance", value: daily * daysPerYear * years, unit: page.currency }], "Spanish severance depends on contract date and termination reason; this result applies only the selected days-per-year assumption.");
  }
  if (slug.endsWith("-sip-calculator") || slug.endsWith("-ppf-calculator") || slug.endsWith("-nps-calculator")) {
    const monthly = number(input, "monthlyDeposit", amount); const rate = number(input, "rate", 8); const years = number(input, "years", 10);
    if (![monthly, rate, years].every(valid) || years > 60 || rate > 100) return fail("years");
    const totalMonths = Math.round(years * 12); const monthlyRate = rate / 1200;
    const invested = monthly * totalMonths;
    const future = monthlyRate === 0 ? invested : monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    return make([{ label: "Total contributions", value: invested, unit: page.currency }, { label: "Estimated gains", value: future - invested, unit: page.currency }, { label: "Projected balance", value: future, unit: page.currency }], "Scenario math only. Returns are not guaranteed, and this projection does not calculate product-specific tax treatment.");
  }
  if (slug.endsWith("-30-percent-ruling-calculator")) {
    const rate = Math.min(30, number(input, "rate", 30)); const exempt = Math.min(amount * rate / 100, 78600);
    return make([{ label: "Gross annual salary", value: amount, unit: page.currency }, { label: "Potential tax-free allowance", value: exempt, unit: page.currency }, { label: "Taxable salary remainder", value: amount - exempt, unit: page.currency }], "Illustration only: eligibility, salary threshold, employer agreement and proportional annual cap apply. Dutch 2026 salary threshold: €48,013; maximum allowance: €78,600.");
  }
  if (slug.endsWith("-holiday-allowance-calculator")) return make([]);
  if (slug.endsWith("-fgts-calculator")) return make([{ label: "Monthly employer FGTS deposit", value: amount * 0.08, unit: page.currency }, { label: "Annual employer FGTS deposits", value: amount * 12 * 0.08, unit: page.currency }], "Employer deposit; it is not a deduction from take-home pay.");
  if (slug.endsWith("-thirteenth-salary-calculator")) {
    const months = number(input, "months", 12);
    if (months > 12) return fail("months");
    return make([{ label: "Gross 13th salary", value: amount * months / 12, unit: page.currency }, { label: "Eligible months", value: months }]);
  }
  if (slug.endsWith("-inss-calculator")) return make([{ label: "Estimated monthly INSS contribution", value: brazilInss(amount), unit: page.currency }]);
  if (slug.endsWith("-irrf-calculator")) return make([{ label: "Estimated monthly IRRF", value: brazilIrrf(Math.max(0, amount - brazilInss(amount))), unit: page.currency }], "Simplified monthly 2026 withholding estimate; dependents and other deductions are omitted.");
  if (slug.endsWith("-social-insurance-calculator") || slug.endsWith("-labor-insurance-calculator")) {
    const rate = number(input, "rate", page.socialEmployeeRate ?? 0);
    if (rate > 100) return fail("rate");
    return make([{ label: "Contribution base", value: amount, unit: page.currency }, { label: "Employee rate", value: rate }, { label: "Estimated employee contribution", value: amount * rate / 100, unit: page.currency }], "Rates and insured wage bases may vary by region, category and annual ceiling; enter the local applicable rate.");
  }
  if (slug.endsWith("-income-tax-calculator") || slug.endsWith("-irpf-calculator") || slug.endsWith("-personal-income-tax-calculator") || slug.endsWith("-individual-income-tax-calculator")) {
    let taxable = amount;
    if (country === "CN") taxable = Math.max(0, amount - 60000);
    let tax = country === "DE" ? germanTax(taxable) : page.annualTaxBrackets ? progressive(taxable, page.annualTaxBrackets) : taxable * number(input, "rate", 15) / 100;
    if (country === "IN" && taxable > 0) {
      const relief = Math.min(60000, tax, Math.max(0, tax - Math.max(0, taxable - 1200000)));
      tax -= relief;
    }
    return make([{ label: "Taxable annual income", value: taxable, unit: page.currency }, { label: "Estimated annual income tax", value: tax, unit: page.currency }, { label: "Average tax rate", value: taxable ? tax / taxable * 100 : 0 }], "Simplified estimate. Personal allowances, credits, local supplements, special income and individual circumstances are excluded.");
  }
  if (slug.endsWith("-gross-net-salary-calculator")) {
    const frequency = input.frequency === "monthly" ? 12 : 1;
    const annual = amount * frequency;
    const taxable = country === "CN" ? Math.max(0, annual - 60000) : country === "VN" ? Math.max(0, annual - (page.annualPersonalAllowance ?? 0)) : country === "IN" ? Math.max(0, annual - Math.min(annual, page.annualStandardDeduction ?? 0)) : annual;
    let incomeTax = country === "DE" ? germanTax(taxable) : page.annualTaxBrackets ? progressive(taxable, page.annualTaxBrackets) : annual * number(input, "taxRate", country === "ES" ? 15 : country === "VN" ? 10 : 15) / 100;
    if (country === "IN" && taxable > 0) incomeTax -= Math.min(60000, incomeTax, Math.max(0, incomeTax - Math.max(0, taxable - 1200000)));
    const social = annual * number(input, "socialRate", page.socialEmployeeRate ?? 0) / 100;
    return make([{ label: "Gross annual salary", value: annual, unit: page.currency }, { label: "Estimated income tax", value: incomeTax, unit: page.currency }, { label: "Estimated employee contributions", value: social, unit: page.currency }, { label: "Estimated annual take-home pay", value: annual - incomeTax - social, unit: page.currency }, { label: "Estimated monthly take-home pay", value: (annual - incomeTax - social) / 12, unit: page.currency }], "Indicative country-level estimate. Tax class/credits, local rules, contribution ceilings and individual deductions can materially change payroll results.");
  }
  return undefined;
}
