import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { familySitesCopy } from "@/i18n/family-sites";

export function FamilySiteSwitcher({ locale }: { locale: Locale }) {
  const copy = familySitesCopy[locale];
  const sites = [
    { href: localePath(locale), label: copy.portal },
    { href: localePath(locale, "/calculators"), label: copy.calculator, active: true },
    { href: localePath(locale, "/tools"), label: copy.tools },
    { href: localePath(locale, "/money"), label: copy.moneyBook },
    { href: localePath(locale, "/docs"), label: copy.documents },
    { href: localePath(locale, "/quiz"), label: copy.quiz },
  ];
  const linkClass = "inline-flex min-h-10 items-center justify-center rounded-lg px-2 text-center text-xs font-medium leading-tight text-slate-700 hover:bg-slate-100 hover:text-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 xl:px-2.5 xl:text-sm";
  const activeClass = "bg-teal-50 text-teal-900 ring-1 ring-inset ring-teal-200";

  return <>
    <details className="relative xl:hidden">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 [&::-webkit-details-marker]:hidden">
        <span>{copy.menu}</span><span aria-hidden="true" className="ml-2 text-xs">⌄</span>
      </summary>
      <nav aria-label={copy.label} className="absolute right-0 top-full z-30 mt-2 grid w-[min(20rem,calc(100vw-1.5rem))] gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
        {sites.map((site) => <a key={site.href} href={site.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} justify-start px-3 text-sm ${site.active ? activeClass : ""}`} aria-current={site.active ? "page" : undefined}>{site.label}</a>)}
      </nav>
    </details>
    <nav aria-label={copy.label} className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
      {sites.map((site) => <a key={site.href} href={site.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} ${site.active ? activeClass : ""}`} aria-current={site.active ? "page" : undefined}>{site.label}</a>)}
    </nav>
  </>;
}
