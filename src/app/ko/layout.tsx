import type { Metadata } from "next";
import { siteConfig } from "@/constants/site-config";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleAdSense } from "@/components/ads/GoogleAdSense";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.serviceBaseUrl),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.shortName}` },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  icons: {
    icon: "/_assets/calculator/icon.png",
    apple: "/_assets/calculator/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2" href="#main-content">본문으로 건너뛰기</a>
        <SiteHeader />
      <main id="main-content" className="min-w-0 flex-1">{children}</main>
        <SiteFooter />
        <GoogleAnalytics />
        <GoogleAdSense />
      </body>
    </html>
  );
}
