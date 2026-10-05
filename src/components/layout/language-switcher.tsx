"use client";

import { usePathname, useRouter } from "next/navigation";
import { languageSwitchPath, type Locale } from "@/i18n/config";

const choices: { locale: Locale; label: string }[] = [
  { locale: "ko", label: "한국어" }, { locale: "en", label: "English" }, { locale: "ja", label: "日本語" }, { locale: "zh", label: "中文" },
];

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  return <label className="flex items-center gap-2 text-sm text-slate-600"><span className="sr-only">{label}</span><select aria-label={label} className="min-h-10 rounded-lg border border-slate-300 bg-white px-2 focus-visible:outline-2 focus-visible:outline-teal-700" value={locale} onChange={(event) => {
    const target = event.target.value as Locale;
    router.push(languageSwitchPath(pathname, target));
  }}>{choices.map((choice) => <option key={choice.locale} value={choice.locale}>{choice.label}</option>)}</select></label>;
}
