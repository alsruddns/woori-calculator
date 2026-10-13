import { pathToFileURL } from "node:url";

const DEFAULT_HOST = "www.woori.today";
const DEFAULT_SITEMAP_URL = "https://www.woori.today/calculator-sitemap.xml";
const LOCALES = ["ko", "en", "ja", "zh", "es", "pt-br", "de", "fr", "vi", "id", "th", "zh-tw", "it", "nl", "hi"];
const HREFLANG = { "pt-br": "pt-BR", "zh-tw": "zh-TW" };
const FIRST_PHASE_SLUGS = new Set(["age", "annual-leave-allowance", "area", "average", "bmi", "cagr", "calorie-per-serving", "change-rate", "compound-interest", "date-difference"]);
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

export function calculatorUrlsFromSitemap(xml, host = DEFAULT_HOST) {
  const landingPages = new Set();
  const details = new Map();
  const alternateLanguages = new Map();
  const seen = new Set();
  const allowedPath = /^\/(ko|en|ja|zh|es|pt-br|de|fr|vi|id|th|zh-tw|it|nl|hi)\/calculators(?:\/([a-z0-9]+(?:-[a-z0-9]+)*))?$/;

  for (const match of xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi)) {
    const entry = match[1] ?? "";
    const rawUrl = entry.match(/<loc>([\s\S]*?)<\/loc>/i)?.[1]?.trim();
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
    if (!FIRST_PHASE_SLUGS.has(slug) && !LOCALES.slice(0, 4).includes(locale)) continue;
    const alternates = new Set([...entry.matchAll(/hreflang="([^"]+)"/gi)].map((item) => item[1]));
    alternateLanguages.set(url.pathname, alternates);
    const locales = details.get(slug) ?? new Set();
    locales.add(locale);
    details.set(slug, locales);
  }

  const missingLandingPages = LOCALES.filter((locale) => !landingPages.has(locale));
  if (missingLandingPages.length) {
    throw new Error(`Sitemap is missing calculator landing pages for: ${missingLandingPages.join(", ")}`);
  }

  const incompleteCalculators = [...details.entries()]
    .map(([slug, presentLocales]) => {
      const expected = FIRST_PHASE_SLUGS.has(slug) ? LOCALES : LOCALES.slice(0, 4);
      return { slug, presentLocales, expected, missingLocales: expected.filter((locale) => !presentLocales.has(locale)) };
    })
    .filter(({ missingLocales }) => missingLocales.length > 0);
  if (incompleteCalculators.length) {
    const detailsBySlug = incompleteCalculators.map(({ slug, missingLocales }) => `- ${slug}: ${missingLocales.join(", ")}`).join("\n");
    throw new Error(`Published calculator locale validation failed:\n${detailsBySlug}`);
  }

  const missingAlternates = [...details.entries()].flatMap(([slug]) => {
    const expected = (FIRST_PHASE_SLUGS.has(slug) ? LOCALES : LOCALES.slice(0, 4)).map((locale) => HREFLANG[locale] ?? locale).concat("x-default");
    return [...details.get(slug)].flatMap((locale) => {
      const present = alternateLanguages.get(`/${locale}/calculators/${slug}`) ?? new Set();
      const missing = expected.filter((language) => !present.has(language));
      return missing.length ? [`- ${slug} (${locale}): ${missing.join(", ")}`] : [];
    });
  });
  if (missingAlternates.length) throw new Error(`Sitemap hreflang validation failed:\n${missingAlternates.join("\n")}`);

  const urls = [
    ...LOCALES.map((locale) => `https://${host}/${locale}/calculators`),
    ...[...details.entries()].sort(([a], [b]) => a.localeCompare(b)).flatMap(([slug, present]) => [...present].sort((a, b) => LOCALES.indexOf(a) - LOCALES.indexOf(b)).map((locale) => `https://${host}/${locale}/calculators/${slug}`)),
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

export async function calculatorUrlsFromSitemapUrl({ sitemapUrl = DEFAULT_SITEMAP_URL, fetchImpl = fetch } = {}) {
  const sitemapResponse = await fetchImpl(sitemapUrl);
  if (!sitemapResponse.ok) {
    throw new Error(`Could not load deployed calculator sitemap: HTTP ${sitemapResponse.status}`);
  }
  return calculatorUrlsFromSitemap(await sitemapResponse.text());
}

export async function submitIndexNow({ key, sitemapUrl = DEFAULT_SITEMAP_URL, dryRun = false, fetchImpl = fetch }) {
  const urlList = await calculatorUrlsFromSitemapUrl({ sitemapUrl, fetchImpl });
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
  if (process.env.INDEXNOW_VALIDATE_ONLY === "true") {
    const urlList = await calculatorUrlsFromSitemapUrl();
    console.log(`IndexNow sitemap validation passed: ${urlList.length} unique calculator URLs`);
    return;
  }

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
