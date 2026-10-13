import type { CountryRateConfig } from "./types";
export const chinaRates: CountryRateConfig = {
  countryCode: "CN", countryName: "China", currency: "CNY", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 13,
  annualTaxBrackets: [{ upTo: 36000, rate: 3 }, { upTo: 144000, rate: 10 }, { upTo: 300000, rate: 20 }, { upTo: 420000, rate: 25 }, { upTo: 660000, rate: 30 }, { upTo: 960000, rate: 35 }, { upTo: Infinity, rate: 45 }],
  sources: [{ name: "State Taxation Administration — Individual income tax law", url: "https://www.chinatax.gov.cn/eng/c102962/c102967/c102997/c103004/c5245849/content.html" }, { name: "State Taxation Administration — VAT law and rates", url: "https://www.chinatax.gov.cn/eng/c101270/c101271/c5157953/content.html" }],
  notes: "The individual income-tax estimate uses annual comprehensive-income brackets after a basic RMB 60,000 deduction. Social-insurance rates and bases vary by city; enter the local employee rate and base. VAT category determines whether 13%, 9%, 6%, zero or exemption applies.",
};
