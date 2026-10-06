import Link from "next/link";
import { siteConfig } from "@/constants/site-config";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/i18n/config";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export function SiteHeader({ locale = "ko", dictionary }: { locale?: Locale; dictionary?: LocaleDictionary }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-w-0 max-w-5xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4">
        <Link className="min-w-0 break-words rounded text-sm font-semibold leading-tight tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 sm:text-base" href="/" aria-label={`${siteConfig.name} 홈`}>
          <span>{siteConfig.name}</span>
          <span className="ml-2 hidden text-sm font-normal text-slate-500 sm:inline">woori.today</span>
        </Link>
        <nav aria-label="주요 메뉴" className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded px-2 text-sm font-medium leading-5 text-slate-700 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 sm:px-3" href={locale === "ko" ? "/calculators" : `/${locale}/calculators`}>
            계산기
          </Link>
          <LanguageSwitcher locale={locale} label={dictionary?.nav.language ?? "언어"} />
        </nav>
      </div>
    </header>
  );
}
