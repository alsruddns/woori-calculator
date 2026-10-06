import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/constants/site-config";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  keywords?: readonly string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataInput): Metadata {
  const canonical = siteUrl(path === "/" ? "/" : path.replace(/\/$/, ""));

  return {
    title,
    description,
    ...(keywords ? { keywords: [...keywords] } : {}),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
