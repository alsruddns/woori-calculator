import { describe, expect, it, vi } from "vitest";
import { calculatorUrlsFromSitemap, calculatorUrlsFromSitemapUrl, createIndexNowPayload, FULL_LOCALE_SLUGS, submitIndexNow } from "./submit-indexnow.mjs";

const locales = ["ko", "en", "ja", "zh", "es", "pt-br", "de", "fr", "vi", "id", "th", "zh-tw", "it", "nl", "hi"];
const hreflang = { "pt-br": "pt-BR", "zh-tw": "zh-TW" };
const slugs = [...FULL_LOCALE_SLUGS].sort();
const routes = locales.map((locale) => `https://www.woori.today/${locale}/calculators`);
const details = (slug) => locales.map((locale) => `https://www.woori.today/${locale}/calculators/${slug}`);
const alternates = (slug) => [...locales.map((locale) => hreflang[locale] ?? locale), "x-default"].map((language) => {
  const routeLocale = Object.entries(hreflang).find(([, value]) => value === language)?.[0] ?? (language === "x-default" ? "ko" : language);
  return `<xhtml:link rel="alternate" hreflang="${language}" href="https://www.woori.today/${routeLocale}/calculators/${slug}"/>`;
}).join("");
const sitemap = (urls, localizedSlugs = slugs) => `<urlset>${urls.map((url) => {
  const slug = url.match(/\/calculators\/([^/]+)$/)?.[1];
  return `<url><loc>${url}</loc>${slug && localizedSlugs.includes(slug) ? alternates(slug) : ""}</url>`;
}).join("")}</urlset>`;
const baseline = [...routes, ...details("loan-interest")];

describe("IndexNow URL preparation", () => {
  it("keeps supported listing and all fifteen calculator routes, deduplicates them, and ignores invalid URLs", () => {
    const input = [...baseline, baseline[1], "https://www.woori.today/calculator/loan-interest", "https://other.example/ko/calculators/loan-interest", "https://www.woori.today/ko/calculators/loan-interest?ref=old"];
    const result = calculatorUrlsFromSitemap(sitemap(input));
    expect(result).toHaveLength(baseline.length);
    expect(new Set(result).size).toBe(result.length);
    expect(result).toEqual(baseline);
    expect(result.some((url) => url.includes("/calculator/"))).toBe(false);
  });

  it("rejects missing listing or detail locales and reports all missing locale URLs", () => {
    expect(() => calculatorUrlsFromSitemap(sitemap(baseline.filter((url) => !url.includes("/zh/calculators"))))).toThrow("missing calculator landing pages");
    expect(() => calculatorUrlsFromSitemap(sitemap(baseline.filter((url) => !url.endsWith("/zh/calculators/loan-interest"))))).toThrow("loan-interest: zh");
    const incomplete = ["https://www.woori.today/ko/calculators/median", "https://www.woori.today/en/calculators/median"];
    expect(() => calculatorUrlsFromSitemap(sitemap([...baseline, ...incomplete]))).toThrow("- median: ja, zh, es, pt-br, de, fr, vi, id, th, zh-tw, it, nl, hi");
  });

  it("includes all supported locale routes and BCP 47 hreflang mappings", () => {
    for (const slug of ["fraction", "age", "median"]) {
      const urls = details(slug);
      const result = calculatorUrlsFromSitemap(sitemap([...baseline, ...urls]));
      expect(result).toHaveLength(baseline.length + 15);
      expect(result).toContain(`https://www.woori.today/es/calculators/${slug}`);
      const xml = sitemap([...baseline, ...urls]);
      expect(xml).toContain(`hreflang="pt-BR" href="https://www.woori.today/pt-br/calculators/${slug}"`);
      expect(xml).toContain(`hreflang="zh-TW" href="https://www.woori.today/zh-tw/calculators/${slug}"`);
    }
    const broken = sitemap([...baseline, ...details("age")]).replace('hreflang="pt-BR" href="https://www.woori.today/pt-br/calculators/age"', 'hreflang="pt-br" href="https://www.woori.today/pt-br/calculators/age"');
    expect(() => calculatorUrlsFromSitemap(broken)).toThrow("Sitemap hreflang validation failed");
  });

  it("collects the complete published sitemap set based on the registered calculator slugs", () => {
    const allUrls = [...routes, ...slugs.flatMap(details)];
    const collected = calculatorUrlsFromSitemap(sitemap(allUrls));
    expect(collected).toHaveLength(routes.length + slugs.length * locales.length);
    expect(new Set(collected).size).toBe(routes.length + slugs.length * locales.length);
    expect(new Set(collected)).toEqual(new Set(allUrls));
  });

  it("validates a deployed sitemap with the same completeness rules", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, text: async () => sitemap(baseline) });
    expect(await calculatorUrlsFromSitemapUrl({ fetchImpl })).toHaveLength(baseline.length);
    expect(fetchImpl).toHaveBeenCalledWith("https://www.woori.today/calculator-sitemap.xml");
    const staleFetch = vi.fn().mockResolvedValue({ ok: true, text: async () => sitemap([...routes, details("loan-interest")[0]]) });
    await expect(calculatorUrlsFromSitemapUrl({ fetchImpl: staleFetch })).rejects.toThrow("- loan-interest: en, ja, zh");
  });

  it("builds a unique IndexNow payload using the existing key location", () => {
    expect(createIndexNowPayload([routes[0], routes[0]], "bc52d22e38f7489988b717aa090fbdfb")).toEqual({
      host: "www.woori.today", key: "bc52d22e38f7489988b717aa090fbdfb", keyLocation: "https://www.woori.today/bc52d22e38f7489988b717aa090fbdfb.txt", urlList: [routes[0]],
    });
    expect(() => createIndexNowPayload([], "bad key")).toThrow("INDEXNOW_KEY");
  });

  it.each([200, 202])("supports dry-run and accepts IndexNow HTTP %s", async (status) => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: async () => sitemap(baseline) })
      .mockResolvedValueOnce({ ok: true, text: async () => "bc52d22e38f7489988b717aa090fbdfb\n" })
      .mockResolvedValueOnce({ status, text: async () => status === 200 ? "OK" : "Accepted" });
    const dryRunFetch = vi.fn().mockResolvedValue({ ok: true, text: async () => sitemap(baseline) });
    const dryRun = await submitIndexNow({ key: "bc52d22e38f7489988b717aa090fbdfb", dryRun: true, fetchImpl: dryRunFetch });
    expect(dryRun.status).toBe("dry-run");
    expect(dryRunFetch).toHaveBeenCalledTimes(1);
    expect(await submitIndexNow({ key: "bc52d22e38f7489988b717aa090fbdfb", fetchImpl })).toMatchObject({ status, count: baseline.length });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(JSON.parse(fetchImpl.mock.calls[2][1].body).urlList).toHaveLength(baseline.length);
    expect(fetchImpl.mock.calls[2][1].headers["Content-Type"]).toBe("application/json; charset=utf-8");
  });

  it("reports API errors and does not submit when the public key file is unavailable", async () => {
    const failedSubmit = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: async () => sitemap(baseline) })
      .mockResolvedValueOnce({ ok: true, text: async () => "bc52d22e38f7489988b717aa090fbdfb" })
      .mockResolvedValueOnce({ status: 403, text: async () => "key validation failed" });
    await expect(submitIndexNow({ key: "bc52d22e38f7489988b717aa090fbdfb", fetchImpl: failedSubmit })).rejects.toThrow("HTTP 403: key validation failed");
    const missingKey = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: async () => sitemap(baseline) })
      .mockResolvedValueOnce({ ok: false, status: 404, text: async () => "Not found" });
    await expect(submitIndexNow({ key: "bc52d22e38f7489988b717aa090fbdfb", fetchImpl: missingKey })).rejects.toThrow("key file is not publicly reachable: HTTP 404");
    expect(missingKey).toHaveBeenCalledTimes(2);
  });
});
