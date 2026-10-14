"use client";

import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { familySitesCopy } from "@/i18n/family-sites";

export function FamilySiteSwitcher({ locale }: { locale: Locale }) {
  const copy = familySitesCopy[locale];
  const sites = [
    { href: localePath(locale), label: copy.portal },
    { href: localePath(locale, "/calculators"), label: copy.calculator },
    { href: localePath(locale, "/tools"), label: copy.tools },
    { href: localePath(locale, "/money"), label: copy.moneyBook },
  ];

  return (
    <div className="flex min-w-0 shrink-0 items-center">
      <span className="sr-only" id="family-sites-new-tab">{copy.newTab}</span>
      <select
        aria-label={copy.label}
        aria-describedby="family-sites-new-tab"
        title={copy.label}
        className="h-11 w-[7.25rem] max-w-[40vw] min-w-0 shrink-0 rounded-lg border border-slate-300 bg-white px-2 text-xs leading-5 text-slate-700 focus-visible:outline-2 focus-visible:outline-teal-700 sm:w-auto sm:max-w-[17rem] sm:text-sm"
        defaultValue=""
        onChange={(event) => {
          const site = sites.find(({ href }) => href === event.currentTarget.value);
          if (site) window.open(site.href, "_blank", "noopener,noreferrer");
          event.currentTarget.value = "";
        }}
      >
        <option value="" disabled>{copy.label}</option>
        {sites.map((site) => <option key={site.href} value={site.href}>{site.label}</option>)}
      </select>
    </div>
  );
}