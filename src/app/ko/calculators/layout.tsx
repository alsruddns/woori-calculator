import { CalculatorWorkspace } from "@/components/calculator/calculator-workspace";
import { calculatorCategories, calculatorCategoryOrder } from "@/data/calculators/categories";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";

export default function KoreanCalculatorsLayout({ children }: { children: React.ReactNode }) {
  const dictionary = getDictionary("ko");
  const items = publishedCalculatorPages.map((item) => ({
    slug: item.slug,
    name: dictionary.calculators[item.slug as keyof typeof dictionary.calculators]?.name ?? item.name,
    keywords: item.keywords,
    category: item.category,
  }));

  return (
    <CalculatorWorkspace
      localizedItems={items}
      categories={calculatorCategories}
      categoryOrder={calculatorCategoryOrder}
      basePath={localePath("ko", "/calculators")}
      labels={{ menu: dictionary.nav.menu, search: dictionary.nav.search, close: dictionary.nav.close, empty: dictionary.nav.searchEmpty }}
    >
      {children}
    </CalculatorWorkspace>
  );
}
