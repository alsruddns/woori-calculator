import { notFound } from "next/navigation";
import { CalculatorWorkspace } from "@/components/calculator/calculator-workspace";
import { getCalculatorPage } from "@/data/calculator-content";
import { hasLocale, localePath, localizedIndexSlugs, type SupportedLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function CalculatorsLayout({ children, params }: Props) {
  const { locale: key } = await params;
  if (!hasLocale(key) || key === "ko") notFound();

  const locale = key as Exclude<SupportedLocale, "ko">;
  const dictionary = getDictionary(locale);
  const items = localizedIndexSlugs(locale).map((slug) => ({
    slug,
    name: dictionary.calculators[slug]!.name,
    keywords: dictionary.calculators[slug]!.keywords,
    category: getCalculatorPage(slug)?.category ?? "math",
  }));

  return (
    <CalculatorWorkspace
      localizedItems={items}
      categories={dictionary.categories}
      categoryOrder={dictionary.categoriesOrder}
      basePath={localePath(locale, "/calculators")}
      labels={{ menu: dictionary.nav.menu, search: dictionary.nav.search, close: dictionary.nav.close, empty: dictionary.nav.searchEmpty }}
    >
      {children}
    </CalculatorWorkspace>
  );
}
