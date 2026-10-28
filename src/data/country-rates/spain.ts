import type { CountryRateConfig } from "./types";
export const spainRates: CountryRateConfig = {
  countryCode: "ES", countryName: "Spain", currency: "EUR", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 21, socialEmployeeRate: 6.48,
  sources: [
    { name: "Agencia Tributaria — VAT rates, checked 2026-10-28", url: "https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html", checkedAt: "2026-10-28" },
    { name: "BOE — VAT Act 37/1992, Articles 90–91, consolidated text", url: "https://www.boe.es/eli/es/l/1992/12/28/37/con", checkedAt: "2026-10-28" },
    { name: "BOE — Personal Income Tax Act 35/2006, Articles 63 and 74", url: "https://www.boe.es/eli/es/l/2006/11/28/35/con", checkedAt: "2026-10-28" },
    { name: "BOE — Workers' Statute, Articles 53 and 56 and transitional rules", url: "https://www.boe.es/eli/es/rdlg/2015/10/23/2/con", checkedAt: "2026-10-28" },
    { name: "Agencia Tributaria — IRPF withholding information", url: "https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml" },
  ],
  notes: "Spain VAT: the 21% general rate is confirmed for 2026; reduced rates and zero-rate operations are transaction-specific and the calculator only applies an entered rate. IRPF estimates multiply annual taxable income by one entered rate; statutory state/autonomous scales and personal circumstances are not modeled. Severance uses a user-entered days-per-year assumption and does not apply termination-specific rates, contract-date transitions or statutory caps. Currency selection changes display only and does not change the Spanish policy basis.",
};
