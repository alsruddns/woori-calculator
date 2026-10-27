import { expect, test, type Page } from "@playwright/test";
import { reviewedBatchExampleNotes, secondReviewedBatchExampleNotes, thirdReviewedBatchExampleNotes, fourthReviewedBatchExampleNotes, fifthReviewedBatchExampleNotes, sixthReviewedBatchExampleNotes, seventhReviewedBatchExampleNotes } from "../src/i18n/dictionaries/locale-quality-followup";

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
const viewports = [320, 360, 375, 390, 430, 768, 1024, 1440] as const;

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
    const batchSlugs = [...editorialBatchSlugs, ...secondEditorialBatchSlugs, ...thirdEditorialBatchSlugs, ...fourthEditorialBatchSlugs, ...fifthEditorialBatchSlugs, ...sixthEditorialBatchSlugs, ...seventhEditorialBatchSlugs];
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
      const note = reviewedBatchExampleNotes[locale]?.[slug] ?? secondReviewedBatchExampleNotes[locale]?.[slug] ?? thirdReviewedBatchExampleNotes[locale]?.[slug] ?? fourthReviewedBatchExampleNotes[locale]?.[slug] ?? fifthReviewedBatchExampleNotes[locale]?.[slug] ?? sixthReviewedBatchExampleNotes[locale]?.[slug] ?? seventhReviewedBatchExampleNotes[locale]?.[slug] ?? "";
      await expect(page.locator("article")).toContainText(note);
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
});
