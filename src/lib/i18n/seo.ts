import type { Metadata } from "next";
import { localeConfig, localePath, locales, type SupportedLocale } from "@/i18n/config";
import { siteConfig } from "@/constants/site-config";

export function localizedLanguageAlternates(path: string, localeList: readonly SupportedLocale[] = locales): Record<string, string> {
  return Object.fromEntries([
    ...localeList.map((item) => [localeConfig[item].hreflang, `${siteConfig.serviceBaseUrl}${localePath(item, path)}`] as const),
    ["x-default", `${siteConfig.serviceBaseUrl}${localePath("ko", path)}`] as const,
  ]);
}

export function localizedMetadata(locale: SupportedLocale, path: string, title: string, description: string, keywords?: readonly string[], localeList: readonly SupportedLocale[] = locales): Metadata {
  const languages = localizedLanguageAlternates(path, localeList);
  const localizedPath = localePath(locale, path);
  const canonical = `${siteConfig.serviceBaseUrl}${localizedPath}`;
  const alternateLocale = localeList.filter((item) => item !== locale).map((item) => localeConfig[item].ogLocale);
  return { title, description, ...(keywords ? { keywords: [...keywords] } : {}), alternates: { canonical, languages }, openGraph: { title, description, url: canonical, siteName: locale === "ko" ? siteConfig.name : "woori.today", locale: localeConfig[locale].ogLocale, alternateLocale, type: "website" }, twitter: { card: "summary", title, description } };
}
