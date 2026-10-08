import { describe, expect, it, vi } from "vitest";
import { calculatorUrlsFromSitemap, createIndexNowPayload, submitIndexNow } from "./submit-indexnow.mjs";

const routes = [
  ...["ko", "en", "ja", "zh"].map((locale) => `https://www.woori.today/${locale}/calculators`),
  ...["ko", "en", "ja", "zh"].map((locale) => `https://www.woori.today/${locale}/calculators/compound-interest`),
];
const sitemap = (urls) => `<urlset>${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`;

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

  it("builds a unique IndexNow payload using the key location", () => {
    expect(createIndexNowPayload([routes[0], routes[0]], "8d730277e73843358dbc63ab157816af")).toEqual({
      host: "www.woori.today",
      key: "8d730277e73843358dbc63ab157816af",
      keyLocation: "https://www.woori.today/8d730277e73843358dbc63ab157816af.txt",
      urlList: [routes[0]],
    });
    expect(() => createIndexNowPayload([], "bad key")).toThrow("INDEXNOW_KEY");
  });

  it.each([200, 202])("supports dry-run and accepts IndexNow HTTP %s", async (status) => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: async () => sitemap(routes) })
      .mockResolvedValueOnce({ ok: true, text: async () => "8d730277e73843358dbc63ab157816af\n" })
      .mockResolvedValueOnce({ status, text: async () => status === 200 ? "OK" : "Accepted" });
    const dryRunFetch = vi.fn().mockResolvedValue({ ok: true, text: async () => sitemap(routes) });
    const dryRun = await submitIndexNow({ key: "8d730277e73843358dbc63ab157816af", dryRun: true, fetchImpl: dryRunFetch });
    expect(dryRun.status).toBe("dry-run");
    expect(dryRunFetch).toHaveBeenCalledTimes(1);
    expect(await submitIndexNow({ key: "8d730277e73843358dbc63ab157816af", fetchImpl })).toMatchObject({ status, count: 8 });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    expect(JSON.parse(fetchImpl.mock.calls[2][1].body).urlList).toHaveLength(8);
    expect(fetchImpl.mock.calls[2][1].headers["Content-Type"]).toBe("application/json; charset=utf-8");
  });

  it("reports non-success API responses clearly", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: async () => sitemap(routes) })
      .mockResolvedValueOnce({ ok: true, text: async () => "8d730277e73843358dbc63ab157816af" })
      .mockResolvedValueOnce({ status: 403, text: async () => "key validation failed" });
    await expect(submitIndexNow({ key: "8d730277e73843358dbc63ab157816af", fetchImpl })).rejects.toThrow("HTTP 403: key validation failed");
  });

  it("does not submit when the published key file cannot be verified", async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce({ ok: true, text: async () => sitemap(routes) })
      .mockResolvedValueOnce({ ok: false, status: 404, text: async () => "Not found" });
    await expect(submitIndexNow({ key: "8d730277e73843358dbc63ab157816af", fetchImpl })).rejects.toThrow("key file is not publicly reachable: HTTP 404");
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});
