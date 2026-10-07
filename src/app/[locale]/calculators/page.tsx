import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorWorkspace } from "@/components/calculator/calculator-workspace";
import { hasLocale, localePath, localizedCalculatorSlugs } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";
import { CalculatorCatalog } from "@/components/calculator/calculator-catalog";
import { getCalculatorPage } from "@/data/calculator-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") return {};
  const dict = getDictionary(key);
  return localizedMetadata(key, "/calculators", dict.calculatorList.title, dict.calculatorList.description);
}

export default async function LocaleCalculators({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") notFound();
  const dict = getDictionary(key);
  const items = localizedCalculatorSlugs.map((slug) => ({ slug, ...dict.calculators[slug]!, category: getCalculatorPage(slug)?.category ?? "math" }));
  const sidebarItems = items.map(({ slug, name, category, keywords }) => ({ slug, name, category, keywords }));
  return <CalculatorWorkspace localizedItems={sidebarItems} categories={dict.categories} categoryOrder={dict.categoriesOrder} basePath={localePath(key, "/calculators")} labels={{ menu: dict.nav.menu, search: dict.nav.search, close: dict.nav.close, empty: dict.nav.searchEmpty }}>
    <section className="min-w-0 py-3 sm:py-4"><nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-x-2 break-words text-sm text-slate-500 [overflow-wrap:anywhere] sm:mb-6"><Link className="inline-flex min-h-11 items-center" href={`/${key}`}>{dict.calculatorList.breadcrumbHome}</Link><span aria-hidden="true">/</span><span aria-current="page">{dict.calculatorList.breadcrumbCalculators}</span></nav><header className="min-w-0"><h1 className="break-words text-2xl font-bold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-3xl">{dict.calculatorList.title}</h1><p className="mt-3 max-w-2xl break-words leading-7 text-slate-600 [overflow-wrap:anywhere]">{dict.calculatorList.description}</p></header>
      <CalculatorCatalog items={items} categories={dict.categories} categoryOrder={dict.categoriesOrder} searchLabel={dict.nav.search} emptyLabel={dict.calculatorList.noResults} basePath={localePath(key, "/calculators")} />
    </section>
  </CalculatorWorkspace>;
}
