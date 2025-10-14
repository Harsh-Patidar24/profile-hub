import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: ESLint errors will not fail the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
