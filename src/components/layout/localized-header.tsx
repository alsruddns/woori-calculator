import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export function LocalizedHeader({ dictionary }: { dictionary: LocaleDictionary }) {
  const root = `/${dictionary.locale}`;
  return <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex min-w-0 max-w-[90rem] items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-5 sm:py-4">
    <Link className="flex min-w-0 shrink items-center gap-2 rounded text-sm font-semibold leading-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 sm:gap-3 sm:text-base" href={root} aria-label="woori.today 홈"><Image className="h-auto w-[135px] sm:w-[160px]" src="/images/brand/woori-logo.png" alt="woori.today" width={419} height={99} priority sizes="(max-width: 640px) 135px, 160px" /><span className="hidden whitespace-nowrap text-sm font-normal text-slate-500 sm:inline">{dictionary.siteName}</span></Link>
    <nav aria-label={dictionary.nav.calculators} className="flex shrink-0 items-center gap-1 sm:gap-2"><Link className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded px-2 text-sm font-medium leading-5 text-slate-700 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-teal-700 sm:px-3" href={`${root}/calculators`}>{dictionary.nav.calculators}</Link><LanguageSwitcher locale={dictionary.locale} label={dictionary.nav.language} /></nav>
  </div></header>;
}
