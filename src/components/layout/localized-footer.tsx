import Link from "next/link";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { localePath, type SupportedLocale } from "@/i18n/config";
import { ContactTrigger } from "@/components/layout/contact-trigger";
import { sharedUiCopy } from "@/i18n/shared-ui";

const legalLinkCopy: Record<SupportedLocale, { about: string; privacy: string; terms: string }> = {
  ko: { about: "서비스 소개", privacy: "개인정보처리방침", terms: "이용약관" },
  en: { about: "About (Korean)", privacy: "Privacy (Korean)", terms: "Terms (Korean)" },
  ja: { about: "サービス紹介（韓国語）", privacy: "プライバシー（韓国語）", terms: "利用規約（韓国語）" },
  zh: { about: "服务介绍（韩语）", privacy: "隐私政策（韩语）", terms: "使用条款（韩语）" },
  es: { about: "Acerca de (en coreano)", privacy: "Privacidad (en coreano)", terms: "Condiciones (en coreano)" },
  "pt-br": { about: "Sobre (em coreano)", privacy: "Privacidade (em coreano)", terms: "Termos (em coreano)" },
  de: { about: "Über uns (auf Koreanisch)", privacy: "Datenschutz (auf Koreanisch)", terms: "Nutzungsbedingungen (auf Koreanisch)" },
  fr: { about: "À propos (en coréen)", privacy: "Confidentialité (en coréen)", terms: "Conditions (en coréen)" },
  vi: { about: "Giới thiệu (bằng tiếng Hàn)", privacy: "Quyền riêng tư (bằng tiếng Hàn)", terms: "Điều khoản (bằng tiếng Hàn)" },
  id: { about: "Tentang (dalam bahasa Korea)", privacy: "Privasi (dalam bahasa Korea)", terms: "Ketentuan (dalam bahasa Korea)" },
  th: { about: "เกี่ยวกับ (ภาษาเกาหลี)", privacy: "ความเป็นส่วนตัว (ภาษาเกาหลี)", terms: "ข้อกำหนด (ภาษาเกาหลี)" },
  "zh-tw": { about: "服務介紹（韓文）", privacy: "隱私權（韓文）", terms: "使用條款（韓文）" },
  it: { about: "Informazioni (in coreano)", privacy: "Privacy (in coreano)", terms: "Termini (in coreano)" },
  nl: { about: "Over ons (in het Koreaans)", privacy: "Privacy (in het Koreaans)", terms: "Voorwaarden (in het Koreaans)" },
  hi: { about: "परिचय (कोरियाई में)", privacy: "गोपनीयता (कोरियाई में)", terms: "नियम (कोरियाई में)" },
  ru: { about: "О сервисе (на корейском)", privacy: "Конфиденциальность (на корейском)", terms: "Условия использования (на корейском)" },
  tr: { about: "Hakk?nda", privacy: "Gizlilik (Korece)", terms: "Kullan?m ko?ullar? (Korece)" },
  pl: { about: "O serwisie (po koreańsku)", privacy: "Prywatność (po koreańsku)", terms: "Warunki korzystania (po koreańsku)" },
  fil: { about: "Tungkol sa amin (sa Korean)", privacy: "Privacy (sa Korean)", terms: "Mga tuntunin (sa Korean)" },
  bn: { about: "পরিচিতি (কোরিয়ান ভাষায়)", privacy: "গোপনীয়তা (কোরিয়ান ভাষায়)", terms: "ব্যবহারের শর্ত (কোরিয়ান ভাষায়)" },
  uk: { about: "Про сервіс (корейською)", privacy: "Конфіденційність (корейською)", terms: "Умови користування (корейською)" },
  ms: { about: "Tentang kami (dalam bahasa Korea)", privacy: "Privasi (dalam bahasa Korea)", terms: "Terma penggunaan (dalam bahasa Korea)" },
  sv: { about: "Om tjänsten (på koreanska)", privacy: "Integritet (på koreanska)", terms: "Användarvillkor (på koreanska)" },
  cs: { about: "O službě (korejsky)", privacy: "Soukromí (korejsky)", terms: "Podmínky používání (korejsky)" },
  ro: { about: "Despre serviciu (în coreeană)", privacy: "Confidențialitate (în coreeană)", terms: "Condiții de utilizare (în coreeană)" },
  el: { about: "Σχετικά με την υπηρεσία (στα κορεατικά)", privacy: "Απόρρητο (στα κορεατικά)", terms: "Όροι χρήσης (στα κορεατικά)" },
};

export function localizedFooterLinks(locale: SupportedLocale) {
  const labels = legalLinkCopy[locale];
  return [
    { href: localePath(locale, "/about"), label: labels.about },
    { href: localePath(locale, "/privacy"), label: labels.privacy },
    { href: localePath(locale, "/terms"), label: labels.terms },
  ];
}

export function LocalizedFooter({ dictionary }: { dictionary: LocaleDictionary }) {
  const root = localePath(dictionary.locale);
  const copy = sharedUiCopy[dictionary.locale];
  const links = localizedFooterLinks(dictionary.locale);
  return <footer className="mt-auto border-t border-slate-200 bg-white"><div className="mx-auto flex min-w-0 max-w-[90rem] flex-col gap-4 px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-6 text-sm leading-6 text-slate-600 sm:px-5 sm:py-7 sm:flex-row sm:justify-between"><nav aria-label={copy.footerNavigation} className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 sm:gap-x-5 sm:gap-y-2"><Link className="inline-flex min-h-11 items-center break-words pr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700" href={`${root}/calculators`}>{dictionary.nav.calculators}</Link>{links.map(({ href, label }) => <Link key={href} className="inline-flex min-h-11 items-center break-words pr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 [overflow-wrap:anywhere]" href={href}>{label}</Link>)}<ContactTrigger copy={copy.contact} /></nav><p className="whitespace-nowrap">© woori.today</p></div></footer>;
}
