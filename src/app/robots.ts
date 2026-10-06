import type { MetadataRoute } from "next";
import { siteConfig, siteUrl } from "@/constants/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
