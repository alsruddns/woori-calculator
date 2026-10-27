import type { CountryRateConfig } from "./types";
export const spainRates: CountryRateConfig = {
  countryCode: "ES", countryName: "Spain", currency: "EUR", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 21, socialEmployeeRate: 6.48,
  sources: [{ name: "Agencia Tributaria — VAT rates 2026", url: "https://www3.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html", checkedAt: "2026-10-27" }, { name: "Agencia Tributaria — IRPF withholding 2026", url: "https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml" }],
  notes: "IRPF depends on autonomous-community rules and personal circumstances. Salary estimates use the entered effective IRPF rate and a simplified employee contribution assumption. Severance depends on dismissal reason and contract dates; select the applicable legal days-per-year assumption.",
};
