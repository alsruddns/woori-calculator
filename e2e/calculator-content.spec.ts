import { expect, test, type Page } from "@playwright/test";
import { reviewedBatchExampleNotes, secondReviewedBatchExampleNotes, thirdReviewedBatchExampleNotes, fourthReviewedBatchExampleNotes, fifthReviewedBatchExampleNotes, sixthReviewedBatchExampleNotes, seventhReviewedBatchExampleNotes, eighthReviewedBatchExampleNotes, ninthReviewedBatchExampleNotes, tenthReviewedBatchExampleNotes, eleventhReviewedBatchExampleNotes, twelfthReviewedBatchExampleNotes, thirteenthReviewedBatchExampleNotes, fourteenthReviewedBatchExampleNotes, vatPolicyExampleNotes, nextPolicyExampleNotes, fourthPolicyExampleNotes, fifthPolicyExampleNotes, sixthPolicyExampleNotes, seventhPolicyExampleNotes, unemploymentBenefitExampleNotes, koreanPolicyContextDescriptions, gstCountryContextDescriptions, auSgPolicyContextDescriptions } from "../src/i18n/dictionaries/locale-quality-followup";
import { indiaPolicyFollowups } from "../src/i18n/dictionaries/india-policy-followups";
import { indiaSalaryStandardDeductionFollowups } from "../src/i18n/dictionaries/india-salary-standard-deduction-followups";
import { indiaInvestmentScenarioFollowups } from "../src/i18n/dictionaries/india-investment-scenario-followups";
import { auSgPayrollTaxFollowups } from "../src/i18n/dictionaries/au-sg-payroll-tax-followups";
import { singaporeGrossNetCorrections } from "../src/i18n/dictionaries/sg-gross-net-corrections";
import { germanyVatFollowups } from "../src/i18n/dictionaries/germany-vat-followups";
import { hkPolicyFollowups } from "../src/i18n/dictionaries/hk-policy-followups";
import { malaysiaPolicyFollowups } from "../src/i18n/dictionaries/malaysia-policy-followups";
import { malaysiaPhilippinesFollowups } from "../src/i18n/dictionaries/malaysia-philippines-followups";
import { philippinesPayrollFollowups } from "../src/i18n/dictionaries/philippines-payroll-followups";
import { uaeLaborVatFollowups } from "../src/i18n/dictionaries/uae-labor-vat-followups";
import { newZealandPayrollSavingsFollowups } from "../src/i18n/dictionaries/new-zealand-payroll-savings-followups";
import { spainPolicyFollowups } from "../src/i18n/dictionaries/spain-policy-followups";
import { francePolicyFollowups } from "../src/i18n/dictionaries/france-policy-followups";
import { netherlandsPolicyFollowups } from "../src/i18n/dictionaries/netherlands-policy-followups";
import { brazilPayrollFollowups } from "../src/i18n/dictionaries/brazil-payroll-followups";
import { brazilGrossNetFollowups } from "../src/i18n/dictionaries/brazil-gross-net-followups";
import { japanSalaryFollowups } from "../src/i18n/dictionaries/japan-salary-followups";
import { germanyGrossNetFollowups } from "../src/i18n/dictionaries/germany-gross-net-followups";
import { germanyIncomeTaxFollowups } from "../src/i18n/dictionaries/germany-income-tax-followups";
import { germanyOvertimeFollowups } from "../src/i18n/dictionaries/germany-overtime-followups";
import { germanyVacationPayFollowups } from "../src/i18n/dictionaries/germany-vacation-pay-followups";
import { spainGrossNetFollowups } from "../src/i18n/dictionaries/spain-gross-net-followups";
import { japanOvertimeFollowups } from "../src/i18n/dictionaries/japan-overtime-followups";
import { japanNightHolidayFollowups } from "../src/i18n/dictionaries/japan-night-holiday-followups";
import { franceOvertimeFollowups } from "../src/i18n/dictionaries/france-overtime-followups";
import { netherlandsHolidayFollowups } from "../src/i18n/dictionaries/netherlands-holiday-followups";
import { brazilThirteenthFollowups } from "../src/i18n/dictionaries/brazil-thirteenth-followups";
import { vietnamGrossNetFollowups } from "../src/i18n/dictionaries/vietnam-gross-net-followups";
import { vietnamIncomeTaxFollowups } from "../src/i18n/dictionaries/vietnam-income-tax-followups";
import { vietnamSocialInsuranceFollowups } from "../src/i18n/dictionaries/vietnam-social-insurance-followups";
import { chinaGrossNetFollowups } from "../src/i18n/dictionaries/china-gross-net-followups";
import { chinaIncomeTaxFollowups } from "../src/i18n/dictionaries/china-income-tax-followups";
import { chinaSocialInsuranceFollowups } from "../src/i18n/dictionaries/china-social-insurance-followups";
import { chinaVatFollowups } from "../src/i18n/dictionaries/china-vat-followups";
import { taiwanGrossNetFollowups } from "../src/i18n/dictionaries/taiwan-gross-net-followups";
import { taiwanIncomeTaxFollowups } from "../src/i18n/dictionaries/taiwan-income-tax-followups";
import { taiwanLaborInsuranceFollowups } from "../src/i18n/dictionaries/taiwan-labor-insurance-followups";
import { taiwanVatFollowups } from "../src/i18n/dictionaries/taiwan-vat-followups";
import { italyGrossNetFollowups } from "../src/i18n/dictionaries/italy-gross-net-followups";
import { italyIncomeTaxFollowups } from "../src/i18n/dictionaries/italy-income-tax-followups";
import { italyVatFollowups } from "../src/i18n/dictionaries/italy-vat-followups";
import { usPaycheckFollowups } from "../src/i18n/dictionaries/us-paycheck-followups";

const locales = [
  "ko", "en", "ja", "zh", "es", "pt-br", "de", "fr", "vi", "id", "th", "zh-tw", "it", "nl", "hi",
  "ru", "tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el",
] as const;
const reviewedSlugs = ["average", "weighted-average", "unit-price", "probability", "area"] as const;
const editorialBatchSlugs = ["percentage", "ratio", "proportion", "median", "decimal-fraction"] as const;
const secondEditorialBatchSlugs = ["change-rate", "discount", "cagr", "simple-interest", "compound-interest"] as const;
const thirdEditorialBatchSlugs = ["date-difference", "dday", "age", "workdays", "unit-converter"] as const;
const fourthEditorialBatchSlugs = ["fire-retirement-calculator", "dividend-growth-calculator", "inflation-adjusted-return-calculator", "position-size-calculator", "stop-loss-take-profit-calculator"] as const;
const fifthEditorialBatchSlugs = ["stock-profit-after-fees-calculator", "loan-early-repayment-calculator", "rent-vs-buy-calculator", "electricity-cost-calculator", "travel-budget-calculator"] as const;
const sixthEditorialBatchSlugs = ["freelancer-hourly-rate-calculator", "break-even-point-calculator", "savings-interest", "deposit-interest", "loan-interest"] as const;
const seventhEditorialBatchSlugs = ["stock-average-price", "dividend", "profit-loss", "margin", "markup"] as const;
const eighthEditorialBatchSlugs = ["product-margin", "salary-conversion", "bmi", "pace", "fuel-cost"] as const;
const ninthEditorialBatchSlugs = ["ltv", "dti", "dsr", "loan-refinance", "prepayment-fee"] as const;
const tenthEditorialBatchSlugs = ["loan-affordability", "hourly-wage", "fuel-efficiency", "calorie-per-serving", "trip-split"] as const;
const eleventhEditorialBatchSlugs = ["annual-leave-allowance", "tenure", "time-arithmetic", "pregnancy", "utility-bill"] as const;
const twelfthEditorialBatchSlugs = ["fraction", "standard-deviation", "vehicle-cost", "taxi-fare", "tip-calculator"] as const;
const thirteenthEditorialBatchSlugs = ["average", "weighted-average", "unit-price", "probability", "area"] as const;
const fourteenthEditorialBatchSlugs = ["percentile", "aspect-ratio", "scale-ratio"] as const;
const viewports = [320, 360, 375, 390, 430, 768, 1024, 1440] as const;

test.describe("South Korea unemployment benefit localized example", () => {
  for (const locale of locales) {
    test(locale + " renders the localized example in initial SSR HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/unemployment-benefit");
      expect(response?.status()).toBe(200);
      const note = unemploymentBenefitExampleNotes[locale]?.["unemployment-benefit"];
      expect(note).toBeTruthy();
      const html = await response!.text();
      expect(html).toContain(note);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article")).toContainText(note ?? "");
    });
  }

  test("matches the modeled KRW result and fits all required widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/ko/calculators/unemployment-benefit");
    await waitForCalculatorHydration(page);
    await page.locator("#unemployment-benefit-monthlyWage").fill("3400000");
    await page.locator("#unemployment-benefit-age").fill("35");
    await page.locator("#unemployment-benefit-insuredYears").fill("0.9");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("68,000");
    await expect(page.locator("[aria-live='polite']")).toContainText("8,160,000");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "unemployment benefit page at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });
});

test("Brazil payroll detail cards render in SSR and calculator flows remain usable", async ({ page }) => {
  const errors = collectBrowserErrors(page);
  const slugs = ["brazil-inss-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator"] as const;
  for (const slug of slugs) {
    const content = brazilPayrollFollowups["pt-br"]![slug];
    const response = await page.goto("/pt-br/calculators/" + slug);
    expect(response?.status()).toBe(200);
    const html = await response!.text();
    expect(html).toContain(content.description!);
    expect(html).toContain(content.formula!);
    expect(html).toContain(content.example!.answer);
    expect(html).toContain(content.faq!.question);
    expect(html).toMatch(/<h1\b/);
    expect(html).toMatch(/<h2\b/);
    expect(html).toMatch(/rel=["']canonical["']/i);
    expect(html).toMatch(/hrefLang=/i);
    expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
  }

  await page.goto("/pt-br/calculators/brazil-inss-calculator");
  await page.locator("#brazil-inss-calculator-salary").fill("5000");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("501,51");

  await page.goto("/pt-br/calculators/brazil-irrf-calculator");
  await page.locator("#brazil-irrf-calculator-salary").fill("5000");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("0");

  await page.goto("/pt-br/calculators/brazil-fgts-calculator");
  await page.locator("#brazil-fgts-calculator-salary").fill("3000");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("240");
  await expect(page.locator("[aria-live='polite']")).toContainText("2.880");

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
    expect(dimensions.body, "Brazil payroll cards at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
  }
  expect(errors).toEqual([]);
});

test("Brazil gross-to-net assumptions render in every locale and calculate the documented scenario", async ({ page }) => {
  const errors = collectBrowserErrors(page);
  const ssrResponses = await Promise.all(locales.map(async (locale) => {
    const copy = brazilGrossNetFollowups[locale];
    const response = await page.request.get("/" + locale + "/calculators/brazil-gross-net-salary-calculator");
    expect(response?.status()).toBe(200);
    const html = await response!.text();
    expect(html).toContain(copy.description!);
    expect(html).toContain(copy.howTo!);
    expect(html).toContain(copy.formula!);
    expect(html).toContain(copy.example!.answer);
    expect(html).toContain(copy.faq!.question);
    expect(html).toMatch(/<h1\b/);
    expect(html).toMatch(/<h2\b/);
    expect(html).toMatch(/rel=["']canonical["']/i);
    expect(html).toMatch(/hrefLang=/i);
    expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    return locale;
  }));
  expect(ssrResponses).toHaveLength(26);

  await page.goto("/pt-br/calculators/brazil-gross-net-salary-calculator");
  await waitForCalculatorHydration(page);
  await page.locator("#brazil-gross-net-salary-calculator-salary").fill("5000");
  await page.locator("#brazil-gross-net-salary-calculator-frequency").selectOption("monthly");
  await page.locator("#brazil-gross-net-salary-calculator-socialRate").fill("5");
  await page.locator("#brazil-gross-net-salary-calculator-taxRate").fill("15");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("48.000");
  await expect(page.locator("[aria-live='polite']")).toContainText("4.000");
  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
    expect(dimensions.body, "Brazil gross-net page at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
  }
  expect(errors).toEqual([]);
});

for (const [slug, copyKey] of [["japan-annual-salary-calculator", "annual"], ["japan-monthly-salary-calculator", "monthly"]] as const) {
  test(slug + " localized model content is present in SSR HTML", async ({ page }) => {
    const responses = await Promise.all(locales.map(async (locale) => {
      const copy = japanSalaryFollowups[locale][copyKey];
      const response = await page.request.get("/" + locale + "/calculators/" + slug);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain(copy.description);
      expect(html).toContain(copy.howTo);
      expect(html).toContain(copy.formula);
      expect(html).toContain(copy.example!.answer);
      expect(html).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html).toMatch(/rel=["']canonical["']/i);
      expect(html).toMatch(/hrefLang=/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      return locale;
    }));
    expect(responses).toHaveLength(26);
  });
}

test("Japan annual and monthly salary examples calculate and fit all required widths", async ({ page }) => {
  const errors = collectBrowserErrors(page);
  await page.goto("/ja/calculators/japan-annual-salary-calculator");
  await waitForCalculatorHydration(page);
  await page.locator("#japan-annual-salary-calculator-annualSalary").fill("3600000");
  await page.locator("#japan-annual-salary-calculator-ageGroup").selectOption("under40");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("2,872,272");
  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
    expect(dimensions.body, "Japan annual salary at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
  }

  await page.goto("/ja/calculators/japan-monthly-salary-calculator");
  await waitForCalculatorHydration(page);
  await page.locator("#japan-monthly-salary-calculator-monthlySalary").fill("300000");
  await page.locator("#japan-monthly-salary-calculator-ageGroup").selectOption("under40");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("239,356");
  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
    expect(dimensions.body, "Japan monthly salary at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
  }
  expect(errors).toEqual([]);
});

test("Germany gross-to-net scenario content is SSR-localized and the example works responsively", async ({ page }) => {
  const responses = await Promise.all(locales.map(async (locale) => {
    const copy = germanyGrossNetFollowups[locale];
    const response = await page.request.get("/" + locale + "/calculators/germany-gross-net-salary-calculator");
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(copy.description!);
    expect(html).toContain(copy.howTo!);
    expect(html).toContain(copy.formula!);
    expect(html).toContain(copy.example!.answer);
    expect(html).toContain(copy.faq!.question);
    expect(html).toMatch(/<h1\b/);
    expect(html).toMatch(/<h2\b/);
    expect(html).toMatch(/rel=["']canonical["']/i);
    expect(html).toMatch(/hrefLang=/i);
    expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    return locale;
  }));
  expect(responses).toHaveLength(26);

  const errors = collectBrowserErrors(page);
  await page.goto("/en/calculators/germany-gross-net-salary-calculator");
  await waitForCalculatorHydration(page);
  await page.locator("#germany-gross-net-salary-calculator-salary").fill("50000");
  await page.locator("#germany-gross-net-salary-calculator-frequency").selectOption("annual");
  await page.locator("#germany-gross-net-salary-calculator-socialRate").fill("21.15");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("28,876.67");
  await expect(page.locator("[aria-live='polite']")).toContainText("2,406.39");
  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
    expect(dimensions.body, "Germany gross-net page at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
  }
  expect(errors).toEqual([]);
});

test("Germany income-tax content is SSR-localized and the implemented example works", async ({ page }) => {
  const responses = await Promise.all(locales.map(async (locale) => {
    const copy = germanyIncomeTaxFollowups[locale];
    const response = await page.request.get("/" + locale + "/calculators/germany-income-tax-calculator");
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(copy.description);
    expect(html).toContain(copy.howTo);
    expect(html).toContain(copy.formula);
    expect(html).toContain(copy.example!.answer);
    expect(html).toContain(copy.faq!.question);
    expect(html).toMatch(/<h1\b/);
    expect(html).toMatch(/<h2\b/);
    expect(html).toMatch(/rel=["']canonical["']/i);
    expect(html).toMatch(/hrefLang=/i);
    expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    return locale;
  }));
  expect(responses).toHaveLength(26);

  const errors = collectBrowserErrors(page);
  await page.goto("/en/calculators/germany-income-tax-calculator");
  await waitForCalculatorHydration(page);
  await page.locator("#germany-income-tax-calculator-income").fill("50000");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("10,548.33");
  await expect(page.locator("[aria-live='polite']")).toContainText("21.1");
  expect(errors).toEqual([]);
});

test("Germany overtime content is SSR-localized and the user-entered scenario works", async ({ page }) => {
  const responses = await Promise.all(locales.map(async (locale) => {
    const copy = germanyOvertimeFollowups[locale];
    const response = await page.request.get("/" + locale + "/calculators/germany-overtime-pay-calculator");
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(copy.description);
    expect(html).toContain(copy.howTo);
    expect(html).toContain(copy.formula);
    expect(html).toContain(copy.example!.answer);
    expect(html).toContain(copy.faq!.question);
    expect(html).toMatch(/<h1\b/);
    expect(html).toMatch(/<h2\b/);
    expect(html).toMatch(/rel=["']canonical["']/i);
    expect(html).toMatch(/hrefLang=/i);
    expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    return locale;
  }));
  expect(responses).toHaveLength(26);

  const errors = collectBrowserErrors(page);
  await page.goto("/en/calculators/germany-overtime-pay-calculator");
  await waitForCalculatorHydration(page);
  await page.locator("#germany-overtime-pay-calculator-salary").fill("20");
  await page.locator("#germany-overtime-pay-calculator-hours").fill("8");
  await page.locator("#germany-overtime-pay-calculator-multiplier").fill("1.5");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("240");
  expect(errors).toEqual([]);
});

test("Germany vacation-pay content is SSR-localized and the percentage example works", async ({ page }) => {
  const responses = await Promise.all(locales.map(async (locale) => {
    const copy = germanyVacationPayFollowups[locale];
    const response = await page.request.get("/" + locale + "/calculators/germany-vacation-pay-calculator");
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(copy.description);
    expect(html).toContain(copy.howTo);
    expect(html).toContain(copy.formula);
    expect(html).toContain(copy.example!.answer);
    expect(html).toContain(copy.faq!.question);
    expect(html).toMatch(/<h1\b/);
    expect(html).toMatch(/<h2\b/);
    expect(html).toMatch(/rel=["']canonical["']/i);
    expect(html).toMatch(/hrefLang=/i);
    expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    return locale;
  }));
  expect(responses).toHaveLength(26);

  const errors = collectBrowserErrors(page);
  await page.goto("/en/calculators/germany-vacation-pay-calculator");
  await waitForCalculatorHydration(page);
  await page.locator("#germany-vacation-pay-calculator-salary").fill("50000");
  await page.locator("#germany-vacation-pay-calculator-rate").fill("5");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("2,500");
  expect(errors).toEqual([]);
});

test("Spain gross-to-net content is SSR-localized and the modeled salary flow works", async ({ page }) => {
  const responses = await Promise.all(locales.map(async (locale) => {
    const copy = spainGrossNetFollowups[locale];
    const response = await page.request.get("/" + locale + "/calculators/spain-gross-net-salary-calculator");
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(copy.description);
    expect(html).toContain(copy.howTo);
    expect(html).toContain(copy.formula);
    expect(html).toContain(copy.example!.answer);
    expect(html).toContain(copy.faq!.question);
    expect(html).toMatch(/<h1\b/);
    expect(html).toMatch(/<h2\b/);
    expect(html).toMatch(/rel=["']canonical["']/i);
    expect(html).toMatch(/hrefLang=/i);
    expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    return locale;
  }));
  expect(responses).toHaveLength(26);

  const errors = collectBrowserErrors(page);
  await page.goto("/en/calculators/spain-gross-net-salary-calculator");
  await waitForCalculatorHydration(page);
  await page.locator("#spain-gross-net-salary-calculator-salary").fill("50000");
  await page.locator("#spain-gross-net-salary-calculator-frequency").selectOption("annual");
  await page.locator("#spain-gross-net-salary-calculator-taxRate").fill("15");
  await page.locator("#spain-gross-net-salary-calculator-socialRate").fill("6.48");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("39,260");
  await expect(page.locator("[aria-live='polite']")).toContainText("3,271.67");
  expect(errors).toEqual([]);
});

test("Japan overtime content is SSR-localized and the over-60-hour scenario works", async ({ page }) => {
  const responses = await Promise.all(locales.map(async (locale) => {
    const copy = japanOvertimeFollowups[locale];
    const response = await page.request.get("/" + locale + "/calculators/japan-overtime-pay-calculator");
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(copy.description);
    expect(html).toContain(copy.howTo);
    expect(html).toContain(copy.formula);
    expect(html).toContain(copy.example!.answer);
    expect(html).toContain(copy.faq!.question);
    expect(html).toMatch(/<h1\b/);
    expect(html).toMatch(/<h2\b/);
    expect(html).toMatch(/rel=["']canonical["']/i);
    expect(html).toMatch(/hrefLang=/i);
    expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    return locale;
  }));
  expect(responses).toHaveLength(26);

  const errors = collectBrowserErrors(page);
  await page.goto("/en/calculators/japan-overtime-pay-calculator");
  await waitForCalculatorHydration(page);
  await page.locator("#japan-overtime-pay-calculator-wageMode").selectOption("hourly");
  await page.locator("#japan-overtime-pay-calculator-hourlyWage").fill("1500");
  await page.locator("#japan-overtime-pay-calculator-overtimeHours").fill("10");
  await page.locator("#japan-overtime-pay-calculator-over60Hours").fill("2");
  await page.locator("#japan-overtime-pay-calculator-overtimeRate").fill("25");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("[aria-live='polite']")).toContainText("23,250");
  expect(errors).toEqual([]);
});

test.describe("South Korea VAT policy content", () => {
  for (const locale of locales) {
    test(locale + " VAT localized scope is present in server HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/vat");
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toContain(vatPolicyExampleNotes[locale]?.vat);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article")).toContainText(vatPolicyExampleNotes[locale]?.vat ?? "");
    });
  }

  test("rounds in won, exposes sources, and fits all required widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/ko/calculators/vat");
    await waitForCalculatorHydration(page);
    await page.locator("#vat-amount").fill("100000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("article")).toContainText("10,000");
    await expect(page.locator("article")).toContainText("110,000");
    await expect(page.locator('a[href*="law.go.kr"]')).toBeVisible();
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "VAT page at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });
});

test.describe("next policy batch localized SSR", () => {
  const slugs = ["withholding-tax-3-3", "japan-consumption-tax-calculator", "uk-vat-calculator"] as const;
  for (const [index, locale] of locales.entries()) {
    const slug = slugs[index % slugs.length]!;
    test(locale + "/" + slug + " renders its localized policy example in initial HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const note = nextPolicyExampleNotes[locale]?.[slug];
      const html = await response!.text();
      expect(note).toBeTruthy();
      expect(html).toContain(note);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article")).toContainText(note ?? "");
    });
  }

  for (const locale of locales) {
    test(locale + "/germany-vat-calculator renders localized details in initial HTML", async ({ page }) => {
      const copy = germanyVatFollowups[locale]?.["germany-vat-calculator"];
      expect(copy?.description).toBeTruthy();
      const response = await page.goto("/" + locale + "/calculators/germany-vat-calculator");
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toContain(copy?.description ?? "");
      expect(html).toContain(copy?.formula ?? "");
      expect(html).toContain(copy?.exampleNote ?? "");
      expect(html).toContain(copy?.faq?.question ?? "");
      await expect(page.locator("article")).toContainText(copy?.faq?.question ?? "");
    });
  }

  test("verifies live tax examples and responsive layout at eight widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/ko/calculators/withholding-tax-3-3");
    await waitForCalculatorHydration(page);
    await page.locator("#withholding-tax-3-3-amount").fill("1000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("article")).toContainText("33,000");
    await expect(page.locator("article")).toContainText("967,000");

    await page.goto("/ja/calculators/japan-consumption-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#japan-consumption-tax-calculator-net").fill("1000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("article")).toContainText("100");
    await expect(page.locator("article")).toContainText("1,100");

    await page.goto("/en/calculators/uk-vat-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#uk-vat-calculator-amount").fill("100");
    await page.locator("#uk-vat-calculator-rate").fill("20");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("article")).toContainText("20.00");
    await expect(page.locator("article")).toContainText("120.00");

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "policy detail at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });
});

test.describe("four country GST policy examples", () => {
  const slugs = ["canada-gst-hst-calculator", "australia-gst-calculator", "singapore-gst-calculator", "new-zealand-gst-calculator"] as const;
  for (const [index, locale] of locales.entries()) {
    const slug = slugs[index % slugs.length]!;
    test(locale + "/" + slug + " includes localized tax example in SSR HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug, { waitUntil: "domcontentloaded" });
      const note = fourthPolicyExampleNotes[locale]?.[slug];
      const context = gstCountryContextDescriptions[locale]?.[slug];
      expect(response?.status()).toBe(200);
      expect(note).toBeTruthy();
      expect(context).toBeTruthy();
      const html = await response!.text();
      expect(html).toContain(note);
      expect(html).toContain(context);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article")).toContainText(note ?? "");
      await expect(page.locator("article")).toContainText(context ?? "");
    });
  }

  test("checks live GST arithmetic, SSR cards, and all required viewport widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    for (const [slug, rate, total] of [["canada-gst-hst-calculator", "5", "105.00"], ["australia-gst-calculator", "10", "110.00"], ["singapore-gst-calculator", "9", "109.00"], ["new-zealand-gst-calculator", "15", "115.00"]] as const) {
      await page.goto("/en/calculators/" + slug);
      await waitForCalculatorHydration(page);
      await page.locator("#" + slug + "-amount").fill("100");
      await page.locator("#" + slug + "-rate").fill(rate);
      await page.locator('form button[type="submit"]').click();
      await expect(page.locator("article")).toContainText(total);
      for (const width of viewports) {
        await page.setViewportSize({ width, height: 900 });
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
        expect(dimensions.body, slug + " detail at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    }
    expect(errors).toEqual([]);
  });
});

test.describe("Australia income/super and Singapore CPF examples", () => {
  const slugs = ["australia-income-tax-calculator", "australia-superannuation-calculator", "singapore-cpf-calculator"] as const;
  for (const [index, locale] of locales.entries()) {
    const slug = slugs[index % slugs.length]!;
    test(locale + "/" + slug + " renders its localized worked example in SSR HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      const note = fifthPolicyExampleNotes[locale]?.[slug];
      const context = auSgPolicyContextDescriptions[locale]?.[slug];
      expect(response?.status()).toBe(200);
      expect(note).toBeTruthy();
      expect(context).toBeTruthy();
      const html = await response!.text();
      expect(html).toContain(note);
      expect(html).toContain(context);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      await expect(page.locator("article")).toContainText(note ?? "");
    });
  }

  test("checks browser examples and responsive widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/australia-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#australia-income-tax-calculator-income").fill("80000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("14,520");

    await page.goto("/en/calculators/australia-superannuation-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#australia-superannuation-calculator-annualSalary").fill("100000");
    await page.locator("#australia-superannuation-calculator-annualContribution").fill("6000");
    await page.locator("#australia-superannuation-calculator-employerRate").fill("12");
    await page.locator("#australia-superannuation-calculator-rate").fill("0");
    await page.locator("#australia-superannuation-calculator-years").fill("1");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("18,000");

    await page.goto("/en/calculators/singapore-cpf-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#singapore-cpf-calculator-salary").fill("6000");
    await page.locator("#singapore-cpf-calculator-age").fill("35");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("2,220");

    for (const slug of slugs) {
      await page.goto("/en/calculators/" + slug);
      for (const width of viewports) {
        await page.setViewportSize({ width, height: 900 });
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
        expect(dimensions.body, slug + " detail at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    }
    expect(errors).toEqual([]);
  });
});

test.describe("Philippines payroll content batch", () => {
  const slugs = ["philippines-philhealth-calculator", "philippines-pagibig-calculator", "philippines-gross-net-salary-calculator"] as const;
  for (const locale of locales) for (const slug of slugs) {
    test(locale + "/" + slug + " includes localized editorial cards in initial HTML", async ({ page }) => {
      const copy = philippinesPayrollFollowups[locale]?.[slug];
      expect(copy?.description).toBeTruthy();
      const response = await page.request.get("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toContain(copy?.description ?? "");
      expect(html).toContain(copy?.howTo ?? "");
      expect(html).toContain(copy?.formula ?? "");
      expect(html).toContain(copy?.exampleNote ?? "");
      expect(html).toContain(copy?.faq?.question ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    });
  }

  test("matches all three engine examples and stays within eight viewport widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/philippines-philhealth-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#philippines-philhealth-calculator-salary").fill("30000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("750");
    await expect(page.locator("[aria-live='polite']")).toContainText("1,500");

    await page.goto("/en/calculators/philippines-pagibig-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#philippines-pagibig-calculator-salary").fill("30000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("200");
    await expect(page.locator("[aria-live='polite']")).toContainText("400");

    await page.goto("/en/calculators/philippines-gross-net-salary-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#philippines-gross-net-salary-calculator-salary").fill("60000");
    await page.locator("#philippines-gross-net-salary-calculator-frequency").selectOption("monthly");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("86,500");
    await expect(page.locator("[aria-live='polite']")).toContainText("49,541.67");

    for (const slug of slugs) {
      await page.goto("/en/calculators/" + slug);
      for (const width of viewports) {
        await page.setViewportSize({ width, height: 900 });
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
        expect(dimensions.body, slug + " detail at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    }
    expect(errors).toEqual([]);
  });
});

test.describe("Australia and Singapore payroll/tax detail", () => {
  const slugs = ["australia-gross-net-salary-calculator", "singapore-gross-net-salary-calculator", "singapore-income-tax-calculator"] as const;
  for (const [index, locale] of locales.entries()) {
    const slug = slugs[index % slugs.length]!;
    test(locale + "/" + slug + " serves localized detail in initial HTML", async ({ page }) => {
      const copy = auSgPayrollTaxFollowups[locale]?.[slug];
      const correction = slug === "singapore-gross-net-salary-calculator" ? singaporeGrossNetCorrections[locale] : undefined;
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      expect(copy?.description).toBeTruthy();
      expect(copy?.howTo).toBeTruthy();
      expect(copy?.formula).toBeTruthy();
      expect(copy?.exampleNote).toBeTruthy();
      expect(copy?.faq).toBeTruthy();
      const html = await response!.text();
      for (const text of [copy!.description!, correction?.howTo ?? copy!.howTo!, correction?.formula ?? copy!.formula!, copy!.exampleNote!, copy!.faq!.question, copy!.faq!.answer, correction?.description]) if (text) expect(html).toContain(text);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("canonical");
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html.toLowerCase()).not.toContain('name="robots" content="noindex');
      await expect(page.locator("article")).toContainText(copy!.exampleNote!);
      await expect(page.locator("article")).toContainText(copy!.faq!.question);
    });
  }

  test("checks the worked pay/tax calculations and all responsive widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    const examples: readonly [string, string, string][] = [
      ["australia-gross-net-salary-calculator", "#australia-gross-net-salary-calculator-salary", "63,880"],
      ["singapore-gross-net-salary-calculator", "#singapore-gross-net-salary-calculator-salary", "54,810"],
      ["singapore-income-tax-calculator", "#singapore-income-tax-calculator-income", "5,650"],
    ];
    for (const [slug, selector, result] of examples) {
      await page.goto("/en/calculators/" + slug);
      await waitForCalculatorHydration(page);
      await page.locator(selector).fill(slug === "singapore-gross-net-salary-calculator" ? "6000" : slug === "singapore-income-tax-calculator" ? "100000" : "80000");
      if (slug.includes("gross-net-salary")) {
        await page.locator("#" + slug + "-frequency").selectOption(slug === "singapore-gross-net-salary-calculator" ? "monthly" : "annual");
      }
      await page.locator('form button[type="submit"]').click();
      await expect(page.locator("[aria-live='polite']")).toContainText(result);
      for (const width of viewports) {
        await page.setViewportSize({ width, height: 900 });
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
        expect(dimensions.body, slug + " at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    }
    expect(errors).toEqual([]);
  });
});

test.describe("South Korea wage and employee policy examples", () => {
  const slugs = ["minimum-wage", "severance-pay", "social-insurance"] as const;
  for (const [index, locale] of locales.entries()) {
    const slug = slugs[index % slugs.length]!;
    test(locale + "/" + slug + " includes South Korea example in SSR HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      const note = sixthPolicyExampleNotes[locale]?.[slug];
      const context = koreanPolicyContextDescriptions[locale]?.[slug];
      expect(response?.status()).toBe(200);
      expect(note).toBeTruthy();
      expect(context).toBeTruthy();
      const html = await response!.text();
      expect(html).toContain(note);
      expect(html).toContain(context);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      await expect(page.locator("article")).toContainText(note ?? "");
      await expect(page.locator("article")).toContainText(context ?? "");
    });
  }

  test("checks live KRW examples and all required viewport widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/ko/calculators/minimum-wage");
    await waitForCalculatorHydration(page);
    await page.locator("#minimum-wage-hourlyWage").fill("10000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("-₩320");
    await expect(page.locator("[aria-live='polite']")).toContainText("2,156,880");

    await page.goto("/ko/calculators/severance-pay");
    await waitForCalculatorHydration(page);
    await page.locator("#severance-pay-start").fill("2025-01-01");
    await page.locator("#severance-pay-lastWorkday").fill("2025-12-31");
    await page.locator("#severance-pay-averageDailyWage").fill("100000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("3,000,000");

    await page.goto("/ko/calculators/social-insurance");
    await waitForCalculatorHydration(page);
    await page.locator("#social-insurance-monthlyWage").fill("4000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("388,696");

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "South Korea policy detail at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });
});

test.describe("Policy calculator worked examples", () => {
  const slugs = ["japan-overtime-pay-calculator", "japan-night-holiday-pay-calculator", "germany-vat-calculator"] as const;
  for (const [index, locale] of locales.entries()) {
    const slug = slugs[index % slugs.length]!;
    test(locale + "/" + slug + " includes the localized worked example in SSR HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      const note = slug === "japan-night-holiday-pay-calculator"
        ? japanNightHolidayFollowups[locale].example?.answer
        : slug === "japan-overtime-pay-calculator"
          ? japanOvertimeFollowups[locale].example?.answer
          : seventhPolicyExampleNotes[locale]?.[slug];
      expect(response?.status()).toBe(200);
      expect(note).toBeTruthy();
      const html = await response!.text();
      expect(html).toContain(note);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html.toLowerCase()).toContain("canonical");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article")).toContainText(note ?? "");
    });
  }

  test("matches the overtime, overlapping night premium, VAT result, and responsive widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/ja/calculators/japan-overtime-pay-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#japan-overtime-pay-calculator-hourlyWage").fill("1500");
    await page.locator("#japan-overtime-pay-calculator-overtimeHours").fill("10");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("18,750");

    await page.goto("/ja/calculators/japan-night-holiday-pay-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#japan-night-holiday-pay-calculator-hourlyWage").fill("1500");
    await page.locator("#japan-night-holiday-pay-calculator-overtimeNightHours").fill("2");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("4,500");

    await page.goto("/de/calculators/germany-vat-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#germany-vat-calculator-amount").fill("100");
    await page.locator("#germany-vat-calculator-rate").fill("19");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("119");

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Japan/Germany policy detail at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });

  test("France overtime editorial is localized in SSR and the calculator returns the documented example", async ({ page }) => {
    for (const locale of ["ko", "en", "fr", "de"] as const) {
      const response = await page.goto("/" + locale + "/calculators/france-overtime-pay-calculator");
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toContain(franceOvertimeFollowups[locale].formula);
      expect(html).toContain(franceOvertimeFollowups[locale].example?.answer ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("canonical");
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }

    await page.goto("/fr/calculators/france-overtime-pay-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#france-overtime-pay-calculator-salary").fill("20");
    await page.locator("#france-overtime-pay-calculator-hours").fill("8");
    await page.locator("#france-overtime-pay-calculator-multiplier").fill("1.5");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("240");
  });

  test("Netherlands holiday editorial is localized in SSR and the calculator returns the documented example", async ({ page }) => {
    for (const locale of ["ko", "en", "nl", "de"] as const) {
      const response = await page.goto("/" + locale + "/calculators/netherlands-holiday-allowance-calculator");
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toContain(netherlandsHolidayFollowups[locale].formula);
      expect(html).toContain(netherlandsHolidayFollowups[locale].example?.answer ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("canonical");
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }

    await page.goto("/nl/calculators/netherlands-holiday-allowance-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#netherlands-holiday-allowance-calculator-salary").fill("50000");
    await page.locator("#netherlands-holiday-allowance-calculator-rate").fill("8");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("4.000");
  });

  test("Brazil 13th-salary editorial is localized in SSR and the calculator returns the documented example", async ({ page }) => {
    for (const locale of ["ko", "en", "pt-br", "es"] as const) {
      const response = await page.goto("/" + locale + "/calculators/brazil-thirteenth-salary-calculator");
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toContain(brazilThirteenthFollowups[locale].formula);
      expect(html).toContain(brazilThirteenthFollowups[locale].example?.answer ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("canonical");
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }

    await page.goto("/en/calculators/brazil-thirteenth-salary-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#brazil-thirteenth-salary-calculator-salary").fill("3000");
    await page.locator("#brazil-thirteenth-salary-calculator-months").fill("7");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,750");
  });

  test("Vietnam gross-net editorial is localized in SSR and the calculator returns the documented example", async ({ page }) => {
    for (const locale of ["ko", "en", "vi", "fr"] as const) {
      const response = await page.goto("/" + locale + "/calculators/vietnam-gross-net-salary-calculator");
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toContain(vietnamGrossNetFollowups[locale].formula);
      expect(html).toContain(vietnamGrossNetFollowups[locale].example?.answer ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("canonical");
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }

    await page.goto("/en/calculators/vietnam-gross-net-salary-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#vietnam-gross-net-salary-calculator-salary").fill("30000000");
    await page.locator("#vietnam-gross-net-salary-calculator-frequency").selectOption("monthly");
    await page.locator("#vietnam-gross-net-salary-calculator-socialRate").fill("10.5");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("25,900,000");
  });
});

test.describe("Hong Kong policy calculators", () => {
  const slugs = ["hong-kong-salary-tax-calculator", "hong-kong-mpf-calculator", "hong-kong-stamp-duty-calculator"] as const;
  for (const locale of ["ko", "en", "zh-tw"] as const) {
    for (const slug of slugs) {
      test(locale + "/" + slug + " has localized content in initial HTML", async ({ page }) => {
        const copy = hkPolicyFollowups[locale]?.[slug];
        const response = await page.goto("/" + locale + "/calculators/" + slug);
        expect(response?.status()).toBe(200);
        const html = await response!.text();
        expect(html).toContain(copy?.description ?? "");
        expect(html).toContain(copy?.formula ?? "");
        expect(html).toContain(copy?.exampleNote ?? "");
        expect(html).toContain(copy?.faq?.question ?? "");
        expect(html.toLowerCase()).toContain("canonical");
        expect(html.toLowerCase()).toContain("hreflang");
        expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
        await expect(page.locator("article")).toContainText(copy?.faq?.answer ?? "");
      });
    }
  }

  test("calculator examples run and Hong Kong policy notes fit the tested viewports", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/hong-kong-salary-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#hong-kong-salary-tax-calculator-income").fill("100000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("4,000");

    await page.goto("/en/calculators/hong-kong-mpf-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#hong-kong-mpf-calculator-salary").fill("20000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("2,000");

    await page.goto("/en/calculators/hong-kong-stamp-duty-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#hong-kong-stamp-duty-calculator-propertyValue").fill("5000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("50,000");

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Hong Kong content at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });
});

test.describe("Malaysia policy calculators", () => {
  const slugs = ["malaysia-income-tax-calculator", "malaysia-epf-calculator", "malaysia-socso-calculator"] as const;
  for (const locale of ["ko", "en", "zh-tw"] as const) {
    for (const slug of slugs) {
      test(locale + "/" + slug + " has localized content in initial HTML", async ({ page }) => {
        const copy = malaysiaPolicyFollowups[locale]?.[slug];
        const response = await page.goto("/" + locale + "/calculators/" + slug);
        expect(response?.status()).toBe(200);
        const html = await response!.text();
        expect(html).toContain(copy?.description ?? "");
        expect(html).toContain(copy?.formula ?? "");
        expect(html).toContain(copy?.exampleNote ?? "");
        expect(html).toContain(copy?.faq?.question ?? "");
        expect(html.toLowerCase()).toContain("canonical");
        expect(html.toLowerCase()).toContain("hreflang");
        expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
        await expect(page.locator("article")).toContainText(copy?.faq?.answer ?? "");
      });
    }
  }

  test("examples run and policy notes fit all tested viewports", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/malaysia-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#malaysia-income-tax-calculator-income").fill("100000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("9,400");

    await page.goto("/en/calculators/malaysia-epf-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#malaysia-epf-calculator-salary").fill("6000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,380");

    await page.goto("/en/calculators/malaysia-socso-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#malaysia-socso-calculator-salary").fill("6000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("30");

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Malaysia content at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });
});

test.describe("Malaysia SST and Philippines tax/SSS calculators", () => {
  const slugs = ["malaysia-sst-calculator", "philippines-income-tax-calculator", "philippines-sss-calculator"] as const;
  for (const locale of ["ko", "en", "zh-tw"] as const) {
    for (const slug of slugs) {
      test(locale + "/" + slug + " has localized content in initial HTML", async ({ page }) => {
        const copy = malaysiaPhilippinesFollowups[locale]?.[slug];
        const response = await page.goto("/" + locale + "/calculators/" + slug);
        expect(response?.status()).toBe(200);
        const html = await response!.text();
        expect(html).toContain(copy?.description ?? "");
        expect(html).toContain(copy?.formula ?? "");
        expect(html).toContain(copy?.exampleNote ?? "");
        expect(html).toContain(copy?.faq?.question ?? "");
        expect(html.toLowerCase()).toContain("canonical");
        expect(html.toLowerCase()).toContain("hreflang");
        expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
        await expect(page.locator("article")).toContainText(copy?.faq?.answer ?? "");
      });
    }
  }

  test("examples run and policy notes fit all tested widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/malaysia-sst-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#malaysia-sst-calculator-amount").fill("100");
    await page.locator("#malaysia-sst-calculator-rate").fill("8");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("108");

    await page.goto("/en/calculators/philippines-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#philippines-income-tax-calculator-income").fill("1000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("152,500");

    await page.goto("/en/calculators/philippines-sss-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#philippines-sss-calculator-salary").fill("20000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,000");
    await expect(page.locator("[aria-live='polite']")).toContainText("2,000");

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Malaysia/Philippines content at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });
});

function collectBrowserErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

async function waitForCalculatorHydration(page: Page) {
  await page.waitForFunction(() => {
    const fields = Array.from(document.querySelectorAll("form input, form select, form textarea"));
    return fields.length > 0 && fields.some((field) => Object.keys(field).some((key) => key.startsWith("__reactProps$")));
  });
}

test.describe("calculator detail SSR in all locales", () => {
  for (const [index, locale] of locales.entries()) {
    const slug = reviewedSlugs[index % reviewedSlugs.length]!;
    test(locale + "/" + slug + " includes localized detail content in initial HTML", async ({ page }) => {
      const errors = collectBrowserErrors(page);
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);

      const initialHtml = await response!.text();
      expect(initialHtml).toMatch(/<h1\b/);
      expect(initialHtml).toMatch(/<h2\b/);
      expect(initialHtml).toMatch(/<dl\b/);
      expect(initialHtml).toContain("canonical");
      expect(initialHtml.toLowerCase()).toContain("hreflang");
      expect(initialHtml).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toContain("/calculators/" + slug);
      expect(await page.locator('link[rel="alternate"][hreflang]').count()).toBeGreaterThan(0);

      await expect(page.locator("article h1")).toBeVisible();
      await expect(page.locator("article h2").filter({ hasText: /.+/ }).first()).toBeVisible();
      await expect(page.locator("article dl dt").first()).toBeVisible();
      await expect(page.locator("article dl dd").first()).toBeVisible();
      expect(await page.locator("article h2").count()).toBeGreaterThanOrEqual(4);
      expect(errors, locale + "/" + slug + " browser errors").toEqual([]);
    });
  }
});

test.describe("reviewed editorial batch SSR across locales", () => {
  for (const [index, locale] of locales.entries()) {
    const batchSlugs = [...editorialBatchSlugs, ...secondEditorialBatchSlugs, ...thirdEditorialBatchSlugs, ...fourthEditorialBatchSlugs, ...fifthEditorialBatchSlugs, ...sixthEditorialBatchSlugs, ...seventhEditorialBatchSlugs, ...eighthEditorialBatchSlugs, ...ninthEditorialBatchSlugs, ...tenthEditorialBatchSlugs, ...eleventhEditorialBatchSlugs, ...twelfthEditorialBatchSlugs, ...thirteenthEditorialBatchSlugs];
    const slug = batchSlugs[index % batchSlugs.length]!;
    test(locale + "/" + slug + " renders the reviewed content in server HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html).toMatch(/<dl\b/);
      expect(html).toContain("canonical");
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article h1")).toBeVisible();
      await expect(page.locator("article dl dd").first()).toBeVisible();
      const note = reviewedBatchExampleNotes[locale]?.[slug] ?? secondReviewedBatchExampleNotes[locale]?.[slug] ?? thirdReviewedBatchExampleNotes[locale]?.[slug] ?? fourthReviewedBatchExampleNotes[locale]?.[slug] ?? fifthReviewedBatchExampleNotes[locale]?.[slug] ?? sixthReviewedBatchExampleNotes[locale]?.[slug] ?? seventhReviewedBatchExampleNotes[locale]?.[slug] ?? eighthReviewedBatchExampleNotes[locale]?.[slug] ?? ninthReviewedBatchExampleNotes[locale]?.[slug] ?? tenthReviewedBatchExampleNotes[locale]?.[slug] ?? eleventhReviewedBatchExampleNotes[locale]?.[slug] ?? twelfthReviewedBatchExampleNotes[locale]?.[slug] ?? thirteenthReviewedBatchExampleNotes[locale]?.[slug] ?? "";
      await expect(page.locator("article")).toContainText(note);
    });
  }
});

test.describe("product margin, salary, BMI, pace, and fuel detail SSR across all locales", () => {
  for (const [index, locale] of locales.entries()) {
    const slug = eighthEditorialBatchSlugs[index % eighthEditorialBatchSlugs.length]!;
    test(locale + "/" + slug + " renders its localized example in initial HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html).toContain(eighthReviewedBatchExampleNotes[locale]?.[slug]);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article h1")).toBeVisible();
      await expect(page.locator("article h2").first()).toBeVisible();
      await expect(page.locator("article")).toContainText(eighthReviewedBatchExampleNotes[locale]?.[slug] ?? "");
    });
  }
});

test.describe("loan ratio and refinance detail SSR across all locales", () => {
  for (const [index, locale] of locales.entries()) {
    const slug = ninthEditorialBatchSlugs[index % ninthEditorialBatchSlugs.length]!;
    test(locale + "/" + slug + " renders its localized example in initial HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html).toContain(ninthReviewedBatchExampleNotes[locale]?.[slug]);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article h1")).toBeVisible();
      await expect(page.locator("article h2").first()).toBeVisible();
      await expect(page.locator("article")).toContainText(ninthReviewedBatchExampleNotes[locale]?.[slug] ?? "");
    });
  }
});

test.describe("loan, wage, fuel, food, and bill-split SSR across all locales", () => {
  for (const [index, locale] of locales.entries()) {
    const slug = tenthEditorialBatchSlugs[index % tenthEditorialBatchSlugs.length]!;
    test(locale + "/" + slug + " renders its localized example in initial HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html).toContain(tenthReviewedBatchExampleNotes[locale]?.[slug]);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article h1")).toBeVisible();
      await expect(page.locator("article h2").first()).toBeVisible();
      await expect(page.locator("article")).toContainText(tenthReviewedBatchExampleNotes[locale]?.[slug] ?? "");
    });
  }
});

test.describe("leave, tenure, time, pregnancy, and utility SSR across all locales", () => {
  for (const [index, locale] of locales.entries()) {
    const slug = eleventhEditorialBatchSlugs[index % eleventhEditorialBatchSlugs.length]!;
    test(locale + "/" + slug + " renders its localized example in initial HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html).toContain(eleventhReviewedBatchExampleNotes[locale]?.[slug]);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article h1")).toBeVisible();
      await expect(page.locator("article h2").first()).toBeVisible();
      await expect(page.locator("article")).toContainText(eleventhReviewedBatchExampleNotes[locale]?.[slug] ?? "");
    });
  }
});

test.describe("fraction, deviation, vehicle, taxi, and tip SSR across locales", () => {
  for (const [index, locale] of locales.entries()) {
    const slug = twelfthEditorialBatchSlugs[index % twelfthEditorialBatchSlugs.length]!;
    test(locale + "/" + slug + " renders its localized example in initial HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html).toContain(twelfthReviewedBatchExampleNotes[locale]?.[slug]);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article h1")).toBeVisible();
      await expect(page.locator("article h2").first()).toBeVisible();
      await expect(page.locator("article")).toContainText(twelfthReviewedBatchExampleNotes[locale]?.[slug] ?? "");
    });
  }
});

test.describe("twelfth editorial batch cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px math and everyday detail pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of twelfthEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").last(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
        expect(dimensions.body, slug + " body at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("average, weighted mean, unit price, probability, and area SSR across locales", () => {
  for (const [index, locale] of locales.entries()) {
    const slug = thirteenthEditorialBatchSlugs[index % thirteenthEditorialBatchSlugs.length]!;
    test(locale + "/" + slug + " renders its localized example in initial HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html).toContain(thirteenthReviewedBatchExampleNotes[locale]?.[slug]);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
      await expect(page.locator("article h1")).toBeVisible();
      await expect(page.locator("article h2").first()).toBeVisible();
      await expect(page.locator("article")).toContainText(thirteenthReviewedBatchExampleNotes[locale]?.[slug] ?? "");
    });
  }
});

test.describe("percentile and ratio examples in localized SSR", () => {
  for (const [index, locale] of locales.entries()) {
    const slug = fourteenthEditorialBatchSlugs[index % fourteenthEditorialBatchSlugs.length]!;
    test(locale + "/" + slug + " includes localized example in initial HTML", async ({ page }) => {
      const response = await page.goto("/" + locale + "/calculators/" + slug);
      expect(response?.status()).toBe(200);
      const html = await response!.text();
      expect(html).toContain(fourteenthReviewedBatchExampleNotes[locale]?.[slug]);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      await expect(page.locator("article")).toContainText(fourteenthReviewedBatchExampleNotes[locale]?.[slug] ?? "");
    });
  }
});

test.describe("date and unit editorial cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px date and unit detail pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of thirdEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dt").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
        expect(dimensions.document, slug + " document at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
        expect(dimensions.body, slug + " body at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("finance editorial cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px finance detail pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of fourthEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dt").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
        expect(dimensions.document, slug + " document at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
        expect(dimensions.body, slug + " body at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("cost-planning editorial cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px cost-planning pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of fifthEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dt").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
        expect(dimensions.document, slug + " document at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
        expect(dimensions.body, slug + " body at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("freelance, break-even, interest editorial cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px finance detail pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of sixthEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dd").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: document.documentElement.clientWidth }));
        expect(dimensions.body, slug).toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("investment and pricing editorial cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px investment and pricing detail pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of seventhEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dd").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: document.documentElement.clientWidth }));
        expect(dimensions.body, slug).toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("product, salary, health-metric, and travel-detail cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px product and everyday detail pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of eighthEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dd").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: document.documentElement.clientWidth }));
        expect(dimensions.body, slug).toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("loan ratio and refinancing cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px loan ratio and fee pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of ninthEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dd").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: document.documentElement.clientWidth }));
        expect(dimensions.body, slug).toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("loan, wage, fuel, food, and split cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px affordability and everyday detail pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of tenthEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dd").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: document.documentElement.clientWidth }));
        expect(dimensions.body, slug).toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("leave, tenure, time, pregnancy, and utility cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px date and bill detail pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of eleventhEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dd").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: document.documentElement.clientWidth }));
        expect(dimensions.body, slug).toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("thirteenth editorial batch cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px average and everyday detail pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of thirteenthEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").last(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
        expect(dimensions.body, slug + " body at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("fourteenth editorial batch cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px percentile and ratio cards fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of fourteenthEditorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").last(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
        expect(dimensions.body, slug + " body at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("reviewed calculators at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px pages have visible cards and no horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of reviewedSlugs) {
        const response = await page.goto("/ko/calculators/" + slug);
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").first(), slug).toBeVisible();
        await expect(page.locator("article dl dt").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
        }));
        expect(dimensions.document, slug + " document at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
        expect(dimensions.body, slug + " body at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("editorial batch cards at required viewport widths", () => {
  for (const width of viewports) {
    test(width + "px reviewed pages fit without horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of [...editorialBatchSlugs, ...secondEditorialBatchSlugs]) {
        const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
        expect(response?.status(), slug).toBe(200);
        await expect(page.locator("article h1"), slug).toBeVisible();
        await expect(page.locator("article h2").last(), slug).toBeVisible();
        expect(await page.locator("article h2").count(), slug).toBeGreaterThanOrEqual(4);
        await expect(page.locator("article dl dt").first(), slug).toBeVisible();
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
        expect(dimensions.document, slug + " document at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
        expect(dimensions.body, slug + " body at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    });
  }
});

test.describe("calculator input and result flows", () => {
  const batch = [
      ["fraction", "The reduced fraction 5/6 is exact"],
      ["percentile", "Nearest rank selects an observed value"],
      ["standard-deviation", "A population standard deviation of 2 describes spread"],
      ["aspect-ratio", "16:9 describes shape, not pixel resolution"],
      ["scale-ratio", "Match drawing and real-world units first"],
      ["percentage", "30 is the amount equal to 15% of 200"],
      ["ratio", "Splitting 120 in a 2:3 ratio gives 48 and 72"],
      ["proportion", "For 2:5=x:20, matching positions gives 2/5=x/20"],
      ["median", "The median of 1, 3, 8 is 3"],
      ["decimal-fraction", "0.125 reduces from 125/1000 to 1/8"],
      ["change-rate", "From 200 to 150, the change is ??0"],
      ["discount", "A 20% discount on 50,000 gives a 10,000 discount"],
      ["cagr", "Growing from 100 to 121 over two years is equivalent"],
      ["simple-interest", "At 10% simple interest for five years"],
      ["compound-interest", "At 10% compounded annually for five years"],
    ["date-difference", "Jan 1 to Jan 3, 2026 is a 2-day elapsed difference"],
    ["dday", "From June 1 to June 10, the target is 9 calendar days away"],
    ["age", "A person born Dec 31, 2000 is 25 on Dec 30, 2026"],
    ["workdays", "Monday Jan 5 through Friday Jan 9, 2026 counts 5 weekdays"],
    ["unit-converter", "One mile is 1.609344 kilometers"],
    ["fire-retirement-calculator", "Annual spending of 40,000 divided by a chosen 4% withdrawal assumption gives a 1,000,000 target"],
    ["dividend-growth-calculator", "An annual dividend of 200 growing at an assumed 5% for 10 years becomes about 325.78"],
    ["inflation-adjusted-return-calculator", "Growing from 100 to 150 over 10 years is about 4.14% nominal annualized"],
    ["position-size-calculator", "A 1% risk budget on a 10,000 account is 100"],
    ["stop-loss-take-profit-calculator", "From entry 100, a 5% stop is 95 and a 10% target is 110"],
    ["stock-profit-after-fees-calculator", "Buy 10 shares at 100, sell at 110, and charge 0.1% on each side"],
    ["loan-early-repayment-calculator", "On 1,200 at 6% for 12 months, adding 100 monthly"],
    ["rent-vs-buy-calculator", "With a 120,000 home, 20% down, zero-interest loan"],
    ["electricity-cost-calculator", "One 100 W device used 5 hours daily for 30 days consumes 15 kWh"],
    ["travel-budget-calculator", "Transport 100, two nights at 50, food for 2 people"],
      ["ltv", "With a home value of 50,000,000 and a loan of 20,000,000"],
      ["dti", "Annual income 50,000,000, mortgage principal and interest 10,000,000"],
      ["dsr", "Annual income 50,000,000 and entered annual principal and interest of 10,000,000"],
      ["loan-refinance", "For a 10,000,000 balance, old terms of 12% for 12 months"],
      ["prepayment-fee", "Applying the entered 1.5% fee rate to a 10,000,000 payment"],
      ["loan-affordability", "At 100,000 per month, 0% annual interest, and 12 months"],
      ["hourly-wage", "Dividing monthly pay of 3,000,000 by the entered 209 monthly hours"],
      ["fuel-efficiency", "Using 40 L over 520 km gives 13 km/L"],
      ["calorie-per-serving", "If a 600 kcal dish has 3 equal servings and you eat 1 serving"],
      ["trip-split", "Splitting 10,000 among 3 gives 3,333.33 each"],
      ["annual-leave-allowance", "The entered daily wage of 100,000 multiplied by 3 days"],
      ["tenure", "From 2024-01-15 to 2025-03-20, the calendar difference"],
      ["time-arithmetic", "Adding 2 hours 45 minutes and 1 hour 30 minutes"],
      ["pregnancy", "An LMP date of 2026-01-01 plus the calculator's 280-day estimate"],
      ["utility-bill", "Usage 20 횞 entered rate 500 plus base fee 1,000"],
      ["vehicle-cost", "At 1,000 km per month, 10 km/L, and fuel at 1,700 per liter"],
      ["taxi-fare", "A 4,000 base fare, 2 km included, 5 km trip, 1,000 per extra km"],
      ["tip-calculator", "Adding an entered 10% tip to 50,000 gives a 5,000 tip"],
      ["average", "For 10, 20, and 30, the sum 60 divided by 3 gives an arithmetic mean of 20"],
      ["weighted-average", "Weighting 80 by 1 and 100 by 3 gives (80횞1 + 100횞3) 첨 4 = 95"],
      ["unit-price", "A total of 10,000 divided by 3 units is 3,333.33 per unit"],
      ["probability", "With independent trials and a 20% success chance each, three trials give 1??.8쨀 = 48.8%"],
      ["area", "Ten pyeong multiplied by 400/121 is 33.06 m짼"],
  ] as const;
  for (const [slug, note] of batch) {
    test(slug + " renders its calculator-specific example and FAQ", async ({ page }) => {
      const response = await page.goto("/en/calculators/" + slug, { waitUntil: "domcontentloaded", timeout: 30000 });
      expect(response?.status(), slug).toBe(200);
      await expect(page.locator("article h1"), slug).toBeVisible();
      await expect(page.locator("article h2").first(), slug).toBeVisible();
      await expect(page.locator("article"), slug).toContainText(note);
      expect(await page.locator("article h2").count(), slug).toBeGreaterThanOrEqual(4);
      await expect(page.locator("article h2").filter({ hasText: /Frequently asked questions/ }), slug).toBeVisible();
      await expect(page.locator("article dl dt").last(), slug).toBeVisible();
    });
  }

  test("fraction, deviation, vehicle, taxi, and tip examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);

    await page.goto("/en/calculators/fraction");
    await waitForCalculatorHydration(page);
    await page.locator("#fraction-operation").selectOption("add");
    await page.locator("#fraction-aNumerator").fill("1");
    await page.locator("#fraction-aDenominator").fill("2");
    await page.locator("#fraction-bNumerator").fill("1");
    await page.locator("#fraction-bDenominator").fill("4");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("3/4");

    await page.goto("/en/calculators/standard-deviation");
    await waitForCalculatorHydration(page);
    await page.locator("#standard-deviation-mode").selectOption("population");
    await page.locator("#standard-deviation-numbers").fill("2, 4, 4, 4, 5, 5, 7, 9");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("2");

    await page.goto("/en/calculators/vehicle-cost");
    await waitForCalculatorHydration(page);
    for (const [key, value] of Object.entries({ distance: "1000", efficiency: "10", fuelPrice: "1700", insurance: "0", tax: "0", maintenance: "0", parking: "0", tolls: "0", other: "0" })) {
      await page.locator("#vehicle-cost-" + key).fill(value);
    }
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("2,040,000");

    await page.goto("/en/calculators/taxi-fare");
    await waitForCalculatorHydration(page);
    for (const [key, value] of Object.entries({ baseFare: "4000", includedDistance: "2", distanceRate: "1000", distance: "5", timeRate: "0", minutes: "0" })) {
      await page.locator("#taxi-fare-" + key).fill(value);
    }
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("7,000");

    await page.goto("/en/calculators/tip-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#tip-calculator-amount").fill("50000");
    await page.locator("#tip-calculator-percent").fill("10");
    await page.locator("#tip-calculator-people").fill("2");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("27,500");

    expect(errors).toEqual([]);
  });

  test("average, weighted average, unit price, probability, and area examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);

    await page.goto("/en/calculators/average");
    await waitForCalculatorHydration(page);
    await page.locator("#average-numbers").fill("10, 20, 30");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("20");

    await page.goto("/en/calculators/weighted-average");
    await waitForCalculatorHydration(page);
    await page.locator("#weighted-average-values").fill("80, 100");
    await page.locator("#weighted-average-weights").fill("1, 3");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("95");

    await page.goto("/en/calculators/unit-price");
    await waitForCalculatorHydration(page);
    await page.locator("#unit-price-mode").selectOption("unit");
    await page.locator("#unit-price-total").fill("10000");
    await page.locator("#unit-price-quantity").fill("3");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("3,333.33");

    await page.goto("/en/calculators/probability");
    await waitForCalculatorHydration(page);
    await page.locator("#probability-mode").selectOption("at-least-one");
    await page.locator("#probability-probability").fill("20");
    await page.locator("#probability-trials").fill("3");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("48.8");

    await page.goto("/en/calculators/area");
    await waitForCalculatorHydration(page);
    await page.locator("#area-mode").selectOption("pyeong-to-sqm");
    await page.locator("#area-value").fill("10");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("33.06");

    expect(errors).toEqual([]);
  });

  test("date, workday, age, and unit examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);

    await page.goto("/en/calculators/date-difference");
    await waitForCalculatorHydration(page);
    await page.locator("#date-difference-start").fill("2026-01-01");
    await page.locator("#date-difference-end").fill("2026-01-03");
    await page.locator("#date-difference-include").selectOption("both");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("3");

    await page.goto("/en/calculators/dday");
    await waitForCalculatorHydration(page);
    await page.locator("#dday-reference").selectOption("custom");
    await page.locator("#dday-referenceDate").fill("2026-06-01");
    await page.locator("#dday-target").fill("2026-06-10");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("9");

    await page.goto("/en/calculators/age");
    await waitForCalculatorHydration(page);
    await page.locator("#age-birth").fill("2000-12-31");
    await page.locator("#age-reference").fill("2026-12-30");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("25");

    await page.goto("/en/calculators/workdays");
    await waitForCalculatorHydration(page);
    await page.locator("#workdays-start").fill("2026-01-05");
    await page.locator("#workdays-end").fill("2026-01-09");
    await expect(page.locator("#workdays-start")).toHaveValue("2026-01-05");
    await expect(page.locator("#workdays-end")).toHaveValue("2026-01-09");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("5");

    await page.goto("/en/calculators/unit-converter");
    await waitForCalculatorHydration(page);
    await page.locator("#unit-converter-category").selectOption("temperature");
    await page.locator("#unit-converter-value").fill("100");
    await page.locator("#unit-converter-fromUnit").selectOption("c");
    await page.locator("#unit-converter-toUnit").selectOption("f");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("212");

    expect(errors).toEqual([]);
  });

  test("finance examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);

    await page.goto("/en/calculators/fire-retirement-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#fire-retirement-calculator-annualExpenses").fill("40000");
    await page.locator("#fire-retirement-calculator-withdrawalRate").fill("4");
    await page.locator("#fire-retirement-calculator-currentSavings").fill("500000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("1,000,000");

    await page.goto("/en/calculators/dividend-growth-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#dividend-growth-calculator-annualDividendPerShare").fill("2");
    await page.locator("#dividend-growth-calculator-shares").fill("100");
    await page.locator("#dividend-growth-calculator-growthRate").fill("5");
    await page.locator("#dividend-growth-calculator-years").fill("10");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("325.78");

    await page.goto("/en/calculators/inflation-adjusted-return-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#inflation-adjusted-return-calculator-initialValue").fill("100");
    await page.locator("#inflation-adjusted-return-calculator-finalValue").fill("150");
    await page.locator("#inflation-adjusted-return-calculator-years").fill("10");
    await page.locator("#inflation-adjusted-return-calculator-inflationRate").fill("2");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("2.0961");

    await page.goto("/en/calculators/position-size-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#position-size-calculator-accountSize").fill("10000");
    await page.locator("#position-size-calculator-riskPercent").fill("1");
    await page.locator("#position-size-calculator-entryPrice").fill("100");
    await page.locator("#position-size-calculator-stopPrice").fill("95");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("20");

    await page.goto("/en/calculators/stop-loss-take-profit-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#stop-loss-take-profit-calculator-entryPrice").fill("100");
    await page.locator("#stop-loss-take-profit-calculator-units").fill("10");
    await page.locator("#stop-loss-take-profit-calculator-stopPercent").fill("5");
    await page.locator("#stop-loss-take-profit-calculator-targetPercent").fill("10");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("2");

    expect(errors).toEqual([]);
  });

  test("fees, repayment, housing, power, and travel examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);

    await page.goto("/en/calculators/stock-profit-after-fees-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#stock-profit-after-fees-calculator-buyPrice").fill("100");
    await page.locator("#stock-profit-after-fees-calculator-sellPrice").fill("110");
    await page.locator("#stock-profit-after-fees-calculator-shares").fill("10");
    await page.locator("#stock-profit-after-fees-calculator-buyFeePercent").fill("0.1");
    await page.locator("#stock-profit-after-fees-calculator-sellFeePercent").fill("0.1");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("97.9");

    await page.goto("/en/calculators/loan-early-repayment-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#loan-early-repayment-calculator-principal").fill("1200");
    await page.locator("#loan-early-repayment-calculator-annualRate").fill("6");
    await page.locator("#loan-early-repayment-calculator-termMonths").fill("12");
    await page.locator("#loan-early-repayment-calculator-extraMonthly").fill("100");
    await page.locator("#loan-early-repayment-calculator-lumpSum").fill("0");
    await page.locator("#loan-early-repayment-calculator-lumpMonth").fill("1");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("18.24");
    await expect(page.locator('[aria-live="polite"]')).toContainText("5");

    await page.goto("/en/calculators/rent-vs-buy-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#rent-vs-buy-calculator-homePrice").fill("120000");
    await page.locator("#rent-vs-buy-calculator-downPaymentPercent").fill("20");
    await page.locator("#rent-vs-buy-calculator-annualRate").fill("0");
    await page.locator("#rent-vs-buy-calculator-loanYears").fill("20");
    await page.locator("#rent-vs-buy-calculator-holdingYears").fill("5");
    await page.locator("#rent-vs-buy-calculator-monthlyRent").fill("1000");
    await page.locator("#rent-vs-buy-calculator-annualMaintenancePercent").fill("1");
    await page.locator("#rent-vs-buy-calculator-purchaseCosts").fill("2000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("60,000");
    await expect(page.locator('[aria-live="polite"]')).toContainText("8,000");

    await page.goto("/en/calculators/electricity-cost-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#electricity-cost-calculator-watts").fill("100");
    await page.locator("#electricity-cost-calculator-hoursPerDay").fill("5");
    await page.locator("#electricity-cost-calculator-days").fill("30");
    await page.locator("#electricity-cost-calculator-pricePerKwh").fill("0.2");
    await page.locator("#electricity-cost-calculator-devices").fill("1");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("15 kWh");
    await expect(page.locator('[aria-live="polite"]')).toContainText("3");

    await page.goto("/en/calculators/travel-budget-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#travel-budget-calculator-transport").fill("100");
    await page.locator("#travel-budget-calculator-lodgingPerNight").fill("50");
    await page.locator("#travel-budget-calculator-nights").fill("2");
    await page.locator("#travel-budget-calculator-dailyFoodPerPerson").fill("20");
    await page.locator("#travel-budget-calculator-people").fill("2");
    await page.locator("#travel-budget-calculator-days").fill("3");
    await page.locator("#travel-budget-calculator-activities").fill("40");
    await page.locator("#travel-budget-calculator-localTransport").fill("20");
    await page.locator("#travel-budget-calculator-other").fill("10");
    await page.locator("#travel-budget-calculator-bufferPercent").fill("10");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("429");

    expect(errors).toEqual([]);
  });

  test("freelance, break-even, savings, deposit, and loan examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);

    await page.goto("/en/calculators/freelancer-hourly-rate-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#freelancer-hourly-rate-calculator-targetAnnualRevenue").fill("60000");
    await page.locator("#freelancer-hourly-rate-calculator-annualBusinessCosts").fill("10000");
    await page.locator("#freelancer-hourly-rate-calculator-billableHoursPerWeek").fill("20");
    await page.locator("#freelancer-hourly-rate-calculator-workingWeeks").fill("50");
    await page.locator("#freelancer-hourly-rate-calculator-bufferPercent").fill("10");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("70");
    await expect(page.locator('[aria-live="polite"]')).toContainText("77");

    await page.goto("/en/calculators/break-even-point-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#break-even-point-calculator-fixedCosts").fill("1000");
    await page.locator("#break-even-point-calculator-pricePerUnit").fill("25");
    await page.locator("#break-even-point-calculator-variableCostPerUnit").fill("15");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("100");
    await expect(page.locator('[aria-live="polite"]')).toContainText("2,500");

    await page.goto("/en/calculators/savings-interest");
    await waitForCalculatorHydration(page);
    await page.locator("#savings-interest-monthly").fill("100");
    await page.locator("#savings-interest-rate").fill("12");
    await page.locator("#savings-interest-months").fill("12");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("1,200");
    await expect(page.locator('[aria-live="polite"]')).toContainText("66");
    await expect(page.locator('[aria-live="polite"]')).toContainText("1,266");

    await page.goto("/en/calculators/deposit-interest");
    await waitForCalculatorHydration(page);
    await page.locator("#deposit-interest-principal").fill("1000");
    await page.locator("#deposit-interest-rate").fill("12");
    await page.locator("#deposit-interest-months").fill("6");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("60");
    await expect(page.locator('[aria-live="polite"]')).toContainText("1,060");

    await page.goto("/en/calculators/loan-interest");
    await waitForCalculatorHydration(page);
    await page.locator("#loan-interest-principal").fill("12000");
    await page.locator("#loan-interest-rate").fill("12");
    await page.locator("#loan-interest-months").fill("12");
    await page.locator("#loan-interest-method").selectOption("equal-payment");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("796");

    expect(errors).toEqual([]);
  });

  test("average price, dividend, trading profit, margin, and markup examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);

    await page.goto("/en/calculators/stock-average-price");
    await waitForCalculatorHydration(page);
    await page.locator("#stock-average-price-mode").selectOption("manual");
    await page.locator("#stock-average-price-existingQuantity").fill("10");
    await page.locator("#stock-average-price-existingAveragePrice").fill("10000");
    await page.locator("#stock-average-price-additionalQuantity").fill("10");
    await page.locator("#stock-average-price-additionalPrice").fill("8000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("9,000");

    await page.goto("/en/calculators/dividend");
    await waitForCalculatorHydration(page);
    await page.locator("#dividend-shares").fill("100");
    await page.locator("#dividend-perShare").fill("500");
    await page.locator("#dividend-payments").fill("2");
    await page.locator("#dividend-price").fill("10000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("100,000");
    await expect(page.locator('[aria-live="polite"]')).toContainText("10 %");

    await page.goto("/en/calculators/profit-loss");
    await waitForCalculatorHydration(page);
    await page.locator("#profit-loss-buy").fill("100");
    await page.locator("#profit-loss-sell").fill("120");
    await page.locator("#profit-loss-quantity").fill("10");
    await page.locator("#profit-loss-buyCost").fill("50");
    await page.locator("#profit-loss-sellCost").fill("30");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("120");

    await page.goto("/en/calculators/margin");
    await waitForCalculatorHydration(page);
    await page.locator("#margin-cost").fill("60");
    await page.locator("#margin-sale").fill("100");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("40 %");

    await page.goto("/en/calculators/markup");
    await waitForCalculatorHydration(page);
    await page.locator("#markup-cost").fill("60");
    await page.locator("#markup-sale").fill("100");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("66.67 %");

    expect(errors).toEqual([]);
  });

  test("product margin, salary conversion, BMI, pace, and fuel cost examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);

    await page.goto("/en/calculators/product-margin");
    await waitForCalculatorHydration(page);
    await page.locator("#product-margin-cost").fill("10000");
    await page.locator("#product-margin-sale").fill("20000");
    await page.locator("#product-margin-feeRate").fill("10");
    await page.locator("#product-margin-shipping").fill("3000");
    await page.locator("#product-margin-otherCost").fill("0");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("5,000");

    await page.goto("/en/calculators/salary-conversion");
    await waitForCalculatorHydration(page);
    await page.locator("#salary-conversion-mode").selectOption("monthly");
    await page.locator("#salary-conversion-amount").fill("3000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("36,000,000");

    await page.goto("/en/calculators/bmi");
    await waitForCalculatorHydration(page);
    await page.locator("#bmi-height").fill("170");
    await page.locator("#bmi-weight").fill("65");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("22.5");

    await page.goto("/en/calculators/pace");
    await waitForCalculatorHydration(page);
    await page.locator("#pace-distance").fill("5");
    await page.locator("#pace-hours").fill("0");
    await page.locator("#pace-minutes").fill("25");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("5:00 /km");
    await expect(page.locator('[aria-live="polite"]')).toContainText("12 km/h");

    await page.goto("/en/calculators/fuel-cost");
    await waitForCalculatorHydration(page);
    await page.locator("#fuel-cost-distance").fill("100");
    await page.locator("#fuel-cost-efficiency").fill("10");
    await page.locator("#fuel-cost-price").fill("1700");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("10 L");
    await expect(page.locator('[aria-live="polite"]')).toContainText("17,000");

    expect(errors).toEqual([]);
  });

  test("LTV, DTI, DSR, refinance, and fee examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/ltv");
    await waitForCalculatorHydration(page);
    await page.locator("#ltv-homePrice").fill("50000000");
    await page.locator("#ltv-loan").fill("20000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("40 %");

    await page.goto("/en/calculators/dti");
    await waitForCalculatorHydration(page);
    await page.locator("#dti-income").fill("50000000");
    await page.locator("#dti-mortgage").fill("10000000");
    await page.locator("#dti-otherInterest").fill("1000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("22 %");

    await page.goto("/en/calculators/dsr");
    await waitForCalculatorHydration(page);
    await page.locator("#dsr-income").fill("50000000");
    await page.locator("#dsr-repayment").fill("10000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("20 %");

    await page.goto("/en/calculators/loan-refinance");
    await waitForCalculatorHydration(page);
    for (const [field, value] of [["balance", "10000000"], ["oldRate", "12"], ["oldMonths", "12"], ["newRate", "6"], ["newMonths", "12"], ["fees", "100000"]]) {
      await page.locator("#loan-refinance-" + field).fill(value);
    }
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("233,883");
    await expect(page.locator('[aria-live="polite"]')).toContainText("4 months");

    await page.goto("/en/calculators/prepayment-fee");
    await waitForCalculatorHydration(page);
    await page.locator("#prepayment-fee-amount").fill("10000000");
    await page.locator("#prepayment-fee-rate").fill("1.5");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("150,000");
    expect(errors).toEqual([]);
  });

  test("loan affordability, hourly wage, fuel efficiency, calories, and split examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/loan-affordability");
    await waitForCalculatorHydration(page);
    await page.locator("#loan-affordability-payment").fill("100000");
    await page.locator("#loan-affordability-rate").fill("0");
    await page.locator("#loan-affordability-months").fill("12");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("1,200,000");

    await page.goto("/en/calculators/hourly-wage");
    await waitForCalculatorHydration(page);
    await page.locator("#hourly-wage-mode").selectOption("monthly-to-hourly");
    await page.locator("#hourly-wage-pay").fill("3000000");
    await page.locator("#hourly-wage-monthlyHours").fill("209");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("14,354.07");

    await page.goto("/en/calculators/fuel-efficiency");
    await waitForCalculatorHydration(page);
    await page.locator("#fuel-efficiency-distance").fill("520");
    await page.locator("#fuel-efficiency-fuelAmount").fill("40");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("13 km/L");
    await expect(page.locator('[aria-live="polite"]')).toContainText("7.69 L/100km");

    await page.goto("/en/calculators/calorie-per-serving");
    await waitForCalculatorHydration(page);
    await page.locator("#calorie-per-serving-calories").fill("600");
    await page.locator("#calorie-per-serving-servings").fill("3");
    await page.locator("#calorie-per-serving-portion").fill("1");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("200 kcal");

    await page.goto("/en/calculators/trip-split");
    await waitForCalculatorHydration(page);
    await page.locator("#trip-split-total").fill("10000");
    await page.locator("#trip-split-people").fill("3");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("3,333.33");
    await expect(page.locator('[aria-live="polite"]')).toContainText("3,334");
    expect(errors).toEqual([]);
  });

  test("leave arithmetic, tenure, time, pregnancy date, and utility examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/annual-leave-allowance");
    await waitForCalculatorHydration(page);
    await page.locator("#annual-leave-allowance-dailyWage").fill("100000");
    await page.locator("#annual-leave-allowance-days").fill("3");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("300,000");

    await page.goto("/en/calculators/tenure");
    await waitForCalculatorHydration(page);
    await page.locator("#tenure-start").fill("2024-01-15");
    await page.locator("#tenure-end").fill("2025-03-20");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("14");
    await expect(page.locator('[aria-live="polite"]')).toContainText("430");

    await page.goto("/en/calculators/time-arithmetic");
    await waitForCalculatorHydration(page);
    await page.locator("#time-arithmetic-mode").selectOption("add");
    await page.locator("#time-arithmetic-aHours").fill("2");
    await page.locator("#time-arithmetic-aMinutes").fill("45");
    await page.locator("#time-arithmetic-bHours").fill("1");
    await page.locator("#time-arithmetic-bMinutes").fill("30");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("255");

    await page.goto("/en/calculators/pregnancy");
    await waitForCalculatorHydration(page);
    await page.locator("#pregnancy-mode").selectOption("due");
    await page.locator("#pregnancy-lmp").fill("2026-01-01");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("2026-10-08");

    await page.goto("/en/calculators/utility-bill");
    await waitForCalculatorHydration(page);
    await page.locator("#utility-bill-usage").fill("20");
    await page.locator("#utility-bill-rate").fill("500");
    await page.locator("#utility-bill-base").fill("1000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("11,000");
    expect(errors).toEqual([]);
  });

  test("average, weighted average, unit price, probability, and area calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);

    await page.goto("/en/calculators/average");
    await page.locator("#average-numbers").fill("10, 20, 30");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("20");

    await page.goto("/en/calculators/weighted-average");
    await page.locator("#weighted-average-values").fill("80; 100");
    await page.locator("#weighted-average-weights").fill("1; 3");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("95");

    await page.goto("/en/calculators/unit-price");
    await page.locator("#unit-price-mode").selectOption("unit");
    await page.locator("#unit-price-total").fill("18000");
    await page.locator("#unit-price-quantity").fill("12");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("1,500");

    await page.goto("/en/calculators/probability");
    await page.locator("#probability-mode").selectOption("at-least-one");
    await page.locator("#probability-probability").fill("20");
    await page.locator("#probability-trials").fill("3");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("48.8");

    await page.goto("/en/calculators/area");
    await page.locator("#area-mode").selectOption("sqm-to-pyeong");
    await page.locator("#area-value").fill("33.05785");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("10");

    expect(errors).toEqual([]);
  });

  test("percentile and ratio examples calculate in the browser", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/percentile");
    await page.locator("#percentile-numbers").fill("1, 2, 3, 4, 5");
    await page.locator("#percentile-percentile").fill("60");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("3");

    await page.goto("/en/calculators/aspect-ratio");
    await page.locator("#aspect-ratio-width").fill("2560");
    await page.locator("#aspect-ratio-height").fill("1440");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("16 : 9");

    await page.goto("/en/calculators/scale-ratio");
    await page.locator("#scale-ratio-scaleDrawing").fill("1");
    await page.locator("#scale-ratio-scaleActual").fill("100");
    await page.locator("#scale-ratio-length").fill("5");
    await page.locator("#scale-ratio-outputUnit").selectOption("m");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator('[aria-live="polite"]')).toContainText("5");
    expect(errors).toEqual([]);
  });

  test("UAE calculator pages render localized law and VAT details in SSR HTML", async ({ page }) => {
    test.setTimeout(120_000);
    for (const locale of locales) for (const slug of ["uae-gratuity-calculator", "uae-end-of-service-calculator", "uae-vat-calculator"] as const) {
      const response = await page.request.get("/" + locale + "/calculators/" + slug);
      expect(response?.status(), locale + "/" + slug).toBe(200);
      const copy = uaeLaborVatFollowups[locale][slug]!;
      const html = await response!.text();
      expect(html).toContain(copy.formula);
      expect(html).toContain(copy.exampleNote);
      expect(html).toContain(copy.faq?.question ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("UAE gratuity, end-of-service and VAT live examples fit eight viewport widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/uae-gratuity-calculator");
    await waitForCalculatorHydration(page);
    await expect(page.locator('article a[href*="mohre.gov.ae"]').first()).toBeVisible();
    await page.locator("#uae-gratuity-calculator-salary").fill("12000");
    await page.locator("#uae-gratuity-calculator-years").fill("6");
    await page.locator("#uae-gratuity-calculator-months").fill("0");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("54,000");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "UAE gratuity detail at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/uae-end-of-service-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#uae-end-of-service-calculator-salary").fill("12000");
    await page.locator("#uae-end-of-service-calculator-years").fill("6");
    await page.locator("#uae-end-of-service-calculator-months").fill("0");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("42,000");
    await expect(page.locator("[aria-live='polite']")).toContainText("54,000");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "UAE end-of-service detail at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/uae-vat-calculator");
    await waitForCalculatorHydration(page);
    await expect(page.locator('article a[href*="tax.gov.ae"]').first()).toBeVisible();
    await page.locator("#uae-vat-calculator-amount").fill("1000");
    await page.locator("#uae-vat-calculator-rate").fill("5");
    await page.locator("#uae-vat-calculator-direction").selectOption("exclusive");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("50 AED");
    await expect(page.locator("[aria-live='polite']")).toContainText("1,050 AED");

    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "UAE VAT detail at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });

  test("New Zealand tax and KiwiSaver examples render in all locale SSR pages", async ({ page }) => {
    test.setTimeout(120_000);
    for (const locale of locales) for (const slug of ["new-zealand-gross-net-salary-calculator", "new-zealand-income-tax-calculator", "new-zealand-kiwisaver-calculator"] as const) {
      const response = await page.request.get("/" + locale + "/calculators/" + slug);
      expect(response?.status(), locale + "/" + slug).toBe(200);
      const content = newZealandPayrollSavingsFollowups[locale][slug]!;
      const html = await response!.text();
      expect(html).toContain(content.formula);
      expect(html).toContain(content.exampleNote);
      expect(html).toContain(content.faq?.question ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("New Zealand tax and KiwiSaver flows work and fit eight viewport widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    const slugs = ["new-zealand-gross-net-salary-calculator", "new-zealand-income-tax-calculator", "new-zealand-kiwisaver-calculator"] as const;
    await page.goto("/en/calculators/new-zealand-gross-net-salary-calculator");
    await waitForCalculatorHydration(page);
    await expect(page.locator('article a[href*="ird.govt.nz/acclevy"]')).toBeVisible();
    await page.locator("#new-zealand-gross-net-salary-calculator-salary").fill("60000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("48,729.50");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, slugs[0] + " at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/new-zealand-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await expect(page.locator('article a[href*="tax-rates-for-individuals"]')).toBeVisible();
    await page.locator("#new-zealand-income-tax-calculator-income").fill("60000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("10,220.50");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, slugs[1] + " at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/new-zealand-kiwisaver-calculator");
    await waitForCalculatorHydration(page);
    await expect(page.locator('article a[href*="kiwisaver-changes"]')).toBeVisible();
    await page.locator("#new-zealand-kiwisaver-calculator-annualSalary").fill("60000");
    await page.locator("#new-zealand-kiwisaver-calculator-annualContribution").fill("2100");
    await page.locator("#new-zealand-kiwisaver-calculator-employerRate").fill("3.5");
    await page.locator("#new-zealand-kiwisaver-calculator-rate").fill("0");
    await page.locator("#new-zealand-kiwisaver-calculator-years").fill("1");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("4,200");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, slugs[2] + " at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });

  test("Spain policy copy is in initial HTML for every locale", async ({ page }) => {
    test.setTimeout(120_000);
    const slugs = ["spain-vat-calculator", "spain-irpf-calculator", "spain-severance-pay-calculator"] as const;
    for (const locale of locales) for (const slug of slugs) {
      const response = await page.request.get("/" + locale + "/calculators/" + slug);
      expect(response?.status(), locale + "/" + slug).toBe(200);
      const html = await response!.text();
      const content = spainPolicyFollowups[locale][slug]!;
      expect(html).toContain(content.formula);
      expect(html).toContain(content.exampleNote);
      expect(html).toContain(content.faq?.question ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Spain VAT, IRPF and severance flows fit all required viewport widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/spain-vat-calculator");
    await waitForCalculatorHydration(page);
    await expect(page.locator('article a[href*="/iva/calculo-iva-repercutido-clientes/"]')).toBeVisible();
    await page.locator("#spain-vat-calculator-amount").fill("1000");
    await page.locator("#spain-vat-calculator-rate").fill("21");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,210");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Spain IVA at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/spain-irpf-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#spain-irpf-calculator-income").fill("30000");
    await page.locator("#spain-irpf-calculator-rate").fill("15");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("4,500");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Spain IRPF at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/spain-severance-pay-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#spain-severance-pay-calculator-salary").fill("2500");
    await page.locator("#spain-severance-pay-calculator-years").fill("5");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("8,219.18");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Spain severance at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });

  test("France policy copy is in initial HTML for every locale", async ({ page }) => {
    test.setTimeout(120_000);
    const slugs = ["france-gross-net-salary-calculator", "france-income-tax-calculator", "france-vat-calculator"] as const;
    for (const locale of locales) for (const slug of slugs) {
      const response = await page.request.get("/" + locale + "/calculators/" + slug);
      expect(response?.status(), locale + "/" + slug).toBe(200);
      const html = await response!.text();
      const content = francePolicyFollowups[locale][slug]!;
      expect(html).toContain(content.howTo);
      expect(html).toContain(content.formula);
      expect(html).toContain(content.exampleNote);
      expect(html).toContain(content.faq?.question ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("France tax, net-pay and TVA flows fit all required viewport widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/france-vat-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#france-vat-calculator-amount").fill("1000");
    await page.locator("#france-vat-calculator-rate").fill("20");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,200");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "France TVA at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/france-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#france-income-tax-calculator-income").fill("30000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("2,103.99");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "France income tax at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/france-gross-net-salary-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#france-gross-net-salary-calculator-salary").fill("60000");
    await page.locator("#france-gross-net-salary-calculator-socialRate").fill("22");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("35,696.01");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "France gross-net at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });

  test("Netherlands policy copy is in initial HTML for every locale", async ({ page }) => {
    test.setTimeout(120_000);
    const slugs = ["netherlands-gross-net-salary-calculator", "netherlands-vat-calculator", "netherlands-30-percent-ruling-calculator"] as const;
    for (const locale of locales) for (const slug of slugs) {
      const response = await page.request.get("/" + locale + "/calculators/" + slug);
      expect(response?.status(), locale + "/" + slug).toBe(200);
      const html = await response!.text();
      const content = netherlandsPolicyFollowups[locale][slug]!;
      expect(html).toContain(content.howTo);
      expect(html).toContain(content.formula);
      expect(html).toContain(content.exampleNote);
      expect(html).toContain(content.faq?.question ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Netherlands VAT, salary and 30% scenarios fit all required viewport widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/netherlands-vat-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#netherlands-vat-calculator-amount").fill("1000");
    await page.locator("#netherlands-vat-calculator-rate").fill("21");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,210");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Netherlands VAT at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/netherlands-gross-net-salary-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#netherlands-gross-net-salary-calculator-salary").fill("50000");
    await page.locator("#netherlands-gross-net-salary-calculator-socialRate").fill("0");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("31,923.78");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Netherlands salary at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/netherlands-30-percent-ruling-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#netherlands-30-percent-ruling-calculator-salary").fill("80000");
    await page.locator("#netherlands-30-percent-ruling-calculator-rate").fill("30");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("24,000");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "Netherlands 30% facility at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }
    expect(errors).toEqual([]);
  });

  test("India policy copy is in initial HTML for every locale", async ({ page }) => {
    test.setTimeout(120_000);
    const slugs = ["india-gst-calculator", "india-income-tax-calculator", "india-gross-net-salary-calculator", "india-sip-calculator", "india-ppf-calculator", "india-nps-calculator"] as const;
    for (const locale of locales) for (const slug of slugs) {
      const response = await page.request.get("/" + locale + "/calculators/" + slug);
      expect(response?.status(), locale + "/" + slug).toBe(200);
      const html = await response!.text();
      const content = slug === "india-gross-net-salary-calculator" ? indiaSalaryStandardDeductionFollowups[locale] : slug === "india-sip-calculator" || slug === "india-ppf-calculator" || slug === "india-nps-calculator" ? indiaInvestmentScenarioFollowups[locale][slug] : indiaPolicyFollowups[locale][slug]!;
      expect(html).toContain(content.howTo);
      expect(html).toContain(content.formula);
      if (content.example) {
        expect(html).toContain(content.example.question);
        expect(html).toContain(content.example.answer);
      } else expect(html).toContain(content.exampleNote);
      expect(html).toContain(content.faq?.question ?? "");
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("India GST, tax and salary flows fit all required viewport widths", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    const viewports = [320, 360, 375, 390, 430, 768, 1024, 1440];
    await page.goto("/en/calculators/india-gst-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#india-gst-calculator-amount").fill("10000");
    await page.locator("#india-gst-calculator-rate").fill("18");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("11,800");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "India GST at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    await page.goto("/en/calculators/india-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#india-income-tax-calculator-income").fill("1500000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("105,000");
    await page.goto("/en/calculators/india-gross-net-salary-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#india-gross-net-salary-calculator-salary").fill("1500000");
    await page.locator("#india-gross-net-salary-calculator-socialRate").fill("0");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,406,250");
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
      expect(dimensions.body, "India salary at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
    }

    const scenarios = [
      { slug: "india-sip-calculator", monthly: "1000", rate: "8", years: "10", balance: "184,165.68" },
      { slug: "india-ppf-calculator", monthly: "5000", rate: "7.1", years: "15", balance: "1,608,120.46" },
      { slug: "india-nps-calculator", monthly: "5000", rate: "8", years: "20", balance: "2,964,736.09" },
    ] as const;
    for (const scenario of scenarios) {
      await page.goto("/en/calculators/" + scenario.slug);
      await waitForCalculatorHydration(page);
      await page.locator("#" + scenario.slug + "-monthlyDeposit").fill(scenario.monthly);
      await page.locator("#" + scenario.slug + "-rate").fill(scenario.rate);
      await page.locator("#" + scenario.slug + "-years").fill(scenario.years);
      await page.locator('form button[type="submit"]').click();
      await expect(page.locator("[aria-live='polite']")).toContainText(scenario.balance);
      for (const width of viewports) {
        await page.setViewportSize({ width, height: 900 });
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, body: document.body.scrollWidth }));
        expect(dimensions.body, scenario.slug + " at " + width + "px").toBeLessThanOrEqual(dimensions.viewport);
      }
    }
    expect(errors).toEqual([]);
  });

  test("Vietnam personal income-tax content is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = vietnamIncomeTaxFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/vietnam-personal-income-tax-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Vietnam personal income-tax calculator returns the documented engine example", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/vietnam-personal-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#vietnam-personal-income-tax-calculator-income").fill("240000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("18,000,000");
    await expect(page.locator("[aria-live='polite']")).toContainText("7.5");
    expect(errors).toEqual([]);
  });

  test("Vietnam social-insurance content is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = vietnamSocialInsuranceFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/vietnam-social-insurance-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Vietnam social-insurance calculator returns the documented employee estimate", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/vietnam-social-insurance-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#vietnam-social-insurance-calculator-salary").fill("30000000");
    await page.locator("#vietnam-social-insurance-calculator-rate").fill("10.5");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("3,150,000");
    expect(errors).toEqual([]);
  });

  test("China gross-to-net explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = chinaGrossNetFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/china-gross-net-salary-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("China gross-to-net calculator returns the documented annualized model", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/china-gross-net-salary-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#china-gross-net-salary-calculator-salary").fill("30000");
    await page.locator("#china-gross-net-salary-calculator-frequency").selectOption("monthly");
    await page.locator("#china-gross-net-salary-calculator-socialRate").fill("0");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("316,920");
    await expect(page.locator("[aria-live='polite']")).toContainText("26,410");
    expect(errors).toEqual([]);
  });

  test("China individual income-tax explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = chinaIncomeTaxFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/china-individual-income-tax-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("China individual income-tax calculator returns the documented progressive example", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/china-individual-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#china-individual-income-tax-calculator-income").fill("360000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("43,080");
    await expect(page.locator("[aria-live='polite']")).toContainText("14.36");
    expect(errors).toEqual([]);
  });

  test("China social-insurance explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = chinaSocialInsuranceFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/china-social-insurance-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("China social-insurance calculator returns the entered-rate estimate", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/china-social-insurance-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#china-social-insurance-calculator-salary").fill("20000");
    await page.locator("#china-social-insurance-calculator-rate").fill("8");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,600");
    expect(errors).toEqual([]);
  });

  test("China VAT explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = chinaVatFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/china-vat-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("China VAT calculator matches its exclusive and inclusive examples", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/china-vat-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#china-vat-calculator-amount").fill("1000");
    await page.locator("#china-vat-calculator-rate").fill("13");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,130");
    await page.locator("#china-vat-calculator-direction").selectOption("inclusive");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("884.96");
    await expect(page.locator("[aria-live='polite']")).toContainText("115.04");
    expect(errors).toEqual([]);
  });

  test("Taiwan gross-to-net explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = taiwanGrossNetFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/taiwan-gross-net-salary-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Taiwan gross-to-net calculator matches the monthly worked example", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/taiwan-gross-net-salary-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#taiwan-gross-net-salary-calculator-salary").fill("80000");
    await page.locator("#taiwan-gross-net-salary-calculator-frequency").selectOption("monthly");
    await page.locator("#taiwan-gross-net-salary-calculator-socialRate").fill("2.4");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("864,460");
    await expect(page.locator("[aria-live='polite']")).toContainText("72,038.33");
    expect(errors).toEqual([]);
  });

  test("Taiwan income-tax explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = taiwanIncomeTaxFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/taiwan-income-tax-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Taiwan income-tax calculator matches its annual progressive-band example", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/taiwan-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#taiwan-income-tax-calculator-income").fill("1000000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("77,300");
    await expect(page.locator("[aria-live='polite']")).toContainText("7.73");
    expect(errors).toEqual([]);
  });

  test("Taiwan labor-insurance explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = taiwanLaborInsuranceFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/taiwan-labor-insurance-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Taiwan labor-insurance calculator matches the entered-rate example", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/taiwan-labor-insurance-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#taiwan-labor-insurance-calculator-salary").fill("40000");
    await page.locator("#taiwan-labor-insurance-calculator-rate").fill("2.4");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("960");
    expect(errors).toEqual([]);
  });

  test("Taiwan VAT explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = taiwanVatFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/taiwan-vat-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Taiwan VAT calculator matches exclusive and inclusive examples", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/taiwan-vat-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#taiwan-vat-calculator-amount").fill("1000");
    await page.locator("#taiwan-vat-calculator-rate").fill("5");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,050");
    await page.locator("#taiwan-vat-calculator-direction").selectOption("inclusive");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("952.38");
    await expect(page.locator("[aria-live='polite']")).toContainText("47.62");
    expect(errors).toEqual([]);
  });

  test("Italy gross-to-net explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = italyGrossNetFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/italy-gross-net-salary-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Italy gross-to-net calculator matches its monthly progressive-band example", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/italy-gross-net-salary-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#italy-gross-net-salary-calculator-salary").fill("3000");
    await page.locator("#italy-gross-net-salary-calculator-frequency").selectOption("monthly");
    await page.locator("#italy-gross-net-salary-calculator-socialRate").fill("0");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("26,920");
    await expect(page.locator("[aria-live='polite']")).toContainText("2,243.33");
    expect(errors).toEqual([]);
  });

  test("Italy income-tax explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = italyIncomeTaxFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/italy-income-tax-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Italy income-tax calculator matches its annual marginal-band example", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/italy-income-tax-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#italy-income-tax-calculator-income").fill("60000");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("18,000");
    await expect(page.locator("[aria-live='polite']")).toContainText("30");
    expect(errors).toEqual([]);
  });

  test("Italy VAT explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = italyVatFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/italy-vat-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("Italy VAT calculator matches exclusive and inclusive examples", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/italy-vat-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#italy-vat-calculator-amount").fill("1000");
    await page.locator("#italy-vat-calculator-rate").fill("22");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("1,220");
    await page.locator("#italy-vat-calculator-direction").selectOption("inclusive");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("819.67");
    await expect(page.locator("[aria-live='polite']")).toContainText("180.33");
    expect(errors).toEqual([]);
  });

  test("U.S. paycheck explanation is present in SSR for all locales", async ({ request }) => {
    test.setTimeout(240_000);
    for (const locale of locales) {
      const copy = usPaycheckFollowups[locale];
      const response = await request.get("/" + locale + "/calculators/us-paycheck-calculator");
      expect(response?.status(), locale).toBe(200);
      const html = await response!.text();
      expect(html, `${locale} purpose`).toContain(copy.description);
      expect(html, `${locale} formula`).toContain(copy.formula);
      expect(html, `${locale} worked example`).toContain(copy.example!.answer);
      expect(html, `${locale} FAQ`).toContain(copy.faq!.question);
      expect(html).toMatch(/<h1\b/);
      expect(html).toMatch(/<h2\b/);
      expect(html.toLowerCase()).toContain("hreflang");
      expect(html).not.toMatch(/<meta[^>]+name=["']robots["'][^>]+noindex/i);
    }
  });

  test("U.S. paycheck calculator matches the annual single-filer model example", async ({ page }) => {
    const errors = collectBrowserErrors(page);
    await page.goto("/en/calculators/us-paycheck-calculator");
    await waitForCalculatorHydration(page);
    await page.locator("#us-paycheck-calculator-salary").fill("80000");
    await page.locator("#us-paycheck-calculator-frequency").selectOption("annual");
    await page.locator("#us-paycheck-calculator-filingStatus").selectOption("single");
    await page.locator("#us-paycheck-calculator-stateRate").fill("0");
    await page.locator('form button[type="submit"]').click();
    await expect(page.locator("[aria-live='polite']")).toContainText("65,110");
    await expect(page.locator("[aria-live='polite']")).toContainText("5,425.83");
    expect(errors).toEqual([]);
  });
});
