import { describe, expect, it } from "vitest";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, routingLocales, supportedLocales, supportedLocalesForCalculator, type SupportedLocale } from "@/i18n/config";
import { calculatorExample } from "@/lib/content-quality/examples";
import { koreanContentImprovementSlugs } from "@/i18n/dictionaries/korean-content-improvements";
import { localeContentFollowupTargets, nextBatchExampleNotes, reviewedBatchExampleNotes, secondReviewedBatchExampleNotes, thirdReviewedBatchExampleNotes, fourthReviewedBatchExampleNotes, fifthReviewedBatchExampleNotes, sixthReviewedBatchExampleNotes, seventhReviewedBatchExampleNotes, eighthReviewedBatchExampleNotes, ninthReviewedBatchExampleNotes, tenthReviewedBatchExampleNotes, eleventhReviewedBatchExampleNotes, twelfthReviewedBatchExampleNotes, thirteenthReviewedBatchExampleNotes, fourteenthReviewedBatchExampleNotes, vatPolicyExampleNotes, nextPolicyExampleNotes, fourthPolicyExampleNotes, fifthPolicyExampleNotes, sixthPolicyExampleNotes, seventhPolicyExampleNotes } from "@/i18n/dictionaries/locale-quality-followup";
import { calculatorContentQualitySignals } from "@/lib/content-quality/signals";
import { calculateJapanOvertimePay } from "@/calculators/policy/japan";
import { japanNightHolidayFollowups } from "@/i18n/dictionaries/japan-night-holiday-followups";
import { franceOvertimeFollowups } from "@/i18n/dictionaries/france-overtime-followups";
import { netherlandsHolidayFollowups } from "@/i18n/dictionaries/netherlands-holiday-followups";
import { brazilThirteenthFollowups } from "@/i18n/dictionaries/brazil-thirteenth-followups";
import { vietnamGrossNetFollowups } from "@/i18n/dictionaries/vietnam-gross-net-followups";
import { vietnamIncomeTaxFollowups } from "@/i18n/dictionaries/vietnam-income-tax-followups";
import { vietnamSocialInsuranceFollowups } from "@/i18n/dictionaries/vietnam-social-insurance-followups";
import { chinaGrossNetFollowups } from "@/i18n/dictionaries/china-gross-net-followups";
import { chinaIncomeTaxFollowups } from "@/i18n/dictionaries/china-income-tax-followups";
import { chinaSocialInsuranceFollowups } from "@/i18n/dictionaries/china-social-insurance-followups";
import { chinaVatFollowups } from "@/i18n/dictionaries/china-vat-followups";
import { taiwanGrossNetFollowups } from "@/i18n/dictionaries/taiwan-gross-net-followups";
import { taiwanIncomeTaxFollowups } from "@/i18n/dictionaries/taiwan-income-tax-followups";
import { taiwanLaborInsuranceFollowups } from "@/i18n/dictionaries/taiwan-labor-insurance-followups";
import { taiwanVatFollowups } from "@/i18n/dictionaries/taiwan-vat-followups";
import { italyGrossNetFollowups } from "@/i18n/dictionaries/italy-gross-net-followups";
import { italyIncomeTaxFollowups } from "@/i18n/dictionaries/italy-income-tax-followups";
import { italyVatFollowups } from "@/i18n/dictionaries/italy-vat-followups";
import { calculateUnemploymentBenefit } from "@/calculators/policy/unemployment-benefit";
import { unemploymentBenefitExampleNotes, koreanPolicyContextDescriptions, gstCountryContextDescriptions, auSgPolicyContextDescriptions } from "@/i18n/dictionaries/locale-quality-followup";
import { calculateMinimumWage } from "@/calculators/finance/calculate";
import { calculateSeveranceEstimate } from "@/calculators/policy/severance";
import { calculateSocialInsurance } from "@/calculators/policy/social-insurance";
import { auSgPayrollTaxFollowups } from "@/i18n/dictionaries/au-sg-payroll-tax-followups";
import { calculateGlobalCountrySpecific } from "@/calculators/policy/country-specific-global";
import { calculateCountrySpecific } from "@/calculators/policy/country-specific";
import { calculateBySlug } from "@/calculators/calculate";
import { usPaycheckFollowups } from "@/i18n/dictionaries/us-paycheck-followups";
import { usIncomeTaxFollowups } from "@/i18n/dictionaries/us-income-tax-followups";
import { usSalesTaxFollowups } from "@/i18n/dictionaries/us-sales-tax-followups";
import { us401kFollowups } from "@/i18n/dictionaries/us-401k-followups";
import { usRothIraFollowups } from "@/i18n/dictionaries/us-roth-ira-followups";
import { usCapitalGainsFollowups } from "@/i18n/dictionaries/us-capital-gains-followups";
import { spainPolicyFollowups } from "@/i18n/dictionaries/spain-policy-followups";
import { countryRates } from "@/data/country-rates";
import { francePolicyFollowups } from "@/i18n/dictionaries/france-policy-followups";
import { netherlandsPolicyFollowups } from "@/i18n/dictionaries/netherlands-policy-followups";
import { indiaPolicyFollowups } from "@/i18n/dictionaries/india-policy-followups";
import { indiaSalaryStandardDeductionFollowups } from "@/i18n/dictionaries/india-salary-standard-deduction-followups";
import { indiaInvestmentScenarioFollowups } from "@/i18n/dictionaries/india-investment-scenario-followups";
import { singaporeGrossNetCorrections } from "@/i18n/dictionaries/sg-gross-net-corrections";
import { germanyVatFollowups } from "@/i18n/dictionaries/germany-vat-followups";
import { hkPolicyFollowups } from "@/i18n/dictionaries/hk-policy-followups";
import { malaysiaPolicyFollowups } from "@/i18n/dictionaries/malaysia-policy-followups";
import { malaysiaPhilippinesFollowups } from "@/i18n/dictionaries/malaysia-philippines-followups";
import { globalCountryRates } from "@/data/country-rates/global";
import { brazilPayrollFollowups } from "@/i18n/dictionaries/brazil-payroll-followups";
import { brazilGrossNetFollowups } from "@/i18n/dictionaries/brazil-gross-net-followups";
import { japanSalaryFollowups } from "@/i18n/dictionaries/japan-salary-followups";
import { germanyGrossNetFollowups } from "@/i18n/dictionaries/germany-gross-net-followups";
import { germanyIncomeTaxFollowups } from "@/i18n/dictionaries/germany-income-tax-followups";
import { germanyOvertimeFollowups } from "@/i18n/dictionaries/germany-overtime-followups";
import { germanyVacationPayFollowups } from "@/i18n/dictionaries/germany-vacation-pay-followups";
import { spainGrossNetFollowups } from "@/i18n/dictionaries/spain-gross-net-followups";
import { japanOvertimeFollowups } from "@/i18n/dictionaries/japan-overtime-followups";

type Content = { description: string; howTo: string; formula: string; example: { question: string; answer: string }; faqs: readonly { question: string; answer: string }[]; related: readonly string[] };

describe("calculator content quality", () => {
  it("keeps India SIP, PPF and NPS investment scenarios distinct and engine-matched in every locale", () => {
    const cases = {
      "india-sip-calculator": { input: { monthlyDeposit: "1000", rate: "8", years: "10" }, values: [120000, 64165.68, 184165.68] },
      "india-ppf-calculator": { input: { monthlyDeposit: "5000", rate: "7.1", years: "15" }, values: [900000, 708120.46, 1608120.46] },
      "india-nps-calculator": { input: { monthlyDeposit: "5000", rate: "8", years: "20" }, values: [1200000, 1764736.09, 2964736.09] },
    } as const;
    for (const [slug, sample] of Object.entries(cases)) {
      const result = calculateBySlug(slug, sample.input);
      expect(result && "results" in result ? result.results.map(({ value }) => value) : result, slug).toEqual(sample.values);
      for (const locale of supportedLocales) {
        const copy = indiaInvestmentScenarioFollowups[locale][slug as keyof typeof indiaInvestmentScenarioFollowups.en];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(copy.description, `${locale}/${slug} purpose`).toBeTruthy();
        expect(copy.howTo, `${locale}/${slug} guidance`).toBeTruthy();
        expect(copy.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(copy.example?.answer, `${locale}/${slug} example`).toBeTruthy();
        expect(copy.faq?.answer, `${locale}/${slug} limitation`).toBeTruthy();
        expect(page?.description).toContain(copy.description);
        expect(page?.howTo).toBe(copy.howTo);
        expect(page?.formula).toBe(copy.formula);
        expect(page?.example).toEqual(copy.example);
        expect(page?.faqs[0]).toEqual(copy.faq);
      }
    }
  });
  it("renders distinct Brazil INSS, IRRF and FGTS models with matching examples in all locales", () => {
    const examples = {
      "brazil-inss-calculator": { input: { salary: "5000" }, values: [501.51] },
      "brazil-irrf-calculator": { input: { salary: "5000" }, values: [0] },
      "brazil-fgts-calculator": { input: { salary: "3000" }, values: [240, 2880] },
    } as const;
    const sources = countryRates.BR?.sources ?? [];
    expect(sources.find((source) => source.name.startsWith("INSS"))?.checkedAt).toBe("2026-10-27");
    expect(sources.find((source) => source.name.startsWith("Receita"))?.checkedAt).toBe("2026-10-27");
    expect(sources.find((source) => source.name.startsWith("FGTS"))?.checkedAt).toBe("2026-10-27");
    for (const [slug, sample] of Object.entries(examples)) {
      const output = calculateCountrySpecific(slug, sample.input);
      expect(output && "results" in output ? output.results.map(({ value }) => value) : output, slug).toEqual(sample.values);
      for (const locale of supportedLocales) {
        const editorial = brazilPayrollFollowups[locale]?.[slug as keyof typeof brazilPayrollFollowups.en];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(editorial?.description, `${locale}/${slug} purpose`).toBeTruthy();
        expect(editorial?.howTo, `${locale}/${slug} input guidance`).toBeTruthy();
        expect(editorial?.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(editorial?.example?.answer, `${locale}/${slug} worked example`).toBeTruthy();
        expect(editorial?.faq?.answer, `${locale}/${slug} limitation`).toBeTruthy();
        expect(page?.description).toBe(editorial?.description);
        expect(page?.howTo).toBe(editorial?.howTo);
        expect(page?.formula).toBe(editorial?.formula);
        expect(page?.example).toEqual(editorial?.example);
        expect(page?.faqs[0]).toEqual(editorial?.faq);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
      }
    }
  });
  it("renders Brazil gross-to-net assumptions and an engine-matched example in every locale", () => {
    const slug = "brazil-gross-net-salary-calculator";
    const input = { salary: "5000", frequency: "monthly", socialRate: "5", taxRate: "15" };
    const output = calculateBySlug(slug, input);
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([60000, 9000, 3000, 48000, 4000]);
    expect(countryRates.BR?.sources.map(({ checkedAt }) => checkedAt)).toEqual(["2026-10-27", "2026-10-27", "2026-10-27"]);
    for (const locale of supportedLocales) {
      const copy = brazilGrossNetFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} worked example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitation`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders the U.S. paycheck model assumptions and engine-matched example in every locale", () => {
    const slug = "us-paycheck-calculator";
    const output = calculateBySlug(slug, { salary: "80000", frequency: "annual", filingStatus: "single", stateRate: "0" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([80000, 8770, 6120, 0, 65110, 5425.83]);
    for (const locale of supportedLocales) {
      const copy = usPaycheckFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} worked example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitation`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders the U.S. income-tax model, corrected input meaning, and example in every locale", () => {
    const slug = "us-income-tax-calculator";
    const output = calculateBySlug(slug, { income: "100000", filingStatus: "single" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([83900, 13170, 15.7]);
    for (const locale of supportedLocales) {
      const copy = usIncomeTaxFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitation`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(page?.fields.income.label).toBe(copy.fieldLabels.income);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders U.S. sales-tax rate arithmetic and examples in every locale", () => {
    const slug = "us-sales-tax-calculator";
    const exclusive = calculateBySlug(slug, { amount: "100", rate: "8.25", direction: "exclusive" });
    const inclusive = calculateBySlug(slug, { amount: "108.25", rate: "8.25", direction: "inclusive" });
    expect(exclusive && "results" in exclusive ? exclusive.results.map(({ value }) => value) : exclusive).toEqual([100, 8.25, 108.25]);
    expect(inclusive && "results" in inclusive ? inclusive.results.map(({ value }) => value) : inclusive).toEqual([100, 8.25, 108.25]);
    for (const locale of supportedLocales) {
      const copy = usSalesTaxFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose`).toBeTruthy();
      expect(copy.howTo, `${locale} inputs`).toBeTruthy();
      expect(copy.formula, `${locale} formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitation`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders the U.S. 401(k) contribution projection and example in every locale", () => {
    const slug = "us-401k-calculator";
    const output = calculateBySlug(slug, { annualSalary: "100000", annualContribution: "6000", matchRate: "50", matchCap: "6", rate: "6", years: "10" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([60000, 30000, 33524.06, 123524.06]);
    for (const locale of supportedLocales) {
      const copy = us401kFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose`).toBeTruthy();
      expect(copy.howTo, `${locale} inputs`).toBeTruthy();
      expect(copy.formula, `${locale} formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitations`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders the Roth IRA configured phaseout scenario and input meaning in every locale", () => {
    const slug = "us-roth-ira-calculator";
    const output = calculateBySlug(slug, { annualContribution: "6000", income: "160000", filingStatus: "single", rate: "6", years: "10" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([32000, 0, 11919.66, 43919.66]);
    for (const locale of supportedLocales) {
      const copy = usRothIraFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose`).toBeTruthy();
      expect(copy.howTo, `${locale} inputs`).toBeTruthy();
      expect(copy.formula, `${locale} formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitations`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(page?.fields.income.label).toBe(copy.fieldLabels.income);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders U.S. capital-gains branches and engine-matched example in every locale", () => {
    const slug = "us-capital-gains-tax-calculator";
    const longTerm = calculateBySlug(slug, { salePrice: "25000", costBasis: "10000", otherIncome: "50000", filingStatus: "single", term: "long", stateRate: "5" });
    expect(longTerm && "results" in longTerm ? longTerm.results.map(({ value }) => value) : longTerm).toEqual([15000, 2250, 750]);
    for (const locale of supportedLocales) {
      const copy = usCapitalGainsFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose`).toBeTruthy();
      expect(copy.howTo, `${locale} inputs`).toBeTruthy();
      expect(copy.formula, `${locale} formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitations`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders the Japan annual and monthly salary model explanations in every locale", () => {
    const cases = [
      { slug: "japan-annual-salary-calculator", copyKey: "annual", input: { annualSalary: "3600000", ageGroup: "under40" }, values: [2440000, 47068, 153260, 527400, 727728, 2872272, 239356] },
      { slug: "japan-monthly-salary-calculator", copyKey: "monthly", input: { monthlySalary: "300000", ageGroup: "under40" }, values: [3600000, 3922, 12772, 43950, 60644, 239356] },
    ] as const;
    for (const sample of cases) {
      const output = calculateBySlug(sample.slug, sample.input);
      expect(output && "results" in output ? output.results.map(({ value }) => value) : output, sample.slug).toEqual(sample.values);
      for (const locale of supportedLocales) {
        const copy = japanSalaryFollowups[locale][sample.copyKey];
        const page = getDictionary(locale).calculators[sample.slug];
        expect(copy.description, `${locale}/${sample.slug} purpose`).toBeTruthy();
        expect(copy.howTo, `${locale}/${sample.slug} input guidance`).toBeTruthy();
        expect(copy.formula, `${locale}/${sample.slug} formula`).toBeTruthy();
        expect(copy.example?.answer, `${locale}/${sample.slug} worked example`).toBeTruthy();
        expect(copy.faq?.answer, `${locale}/${sample.slug} limitations`).toBeTruthy();
        expect(page?.description).toBe(copy.description);
        expect(page?.howTo).toBe(copy.howTo);
        expect(page?.formula).toBe(copy.formula);
        expect(page?.example).toEqual(copy.example);
        expect(page?.faqs[0]).toEqual(copy.faq);
        expect(supportedLocalesForCalculator(sample.slug)).toContain(locale);
      }
    }
  });
  it("renders the Germany gross-to-net model assumptions and exact example in every locale", () => {
    const slug = "germany-gross-net-salary-calculator";
    const input = { salary: "50000", frequency: "annual", socialRate: "21.15" };
    const output = calculateBySlug(slug, input);
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([50000, 10548.33, 10575, 28876.67, 2406.39]);
    for (const locale of supportedLocales) {
      const copy = germanyGrossNetFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} worked example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitations`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Germany income-tax formula, code-matched example and limitations in every locale", () => {
    const slug = "germany-income-tax-calculator";
    const output = calculateBySlug(slug, { income: "50000" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([50000, 10548.33, 21.1]);
    for (const locale of supportedLocales) {
      const copy = germanyIncomeTaxFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose`).toBeTruthy();
      expect(copy.howTo, `${locale} input meaning`).toBeTruthy();
      expect(copy.formula, `${locale} implemented formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toMatch(/21[.,]10/);
      expect(copy.faq?.answer, `${locale} legal and model limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Germany overtime arithmetic and its user-entered legal-scope limitation in every locale", () => {
    const slug = "germany-overtime-pay-calculator";
    const output = calculateBySlug(slug, { salary: "20", hours: "8", multiplier: "1.5" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([160, 80, 240]);
    for (const locale of supportedLocales) {
      const copy = germanyOvertimeFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} implemented formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} example`).toMatch(/240/);
      expect(copy.faq?.answer, `${locale} policy limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Germany vacation-bonus arithmetic and user-entered rate limits in every locale", () => {
    const slug = "germany-vacation-pay-calculator";
    const output = calculateBySlug(slug, { salary: "50000", rate: "5" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([50000, 5, 2500]);
    for (const locale of supportedLocales) {
      const copy = germanyVacationPayFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} example`).toMatch(/2[\s.,]500/);
      expect(copy.faq?.answer, `${locale} eligibility limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Spain gross-to-net assumptions, exact scenario and policy limitations in every locale", () => {
    const slug = "spain-gross-net-salary-calculator";
    const output = calculateBySlug(slug, { salary: "50000", frequency: "annual", taxRate: "15", socialRate: "6.48" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([50000, 7500, 3240, 0, 39260, 3271.67]);
    for (const locale of supportedLocales) {
      const copy = spainGrossNetFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} implementation`).toBeTruthy();
      expect(copy.example?.answer, `${locale} exact scenario explanation`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} policy limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Japan overtime thresholds, wage modes, and an engine-matched example in every locale", () => {
    const slug = "japan-overtime-pay-calculator";
    const output = calculateBySlug(slug, { wageMode: "hourly", hourlyWage: "1500", overtimeHours: "10", over60Hours: "2", overtimeRate: "25" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([18000, 5250, 23250]);
    for (const locale of supportedLocales) {
      const copy = japanOvertimeFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} formula and reference scope`).toBeTruthy();
      expect(copy.example?.answer, `${locale} calculation example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} legal limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Japan night and statutory-holiday premiums, overlap arithmetic, and limits in every locale", () => {
    const slug = "japan-night-holiday-pay-calculator";
    const output = calculateBySlug(slug, { wageMode: "hourly", hourlyWage: "1500", overtimeHours: "0", over60Hours: "0", nightOnlyHours: "0", holidayHours: "0", overtimeNightHours: "2", over60NightHours: "0", holidayNightHours: "0", overtimeRate: "25", nightRate: "25", holidayRate: "35" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([3000, 750, 750, 0, 1500, 4500]);
    for (const locale of supportedLocales) {
      const copy = japanNightHolidayFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose`).toBeTruthy();
      expect(copy.howTo, `${locale} category guidance`).toBeTruthy();
      expect(copy.formula, `${locale} implemented arithmetic and reference scope`).toBeTruthy();
      expect((copy.example?.answer ?? "").length, `${locale} worked example`).toBeGreaterThan(80);
      expect(copy.faq?.answer, `${locale} limitations`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders France overtime user-entered arithmetic and legal-scope limits in every locale", () => {
    const slug = "france-overtime-pay-calculator";
    const output = calculateBySlug(slug, { salary: "20", hours: "8", multiplier: "1.5" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([160, 80, 240]);
    for (const locale of supportedLocales) {
      const copy = franceOvertimeFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and legal scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input meaning`).toBeTruthy();
      expect(copy.formula, `${locale} current-engine formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} worked example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitation`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Netherlands holiday-allowance assumptions and engine-matched example in every locale", () => {
    const slug = "netherlands-holiday-allowance-calculator";
    const output = calculateBySlug(slug, { salary: "50000", rate: "8" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([50000, 8, 4000]);
    for (const locale of supportedLocales) {
      const copy = netherlandsHolidayFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and assumed rate`).toBeTruthy();
      expect(copy.howTo, `${locale} input meaning`).toBeTruthy();
      expect(copy.formula, `${locale} current-engine formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} worked example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Brazil 13th-salary proration and gross-scope limits in every locale", () => {
    const slug = "brazil-thirteenth-salary-calculator";
    const output = calculateBySlug(slug, { salary: "3000", months: "7" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([1750, 7]);
    for (const locale of supportedLocales) {
      const copy = brazilThirteenthFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input meaning`).toBeTruthy();
      expect(copy.formula, `${locale} engine formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} worked example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} legal limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Vietnam gross-net configured brackets, engine example and policy limits in every locale", () => {
    const slug = "vietnam-gross-net-salary-calculator";
    const output = calculateBySlug(slug, { salary: "30000000", frequency: "monthly", socialRate: "10.5" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([360000000, 11400000, 37800000, 310800000, 25900000]);
    for (const locale of supportedLocales) {
      const copy = vietnamGrossNetFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and modeled scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input and frequency meaning`).toBeTruthy();
      expect(copy.formula, `${locale} configured engine formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} model-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} policy limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders Vietnam personal income-tax engine example and unverified-policy limits in every locale", () => {
    const slug = "vietnam-personal-income-tax-calculator";
    const output = calculateBySlug(slug, { income: "240000000" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([240000000, 18000000, 7.5]);
    for (const locale of supportedLocales) {
      const copy = vietnamIncomeTaxFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} taxable-income input meaning`).toBeTruthy();
      expect(copy.formula, `${locale} configured progressive formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} policy limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders Vietnam social-insurance entered-rate example and legal-scope limits in every locale", () => {
    const slug = "vietnam-social-insurance-calculator";
    const output = calculateBySlug(slug, { salary: "30000000", rate: "10.5" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([30000000, 10.5, 3150000]);
    for (const locale of supportedLocales) {
      const copy = vietnamSocialInsuranceFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} entered-rate formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} legal limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders China gross-to-net configured tax model and annualized example in every locale", () => {
    const slug = "china-gross-net-salary-calculator";
    const output = calculateBySlug(slug, { salary: "30000", frequency: "monthly", socialRate: "0" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([360000, 43080, 0, 316920, 26410]);
    for (const locale of supportedLocales) {
      const copy = chinaGrossNetFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} frequency/rate guidance`).toBeTruthy();
      expect(copy.formula, `${locale} annualization and configured formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} legal and model limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders China individual income-tax configured brackets and example in every locale", () => {
    const slug = "china-individual-income-tax-calculator";
    const output = calculateBySlug(slug, { income: "360000" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([300000, 43080, 14.36]);
    for (const locale of supportedLocales) {
      const copy = chinaIncomeTaxFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and taxable-income scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} progressive formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} policy limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders China social-insurance entered-rate formula and example in every locale", () => {
    const slug = "china-social-insurance-calculator";
    const output = calculateBySlug(slug, { salary: "20000", rate: "8" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([20000, 8, 1600]);
    for (const locale of supportedLocales) {
      const copy = chinaSocialInsuranceFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} entered-rate formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} legal limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("renders China VAT direction formulas and both engine examples in every locale", () => {
    const slug = "china-vat-calculator";
    const exclusive = calculateBySlug(slug, { amount: "1000", rate: "13", direction: "exclusive" });
    const inclusive = calculateBySlug(slug, { amount: "1000", rate: "13", direction: "inclusive" });
    expect(exclusive && "results" in exclusive ? exclusive.results.map(({ value }) => value) : exclusive).toEqual([1000, 130, 1130]);
    expect(inclusive && "results" in inclusive ? inclusive.results.map(({ value }) => value) : inclusive).toEqual([884.96, 115.04, 1000]);
    for (const locale of supportedLocales) {
      const copy = chinaVatFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} direction guidance`).toBeTruthy();
      expect(copy.formula, `${locale} exclusive/inclusive formulas`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched examples`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} classification limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders Taiwan gross-to-net configured bands and monthly example in every locale", () => {
    const slug = "taiwan-gross-net-salary-calculator";
    const output = calculateBySlug(slug, { salary: "80000", frequency: "monthly", socialRate: "2.4" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([960000, 72500, 23040, 864460, 72038.33]);
    for (const locale of supportedLocales) {
      const copy = taiwanGrossNetFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} configured formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} policy limitations`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders Taiwan income-tax configured bands and marginal-rate example in every locale", () => {
    const slug = "taiwan-income-tax-calculator";
    const output = calculateBySlug(slug, { income: "1000000" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([1000000, 77300, 7.73]);
    for (const locale of supportedLocales) {
      const copy = taiwanIncomeTaxFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and taxable-income scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} progressive-band formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitations`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders Taiwan labor-insurance entered-rate formula and example in every locale", () => {
    const slug = "taiwan-labor-insurance-calculator";
    const output = calculateBySlug(slug, { salary: "40000", rate: "2.4" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([40000, 2.4, 960]);
    for (const locale of supportedLocales) {
      const copy = taiwanLaborInsuranceFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} input guidance`).toBeTruthy();
      expect(copy.formula, `${locale} entered-rate formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitations`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders Taiwan VAT direction formulas and both examples in every locale", () => {
    const slug = "taiwan-vat-calculator";
    const exclusive = calculateBySlug(slug, { amount: "1000", rate: "5", direction: "exclusive" });
    const inclusive = calculateBySlug(slug, { amount: "1000", rate: "5", direction: "inclusive" });
    expect(exclusive && "results" in exclusive ? exclusive.results.map(({ value }) => value) : exclusive).toEqual([1000, 50, 1050]);
    expect(inclusive && "results" in inclusive ? inclusive.results.map(({ value }) => value) : inclusive).toEqual([952.38, 47.62, 1000]);
    for (const locale of supportedLocales) {
      const copy = taiwanVatFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} direction guidance`).toBeTruthy();
      expect(copy.formula, `${locale} exclusive/inclusive formulas`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched examples`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders Italy gross-to-net configured bands and annualized example in every locale", () => {
    const slug = "italy-gross-net-salary-calculator";
    const output = calculateBySlug(slug, { salary: "3000", frequency: "monthly", socialRate: "0" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([36000, 9080, 0, 26920, 2243.33]);
    for (const locale of supportedLocales) {
      const copy = italyGrossNetFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} frequency and contribution guidance`).toBeTruthy();
      expect(copy.formula, `${locale} annual progressive formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limitations`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders Italy income-tax configured marginal bands and example in every locale", () => {
    const slug = "italy-income-tax-calculator";
    const output = calculateBySlug(slug, { income: "60000" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([60000, 18000, 30]);
    for (const locale of supportedLocales) {
      const copy = italyIncomeTaxFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and taxable-income basis`).toBeTruthy();
      expect(copy.howTo, `${locale} input meaning`).toBeTruthy();
      expect(copy.formula, `${locale} progressive-band formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched example`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders Italy VAT direction formulas and both examples in every locale", () => {
    const slug = "italy-vat-calculator";
    const exclusive = calculateBySlug(slug, { amount: "1000", rate: "22", direction: "exclusive" });
    const inclusive = calculateBySlug(slug, { amount: "1000", rate: "22", direction: "inclusive" });
    expect(exclusive && "results" in exclusive ? exclusive.results.map(({ value }) => value) : exclusive).toEqual([1000, 220, 1220]);
    expect(inclusive && "results" in inclusive ? inclusive.results.map(({ value }) => value) : inclusive).toEqual([819.67, 180.33, 1000]);
    for (const locale of supportedLocales) {
      const copy = italyVatFollowups[locale];
      const page = getDictionary(locale).calculators[slug];
      expect(copy.description, `${locale} purpose and scope`).toBeTruthy();
      expect(copy.howTo, `${locale} direction guidance`).toBeTruthy();
      expect(copy.formula, `${locale} exclusive/inclusive formula`).toBeTruthy();
      expect(copy.example?.answer, `${locale} engine-matched examples`).toBeTruthy();
      expect(copy.faq?.answer, `${locale} rate limits`).toBeTruthy();
      expect(page?.description).toBe(copy.description);
      expect(page?.howTo).toBe(copy.howTo);
      expect(page?.formula).toBe(copy.formula);
      expect(page?.example).toEqual(copy.example);
      expect(page?.faqs[0]).toEqual(copy.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
      if (locale !== "en") expect(page?.formula, `${locale} localized formula`).not.toBe(getDictionary("en").calculators[slug]?.formula);
    }
  });
  it("renders German VAT purpose, formula, engine-matched examples, limits and FAQ in all locales", () => {
    const slug = "germany-vat-calculator";
    const definition = publishedCalculatorPages.find((page) => page.slug === slug);
    expect(definition?.countryCode).toBe("DE");
    expect(definition?.policyYear).toBe(2026);
    expect(definition?.sources?.some((source) => source.url === "https://www.gesetze-im-internet.de/ustg_1980/__12.html" && source.checkedAt === "2026-10-28")).toBe(true);
    const output = calculateCountrySpecific(slug, { amount: "100", rate: "19", direction: "exclusive" });
    expect(output && "results" in output ? output.results.map(({ value }) => value) : output).toEqual([100, 19, 119]);
    for (const locale of supportedLocales) {
      const copy = germanyVatFollowups[locale]?.[slug];
      const page = getDictionary(locale).calculators[slug];
      expect(copy?.description, `${locale} description`).toBeTruthy();
      expect(copy?.howTo, `${locale} instructions`).toBeTruthy();
      expect(copy?.formula, `${locale} formula`).toBeTruthy();
      expect(copy?.exampleNote, `${locale} example`).toContain("19");
      expect(copy?.faq?.question, `${locale} FAQ question`).toBeTruthy();
      expect((copy?.faq?.answer ?? "").length, `${locale} scope detail`).toBeGreaterThan(50);
      if (locale !== "en") expect(copy?.faq?.answer).not.toBe(germanyVatFollowups.en?.[slug]?.faq?.answer);
      expect(page?.description).toContain(copy?.description);
      expect(page?.howTo).toBe(copy?.howTo);
      expect(page?.formula).toBe(copy?.formula);
      expect(page?.example.answer).toContain(copy?.exampleNote);
      expect(page?.faqs[0]).toEqual(copy?.faq);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("keeps Hong Kong salary-tax, MPF, and stamp-duty content distinct and engine-matched in all locales", () => {
    const expected = {
      "hong-kong-salary-tax-calculator": { input: { income: "100000" }, values: [100000, 4000, 15000, 4000] },
      "hong-kong-mpf-calculator": { input: { salary: "20000" }, values: [1000, 1000, 2000] },
      "hong-kong-stamp-duty-calculator": { input: { propertyValue: "5000000" }, values: [50000] },
    } as const;
    const sources = [
      "https://www.ird.gov.hk/eng/pdf/2026/BriefGuide20252026.pdf",
      "https://www.mpfa.org.hk/en/mpf-system/mandatory-contributions/employees",
      "https://www.ird.gov.hk/eng/faq/avd.htm?module=inline&pgtype=article",
    ];
    const defs = Object.values(expected).map((_, index) => publishedCalculatorPages.find((page) => page.slug === Object.keys(expected)[index]));
    expect(defs.every((definition) => definition?.countryCode === "HK")).toBe(true);
    for (const source of sources) expect(defs[0]?.sources?.some((item) => item.url === source && item.checkedAt === "2026-10-28")).toBe(true);
    for (const [slug, sample] of Object.entries(expected)) {
      const output = calculateGlobalCountrySpecific(slug, sample.input);
      expect(output && "results" in output ? output.results.map(({ value }) => value) : output, slug).toEqual(sample.values);
      for (const locale of supportedLocales) {
        const copy = hkPolicyFollowups[locale]?.[slug];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(copy?.description, `${locale}/${slug} purpose and scope`).toBeTruthy();
        expect(copy?.howTo, `${locale}/${slug} input guidance`).toBeTruthy();
        expect(copy?.formula, `${locale}/${slug} engine formula`).toBeTruthy();
        expect(copy?.exampleNote, `${locale}/${slug} worked example`).toBeTruthy();
        expect(copy?.faq?.question, `${locale}/${slug} FAQ question`).toBeTruthy();
        expect(copy?.faq?.answer, `${locale}/${slug} limitation`).toBeTruthy();
        expect(page?.description).toContain(copy?.description);
        expect(page?.howTo).toBe(copy?.howTo);
        expect(page?.formula).toBe(copy?.formula);
        expect(page?.example.answer).toContain(copy?.exampleNote);
        expect(page?.faqs[0]).toEqual(copy?.faq);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
        if (locale !== "en") expect(copy?.description).not.toBe(hkPolicyFollowups.en?.[slug]?.description);
      }
    }
  });
  it("validates the South Korea 2026 unemployment example against the engine and all locale pages", () => {
    const slug = "unemployment-benefit";
    const definition = publishedCalculatorPages.find((page) => page.slug === slug);
    expect(definition?.countryCode).toBe("KR");
    expect(definition?.policyYear).toBe(2026);
    expect(definition?.sources?.some((source) => source.url === "https://1350.moel.go.kr/rtmview.do?id=1000324861" && source.checkedAt === "2026-10-28")).toBe(true);
    expect(definition?.sources?.some((source) => source.url === "https://www.minimumwage.go.kr/index.jsp" && source.checkedAt === "2026-10-28")).toBe(true);
    expect(definition?.sources?.some((source) => source.url.includes("edrm.ei.go.kr"))).toBe(false);
    const output = calculateUnemploymentBenefit({ monthlyWage: "3400000", age: "35", insuredYears: "0.9" });
    expect("results" in output ? output.results.map(({ value }) => value) : output).toEqual([68000, 120, 8160000, 68000, 66048, 68100]);
    for (const locale of locales) {
      const note = unemploymentBenefitExampleNotes[locale]?.[slug];
      const content = getDictionary(locale).calculators[slug];
      expect(note, `${locale} authored example`).toBeTruthy();
      expect(content?.example.answer, `${locale} rendered detail`).toContain(note);
      expect(content?.howTo).toBeTruthy();
      expect(content?.formula).toBeTruthy();
      expect(content?.faqs.length).toBeGreaterThanOrEqual(2);
      expect(supportedLocalesForCalculator(slug)).toContain(locale);
    }
  });
  it("keeps distinct South Korea wage, severance, and insurance scope explanations in all locales", () => {
    const engineValues: Record<string, readonly number[]> = {
      "minimum-wage": (calculateMinimumWage({ hourlyWage: "10000" }) as { results: { value: number }[] }).results.map(({ value }) => value),
      "severance-pay": (calculateSeveranceEstimate({ start: "2025-01-01", lastWorkday: "2025-12-31", averageDailyWage: "100000" }) as { results: { value: number }[] }).results.map(({ value }) => value),
      "social-insurance": (calculateSocialInsurance({ monthlyWage: "4000000" }) as { results: { value: number }[] }).results.map(({ value }) => value),
    };
    expect(engineValues["minimum-wage"]).toEqual([10320, -320, 82560, 2156880]);
    expect(engineValues["severance-pay"]).toEqual([365, 3000000]);
    expect(engineValues["social-insurance"]).toEqual([190000, 143800, 18896, 36000, 0, 388696]);
    const slugs = Object.keys(engineValues);
    for (const slug of slugs) {
      const definition = publishedCalculatorPages.find((page) => page.slug === slug);
      expect(definition?.countryCode).toBe("KR");
      for (const locale of locales) {
        const description = koreanPolicyContextDescriptions[locale]?.[slug];
        const note = sixthPolicyExampleNotes[locale]?.[slug];
        const content = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(description, `${locale}/${slug} localized scope`).toBeTruthy();
        expect(content?.description, `${locale}/${slug} rendered scope`).toContain(description);
        expect(content?.example.answer, `${locale}/${slug} example`).toContain(note);
        expect(content?.howTo).toBeTruthy();
        expect(content?.formula).toBeTruthy();
        expect(content?.faqs.length).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
      }
    }
  });
  it("keeps four country GST examples localized and linked to checked official rate sources", () => {
    const checkedSources: Record<string, string> = {
      "canada-gst-hst-calculator": "canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate.html",
      "australia-gst-calculator": "ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst",
      "singapore-gst-calculator": "iras.gov.sg/taxes/goods-services-tax",
      "new-zealand-gst-calculator": "ird.govt.nz/gst/charging-gst",
    };
    for (const [slug, source] of Object.entries(checkedSources)) {
      const definition = publishedCalculatorPages.find((page) => page.slug === slug);
      expect(definition?.sources?.some((item) => item.url.includes(source) && item.checkedAt === "2026-10-28"), `${slug} checked source`).toBe(true);
      for (const locale of locales) {
        const note = fourthPolicyExampleNotes[locale]?.[slug];
        const context = gstCountryContextDescriptions[locale]?.[slug];
        expect(note, `${locale}/${slug} authored example note`).toBeTruthy();
        expect(context, `${locale}/${slug} localized policy scope`).toBeTruthy();
        expect(getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]]?.description).toContain(context);
        expect(getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]]?.example.answer).toContain(note);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} route`).toContain(locale);
      }
    }
  });
  it("keeps Australian income/super and Singapore CPF examples localized with checked sources", () => {
    const sources: Record<string, string> = {
      "australia-income-tax-calculator": "ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents",
      "australia-superannuation-calculator": "ato.gov.au/tax-rates-and-codes/key-superannuation-rates-and-thresholds/super-guarantee",
      "singapore-cpf-calculator": "cpf.gov.sg/employer/employer-obligations/how-much-cpf-contributions-to-pay",
    };
    for (const [slug, source] of Object.entries(sources)) {
      const definition = publishedCalculatorPages.find((page) => page.slug === slug);
      expect(definition?.sources?.some((item) => item.url.includes(source) && item.checkedAt === "2026-10-28"), `${slug} checked source`).toBe(true);
      for (const locale of locales) {
        const note = fifthPolicyExampleNotes[locale]?.[slug];
        const context = auSgPolicyContextDescriptions[locale]?.[slug];
        expect(note, `${locale}/${slug} localized example`).toBeTruthy();
        expect(context, `${locale}/${slug} localized scope`).toBeTruthy();
        expect(getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]]?.description).toContain(context);
        expect(getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]]?.example.answer).toContain(note);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} route`).toContain(locale);
      }
    }
  });
  it("renders Australia take-home and Singapore salary/tax explanations, formulas, examples, and FAQs in all 26 locales", () => {
    const expected = {
      "australia-gross-net-salary-calculator": [80000, 14520, 0, 1600, 63880, 5323.33],
      "singapore-gross-net-salary-calculator": [72000, 2790, 14400, 0, 54810, 4567.5],
      "singapore-income-tax-calculator": [100000, 5650, 5.65],
    } as const;
    const inputs = {
      "australia-gross-net-salary-calculator": { salary: "80000", frequency: "annual" },
      "singapore-gross-net-salary-calculator": { salary: "6000", frequency: "monthly", age: "35" },
      "singapore-income-tax-calculator": { income: "100000" },
    } as const;
    for (const slug of Object.keys(expected)) {
      const output = calculateGlobalCountrySpecific(slug, inputs[slug as keyof typeof inputs]);
      if (!output || !("results" in output)) throw new Error(`${slug} example did not return calculation results`);
      expect(output.results.map(({ value }) => value)).toEqual(expected[slug as keyof typeof expected]);
      for (const locale of supportedLocales) {
        const copy = auSgPayrollTaxFollowups[locale]?.[slug];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(copy?.description, `${locale}/${slug} description`).toBeTruthy();
        expect(copy?.howTo, `${locale}/${slug} instructions`).toBeTruthy();
        expect(copy?.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(copy?.exampleNote, `${locale}/${slug} checked example`).toBeTruthy();
        expect(copy?.faq, `${locale}/${slug} FAQ`).toBeTruthy();
        expect(page?.description).toContain(copy?.description);
        const correction = slug === "singapore-gross-net-salary-calculator" ? singaporeGrossNetCorrections[locale] : undefined;
        expect(page?.howTo).toBe(correction?.howTo ?? copy?.howTo);
        expect(page?.formula).toBe(correction?.formula ?? copy?.formula);
        expect(page?.example.answer).toContain(copy?.exampleNote);
        expect(page?.faqs[0]).toEqual(copy?.faq);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
        if (slug === "singapore-gross-net-salary-calculator") {
          const correction = singaporeGrossNetCorrections[locale];
          expect(page?.description).toContain(correction.description);
          expect(page?.howTo).toBe(correction.howTo);
          expect(page?.formula).toBe(correction.formula);
          expect(publishedCalculatorPages.find(({ slug: pageSlug }) => pageSlug === slug)?.fields.some(({ name }) => name === "age")).toBe(false);
        }
      }
    }
    const pages = Object.keys(expected);
    const incomeTax = publishedCalculatorPages.find(({ slug }) => slug === "singapore-income-tax-calculator");
    expect(incomeTax?.sources?.some(({ url, checkedAt }) => url.includes("iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-residency-and-tax-rates/individual-income-tax-rates") && checkedAt === "2026-10-28")).toBe(true);
    expect(pages).toHaveLength(3);
  });
  it("keeps South Korea minimum wage, severance, and insurance examples localized with checked sources", () => {
    const slugs = ["minimum-wage", "severance-pay", "social-insurance"] as const;
    const sourceParts = ["minimumwage.go.kr", "law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202", "edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html"];
    for (const [index, slug] of slugs.entries()) {
      const definition = publishedCalculatorPages.find((page) => page.slug === slug);
      expect(definition?.countryCode).toBe("KR");
      expect(definition?.sources?.some((item) => item.url.includes(sourceParts[index]!) && item.checkedAt === "2026-10-28"), `${slug} checked source`).toBe(true);
      for (const locale of locales) {
        const note = sixthPolicyExampleNotes[locale]?.[slug];
        expect(note, `${locale}/${slug} localized South Korea example`).toBeTruthy();
        expect(getDictionary(locale).calculators[slug]?.example.answer).toContain(note);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
      }
    }
  });
  it("keeps Japanese wage-premium and German VAT examples localized to checked official rules", () => {
    const pages = {
      "japan-overtime-pay-calculator": "mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudouseisaku/chushoukigyou/joken_kankyou_rule.html",
      "japan-night-holiday-pay-calculator": "mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudouseisaku/chushoukigyou/joken_kankyou_rule.html",
      "germany-vat-calculator": "gesetze-im-internet.de/ustg_1980/__12.html",
    };
    for (const [slug, source] of Object.entries(pages)) {
      const definition = publishedCalculatorPages.find((page) => page.slug === slug);
      expect(definition?.sources?.some((item) => item.url.includes(source) && item.checkedAt === "2026-10-28"), `${slug} checked source`).toBe(true);
      for (const locale of locales) {
        const note = seventhPolicyExampleNotes[locale]?.[slug];
        expect(note, `${locale}/${slug} authored example`).toBeTruthy();
        if (slug !== "japan-overtime-pay-calculator" && slug !== "japan-night-holiday-pay-calculator") expect(getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]]?.example.answer).toContain(note);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
      }
    }
    expect(seventhPolicyExampleNotes).toHaveProperty("ko");
    expect(seventhPolicyExampleNotes).toHaveProperty("en");
    expect(Object.keys(seventhPolicyExampleNotes)).toHaveLength(26);
    const overtime = calculateJapanOvertimePay({ wageMode: "hourly", hourlyWage: "1500", overtimeHours: "10", over60Hours: "0", overtimeRate: "25" });
    expect("results" in overtime).toBe(true);
    if ("results" in overtime) expect(overtime.results.map(({ value }) => value)).toEqual([15_000, 3_750, 18_750]);
  });
  it("keeps the South Korea VAT scope, official sources, and localized worked example", () => {
    const vat = publishedCalculatorPages.find((page) => page.slug === "vat");
    expect(vat?.policyType).toBe("POLICY");
    expect(vat?.sources?.map((source) => source.checkedAt)).toEqual(["2026-10-28", "2026-10-28"]);
    expect(vat?.sources?.[0]?.url).toContain("law.go.kr");
    for (const locale of locales) {
      const page = getDictionary(locale).calculators.vat;
      const note = vatPolicyExampleNotes[locale]?.vat;
      expect(note, `${locale} localized VAT note`).toBeTruthy();
      expect(page?.example.answer, `${locale} example contains localized scope`).toContain(note);
      expect(supportedLocalesForCalculator("vat"), `${locale} route`).toContain(locale);
    }
  });
  it("keeps the withholding, Japan consumption tax, and UK VAT examples localized", () => {
    const withholding = publishedCalculatorPages.find((page) => page.slug === "withholding-tax-3-3");
    const japan = publishedCalculatorPages.find((page) => page.slug === "japan-consumption-tax-calculator");
    const uk = publishedCalculatorPages.find((page) => page.slug === "uk-vat-calculator");
    expect(withholding?.countryCode).toBe("KR");
    expect(withholding?.sources?.map((source) => source.checkedAt)).toEqual(["2026-10-28", "2026-10-28"]);
    expect(japan?.sources?.some((source) => source.url.includes("taxanswer/shohi/6102.htm") && source.checkedAt === "2026-10-28")).toBe(true);
    expect(uk?.sources?.some((source) => source.url === "https://www.gov.uk/vat-rates" && source.checkedAt === "2026-10-28")).toBe(true);
    for (const locale of locales) {
      for (const slug of ["withholding-tax-3-3", "japan-consumption-tax-calculator", "uk-vat-calculator"] as const) {
        const note = nextPolicyExampleNotes[locale]?.[slug];
        expect(note, `${locale}/${slug} localized example`).toBeTruthy();
        expect(getDictionary(locale).calculators[slug]?.example.answer, `${locale}/${slug} SSR content`).toContain(note);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} route`).toContain(locale);
      }
    }
  });
  it("keeps every public page complete, linked, and free of exact content duplicates", () => {
    const publicSlugs = new Set(publishedCalculatorPages.map((page) => page.slug));
    const missing: string[] = [];
    const brokenLinks: string[] = [];
    const duplicateBlocks: string[] = [];
    const rawKeys: string[] = [];
    const koreanSignals: Record<string, string[]> = {};
    const localeSignals: Record<string, number> = {};
    const localeReviewLists: Record<string, Record<string, string[]>> = {};

    for (const locale of locales) {
      const dictionary = getDictionary(locale);
      const descriptions = new Map<string, string>();
      const guides = new Map<string, string>();
      const faqs = new Map<string, string>();
      const examples = new Map<string, string>();
      let flagged = 0;
      for (const page of publishedCalculatorPages) {
        const localized = dictionary.calculators[page.slug as keyof typeof dictionary.calculators];
        const content: Content = localized ?? { ...page, related: page.relatedCalculatorIds };
        const id = `${locale}/${page.slug}`;
        if (!content.description.trim() || !content.howTo.trim() || !content.formula.trim() || !content.example.question.trim() || !content.example.answer.trim() || content.faqs.length === 0) missing.push(id);
        if (content.description.length < 6 || content.howTo.length < 6 || content.formula.length < 4 || content.example.answer.length < 4) missing.push(`${id}:placeholder-like`);
        if (/^(?:__|[a-z]+(?:[A-Z][a-z]+){2,})$/.test(content.description) || /\{(?:title|slug|name)\}/.test(content.howTo)) rawKeys.push(id);
        for (const slug of content.related) if (!publicSlugs.has(slug) || slug === page.slug) brokenLinks.push(`${id} -> ${slug}`);
        for (const [name, value, map] of [["description", content.description, descriptions], ["howTo", content.howTo, guides], ["FAQ", content.faqs.map(({ question, answer }) => `${question}:${answer}`).join("|"), faqs], ["example", `${content.example.question}:${content.example.answer}`, examples]] as const) {
          const previous = map.get(value);
          if (previous) duplicateBlocks.push(`${locale}:${name}:${previous},${page.slug}`);
          else map.set(value, page.slug);
        }
        const signals = calculatorContentQualitySignals(content, locale);
        if (signals.length) flagged++;
        if (locale === "ko" && signals.length) koreanSignals[page.slug] = signals;
        if (signals.length) localeReviewLists[locale] = { ...localeReviewLists[locale], [page.slug]: signals };
      }
      localeSignals[locale] = flagged;
    }
    console.log(`Content quality signals by locale: ${JSON.stringify(localeSignals)}; Korean review list: ${JSON.stringify(koreanSignals)}; other review lists: ${JSON.stringify(Object.fromEntries(Object.entries(localeReviewLists).filter(([locale]) => locale !== "ko")))}`);
    expect(publicSlugs.size).toBe(publishedCalculatorPages.length);
    expect(koreanContentImprovementSlugs).toHaveLength(53);
    expect(koreanContentImprovementSlugs.every((slug) => publicSlugs.has(slug))).toBe(true);
    expect(Object.values(localeContentFollowupTargets).flat()).toHaveLength(305);
    expect(Object.keys(nextBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(reviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(secondReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(thirdReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(fourthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(fifthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(sixthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(seventhReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(eighthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(ninthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(tenthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(eleventhReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    const reviewedBatchSlugs = ["percentage", "ratio", "proportion", "median", "decimal-fraction"] as const;
    const secondReviewedBatchSlugs = ["change-rate", "discount", "cagr", "simple-interest", "compound-interest"] as const;
    const thirdReviewedBatchSlugs = ["date-difference", "dday", "age", "workdays", "unit-converter"] as const;
    const fourthReviewedBatchSlugs = ["fire-retirement-calculator", "dividend-growth-calculator", "inflation-adjusted-return-calculator", "position-size-calculator", "stop-loss-take-profit-calculator"] as const;
    const fifthReviewedBatchSlugs = ["stock-profit-after-fees-calculator", "loan-early-repayment-calculator", "rent-vs-buy-calculator", "electricity-cost-calculator", "travel-budget-calculator"] as const;
    for (const locale of routingLocales) {
      const localizedContent = getDictionary(locale).calculators;
      for (const slug of reviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(reviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      for (const slug of secondReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(secondReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      for (const slug of thirdReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(thirdReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      for (const slug of fourthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(fourthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      for (const slug of fifthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(fifthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const sixthReviewedBatchSlugs = ["freelancer-hourly-rate-calculator", "break-even-point-calculator", "savings-interest", "deposit-interest", "loan-interest"] as const;
      for (const slug of sixthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(sixthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const seventhReviewedBatchSlugs = ["stock-average-price", "dividend", "profit-loss", "margin", "markup"] as const;
      for (const slug of seventhReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(seventhReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const eighthReviewedBatchSlugs = ["product-margin", "salary-conversion", "bmi", "pace", "fuel-cost"] as const;
      for (const slug of eighthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(eighthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const ninthReviewedBatchSlugs = ["ltv", "dti", "dsr", "loan-refinance", "prepayment-fee"] as const;
      for (const slug of ninthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(ninthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const tenthReviewedBatchSlugs = ["loan-affordability", "hourly-wage", "fuel-efficiency", "calorie-per-serving", "trip-split"] as const;
      for (const slug of tenthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(tenthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const eleventhReviewedBatchSlugs = ["annual-leave-allowance", "tenure", "time-arithmetic", "pregnancy", "utility-bill"] as const;
      for (const slug of eleventhReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(eleventhReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
    }
    const improvedExamples = new Set(["average", "percentage", "proportion", "unit-price", "unit-converter", "probability", "area", "decimal-fraction", "weighted-average", "workdays", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio", "change-rate", "discount", "cagr", "simple-interest", "compound-interest", "date-difference", "dday", "age", ...fourthReviewedBatchSlugs, ...fifthReviewedBatchSlugs, "freelancer-hourly-rate-calculator", "break-even-point-calculator", "savings-interest", "deposit-interest", "loan-interest", "stock-average-price", "dividend", "profit-loss", "margin", "markup", "product-margin", "salary-conversion", "bmi", "pace", "fuel-cost", "ltv", "dti", "dsr", "loan-refinance", "prepayment-fee", "loan-affordability", "hourly-wage", "fuel-efficiency", "calorie-per-serving", "trip-split", "annual-leave-allowance", "tenure", "time-arithmetic", "pregnancy", "utility-bill"]);
    for (const [locale, slugs] of Object.entries(localeContentFollowupTargets)) {
      expect(slugs.every((slug) => publicSlugs.has(slug))).toBe(true);
      const localizedContent = getDictionary(locale as SupportedLocale).calculators;
      expect(slugs.every((slug) => Boolean(localizedContent[slug as keyof typeof localizedContent]))).toBe(true);
      for (const slug of ["fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"]) {
        expect(localizedContent[slug as keyof typeof localizedContent]?.example.answer).toContain(nextBatchExampleNotes[locale as SupportedLocale]?.[slug]);
      }
      for (const slug of slugs) {
        if (["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio", "percentage", "ratio", "proportion", "median", "decimal-fraction", "change-rate", "discount", "cagr", "simple-interest", "compound-interest", "date-difference", "dday", "age", "workdays", "unit-converter", ...fourthReviewedBatchSlugs, ...fifthReviewedBatchSlugs].includes(slug)) {
          expect(supportedLocalesForCalculator(slug), `${locale}/${slug} route`).toContain(locale);
        }
        if (!improvedExamples.has(slug)) continue;
        const content = localizedContent[slug as keyof typeof localizedContent];
        expect(content).toBeDefined();
        expect(calculatorContentQualitySignals(content!, locale).filter((signal) => signal === "short example"), `${locale}/${slug}: ${content?.example.answer}`).toEqual([]);
      }
    }
    expect(missing).toEqual([]);
    expect(brokenLinks).toEqual([]);
    expect(rawKeys).toEqual([]);
    expect(duplicateBlocks).toEqual([]);
    expect(Object.keys(koreanSignals)).toEqual([]);
    expect(localeSignals).toEqual(Object.fromEntries(locales.map((locale) => [locale, 0])));
  });

  it("uses calculator output for country-policy examples", () => {
    const missingExamples = publishedCalculatorPages.filter((page) => page.countrySpecific && !calculatorExample(page, "en")).map((page) => page.slug);
    expect(missingExamples).toEqual([]);
  });

  it("keeps the percentile and ratio examples localized across 26 locales", () => {
    for (const locale of locales) {
      const content = getDictionary(locale).calculators;
      for (const slug of ["percentile", "aspect-ratio", "scale-ratio"] as const) {
        expect(content[slug]?.example.answer).toContain(fourteenthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
      }
    }
  });

  it("keeps the twelfth reviewed batch complete and localized across 26 locales", () => {
    const slugs = ["fraction", "standard-deviation", "vehicle-cost", "taxi-fare", "tip-calculator"] as const;
    for (const locale of locales) {
      const dictionary = getDictionary(locale);
      for (const slug of slugs) {
        const content = dictionary.calculators[slug];
        const note = twelfthReviewedBatchExampleNotes[locale]?.[slug];
        expect(note, `${locale}/${slug} localized example note`).toBeTruthy();
        expect(content, `${locale}/${slug} content`).toBeDefined();
        if (!content) throw new Error(`Missing localized content for ${locale}/${slug}`);
        expect(content.description, `${locale}/${slug} purpose`).toBeTruthy();
        expect(content.howTo, `${locale}/${slug} input guidance`).toBeTruthy();
        expect(content.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(content.example.question, `${locale}/${slug} example inputs`).toBeTruthy();
        expect(content.example.answer, `${locale}/${slug} example result`).toContain(note);
        expect(content.faqs.length, `${locale}/${slug} useful FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} route`).toContain(locale);
      }
    }
  });

  it("keeps the thirteenth reviewed batch complete and localized across 26 locales", () => {
    const slugs = ["average", "weighted-average", "unit-price", "probability", "area"] as const;
    for (const locale of locales) {
      const dictionary = getDictionary(locale);
      for (const slug of slugs) {
        const content = dictionary.calculators[slug];
        const note = thirteenthReviewedBatchExampleNotes[locale]?.[slug];
        expect(note, `${locale}/${slug} localized example note`).toBeTruthy();
        expect(content, `${locale}/${slug} content`).toBeDefined();
        if (!content) throw new Error(`Missing localized content for ${locale}/${slug}`);
        expect(content.description, `${locale}/${slug} purpose`).toBeTruthy();
        expect(content.howTo, `${locale}/${slug} input guidance`).toBeTruthy();
        expect(content.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(content.example.question, `${locale}/${slug} example inputs`).toBeTruthy();
        expect(content.example.answer, `${locale}/${slug} example result`).toContain(note);
        expect(content.faqs.length, `${locale}/${slug} useful FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} route`).toContain(locale);
      }
    }
  });

  it("renders Malaysia tax, EPF, and SOCSO engine-specific content in all locales", () => {
    const examples = {
      "malaysia-income-tax-calculator": { input: { income: "100000" }, values: [100000, 9400, 9.4] },
      "malaysia-epf-calculator": { input: { salary: "6000", ageBand: "under60" }, values: [660, 720, 1380] },
      "malaysia-socso-calculator": { input: { salary: "6000" }, values: [30, 6000] },
    } as const;
    expect(globalCountryRates.MY?.sources?.every(({ checkedAt }) => checkedAt === "2026-10-28")).toBe(true);
    for (const [slug, example] of Object.entries(examples)) {
      const result = calculateGlobalCountrySpecific(slug, example.input);
      expect(result && "results" in result ? result.results.map(({ value }) => value) : result).toEqual(example.values);
      for (const locale of supportedLocales) {
        const copy = malaysiaPolicyFollowups[locale]?.[slug];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(copy?.description, `${locale}/${slug} description`).toBeTruthy();
        expect(copy?.howTo, `${locale}/${slug} input guidance`).toBeTruthy();
        expect(copy?.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(copy?.exampleNote, `${locale}/${slug} example interpretation`).toBeTruthy();
        expect(copy?.faq, `${locale}/${slug} FAQ`).toBeTruthy();
        expect(page?.description).toContain(copy?.description);
        expect(page?.howTo).toBe(copy?.howTo);
        expect(page?.formula).toBe(copy?.formula);
        expect(page?.example.answer).toContain(copy?.exampleNote);
        expect(page?.faqs[0]).toEqual(copy?.faq);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
      }
    }
    expect(malaysiaPolicyFollowups.en?.["malaysia-socso-calculator"]?.exampleNote).toContain("RM29.75");
  });

  it("renders Malaysia SST and Philippines tax/SSS content against current engine examples in all locales", () => {
    const cases = {
      "malaysia-sst-calculator": { input: { amount: "100", rate: "8", direction: "exclusive" }, values: [100, 8, 108] },
      "philippines-income-tax-calculator": { input: { income: "1000000" }, values: [1000000, 152500, 15.25] },
      "philippines-sss-calculator": { input: { salary: "20000" }, values: [1000, 2000] },
    } as const;
    expect(globalCountryRates.MY?.sources?.some(({ url, checkedAt }) => url.includes("mysst.customs.gov.my") && checkedAt === "2026-10-28")).toBe(true);
    expect(globalCountryRates.PH?.sources?.some(({ url, checkedAt }) => url.includes("bir-cdn.bir.gov.ph") && checkedAt === "2026-10-28")).toBe(true);
    expect(globalCountryRates.PH?.sources?.some(({ url, checkedAt }) => url.includes("sss.gov.ph/pay-contribution") && checkedAt === "2026-10-28")).toBe(true);
    for (const [slug, sample] of Object.entries(cases)) {
      const result = calculateGlobalCountrySpecific(slug, sample.input);
      expect(result && "results" in result ? result.results.map(({ value }) => value) : result).toEqual(sample.values);
      for (const locale of supportedLocales) {
        const copy = malaysiaPhilippinesFollowups[locale]?.[slug];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(copy?.description, `${locale}/${slug} description`).toBeTruthy();
        expect(copy?.howTo, `${locale}/${slug} input guidance`).toBeTruthy();
        expect(copy?.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(copy?.exampleNote, `${locale}/${slug} example`).toBeTruthy();
        expect(copy?.faq, `${locale}/${slug} FAQ`).toBeTruthy();
        expect(page?.description).toContain(copy?.description);
        expect(page?.howTo).toBe(copy?.howTo);
        expect(page?.formula).toBe(copy?.formula);
        expect(page?.example.answer).toContain(copy?.exampleNote);
        expect(page?.faqs[0]).toEqual(copy?.faq);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
      }
    }
    expect(malaysiaPhilippinesFollowups.en?.["philippines-sss-calculator"]?.exampleNote).toContain("₱1,000");
  });

  it("renders Spain VAT, IRPF, and severance examples and scope notes in all 26 locales", () => {
    const cases = {
      "spain-vat-calculator": { input: { amount: "1000", rate: "21", direction: "exclusive" }, values: [1000, 210, 1210] },
      "spain-irpf-calculator": { input: { income: "30000", rate: "15" }, values: [30000, 4500, 15] },
      "spain-severance-pay-calculator": { input: { salary: "2500", years: "5", daysPerYear: "20" }, values: [82.19, 5, 8219.18] },
    } as const;
    const spainSources = countryRates.ES?.sources ?? [];
    for (const url of [
      "https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html",
      "https://www.boe.es/eli/es/l/1992/12/28/37/con",
      "https://www.boe.es/eli/es/l/2006/11/28/35/con",
      "https://www.boe.es/eli/es/rdlg/2015/10/23/2/con",
    ]) expect(spainSources.find((source) => source.url === url)?.checkedAt).toBe("2026-10-28");
    for (const [slug, sample] of Object.entries(cases)) {
      const result = calculateBySlug(slug, sample.input);
      expect(result && "results" in result ? result.results.map(({ value }) => value) : result).toEqual(sample.values);
      for (const locale of supportedLocales) {
        const addition = spainPolicyFollowups[locale]?.[slug];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(addition?.formula, `${locale}/${slug} model`).toBeTruthy();
        expect(addition?.exampleNote, `${locale}/${slug} verified example`).toBeTruthy();
        expect(addition?.faq, `${locale}/${slug} limitation FAQ`).toBeTruthy();
        expect(addition?.howTo, `${locale}/${slug} input guidance`).toBeTruthy();
        expect(page?.howTo).toBe(addition?.howTo);
        expect(page?.formula).toBe(addition?.formula);
        expect(page?.example.answer).toContain(addition?.exampleNote);
        expect(page?.faqs[0]).toEqual(addition?.faq);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
      }
    }
    expect(calculateCountrySpecific("spain-vat-calculator", { amount: "1210", rate: "21", direction: "inclusive" })).toMatchObject({ results: [{ value: 1000 }, { value: 210 }, { value: 1210 }] });
    expect(spainPolicyFollowups.en?.["spain-irpf-calculator"]?.exampleNote).toContain("€4,500");
    expect(spainPolicyFollowups.en?.["spain-severance-pay-calculator"]?.exampleNote).toContain("€8,219.18");
  });

  it("renders France salary, income-tax, and VAT scenarios against the engine in all locales", () => {
    const cases = {
      "france-gross-net-salary-calculator": { input: { salary: "60000", frequency: "annual", socialRate: "22" }, values: [60000, 11103.99, 13200, 0, 35696.01, 2974.67] },
      "france-income-tax-calculator": { input: { income: "30000" }, values: [30000, 2103.99, 7.01] },
      "france-vat-calculator": { input: { amount: "1000", rate: "20", direction: "exclusive" }, values: [1000, 200, 1200] },
    } as const;
    const franceSources = countryRates.FR?.sources ?? [];
    for (const url of [
      "https://www.impots.gouv.fr/sites/default/files/media/1_metier/5_international/actualite/dossier-de-presse-dinr-revenus-2025_03_2026.pdf",
      "https://bofip.impots.gouv.fr/bofip/2491-PGP.html/identifiant=BOI-IR-LIQ-20-10-20260407",
      "https://www.impots.gouv.fr/international-professionnel/fiscalite-des-entreprises",
      "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html",
      "https://www.urssaf.fr/accueil/employeur/cotisations/comprendre-cotisations/calcul-cotisations-employeur.html",
    ]) expect(franceSources.find((source) => source.url === url)?.checkedAt).toBe("2026-10-28");
    for (const [slug, sample] of Object.entries(cases)) {
      const result = calculateBySlug(slug, sample.input);
      expect(result && "results" in result ? result.results.map(({ value }) => value) : result).toEqual(sample.values);
      for (const locale of supportedLocales) {
        const addition = francePolicyFollowups[locale]?.[slug];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(addition?.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(addition?.howTo, `${locale}/${slug} input guidance`).toBeTruthy();
        expect(addition?.exampleNote, `${locale}/${slug} example`).toBeTruthy();
        expect(addition?.faq, `${locale}/${slug} limitation FAQ`).toBeTruthy();
        expect(page?.howTo).toBe(addition?.howTo);
        expect(page?.formula).toBe(addition?.formula);
        expect(page?.example.answer).toContain(addition?.exampleNote);
        expect(page?.faqs[0]).toEqual(addition?.faq);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
      }
    }
    expect(calculateBySlug("france-vat-calculator", { amount: "1200", rate: "20", direction: "inclusive" })).toMatchObject({ results: [{ value: 1000 }, { value: 200 }, { value: 1200 }] });
    expect(francePolicyFollowups.en?.["france-income-tax-calculator"]?.exampleNote).toContain("€2,103.99");
    expect(francePolicyFollowups.en?.["france-gross-net-salary-calculator"]?.exampleNote).toContain("€35,696.01");
  });

  it("renders Netherlands salary, VAT, and 30% facility scenarios against the engine in all locales", () => {
    const cases = {
      "netherlands-gross-net-salary-calculator": { input: { salary: "50000", frequency: "annual", socialRate: "0" }, values: [50000, 18076.22, 0, 31923.78, 2660.32] },
      "netherlands-vat-calculator": { input: { amount: "1000", rate: "21", direction: "exclusive" }, values: [1000, 210, 1210] },
      "netherlands-30-percent-ruling-calculator": { input: { salary: "80000", rate: "30" }, values: [80000, 24000, 56000] },
    } as const;
    const nlSources = countryRates.NL?.sources ?? [];
    for (const url of [
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/",
      "https://www.belastingdienst.nl/wps/wcm/connect/bldcontenten/belastingdienst/business/vat/vat_in_the_netherlands/calculating_vat/vat_tariffs",
      "https://www.belastingdienst.nl/wps/wcm/connect/en/individuals/content/coming-to-work-in-the-netherlands-30-percent-facility",
    ]) expect(nlSources.find((source) => source.url === url)?.checkedAt).toBe("2026-10-28");
    for (const [slug, sample] of Object.entries(cases)) {
      const result = calculateBySlug(slug, sample.input);
      expect(result && "results" in result ? result.results.map(({ value }) => value) : result).toEqual(sample.values);
      for (const locale of supportedLocales) {
        const addition = netherlandsPolicyFollowups[locale]?.[slug];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(addition?.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(addition?.howTo, `${locale}/${slug} instructions`).toBeTruthy();
        expect(addition?.exampleNote, `${locale}/${slug} example`).toBeTruthy();
        expect(addition?.faq, `${locale}/${slug} limitation FAQ`).toBeTruthy();
        expect(page?.howTo).toBe(addition?.howTo);
        expect(page?.formula).toBe(addition?.formula);
        expect(page?.example.answer).toContain(addition?.exampleNote);
        expect(page?.faqs[0]).toEqual(addition?.faq);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
        if (locale !== "en") expect(page?.formula, `${locale}/${slug} localized formula`).not.toBe(getDictionary("en").calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]]?.formula);
      }
    }
  });

  it("renders India GST, AY tax, and gross-net scenarios against the engine in all locales", () => {
    const cases = {
      "india-gst-calculator": { input: { amount: "10000", rate: "18", direction: "exclusive" }, values: [10000, 1800, 11800] },
      "india-income-tax-calculator": { input: { income: "1500000" }, values: [1500000, 105000, 7] },
      "india-gross-net-salary-calculator": { input: { salary: "1500000", frequency: "annual", socialRate: "0" }, values: [1500000, 93750, 0, 1406250, 117187.5] },
    } as const;
    const officialUrls = [
      "https://www.incometaxindia.gov.in/w/tax-rates-and-computation",
      "https://cbic-gst.gov.in/hindi/gst-goods-services-rates.html",
      "https://www.incometaxindia.gov.in/w/deductions/allowances-allowed-to-a-salaried-employee",
    ];
    for (const url of officialUrls) expect(countryRates.IN?.sources.find((source) => source.url === url)?.checkedAt).toBe("2026-10-28");
    for (const [slug, sample] of Object.entries(cases)) {
      const result = calculateBySlug(slug, sample.input);
      expect(result && "results" in result ? result.results.map(({ value }) => value) : result).toEqual(sample.values);
      for (const locale of supportedLocales) {
        const addition = slug === "india-gross-net-salary-calculator" ? indiaSalaryStandardDeductionFollowups[locale] : indiaPolicyFollowups[locale]?.[slug];
        const page = getDictionary(locale).calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]];
        expect(addition?.howTo, `${locale}/${slug} instructions`).toBeTruthy();
        expect(addition?.formula, `${locale}/${slug} formula`).toBeTruthy();
        expect(addition?.exampleNote || addition?.example?.answer, `${locale}/${slug} example`).toBeTruthy();
        expect(addition?.faq, `${locale}/${slug} FAQ`).toBeTruthy();
        expect(page?.howTo).toBe(addition?.howTo);
        expect(page?.formula).toBe(addition?.formula);
        if (addition?.example) expect(page?.example).toEqual(addition.example);
        else expect(page?.example.answer).toContain(addition?.exampleNote);
        expect(page?.faqs[0]).toEqual(addition?.faq);
        expect(supportedLocalesForCalculator(slug)).toContain(locale);
        if (locale !== "en") expect(page?.formula, `${locale}/${slug} localized formula`).not.toBe(getDictionary("en").calculators[slug as keyof ReturnType<typeof getDictionary>["calculators"]]?.formula);
      }
    }
  });
});
