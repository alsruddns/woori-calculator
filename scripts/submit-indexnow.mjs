import { pathToFileURL } from "node:url";

const DEFAULT_HOST = "www.woori.today";
const DEFAULT_SITEMAP_URL = "https://www.woori.today/calculator-sitemap.xml";
const LOCALES = ["ko", "en", "ja", "zh"];
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

export function calculatorUrlsFromSitemap(xml, host = DEFAULT_HOST) {
  const landingPages = new Set();
  const details = new Map();
  const seen = new Set();
  const allowedPath = /^\/(ko|en|ja|zh)\/calculators(?:\/([a-z0-9]+(?:-[a-z0-9]+)*))?$/;

  for (const match of xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)) {
    const rawUrl = match[1]?.trim();
    if (!rawUrl) continue;

    let url;
    try {
      url = new URL(rawUrl);
    } catch {
      continue;
    }
    if (url.protocol !== "https:" || url.hostname !== host || url.port || url.search || url.hash) continue;

    const route = url.pathname.match(allowedPath);
    if (!route) continue;
    const [, locale, slug] = route;
    if (seen.has(url.href)) continue;
    seen.add(url.href);

    if (!slug) {
      landingPages.add(locale);
      continue;
    }
    const locales = details.get(slug) ?? new Set();
    locales.add(locale);
    details.set(slug, locales);
  }

  const missingLandingPages = LOCALES.filter((locale) => !landingPages.has(locale));
  if (missingLandingPages.length) {
    throw new Error(`Sitemap is missing calculator landing pages for: ${missingLandingPages.join(", ")}`);
  }

  for (const [slug, locales] of details) {
    const missingLocales = LOCALES.filter((locale) => !locales.has(locale));
    if (missingLocales.length) {
      throw new Error(`Published calculator "${slug}" is missing locale URLs: ${missingLocales.join(", ")}`);
    }
  }

  const urls = [
    ...LOCALES.map((locale) => `https://${host}/${locale}/calculators`),
    ...[...details.keys()].sort().flatMap((slug) => LOCALES.map((locale) => `https://${host}/${locale}/calculators/${slug}`)),
  ];
  if (urls.length > 10_000) throw new Error(`IndexNow accepts at most 10,000 URLs per request; received ${urls.length}`);
  return [...new Set(urls)];
}

export function createIndexNowPayload(urlList, key) {
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key ?? "")) {
    throw new Error("INDEXNOW_KEY must contain 8 to 128 letters, numbers, or hyphens");
  }
  const keyLocation = `https://www.woori.today/${key}.txt`;
  return { host: DEFAULT_HOST, key, keyLocation, urlList: [...new Set(urlList)] };
}

export async function submitIndexNow({ key, sitemapUrl = DEFAULT_SITEMAP_URL, dryRun = false, fetchImpl = fetch }) {
  const sitemapResponse = await fetchImpl(sitemapUrl);
  if (!sitemapResponse.ok) {
    throw new Error(`Could not load deployed calculator sitemap: HTTP ${sitemapResponse.status}`);
  }
  const urlList = calculatorUrlsFromSitemap(await sitemapResponse.text());
  const payload = createIndexNowPayload(urlList, key);

  if (dryRun) {
    console.log(`IndexNow dry run: ${payload.urlList.length} unique calculator URLs`);
    for (const url of payload.urlList) console.log(url);
    return { status: "dry-run", count: payload.urlList.length };
  }

  const keyResponse = await fetchImpl(payload.keyLocation);
  if (!keyResponse.ok) {
    throw new Error(`IndexNow key file is not publicly reachable: HTTP ${keyResponse.status} (${payload.keyLocation})`);
  }
  if ((await keyResponse.text()).trim() !== key) {
    throw new Error(`IndexNow key file content does not match INDEXNOW_KEY (${payload.keyLocation})`);
  }

  const response = await fetchImpl(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const responseBody = await response.text();
  if (response.status === 200 || response.status === 202) {
    console.log(`IndexNow accepted ${payload.urlList.length} URLs (HTTP ${response.status})`);
    return { status: response.status, count: payload.urlList.length };
  }
  throw new Error(`IndexNow API returned HTTP ${response.status}: ${responseBody.slice(0, 500) || "(empty response)"}`);
}

async function main() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) throw new Error("INDEXNOW_KEY is required");
  await submitIndexNow({ key, dryRun: process.env.INDEXNOW_DRY_RUN === "true" });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`IndexNow submission failed: ${error.message}`);
    process.exitCode = 1;
  });
}
