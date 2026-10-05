import { CalculatorSidebar, type SidebarCalculator } from "@/components/calculator/calculator-sidebar";
import { publishedCalculatorPages } from "@/data/calculator-content";

type Props = {
  children: React.ReactNode;
  categories: Readonly<Record<string, string>>;
  categoryOrder: readonly string[];
  labels: { menu: string; search: string; close: string; empty: string };
  localizedItems?: readonly SidebarCalculator[];
  basePath?: string;
};

export function CalculatorWorkspace({ children, categories, categoryOrder, labels, localizedItems, basePath }: Props) {
  const items = localizedItems ?? publishedCalculatorPages.map(({ slug, name, category, keywords }) => ({ slug, name, category, keywords }));
  return <div className="mx-auto flex min-w-0 max-w-[90rem] flex-col gap-4 px-4 py-5 sm:gap-7 sm:px-6 sm:py-8 lg:flex-row lg:px-8">
    <CalculatorSidebar calculators={items} categories={categories} categoryOrder={categoryOrder} labels={labels} basePath={basePath} />
    <div className="min-w-0 flex-1">{children}</div>
  </div>;
}
