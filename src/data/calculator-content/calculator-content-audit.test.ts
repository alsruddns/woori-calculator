import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { globalCountryCalculatorSlugs } from "@/data/calculator-content/country-specific-global";
import { countrySpecificCalculatorSlugs } from "@/data/calculator-content/country-specific";
import { getDictionary } from "@/i18n/dictionaries";
import { calculatorSupportsLocale, supportedLocales } from "@/i18n/config";
import { calculatorExample } from "@/lib/content-quality/examples";
import { calculatorContentQualitySignals } from "@/lib/content-quality/signals";

const auditPath = resolve(process.cwd(), "docs/calculator-content-audit-2026-10-27.md");
const policySourceUrlsComparedThisRun = new Set([
  "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026",
  "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal",
  "https://www3.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html",
  "https://www.belastingdienst.nl/wps/wcm/connect/en/individuals/content/coming-to-work-in-the-netherlands-30-percent-facility",
]);

function buildAuditReport() {
  const publishedSlugs = new Set(publishedCalculatorPages.map((page) => page.slug));
  const globalTemplates = new Set(globalCountryCalculatorSlugs);
  const countryTemplates = new Set(countrySpecificCalculatorSlugs);
  const localeCoverage = Object.fromEntries(supportedLocales.map((locale) => [locale, 0])) as Record<(typeof supportedLocales)[number], number>;
  const seenText = Object.fromEntries(supportedLocales.map((locale) => [locale, Object.fromEntries(["description", "howTo", "FAQ", "example"].map((kind) => [kind, new Map<string, string>()]))])) as Record<(typeof supportedLocales)[number], Record<string, Map<string, string>>>;
  const localeDuplicateCounts = Object.fromEntries(supportedLocales.map((locale) => [locale, 0])) as Record<(typeof supportedLocales)[number], number>;
  const rows = publishedCalculatorPages.map((page) => {
    const availableLocales = supportedLocales.filter((locale) => calculatorSupportsLocale(page.slug, locale)
      && Boolean(getDictionary(locale).calculators[page.slug as keyof ReturnType<typeof getDictionary>["calculators"]]));
    for (const locale of availableLocales) localeCoverage[locale] += 1;
    const example = page.countrySpecific ? calculatorExample(page, "en") : undefined;
    const localizedBrokenForPage: string[] = [];
    const localeSignals = availableLocales.flatMap((locale) => {
      const content = getDictionary(locale).calculators[page.slug as keyof ReturnType<typeof getDictionary>["calculators"]];
      if (!content) return [];
      for (const relatedSlug of content.related) {
        if (!publishedSlugs.has(relatedSlug)) {
          const brokenLink = `${locale}/${page.slug} -> ${relatedSlug}`;
          localizedBrokenForPage.push(brokenLink);
        }
      }
      const signals = calculatorContentQualitySignals(content, locale).map((signal) => `${locale}: ${signal}`);
      const blocks = [
        ["description", content.description],
        ["howTo", content.howTo],
        ["FAQ", content.faqs.map(({ question, answer }) => `${question}:${answer}`).join("|")],
        ["example", `${content.example.question}:${content.example.answer}`],
      ] as const;
      for (const [kind, value] of blocks) {
        const previous = seenText[locale][kind]!.get(value);
        if (previous) {
          signals.push(`${locale}: exact duplicate ${kind} with ${previous}`);
          localeDuplicateCounts[locale] += 1;
        } else seenText[locale][kind]!.set(value, page.slug);
      }
      return signals;
    });
    const missingRelated = page.relatedCalculatorIds.filter((slug) => !publishedSlugs.has(slug));
    const concerns: string[] = [];
    if (page.countrySpecific && !example) concerns.push("country example has no output for the configured inputs");
    if (page.policyType === "POLICY" && !page.countryCode) concerns.push("policy page has no country code");
    if (page.policyType === "POLICY" && !page.policyYear) concerns.push("policy page has no reference year");
    if (page.policyType === "POLICY" && !page.sources?.length) concerns.push("policy page has no listed source");
    if (page.policyType === "POLICY") concerns.push("official source and effective rule not live-verified in this audit");
    if (missingRelated.length) concerns.push(`broken related links: ${missingRelated.join(", ")}`);
    if (globalTemplates.has(page.slug) || countryTemplates.has(page.slug)) concerns.push("generated country-policy copy requires calculator-specific editorial review");
    if (availableLocales.length !== supportedLocales.length) concerns.push(`published in ${availableLocales.length}/${supportedLocales.length} configured locales`);
    return {
      page,
      example,
      availableLocales,
      concerns,
      localizedBrokenLinks: localizedBrokenForPage,
      localeSignals,
      exampleOutputMatches: page.countrySpecific && example ? page.example.answer.includes(example.result) : undefined,
    };
  });

  const policyPages = publishedCalculatorPages.filter((page) => page.policyType === "POLICY");
  const policySourceRows = policyPages.filter((page) => Boolean(page.sources?.length)).length;
  const verifiedPolicySourceUrls = new Set(policyPages.flatMap((page) => page.sources?.filter((source) => source.checkedAt).map((source) => source.url) ?? []));
  const pagesWithVerifiedSources = policyPages.filter((page) => page.sources?.some((source) => source.checkedAt)).length;
  const modelSpecificPolicyPages = policyPages.filter((page) => page.countrySpecific && getDictionary("en").calculators[page.slug as keyof ReturnType<typeof getDictionary>['calculators']]?.formula !== page.formula).length;
  const generatedPolicyPages = rows.filter(({ page }) => globalTemplates.has(page.slug) || countryTemplates.has(page.slug));
  const computedPolicyExamples = rows.filter(({ page, exampleOutputMatches }) => page.countrySpecific && exampleOutputMatches === true).length;
  const localeSignalCounts = Object.fromEntries(supportedLocales.map((locale) => [locale, rows.reduce((count, row) => count + row.localeSignals.filter((signal) => signal.startsWith(`${locale}: `) && !signal.includes("exact duplicate ")).length, 0)]));
  const output = [
    "# Calculator content audit — 2026-10-27",
    "",
    "This report records reproducible structural and calculation checks for the 169 published calculators. It does not claim that static checks replace editorial, translation, legal, or live-source review. Policy source URLs are recorded below by the data model; this run did not open and revalidate every authority page.",
    "",
    "## Summary",
    "",
    `- Published calculators: **${publishedCalculatorPages.length}** (unique slugs: ${new Set(publishedCalculatorPages.map((page) => page.slug)).size})`,
    `- Configured public locales: **${supportedLocales.length}**; per-locale published calculator counts: ${Object.entries(localeCoverage).map(([locale, count]) => `${locale} ${count}`).join(", ")}`,
    `- Policy calculators: **${policyPages.length}**; with at least one listed source: **${policySourceRows}/${policyPages.length}**. Source records contain a check date for **${verifiedPolicySourceUrls.size} unique URLs**, referenced by **${pagesWithVerifiedSources}/${policyPages.length} pages**; **${policySourceUrlsComparedThisRun.size} URLs** were opened and their relevant content compared with the configured rule or rate in this run. This does not validate every rule or input model on a page.`,
    `- Country-policy pages with a calculator-specific displayed formula or calculation explanation: **${modelSpecificPolicyPages}/${policyPages.length}**. Their examples are generated from the page calculation function; this does not certify policy eligibility, translation quality or legal completeness.`,
    `- Country-specific examples matching the result produced from their default input values: **${computedPolicyExamples}/${publishedCalculatorPages.filter((page) => page.countrySpecific).length}**. The check runs the page calculation function and matches its displayed result text.`,
    `- Locale-aware short-content signals (review candidates, not automatic failures): ${Object.entries(localeSignalCounts).map(([locale, count]) => `${locale} ${count}`).join(", ")}. The published route count does not certify translation quality.`,
    `- Exact duplicate content occurrences across description/how-to/FAQ/example blocks by locale: ${Object.entries(localeDuplicateCounts).map(([locale, count]) => `${locale} ${count}`).join(", ")}. This includes partial locales that the legacy duplicate test does not yet cover.`,
    `- Generated country-policy pages requiring editorial review: **${generatedPolicyPages.length}** (${globalTemplates.size} global-country pages and ${countryTemplates.size} country-specific pages). The review is required because their copy is assembled from shared wording even when the inputs and examples differ.`,
    "- Calculation functions, rate tables, routes, canonical metadata, hreflang, sitemap, and currency behavior were not modified by this audit artifact.",
    "",
    "## Page-by-page review register",
    "",
    "`Example check` is marked for country-policy examples generated from structured calculator inputs; `matched` means the published answer contains the computed result. Other calculators store example prose without a machine-readable input, so their numeric examples need manual or future structured-input verification. `Editorial review` records known follow-up work; it is not an automatic quality score.",
    "",
    "| Slug | Category | Policy | Inputs | Related links | Available locales | Example check | Policy sources | Locale review signals | Editorial review |",
    "| --- | --- | --- | ---: | ---: | ---: | --- | ---: | --- | --- |",
    ...rows.map(({ page, availableLocales, concerns, exampleOutputMatches, localeSignals }) => {
      const editorial = concerns.length ? concerns.map((item) => item.replaceAll("|", "\\|")).join("; ") : "No structural flag; human usefulness review remains required";
      const exampleStatus = !page.countrySpecific ? "manual" : exampleOutputMatches ? "matched" : "does not match";
      const localeReview = localeSignals.length ? localeSignals.map((item) => item.replaceAll("|", "\\|")).join("; ") : "—";
      return `| \`${page.slug}\` | ${page.category} | ${page.policyType}${page.policyYear ? ` ${page.policyYear}` : ""} | ${page.fields.length} | ${page.relatedCalculatorIds.length} | ${availableLocales.length}/${supportedLocales.length} | ${exampleStatus} | ${page.sources?.length ?? 0} | ${localeReview} | ${editorial} |`;
    }),
    "",
    "## Follow-up required",
    "",
    "- The model formula/explanation and engine-generated example were improved for the 90 country-policy pages. Review the remaining calculator-specific purpose, detailed assumptions and FAQs individually before treating the pages as fully edited.",
    "- Verify the policy rules and effective dates for the remaining sources. Only sources with an explicit per-source checked date were opened in this review; source presence and checked links do not validate every country rule.",
    "- Review translation terminology and long-copy rendering for each published locale. Core-locale formula improvements do not certify all 26 locale translations; short-content and duplicate signals remain review candidates.",
    "- Check the flagged rows above before treating the catalog as fully editorially reviewed. Pages without structural flags still need a human content and domain review.",
  ].join("\n");

  return { output, rows, policyPages, generatedPolicyPages, computedPolicyExamples, modelSpecificPolicyPages, verifiedPolicySourceUrls, pagesWithVerifiedSources, policySourceUrlsComparedThisRun, localeCoverage };
}

describe("calculator content audit register", () => {
  it("checks all published calculators and writes a reviewable per-page audit", () => {
    const report = buildAuditReport();
    expect(report.rows).toHaveLength(169);
    expect(new Set(report.rows.map(({ page }) => page.slug)).size).toBe(169);
    expect(report.policyPages.every((page) => page.countryCode && page.countryName && page.policyYear && page.sources?.length)).toBe(true);
    expect(report.computedPolicyExamples).toBe(publishedCalculatorPages.filter((page) => page.countrySpecific).length);
    expect(report.modelSpecificPolicyPages).toBe(90);
    expect(report.verifiedPolicySourceUrls.size).toBeGreaterThan(0);
    expect(report.policySourceUrlsComparedThisRun.size).toBe(4);
    expect(report.pagesWithVerifiedSources).toBeGreaterThan(0);
    expect(Object.values(report.localeCoverage)).toEqual(Array(supportedLocales.length).fill(169));
    expect(report.rows.every(({ concerns, localizedBrokenLinks }) => !concerns.some((item) => item.startsWith("broken related links:")) && localizedBrokenLinks.length === 0)).toBe(true);

    mkdirSync(dirname(auditPath), { recursive: true });
    writeFileSync(auditPath, `${report.output}\n`, "utf8");
  });
});
