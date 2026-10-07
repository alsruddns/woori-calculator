import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security/headers";

const nextConfig: NextConfig = {
  basePath: "/calculator",
  output: "standalone",
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/calculators/:slug", destination: "/:slug", permanent: true },
      { source: "/:locale(en|ja|zh)/calculators/:slug", destination: "/:locale/:slug", permanent: true },
    ];
  },
  async rewrites() {
    return {
      afterFiles: [
        { source: "/:locale(en|ja|zh)/:slug", destination: "/:locale/calculators/:slug" },
        { source: "/:slug", destination: "/calculators/:slug" },
      ],
    };
  },
  async headers() {
    return [{ source: "/:path*", headers: [...securityHeaders] }];
  },
};

export default nextConfig;
