import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export function LocalizedHeader({ dictionary }: { dictionary: LocaleDictionary }) {
  const root = `/${dictionary.locale}`;
  return <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-5 py-4">
    <Link className="rounded font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700" href={root}>{dictionary.siteName}<span className="ml-2 text-sm font-normal text-slate-500">woori.today</span></Link>
    <nav aria-label={dictionary.nav.calculators} className="flex items-center gap-2"><Link className="rounded px-3 py-2 text-sm font-medium text-slate-700 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-teal-700" href={`${root}/calculators`}>{dictionary.nav.calculators}</Link><LanguageSwitcher locale={dictionary.locale} label={dictionary.nav.language} /></nav>
  </div></header>;
}
