import { describe, expect, it, vi } from "vitest";
import { calculatorUrlsFromSitemap, calculatorUrlsFromSitemapUrl, createIndexNowPayload, submitIndexNow } from "./submit-indexnow.mjs";

const routes = [
  ...["ko", "en", "ja", "zh"].map((locale) => `https://www.woori.today/${locale}/calculators`),
  ...["ko", "en", "ja", "zh"].map((locale) => `https://www.woori.today/${locale}/calculators/compound-interest`),
];
const sitemap = (urls, localizedSlugs = ["compound-interest", "fraction", "standard-deviation"]) => `<urlset>${urls.map((url) => {
  const slug = url.match(/\/calculators\/([^/]+)$/)?.[1];
  const alternates = slug && localizedSlugs.includes(slug)
    ? ["ko", "en", "ja", "zh", "x-default"].map((locale) => `<xhtml:link rel="alternate" hreflang="${locale}" href="https://www.woori.today/${locale === "x-default" ? "ko" : locale}/calculators/${slug}"/>`).join("")
    : "";
  return `<url><loc>${url}</loc>${alternates}</url>`;
}).join("")}</urlset>`;

describe("IndexNow URL preparation", () => {
  it("keeps only supported calculator listing/detail URLs and deduplicates them", () => {
    const input = [
      ...routes,
      routes[1],
      "https://www.woori.today/calculator/compound-interest",
      "https://www.woori.today/fr/calculators/compound-interest",
      "https://other.example/ko/calculators/compound-interest",
      "https://www.woori.today/ko/calculators/compound-interest?ref=old",
    ];
    const result = calculatorUrlsFromSitemap(sitemap(input));

    expect(result).toHaveLength(8);
    expect(new Set(result).size).toBe(result.length);
    expect(result).toEqual(routes);
    expect(result.some((url) => url.includes("/calculator/"))).toBe(false);
  });

  it("rejects sitemaps without all listing locales or a complete locale set for a detail slug", () => {
    expect(() => calculatorUrlsFromSitemap(sitemap(routes.filter((url) => !url.includes("/zh/calculators"))))).toThrow("missing calculator landing pages");
    expect(() => calculatorUrlsFromSitemap(sitemap(routes.filter((url) => !url.endsWith("/zh/calculators/compound-interest"))))).toThrow("missing locale URLs");
  });

  it("accepts and submits all four published fraction locale URLs", () => {
    const fractionUrls = ["ko", "en", "ja", "zh"].map((locale) => `https://www.woori.today/${locale}/calculators/fraction`);
    expect(calculatorUrlsFromSitemap(sitemap([...routes, ...fractionUrls]))).toEqual([
      ...routes,
      ...fractionUrls,
    ]);
  });

  it("accepts all four published standard deviation locale URLs", () => {
    const standardDeviationUrls = ["ko", "en", "ja", "zh"].map((locale) => `https://www.woori.today/${locale}/calculators/standard-deviation`);
    expect(calculatorUrlsFromSitemap(sitemap([...routes, ...standardDeviationUrls]))).toEqual([...routes, ...standardDeviationUrls]);
  });

  it("keeps Korean-only published calculators without inventing translated URLs", () => {
    const koreanOnlyUrl = "https://www.woori.today/ko/calculators/median";
    expect(calculatorUrlsFromSitemap(sitemap([...routes, koreanOnlyUrl]))).toEqual([...routes, koreanOnlyUrl]);
  });

  it("rejects partial translated routes even when a sitemap entry omits hreflang links", () => {
    const partialUrls = ["ko", "en"].map((locale) => `https://www.woori.today/${locale}/calculators/partial-translation`);
    expect(() => calculatorUrlsFromSitemap(sitemap([...routes, ...partialUrls], [])).filter((url) => url.includes("partial-translation"))).toThrow("missing locale URLs: ja, zh");
  });

  it("validates a deployed sitemap through the same complete-locale parser", async () => {
    const standardDeviationUrls = ["ko", "en", "ja", "zh"].map((locale) => `https://www.woori.today/${locale}/calculators/standard-deviation`);
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, text: async () => sitemap([...routes, ...standardDeviationUrls]) });
    expect(await calculatorUrlsFromSitemapUrl({ fetchImpl })).toHaveLength(12);
    expect(fetchImpl).toHaveBeenCalledWith("https://www.woori.today/calculator-sitemap.xml");

    const staleFetch = vi.fn().mockResolvedValue({ ok: true, text: async () => sitemap([...routes, standardDeviationUrls[0]]) });
    await expect(calculatorUrlsFromSitemapUrl({ fetchImpl: staleFetch })).rejects.toThrow('Published calculator "standard-deviation" is missing locale URLs: en, ja, zh');
  });

  it("builds a unique IndexNow payload using the key location", () => {
    expect(createIndexNowPayload([routes[0], routes[0]], "bc52d22e38f7489988b717aa090fbdfb")).toEqual({
      host: "www.woori.today",
      key: "bc52d22e38f7489988b717aa090fbdfb",
      keyLocation: "https://www.woori.today/bc52d22e38f7489988b717aa090fbdfb.txt",
      urlList: [routes[0]],
    });
    expect(() => createIndexNowPayload([], "bad key")).toThrow("INDEXNOW_KEY");
  });

  it.each([200, 202])("supports dry-run and accepts IndexNow HTTP %s", async (status) => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: async () => sitemap(routes) })
      .mockResolvedValueOnce({ ok: true, text: async () => "bc52d22e38f7489988b717aa090fbdfb\n" })
      .mockResolvedValueOnce({ status, text: async () => status === 200 ? "OK" : "Accepted" });
    const dryRunFetch = vi.fn().mockResolvedValue({ ok: true, text: async () => sitemap(routes) });
    const dryRun = await submitIndexNow({ key: "bc52d22e38f7489988b717aa090fbdfb", dryRun: true, fetchImpl: dryRunFetch });
    expect(dryRun.status).toBe("dry-run");
    expect(dryRunFetch).toHaveBeenCalledTimes(1);
    expect(await submitIndexNow({ key: "bc52d22e38f7489988b717aa090fbdfb", fetchImpl })).toMatchObject({ status, count: 8 });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(JSON.parse(fetchImpl.mock.calls[2][1].body).urlList).toHaveLength(8);
    expect(fetchImpl.mock.calls[2][1].headers["Content-Type"]).toBe("application/json; charset=utf-8");
  });

  it("reports non-success API responses clearly", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: async () => sitemap(routes) })
      .mockResolvedValueOnce({ ok: true, text: async () => "bc52d22e38f7489988b717aa090fbdfb" })
      .mockResolvedValueOnce({ status: 403, text: async () => "key validation failed" });
    await expect(submitIndexNow({ key: "bc52d22e38f7489988b717aa090fbdfb", fetchImpl })).rejects.toThrow("HTTP 403: key validation failed");
  });

  it("does not submit when the published key file cannot be verified", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: async () => sitemap(routes) })
      .mockResolvedValueOnce({ ok: false, status: 404, text: async () => "Not found" });
    await expect(submitIndexNow({ key: "bc52d22e38f7489988b717aa090fbdfb", fetchImpl })).rejects.toThrow("key file is not publicly reachable: HTTP 404");
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});
