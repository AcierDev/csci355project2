import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add redirects for old HTML paths
  async redirects() {
    return [];
  },
};

export default nextConfig;
