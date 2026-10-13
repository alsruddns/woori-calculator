import type { CountryRateConfig } from "./types";
export const vietnamRates: CountryRateConfig = {
  countryCode: "VN", countryName: "Vietnam", currency: "VND", policyYear: 2026, updatedAt: "2026-10-13", socialEmployeeRate: 10.5,
  annualPersonalAllowance: 186000000,
  annualTaxBrackets: [{ upTo: 120000000, rate: 5 }, { upTo: 360000000, rate: 10 }, { upTo: 720000000, rate: 20 }, { upTo: 1200000000, rate: 30 }, { upTo: Infinity, rate: 35 }],
  sources: [{ name: "Vietnam Government — 2026 personal income tax brackets", url: "https://xaydungchinhsach.chinhphu.vn/chi-tiet-bieu-thue-thu-nhap-ca-nhan-luy-tien-tung-phan-119260327091407544.htm" }, { name: "Vietnam Government — Personal Income Tax Law 109/2025/QH15", url: "https://xaydungchinhsach.chinhphu.vn/gioi-thieu-luat-thue-thu-nhap-ca-nhan-so-109-2025-qh15-119260123145437408.htm" }, { name: "Vietnam Social Security", url: "https://baohiemxahoi.gov.vn/" }],
  notes: "2026 resident wage PIT brackets apply to annual taxable income after deductions; the monthly personal deduction is VND 15.5 million and the dependent deduction is VND 6.2 million per person. Payroll social contributions are an indicative employee-side illustration and subject to insured wage bases and ceilings.",
};
