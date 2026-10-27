import { expect, test, type Page } from "@playwright/test";
import { reviewedBatchExampleNotes } from "../src/i18n/dictionaries/locale-quality-followup";

const locales = [
  "ko", "en", "ja", "zh", "es", "pt-br", "de", "fr", "vi", "id", "th", "zh-tw", "it", "nl", "hi",
  "ru", "tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el",
] as const;
const reviewedSlugs = ["average", "weighted-average", "unit-price", "probability", "area"] as const;
const editorialBatchSlugs = ["percentage", "ratio", "proportion", "median", "decimal-fraction"] as const;
const viewports = [320, 360, 375, 390, 430, 768, 1024, 1440] as const;

function collectBrowserErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
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
    const slug = editorialBatchSlugs[index % editorialBatchSlugs.length]!;
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
      await expect(page.locator("article")).toContainText(reviewedBatchExampleNotes[locale]?.[slug] ?? "");
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
      for (const slug of editorialBatchSlugs) {
        const response = await page.goto("/en/calculators/" + slug);
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
  test("new static-math batch renders calculator-specific examples and notes", async ({ page }) => {
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
    ] as const;
    for (const [slug, note] of batch) {
      const response = await page.goto("/en/calculators/" + slug);
      expect(response?.status(), slug).toBe(200);
      await expect(page.locator("article h1"), slug).toBeVisible();
      await expect(page.locator("article h2").first(), slug).toBeVisible();
      await expect(page.locator("article"), slug).toContainText(note);
      expect(await page.locator("article h2").count(), slug).toBeGreaterThanOrEqual(4);
      await expect(page.locator("article h2").last(), slug).toBeVisible();
    }
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
