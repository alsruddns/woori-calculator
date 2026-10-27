import { calculateCountrySpecific } from "@/calculators/policy/country-specific";
import { countryRates } from "@/data/country-rates";
import { createCalculatorPage } from "@/data/calculator-content/create-page";
import type { CalculatorField, CalculatorPageDefinition } from "@/types/calculator-page";
import { calculatorExample } from "@/lib/content-quality/examples";

type Row = { slug: string; code: string; type: string; en: string; ko: string; related: string[] };
const rows: Row[] = [
  { slug: "germany-gross-net-salary-calculator", code: "DE", type: "salary", en: "Germany Gross to Net Salary Calculator", ko: "독일 세전·세후 급여 계산기", related: ["germany-income-tax-calculator", "germany-vat-calculator"] },
  { slug: "germany-income-tax-calculator", code: "DE", type: "incomeTax", en: "Germany Income Tax Calculator", ko: "독일 소득세 계산기", related: ["germany-gross-net-salary-calculator", "germany-vat-calculator"] },
  { slug: "germany-vat-calculator", code: "DE", type: "vat", en: "Germany VAT Calculator", ko: "독일 부가가치세 계산기", related: ["germany-income-tax-calculator", "germany-gross-net-salary-calculator"] },
  { slug: "germany-overtime-pay-calculator", code: "DE", type: "overtime", en: "Germany Overtime Pay Calculator", ko: "독일 초과근무수당 계산기", related: ["germany-gross-net-salary-calculator", "germany-vacation-pay-calculator"] },
  { slug: "germany-vacation-pay-calculator", code: "DE", type: "vacation", en: "Germany Vacation Bonus Calculator", ko: "독일 휴가 보너스 계산기", related: ["germany-gross-net-salary-calculator", "germany-overtime-pay-calculator"] },
  { slug: "spain-gross-net-salary-calculator", code: "ES", type: "salary", en: "Spain Gross to Net Salary Calculator", ko: "스페인 세전·세후 급여 계산기", related: ["spain-irpf-calculator", "spain-vat-calculator"] },
  { slug: "spain-irpf-calculator", code: "ES", type: "incomeTax", en: "Spain IRPF Calculator", ko: "스페인 IRPF 소득세 계산기", related: ["spain-gross-net-salary-calculator", "spain-vat-calculator"] },
  { slug: "spain-vat-calculator", code: "ES", type: "vat", en: "Spain VAT (IVA) Calculator", ko: "스페인 IVA 부가가치세 계산기", related: ["spain-gross-net-salary-calculator", "spain-irpf-calculator"] },
  { slug: "spain-severance-pay-calculator", code: "ES", type: "severance", en: "Spain Severance Pay Calculator", ko: "스페인 퇴직금 계산기", related: ["spain-gross-net-salary-calculator", "spain-irpf-calculator"] },
  { slug: "france-gross-net-salary-calculator", code: "FR", type: "salary", en: "France Gross to Net Salary Calculator", ko: "프랑스 세전·세후 급여 계산기", related: ["france-income-tax-calculator", "france-vat-calculator"] },
  { slug: "france-income-tax-calculator", code: "FR", type: "incomeTax", en: "France Income Tax Calculator", ko: "프랑스 소득세 계산기", related: ["france-gross-net-salary-calculator", "france-overtime-pay-calculator"] },
  { slug: "france-vat-calculator", code: "FR", type: "vat", en: "France VAT (TVA) Calculator", ko: "프랑스 TVA 부가가치세 계산기", related: ["france-income-tax-calculator", "france-gross-net-salary-calculator"] },
  { slug: "france-overtime-pay-calculator", code: "FR", type: "overtime", en: "France Overtime Pay Calculator", ko: "프랑스 초과근무수당 계산기", related: ["france-gross-net-salary-calculator", "france-income-tax-calculator"] },
  { slug: "netherlands-gross-net-salary-calculator", code: "NL", type: "salary", en: "Netherlands Gross to Net Salary Calculator", ko: "네덜란드 세전·세후 급여 계산기", related: ["netherlands-30-percent-ruling-calculator", "netherlands-holiday-allowance-calculator"] },
  { slug: "netherlands-vat-calculator", code: "NL", type: "vat", en: "Netherlands VAT (BTW) Calculator", ko: "네덜란드 BTW 부가가치세 계산기", related: ["netherlands-gross-net-salary-calculator", "netherlands-holiday-allowance-calculator"] },
  { slug: "netherlands-30-percent-ruling-calculator", code: "NL", type: "ruling", en: "Netherlands 30% Ruling Calculator", ko: "네덜란드 30% 룰링 계산기", related: ["netherlands-gross-net-salary-calculator", "netherlands-holiday-allowance-calculator"] },
  { slug: "netherlands-holiday-allowance-calculator", code: "NL", type: "holiday", en: "Netherlands Holiday Allowance Calculator", ko: "네덜란드 휴가수당 계산기", related: ["netherlands-gross-net-salary-calculator", "netherlands-30-percent-ruling-calculator"] },
  { slug: "india-gst-calculator", code: "IN", type: "vat", en: "India GST Calculator", ko: "인도 GST 계산기", related: ["india-gross-net-salary-calculator", "india-income-tax-calculator", "india-sip-calculator"] },
  { slug: "india-sip-calculator", code: "IN", type: "investment", en: "India SIP Calculator", ko: "인도 SIP 적립식 투자 계산기", related: ["india-ppf-calculator", "india-nps-calculator", "india-gst-calculator"] },
  { slug: "india-ppf-calculator", code: "IN", type: "investment", en: "India PPF Calculator", ko: "인도 PPF 계산기", related: ["india-sip-calculator", "india-nps-calculator", "india-income-tax-calculator"] },
  { slug: "india-nps-calculator", code: "IN", type: "investment", en: "India NPS Calculator", ko: "인도 NPS 연금 계산기", related: ["india-sip-calculator", "india-ppf-calculator", "india-gross-net-salary-calculator"] },
  { slug: "india-gross-net-salary-calculator", code: "IN", type: "salary", en: "India Gross to Net Salary Calculator", ko: "인도 세전·세후 급여 계산기", related: ["india-income-tax-calculator", "india-nps-calculator", "india-gst-calculator"] },
  { slug: "india-income-tax-calculator", code: "IN", type: "incomeTax", en: "India Income Tax Calculator", ko: "인도 소득세 계산기", related: ["india-gross-net-salary-calculator", "india-ppf-calculator", "india-nps-calculator"] },
  { slug: "brazil-gross-net-salary-calculator", code: "BR", type: "salary", en: "Brazil Gross to Net Salary Calculator", ko: "브라질 세전·세후 급여 계산기", related: ["brazil-inss-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator"] },
  { slug: "brazil-inss-calculator", code: "BR", type: "contribution", en: "Brazil INSS Calculator", ko: "브라질 INSS 사회보장기여금 계산기", related: ["brazil-gross-net-salary-calculator", "brazil-irrf-calculator"] },
  { slug: "brazil-irrf-calculator", code: "BR", type: "incomeTax", en: "Brazil IRRF Calculator", ko: "브라질 IRRF 원천징수세 계산기", related: ["brazil-gross-net-salary-calculator", "brazil-inss-calculator"] },
  { slug: "brazil-fgts-calculator", code: "BR", type: "fund", en: "Brazil FGTS Calculator", ko: "브라질 FGTS 적립금 계산기", related: ["brazil-gross-net-salary-calculator", "brazil-thirteenth-salary-calculator"] },
  { slug: "brazil-thirteenth-salary-calculator", code: "BR", type: "thirteenth", en: "Brazil 13th Salary Calculator", ko: "브라질 13월 급여 계산기", related: ["brazil-gross-net-salary-calculator", "brazil-fgts-calculator"] },
  { slug: "vietnam-gross-net-salary-calculator", code: "VN", type: "salary", en: "Vietnam Gross to Net Salary Calculator", ko: "베트남 세전·세후 급여 계산기", related: ["vietnam-personal-income-tax-calculator", "vietnam-social-insurance-calculator"] },
  { slug: "vietnam-personal-income-tax-calculator", code: "VN", type: "incomeTax", en: "Vietnam Personal Income Tax Calculator", ko: "베트남 개인소득세 계산기", related: ["vietnam-gross-net-salary-calculator", "vietnam-social-insurance-calculator"] },
  { slug: "vietnam-social-insurance-calculator", code: "VN", type: "contribution", en: "Vietnam Social Insurance Calculator", ko: "베트남 사회보험료 계산기", related: ["vietnam-gross-net-salary-calculator", "vietnam-personal-income-tax-calculator"] },
  { slug: "china-gross-net-salary-calculator", code: "CN", type: "salary", en: "China Gross to Net Salary Calculator", ko: "중국 세전·세후 급여 계산기", related: ["china-individual-income-tax-calculator", "china-social-insurance-calculator", "china-vat-calculator"] },
  { slug: "china-individual-income-tax-calculator", code: "CN", type: "incomeTax", en: "China Individual Income Tax Calculator", ko: "중국 개인소득세 계산기", related: ["china-gross-net-salary-calculator", "china-social-insurance-calculator"] },
  { slug: "china-social-insurance-calculator", code: "CN", type: "contribution", en: "China Social Insurance Calculator", ko: "중국 사회보험료 계산기", related: ["china-gross-net-salary-calculator", "china-individual-income-tax-calculator"] },
  { slug: "china-vat-calculator", code: "CN", type: "vat", en: "China VAT Calculator", ko: "중국 증치세 계산기", related: ["china-gross-net-salary-calculator", "china-individual-income-tax-calculator"] },
  { slug: "taiwan-gross-net-salary-calculator", code: "TW", type: "salary", en: "Taiwan Gross to Net Salary Calculator", ko: "대만 세전·세후 급여 계산기", related: ["taiwan-income-tax-calculator", "taiwan-labor-insurance-calculator", "taiwan-vat-calculator"] },
  { slug: "taiwan-income-tax-calculator", code: "TW", type: "incomeTax", en: "Taiwan Income Tax Calculator", ko: "대만 종합소득세 계산기", related: ["taiwan-gross-net-salary-calculator", "taiwan-labor-insurance-calculator"] },
  { slug: "taiwan-labor-insurance-calculator", code: "TW", type: "contribution", en: "Taiwan Labor Insurance Calculator", ko: "대만 노동보험료 계산기", related: ["taiwan-gross-net-salary-calculator", "taiwan-income-tax-calculator"] },
  { slug: "taiwan-vat-calculator", code: "TW", type: "vat", en: "Taiwan VAT Calculator", ko: "대만 영업세 계산기", related: ["taiwan-gross-net-salary-calculator", "taiwan-income-tax-calculator"] },
  { slug: "italy-gross-net-salary-calculator", code: "IT", type: "salary", en: "Italy Gross to Net Salary Calculator", ko: "이탈리아 세전·세후 급여 계산기", related: ["italy-income-tax-calculator", "italy-vat-calculator"] },
  { slug: "italy-income-tax-calculator", code: "IT", type: "incomeTax", en: "Italy Income Tax (IRPEF) Calculator", ko: "이탈리아 IRPEF 소득세 계산기", related: ["italy-gross-net-salary-calculator", "italy-vat-calculator"] },
  { slug: "italy-vat-calculator", code: "IT", type: "vat", en: "Italy VAT (IVA) Calculator", ko: "이탈리아 IVA 부가가치세 계산기", related: ["italy-gross-net-salary-calculator", "italy-income-tax-calculator"] },
];

const currency = (code: string) => countryRates[code]!.currency;
function fieldsFor(row: Row): CalculatorField[] {
  const unit = currency(row.code);
  const amount = (name: string, label: string, defaultValue?: string) => ({ name, label, type: "number" as const, min: 0, step: 0.01, unit, ...(defaultValue ? { defaultValue } : {}) });
  const percentage = (name: string, label: string, value: number) => ({ name, label, type: "number" as const, min: 0, max: 100, step: 0.01, unit: "%", defaultValue: String(value) });
  if (row.type === "vat") return [amount("amount", "Amount", "100"), { name: "direction", label: "Calculation direction", type: "select", defaultValue: "exclusive", options: [{ label: "Add tax", value: "exclusive" }, { label: "Extract tax", value: "inclusive" }] }, percentage("rate", "Tax rate", countryRates[row.code]!.vatRate ?? 0)];
  if (row.type === "overtime") return [amount("salary", "Base hourly wage", "20"), amount("hours", "Overtime hours", "8"), { name: "multiplier", label: "Pay multiplier", type: "number", min: 0, max: 5, step: 0.01, defaultValue: "1.5" }];
  if (row.type === "vacation") return [amount("salary", "Annual base salary", "50000"), percentage("rate", "Employer-agreed allowance rate", 5)];
  if (row.type === "severance") return [amount("salary", "Gross monthly salary", "2500"), { name: "years", label: "Service years", type: "number", min: 0, max: 60, step: 0.1, defaultValue: "5" }, { name: "daysPerYear", label: "Compensation days per year", type: "select", defaultValue: "20", options: [{ label: "12 days", value: "12" }, { label: "20 days", value: "20" }, { label: "33 days", value: "33" }] }];
  if (row.type === "investment") return [amount("monthlyDeposit", "Monthly contribution", "10000"), percentage("rate", "Assumed annual return", row.slug.includes("ppf") ? 7.1 : 8), { name: "years", label: "Investment years", type: "number", min: 1, max: 60, step: 1, defaultValue: row.slug.includes("ppf") ? "15" : "20" }];
  if (row.type === "ruling") return [amount("salary", "Gross annual salary", "80000"), percentage("rate", "Tax-free share", 30)];
  if (row.type === "holiday") return [amount("salary", "Annual gross wages", "50000"), percentage("rate", "Holiday allowance rate", 8)];
  if (row.type === "fund") return [amount("salary", "Monthly gross salary", "3000")];
  if (row.type === "thirteenth") return [amount("salary", "Monthly gross salary", "3000"), { name: "months", label: "Eligible months worked", type: "number", min: 0, max: 12, step: 1, defaultValue: "12" }];
  if (row.type === "contribution") return [amount("salary", "Monthly contribution base", "3000"), percentage("rate", "Employee contribution rate", countryRates[row.code]!.socialEmployeeRate ?? 0)];
  if (row.slug === "brazil-irrf-calculator") return [amount("salary", "Monthly gross salary", "5000")];
  if (row.type === "incomeTax") return [amount("income", "Annual taxable income", "50000"), ...(countryRates[row.code]!.annualTaxBrackets ? [] : [percentage("rate", "Estimated effective tax rate", 15)])];
  return [amount("salary", "Gross salary", "50000"), { name: "frequency", label: "Pay frequency", type: "select", defaultValue: "annual", options: [{ label: "Annual", value: "annual" }, { label: "Monthly", value: "monthly" }] }, percentage("socialRate", "Employee contribution assumption", countryRates[row.code]!.socialEmployeeRate ?? 0), ...(!countryRates[row.code]!.annualTaxBrackets ? [percentage("taxRate", "Estimated effective income tax rate", row.code === "ES" ? 15 : row.code === "VN" ? 10 : 15)] : [])];
}

export const countrySpecificCalculatorPages: readonly CalculatorPageDefinition[] = rows.map((row) => {
  const rate = countryRates[row.code]!;
  const fields = fieldsFor(row);
  const countryDescription = `${row.en} for ${rate.countryName}. Estimates use ${rate.policyYear} reference assumptions; country-specific rules, personal status and regional variations apply.`;
  const related = row.related;
  return createCalculatorPage({
    slug: row.slug, name: row.en, shortName: row.en, title: `${row.en} (${rate.policyYear})`, description: countryDescription,
    keywords: [row.en, `${rate.countryName} calculator`, row.type === "vat" ? `${rate.countryName} VAT rate` : `${rate.countryName} ${row.type.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)}`],
    category: row.type === "vat" ? "tax" : row.type === "incomeTax" ? "tax" : row.type === "investment" ? "finance" : "salary",
    countryCode: rate.countryCode, countryName: rate.countryName, countrySpecific: true, policyType: "POLICY", policyYear: rate.policyYear, updatedAt: rate.updatedAt,
    relatedCalculatorIds: related, fields, calculate: (input) => calculateCountrySpecific(row.slug, input) ?? { error: "Check the entered values." },
    howTo: `Enter the requested amount and options. This calculator applies ${rate.countryName} reference rules; changing the page language does not change the country basis.`,
    formula: row.type === "vat" ? "Tax = taxable amount × selected rate; total = base + tax. For tax-inclusive input, base = total ÷ (1 + rate)." : "Results follow the displayed inputs and assumptions. Annual and monthly amounts are converted consistently where applicable.",
    example: { question: `How is a ${rate.countryName} estimate calculated?`, answer: "Enter a representative amount to see the estimate, itemized components and stated assumptions." },
    notes: [rate.notes], faqs: [{ question: "Does changing locale change the calculation country?", answer: `No. The interface language may change, but the calculation remains based on ${rate.countryName}.` }, { question: "Is this an official payroll or tax determination?", answer: "No. This is an estimate. Verify current rules and individual circumstances with the relevant authority or a qualified professional." }],
    sources: rate.sources.map((source) => ({ ...source })),
  });
}).map((page) => {
  const example = calculatorExample(page, "en");
  const inputs = page.fields.map((field) => field.label).join(", ");
  return {
    ...page,
    howTo: `${page.name} uses ${inputs}. Check the ${page.policyYear} reference year and the source notes before comparing the estimate with a payslip, tax bill or account statement.`,
    example: example ? { question: `What does ${page.name} return for ${example.input}?`, answer: `${example.result}. This is an estimate using the shown inputs and the ${page.policyYear} reference assumptions.` } : page.example,
    faqs: [{ question: `Which inputs affect ${page.name}?`, answer: `This calculation uses ${inputs}. Only the fields shown on this page are included; personal or regional factors outside these inputs may change the actual outcome.` }, page.faqs[1]!],
  };
});

export const countrySpecificCalculatorSlugs = rows.map(({ slug }) => slug);
