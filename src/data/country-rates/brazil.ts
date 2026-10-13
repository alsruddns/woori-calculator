import type { CountryRateConfig } from "./types";
export const brazilRates: CountryRateConfig = {
  countryCode: "BR", countryName: "Brazil", currency: "BRL", policyYear: 2026, updatedAt: "2026-10-13", employerFundRate: 8,
  sources: [{ name: "Receita Federal — 2026 income tax tables", url: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026" }, { name: "INSS — 2026 contribution table", url: "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal" }, { name: "FGTS — Employee deposits", url: "https://www.fgts.gov.br/Paginas/subpaginas/recolhimento-empregado.aspx" }],
  notes: "The INSS and IRRF calculators use official 2026 monthly employee tables. FGTS is an employer deposit (normally 8%) and is not deducted from employee take-home pay. The 13th salary estimate is gross and proportional to eligible months; payroll deductions are separate.",
};
