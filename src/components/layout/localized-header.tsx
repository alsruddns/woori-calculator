import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { localePath } from "@/i18n/config";
import { FamilySiteSwitcher } from "@/components/layout/family-site-switcher";
import { sharedUiCopy } from "@/i18n/shared-ui";
import { familySitesCopy } from "@/i18n/family-sites";

export function LocalizedHeader({ dictionary }: { dictionary: LocaleDictionary }) {
  const root = localePath(dictionary.locale);
  const copy = sharedUiCopy[dictionary.locale];
  return <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex min-w-0 max-w-[90rem] flex-wrap items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-5 sm:py-4">
    <Link className="flex min-w-0 shrink items-center gap-2 rounded text-sm font-semibold leading-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 sm:gap-3 sm:text-base" href={root} aria-label={copy.logoLabel}><Image className="h-auto w-[92px] sm:w-[160px]" src="/_assets/calculator/images/brand/woori-logo.png" alt="woori.today" width={419} height={99} priority sizes="(max-width: 640px) 92px, 160px" /><span className="hidden whitespace-nowrap text-sm font-normal text-slate-500 sm:inline">{dictionary.siteName}</span></Link>
    <nav aria-label={familySitesCopy[dictionary.locale].label} className="flex w-full min-w-0 flex-nowrap items-center justify-end gap-1 sm:w-auto sm:shrink-0 sm:gap-2"><FamilySiteSwitcher locale={dictionary.locale} /><LanguageSwitcher locale={dictionary.locale} label={dictionary.nav.language} /></nav>
  </div></header>;
}
