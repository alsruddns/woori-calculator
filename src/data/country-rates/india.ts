import type { CountryRateConfig } from "./types";
export const indiaRates: CountryRateConfig = {
  countryCode: "IN", countryName: "India", currency: "INR", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 18,
  annualTaxBrackets: [{ upTo: 400000, rate: 0 }, { upTo: 800000, rate: 5 }, { upTo: 1200000, rate: 10 }, { upTo: 1600000, rate: 15 }, { upTo: 2000000, rate: 20 }, { upTo: 2400000, rate: 25 }, { upTo: Infinity, rate: 30 }],
  sources: [{ name: "Income Tax Department — AY 2026–27 tax rates", url: "https://www.incometaxindia.gov.in/w/tax-rates-and-computation" }, { name: "CBIC — GST rates", url: "https://cbic-gst.gov.in/hindi/gst-goods-services-rates.html" }, { name: "India Post — Savings schemes and PPF rate", url: "https://www.indiapost.gov.in/banking-services/savings" }, { name: "Department of Economic Affairs — Small savings rates", url: "https://dea.gov.in/budget-division/475" }],
  notes: "Income tax uses the new-regime AY 2026–27 slab schedule and section 87A rebate simplification; special-rate income and surcharge are excluded. GST depends on HSN/service classification. SIP, PPF and NPS projections are return scenarios, not guaranteed returns or tax calculations. PPF rates reset quarterly; enter the current notified rate.",
};
