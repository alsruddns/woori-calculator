import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/constants/site-config";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/i18n/config";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export function SiteHeader({ locale = "ko", dictionary }: { locale?: Locale; dictionary?: LocaleDictionary }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-w-0 max-w-5xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4">
        <Link className="flex min-w-0 shrink items-center gap-2 rounded text-sm font-semibold leading-tight tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 sm:gap-3 sm:text-base" href="/" aria-label="woori.today 홈">
          <Image className="h-auto w-[135px] sm:w-[160px]" src="/images/brand/woori-logo.png" alt="woori.today" width={1319} height={233} priority sizes="(max-width: 640px) 135px, 160px" />
          <span className="hidden whitespace-nowrap text-sm font-normal text-slate-500 sm:inline">{siteConfig.name}</span>
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
