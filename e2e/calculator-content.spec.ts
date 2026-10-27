import { expect, test, type Page } from "@playwright/test";
import { reviewedBatchExampleNotes, secondReviewedBatchExampleNotes, thirdReviewedBatchExampleNotes } from "../src/i18n/dictionaries/locale-quality-followup";

const locales = [
  "ko", "en", "ja", "zh", "es", "pt-br", "de", "fr", "vi", "id", "th", "zh-tw", "it", "nl", "hi",
  "ru", "tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el",
] as const;
const reviewedSlugs = ["average", "weighted-average", "unit-price", "probability", "area"] as const;
const editorialBatchSlugs = ["percentage", "ratio", "proportion", "median", "decimal-fraction"] as const;
const secondEditorialBatchSlugs = ["change-rate", "discount", "cagr", "simple-interest", "compound-interest"] as const;
const thirdEditorialBatchSlugs = ["date-difference", "dday", "age", "workdays", "unit-converter"] as const;
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
    const batchSlugs = [...editorialBatchSlugs, ...secondEditorialBatchSlugs, ...thirdEditorialBatchSlugs];
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
      const note = reviewedBatchExampleNotes[locale]?.[slug] ?? secondReviewedBatchExampleNotes[locale]?.[slug] ?? thirdReviewedBatchExampleNotes[locale]?.[slug] ?? "";
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
      ["change-rate", "From 200 to 150, the change is −50"],
      ["discount", "A 20% discount on 50,000 gives a 10,000 discount"],
      ["cagr", "Growing from 100 to 121 over two years is equivalent"],
      ["simple-interest", "At 10% simple interest for five years"],
      ["compound-interest", "At 10% compounded annually for five years"],
    ["date-difference", "Jan 1 to Jan 3, 2026 is a 2-day elapsed difference"],
    ["dday", "From June 1 to June 10, the target is 9 calendar days away"],
    ["age", "A person born Dec 31, 2000 is 25 on Dec 30, 2026"],
    ["workdays", "Monday Jan 5 through Friday Jan 9, 2026 counts 5 weekdays"],
    ["unit-converter", "One mile is 1.609344 kilometers"],
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
