import type { Metadata } from "next";
import { localeConfig, localePath, locales, type Locale } from "@/i18n/config";
import { siteConfig } from "@/constants/site-config";

export function localizedLanguageAlternates(path: string, supportedLocales: readonly Locale[] = locales): Record<string, string> {
  return Object.fromEntries([
    ...supportedLocales.map((item) => [localeConfig[item].hreflang, `${siteConfig.serviceBaseUrl}${localePath(item, path)}`] as const),
    ["x-default", `${siteConfig.serviceBaseUrl}${localePath("ko", path)}`] as const,
  ]);
}

export function localizedMetadata(locale: Locale, path: string, title: string, description: string, keywords?: readonly string[], supportedLocales: readonly Locale[] = locales): Metadata {
  const languages = localizedLanguageAlternates(path, supportedLocales);
  const localizedPath = localePath(locale, path);
  const canonical = `${siteConfig.serviceBaseUrl}${localizedPath}`;
  const alternateLocale = supportedLocales.filter((item) => item !== locale).map((item) => localeConfig[item].ogLocale);
  return { title, description, ...(keywords ? { keywords: [...keywords] } : {}), alternates: { canonical, languages }, openGraph: { title, description, url: canonical, siteName: locale === "ko" ? siteConfig.name : "woori.today", locale: localeConfig[locale].ogLocale, alternateLocale, type: "website" }, twitter: { card: "summary", title, description } };
}
