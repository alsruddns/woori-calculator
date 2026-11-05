import { expect, test } from "@playwright/test";

test("calculator sidebar stays mounted while moving between calculator pages", async ({ page }) => {
  await page.setViewportSize({ width: 1365, height: 900 });
  await page.goto("/ko/calculators/percentage");

  const sidebar = page.locator('aside[aria-label="계산기 메뉴"]');
  await expect(sidebar).toBeVisible();
  const sidebarElement = await sidebar.elementHandle();
  expect(sidebarElement).not.toBeNull();

  await sidebar.locator('a[href="/ko/calculators/fire-retirement-calculator"]').click();
  await expect(page).toHaveURL(/\/ko\/calculators\/fire-retirement-calculator$/);
  await expect(page.getByRole("heading", { level: 1, name: "FIRE 목표 금액 계산기" })).toBeVisible();
  expect(await sidebarElement!.evaluate((element) => element.isConnected)).toBe(true);

  await sidebar.locator('a[href="/ko/calculators/percentage"]').click();
  await expect(page).toHaveURL(/\/ko\/calculators\/percentage$/);
  await page.locator("#percentage-a").fill("100");
  await page.getByRole("button", { name: "계산하기" }).click();
  await expect(page.locator('section[aria-live="polite"]')).toBeVisible();
});
