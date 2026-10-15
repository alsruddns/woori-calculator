import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/site-config";
import { localePath } from "@/i18n/config";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { FamilySiteSwitcher } from "@/components/layout/family-site-switcher";
import { sharedUiCopy } from "@/i18n/shared-ui";
import type { Locale } from "@/i18n/config";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export function SiteHeader({ locale = "ko", dictionary }: { locale?: Locale; dictionary?: LocaleDictionary }) {
  const copy = sharedUiCopy[locale];
  return <header className="border-b border-slate-200 bg-white">
    <div className="mx-auto flex min-w-0 max-w-[90rem] flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 py-3 sm:px-5 sm:py-4 xl:flex-nowrap">
      <Link className="flex min-w-0 shrink items-center gap-2 rounded text-sm font-semibold leading-tight tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 sm:gap-3 sm:text-base" href={localePath(locale)} aria-label={copy.logoLabel}>
        <Image className="h-auto w-[100px] sm:w-[160px]" src="/_assets/calculator/images/brand/woori-logo.png" alt="woori.today" width={419} height={99} priority sizes="(max-width: 640px) 100px, 160px" />
        <span className="hidden whitespace-nowrap text-sm font-normal text-slate-500 sm:inline">{siteConfig.name}</span>
      </Link>
      <div className="order-3 flex w-full min-w-0 items-center justify-center xl:order-2 xl:w-auto xl:flex-1"><FamilySiteSwitcher locale={locale} /></div>
      <div className="order-2 ml-auto min-w-0 xl:order-3 xl:ml-0"><LanguageSwitcher locale={locale} label={dictionary?.nav.language ?? "언어"} /></div>
    </div>
  </header>;
}
