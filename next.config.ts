import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security/headers";

const nextConfig: NextConfig = {
  output: "standalone",
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/calculators", destination: "/ko/calculators", permanent: true },
      { source: "/calculators/:slug", destination: "/ko/calculators/:slug", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: [...securityHeaders] }];
  },
};

export default nextConfig;
