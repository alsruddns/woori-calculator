import { CalculatorSidebar, type SidebarCalculator } from "@/components/calculator/calculator-sidebar";
import { AdSlot } from "@/components/ads/AdSlot";
import { publishedCalculatorPages } from "@/data/calculator-content";

type Props = {
  children: React.ReactNode;
  categories: Readonly<Record<string, string>>;
  categoryOrder: readonly string[];
  labels: { menu: string; search: string; close: string; empty: string };
  localizedItems?: readonly SidebarCalculator[];
  basePath: string;
};

export function CalculatorWorkspace({ children, categories, categoryOrder, labels, localizedItems, basePath }: Props) {
  const items = localizedItems ?? publishedCalculatorPages.map(({ slug, name, category, keywords }) => ({ slug, name, category, keywords }));
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true" || process.env.NODE_ENV !== "production";
  const columns = adsEnabled
    ? "lg:grid-cols-[16.25rem_minmax(0,1fr)] min-[1400px]:grid-cols-[16.25rem_minmax(0,1fr)_11.25rem] min-[1700px]:grid-cols-[11.25rem_16.25rem_minmax(0,1fr)_11.25rem]"
    : "lg:grid-cols-[16rem_minmax(0,1fr)]";

  return <div className={`mx-auto grid min-w-0 max-w-[120rem] grid-cols-1 items-start gap-4 px-4 py-5 sm:gap-7 sm:px-6 sm:py-8 lg:gap-7 lg:px-8 ${columns}`}>
    {adsEnabled ? <div className="sticky top-24 hidden min-w-0 self-start min-[1700px]:block" aria-hidden="true"><AdSlot placement="left-rail" size="vertical" /></div> : null}
    <CalculatorSidebar calculators={items} categories={categories} categoryOrder={categoryOrder} labels={labels} basePath={basePath} />
    <div className="min-w-0">{children}</div>
    {adsEnabled ? <div className="sticky top-24 hidden min-w-0 self-start min-[1400px]:block" aria-hidden="true"><AdSlot placement="right-rail" size="vertical" /></div> : null}
  </div>;
}
