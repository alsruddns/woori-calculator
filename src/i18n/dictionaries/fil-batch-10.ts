import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { filPage } from "@/i18n/dictionaries/fil-batch-2";
import { sharedCountryResultLabelsFil } from "@/i18n/dictionaries/fil-batch-9";
import type { LocalizedCalculatorSlug } from "@/i18n/config";

export type CountryPageSpec = {
  country: "Germany" | "Spain" | "France" | "Netherlands" | "India" | "Brazil" | "Vietnam" | "China" | "Taiwan" | "Italy";
  name: string;
  title: string;
  description: string;
  keywords: readonly string[];
  howTo: string;
  formula: string;
  example: { question: string; answer: string };
  fields: Record<string, string>;
  options?: Record<string, Record<string, string>>;
  related: LocalizedCalculatorContent["related"];
};
export function countryPage(slug: LocalizedCalculatorSlug, spec: CountryPageSpec): LocalizedCalculatorContent {
  return filPage(slug, {
    ...spec,
    shortName: spec.name,
    results: sharedCountryResultLabelsFil,
    validation: "Ilagay ang mga positibo o hindi negatibong value na hinihingi ng kalkulasyon at tiyaking tama ang napiling option.",
    resultNote: spec.country + " ang policy basis. Hindi ito Philippine tax o employment calculation; i-verify ang policy year, personal details at opisyal na source.",
    faq: { question: "Nalalapat ba ang resultang ito sa Pilipinas?", answer: "Hindi. " + spec.country + " policy assumptions ang ginagamit; para sa Pilipinas, tingnan ang naaangkop na lokal na batas at opisyal na guidance." },
  });
}

export const filBatchTen: Record<string, LocalizedCalculatorContent> = {
  "germany-vacation-pay-calculator": countryPage("germany-vacation-pay-calculator", {
    country: "Germany", name: "Holiday allowance sa Germany", title: "Tantiyahin ang holiday allowance sa Germany",
    description: "Tantiyahin ang holiday allowance mula sa salary at allowance rate na inilagay mo.",
    keywords: ["Germany holiday allowance calculator", "German vacation pay estimate", "holiday pay Germany"],
    howTo: "Ilagay ang sahod na gagamiting base at ang allowance rate.",
    formula: "Tinatayang allowance = salary base × allowance rate ÷ 100.",
    example: { question: "Garantisado ba ang allowance ayon sa batas?", answer: "Hindi. Nakadepende ang aktuwal na holiday pay sa employment agreement at naaangkop na German rules." },
    fields: { salary: "Sahod na gagamiting base", rate: "Holiday allowance rate" },
    related: ["germany-gross-net-salary-calculator", "germany-overtime-pay-calculator", "salary-conversion"],
  }),
  "spain-gross-net-salary-calculator": countryPage("spain-gross-net-salary-calculator", {
    country: "Spain", name: "Gross at net salary sa Spain", title: "Tantiyahin ang take-home salary sa Spain",
    description: "Tantiyahin ang income tax, social contributions at net salary mula sa gross pay sa Spain.",
    keywords: ["Spain gross net salary calculator", "Spanish take home pay", "net salary estimate Spain"],
    howTo: "Ilagay ang gross salary period at rates na gagamiting estimate.",
    formula: "Tinatayang net pay = gross salary − income tax estimate − employee social contributions.",
    example: { question: "Eksaktong payroll result ba ito?", answer: "Hindi. Maaaring mag-iba ang resulta ayon sa rehiyon, kontrata, family status at kasalukuyang tax rules." },
    fields: { salary: "Gross salary bago kaltas", frequency: "Panahon ng sahod", socialRate: "Rate ng social contribution", taxRate: "Tinatayang income tax rate" },
    options: { frequency: { annual: "Taunang sahod", monthly: "Buwanang sahod" } },
    related: ["spain-irpf-calculator", "spain-vat-calculator", "salary-conversion"],
  }),
  "spain-irpf-calculator": countryPage("spain-irpf-calculator", {
    country: "Spain", name: "IRPF calculator sa Spain", title: "Tantiyahin ang Spanish IRPF withholding",
    description: "Tantiyahin ang IRPF withholding mula sa income at rate na inilagay mo.",
    keywords: ["Spain IRPF calculator", "IRPF withholding estimate", "Spanish income tax"],
    howTo: "Ilagay ang taxable income at withholding rate para sa sitwasyong sinusuri.",
    formula: "Tinatayang IRPF = taxable income × withholding rate ÷ 100.",
    example: { question: "Final tax liability ba ito?", answer: "Hindi. Withholding estimate ito; maaaring magkaiba ang final annual tax assessment." },
    fields: { income: "Income na pagbabatayan", rate: "IRPF withholding rate" },
    related: ["spain-gross-net-salary-calculator", "spain-vat-calculator", "percentage"],
  }),
  "spain-vat-calculator": countryPage("spain-vat-calculator", {
    country: "Spain", name: "VAT calculator sa Spain", title: "Kuwentahin ang VAT at kabuuang presyo sa Spain",
    description: "Kuwentahin ang tax-exclusive o tax-inclusive amount gamit ang inilagay na Spanish VAT rate.",
    keywords: ["Spain VAT calculator", "Spanish IVA calculator", "VAT price Spain"],
    howTo: "Piliin ang uri ng presyo, ilagay ang amount at ang naaangkop na Spanish VAT rate.",
    formula: "Tax-exclusive: VAT = net × rate. Tax-inclusive: VAT = gross × rate ÷ (1 + rate).",
    example: { question: "Pinipili ba nito ang VAT rate para sa produkto?", answer: "Hindi. Ikaw ang maglalagay ng rate; maaaring may reduced rate, exemption o ibang treatment." },
    fields: { amount: "Halaga ng presyo", direction: "Uri ng presyong inilagay", rate: "VAT rate sa Spain" },
    options: { direction: { exclusive: "Presyong wala pang VAT", inclusive: "Presyong kasama ang VAT" } },
    related: ["vat", "percentage", "spain-irpf-calculator"],
  }),
  "spain-severance-pay-calculator": countryPage("spain-severance-pay-calculator", {
    country: "Spain", name: "Severance calculator sa Spain", title: "Tantiyahin ang severance pay sa Spain",
    description: "Tantiyahin ang severance amount gamit ang salary, service years at days-per-year basis.",
    keywords: ["Spain severance pay calculator", "Spanish dismissal compensation", "severance estimate Spain"],
    howTo: "Ilagay ang salary base, years of service at applicable days-per-year figure.",
    formula: "Tinatayang severance = salary base kada araw × service years × days-per-year basis.",
    example: { question: "Legal na entitlement ba ang estimate?", answer: "Hindi. Depende ang aktuwal na compensation sa dahilan ng termination, kontrata at Spanish labor rules." },
    fields: { salary: "Salary na gagamiting base", years: "Taon ng serbisyo", daysPerYear: "Days-of-salary kada taon ng serbisyo" },
    options: { daysPerYear: { "12": "12 araw ng sahod kada taon", "20": "20 araw ng sahod kada taon", "33": "33 araw ng sahod kada taon" } },
    related: ["spain-gross-net-salary-calculator", "tenure", "salary-conversion"],
  }),
  "france-gross-net-salary-calculator": countryPage("france-gross-net-salary-calculator", {
    country: "France", name: "Gross at net salary sa France", title: "Tantiyahin ang take-home salary sa France",
    description: "Tantiyahin ang employee contributions at take-home pay mula sa gross salary sa France.",
    keywords: ["France gross net salary calculator", "French take home pay", "net salary estimate France"],
    howTo: "Ilagay ang gross salary, panahon nito at social contribution rate na gagamitin.",
    formula: "Tinatayang net pay = gross salary − estimated employee social contributions − tax estimate.",
    example: { question: "Eksaktong net salary ba ito?", answer: "Hindi. Maaaring mag-iba ayon sa employment status, contribution rules at indibiduwal na tax situation." },
    fields: { salary: "Gross salary bago kaltas", frequency: "Panahon ng sahod", socialRate: "Rate ng employee social contribution" },
    options: { frequency: { annual: "Taunang sahod", monthly: "Buwanang sahod" } },
    related: ["france-income-tax-calculator", "france-vat-calculator", "salary-conversion"],
  }),
  "france-income-tax-calculator": countryPage("france-income-tax-calculator", {
    country: "France", name: "Income tax calculator sa France", title: "Tantiyahin ang income tax sa France",
    description: "Tantiyahin ang French income tax gamit ang income na inilagay mo.",
    keywords: ["France income tax calculator", "French income tax estimate", "income tax France"],
    howTo: "Ilagay ang income na nais tantiyahin.",
    formula: "Tinatayang income tax = assessment ng income batay sa simplified French tax rules ng calculator.",
    example: { question: "Kasama ba ang lahat ng tax household details?", answer: "Hindi. Maaaring mag-iba ang tax ayon sa household composition, deductions at iba pang sitwasyon." },
    fields: { income: "Taunang taxable income" },
    related: ["france-gross-net-salary-calculator", "france-vat-calculator", "percentage"],
  }),
  "france-vat-calculator": countryPage("france-vat-calculator", {
    country: "France", name: "VAT calculator sa France", title: "Kuwentahin ang French VAT at kabuuang presyo",
    description: "Kuwentahin ang tax-exclusive o tax-inclusive price gamit ang rate na ilalagay mo para sa France.",
    keywords: ["France VAT calculator", "French TVA calculator", "VAT price France"],
    howTo: "Piliin ang uri ng presyo, ilagay ang amount at ang naaangkop na French VAT rate.",
    formula: "Tax-exclusive: VAT = net × rate. Tax-inclusive: VAT = gross × rate ÷ (1 + rate).",
    example: { question: "Awtomatiko bang natutukoy ang reduced rate?", answer: "Hindi. Ilagay ang rate na naaangkop sa produkto at beripikahin ang French tax treatment." },
    fields: { amount: "Halaga ng presyo", direction: "Uri ng presyong inilagay", rate: "VAT rate sa France" },
    options: { direction: { exclusive: "Presyong wala pang VAT", inclusive: "Presyong kasama ang VAT" } },
    related: ["vat", "percentage", "france-income-tax-calculator"],
  }),
  "france-overtime-pay-calculator": countryPage("france-overtime-pay-calculator", {
    country: "France", name: "Overtime pay calculator sa France", title: "Tantiyahin ang overtime pay sa France",
    description: "Tantiyahin ang overtime compensation mula sa wage, bilang ng oras at multiplier.",
    keywords: ["France overtime pay calculator", "French overtime estimate", "overtime wage France"],
    howTo: "Ilagay ang salary basis, overtime hours at premium multiplier.",
    formula: "Tinatayang overtime pay = hourly-equivalent wage × overtime hours × multiplier.",
    example: { question: "Awtomatiko bang nalalapat ang French legal premium?", answer: "Hindi. Ipasok at beripikahin ang rate na naaangkop sa kasunduan at kasalukuyang labor rules." },
    fields: { salary: "Sahod na gagamiting base", hours: "Bilang ng overtime hours", multiplier: "Overtime premium multiplier" },
    related: ["france-gross-net-salary-calculator", "hourly-wage", "salary-conversion"],
  }),
};
