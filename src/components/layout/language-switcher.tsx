"use client";

import { usePathname, useRouter } from "next/navigation";
import { languageSwitchPath, localeConfig, locales, type Locale } from "@/i18n/config";

const choices: { locale: Locale; label: string }[] = locales.map((locale) => ({ locale, label: localeConfig[locale].nativeName }));

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  return <label className="flex min-w-0 shrink-0 items-center text-sm leading-5 text-slate-600"><span className="sr-only">{label}</span><select aria-label={label} className="h-11 min-h-11 w-auto min-w-0 max-w-[45vw] rounded-lg border border-slate-300 bg-white px-2 text-xs leading-5 focus-visible:outline-2 focus-visible:outline-teal-700 sm:max-w-[12rem] sm:text-sm" value={locale} onChange={(event) => {
    const target = event.target.value as Locale;
    router.push(languageSwitchPath(pathname, target));
  }}>{choices.map((choice) => <option key={choice.locale} value={choice.locale}>{choice.label}</option>)}</select></label>;
}
