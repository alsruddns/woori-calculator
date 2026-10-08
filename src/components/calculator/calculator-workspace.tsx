import { ADS_ENABLED } from "@/lib/ads/enabled";
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
  const adsEnabled = ADS_ENABLED;
  const columns = adsEnabled
    ? "lg:grid-cols-[16.25rem_minmax(0,1fr)]"
    : "lg:grid-cols-[16rem_minmax(0,1fr)]";
  const leftRailClass = adsEnabled
    ? "sticky top-24 hidden min-w-0 self-start ad-left:block"
    : "hidden";
  const rightRailClass = adsEnabled
    ? "sticky top-24 hidden min-w-0 self-start ad-right:block"
    : "hidden";

  return <div className={`calculator-page-shell mx-auto grid w-full min-w-0 max-w-[120rem] grid-cols-1 items-start gap-4 px-4 py-5 sm:gap-7 sm:px-6 sm:py-8 lg:gap-7 lg:px-8 ${columns}`} data-ad-layout={adsEnabled ? "enabled" : "disabled"}>
    {adsEnabled ? <div className={leftRailClass} aria-hidden="true"><AdSlot placement="left-rail" size="vertical" /></div> : null}
    <div className="min-w-0 self-start"><CalculatorSidebar calculators={items} categories={categories} categoryOrder={categoryOrder} labels={labels} basePath={basePath} /></div>
    <div className="calculator-main min-w-0">{children}</div>
    {adsEnabled ? <div className={rightRailClass} aria-hidden="true"><AdSlot placement="right-rail" size="vertical" /></div> : null}
  </div>;
}
