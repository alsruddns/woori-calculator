import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { countryPage } from "@/i18n/dictionaries/fil-batch-10";

export const filBatchFourteen: Record<string, LocalizedCalculatorContent> = {
  "italy-gross-net-salary-calculator": countryPage("italy-gross-net-salary-calculator", {
    country: "Italy", name: "Gross at net salary sa Italy", title: "Tantiyahin ang take-home salary sa Italy",
    description: "Tantiyahin ang net pay mula sa gross salary at contribution assumptions sa Italy.",
    keywords: ["Italy gross net salary calculator", "Italian take home pay", "net salary Italy"],
    howTo: "Ilagay ang gross salary, panahon nito at contribution rate na gagamitin sa estimate.",
    formula: "Tinatayang net pay = gross pay − estimated income tax at employee contributions.",
    example: { question: "Eksaktong payroll result ba ito?", answer: "Hindi. Nag-iiba ang net pay ayon sa tax year, municipality, family status at employment details." },
    fields: { salary: "Gross salary bago kaltas", frequency: "Panahon ng sahod", socialRate: "Rate ng employee contribution" },
    options: { frequency: { annual: "Taunang sahod", monthly: "Buwanang sahod" } },
    related: ["italy-income-tax-calculator", "italy-vat-calculator", "salary-conversion"],
  }),
  "italy-income-tax-calculator": countryPage("italy-income-tax-calculator", {
    country: "Italy", name: "Income tax calculator sa Italy", title: "Tantiyahin ang income tax sa Italy",
    description: "Tantiyahin ang Italian income tax mula sa income na inilagay mo at policy assumptions ng calculator.",
    keywords: ["Italy income tax calculator", "Italian tax estimate", "income tax Italy"],
    howTo: "Ilagay ang taxable income para sa simplified estimate.",
    formula: "Kinukuwenta ang income tax estimate ayon sa configured Italy policy data at income input.",
    example: { question: "Kasama ba ang lahat ng regional at municipal surtax?", answer: "Hindi kinakailangang lahat. Beripikahin ang lokal na surtax, deductions at tax year." },
    fields: { income: "Taxable income na pagbabatayan" },
    related: ["italy-gross-net-salary-calculator", "italy-vat-calculator", "percentage"],
  }),
  "italy-vat-calculator": countryPage("italy-vat-calculator", {
    country: "Italy", name: "VAT calculator sa Italy", title: "Kuwentahin ang VAT at kabuuang presyo sa Italy",
    description: "Kuwentahin ang tax-exclusive o tax-inclusive na presyo gamit ang inilagay na Italian VAT rate.",
    keywords: ["Italy VAT calculator", "Italian IVA calculator", "VAT estimate Italy"],
    howTo: "Piliin ang uri ng presyo at ilagay ang amount at naaangkop na VAT rate.",
    formula: "Wala pang VAT: tax = net × rate. Kasama na ang VAT: tax = gross × rate ÷ (1 + rate).",
    example: { question: "Awtomatiko bang pumipili ito ng Italian VAT rate?", answer: "Hindi. Ilagay ang rate na naaangkop sa produkto; maaaring may reduced rate o exemption." },
    fields: { amount: "Halaga ng presyo", direction: "Uri ng presyong inilagay", rate: "VAT rate sa Italy" },
    options: { direction: { exclusive: "Presyong wala pang VAT", inclusive: "Presyong kasama ang VAT" } },
    related: ["vat", "percentage", "italy-income-tax-calculator"],
  }),
};
