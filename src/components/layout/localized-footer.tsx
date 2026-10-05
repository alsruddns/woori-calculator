import Link from "next/link";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export function LocalizedFooter({ dictionary }: { dictionary: LocaleDictionary }) {
  const root = `/${dictionary.locale}`;
  return <footer className="mt-auto border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-[90rem] flex-col gap-4 px-5 py-7 text-sm text-slate-600 sm:flex-row sm:justify-between"><nav aria-label={dictionary.nav.calculators} className="flex flex-wrap gap-5"><Link href={`${root}/calculators`}>{dictionary.nav.calculators}</Link></nav><p>© {new Date().getFullYear()} woori.today</p></div></footer>;
}
