import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // disables eslint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // (optional) ignores TS errors too
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://172.26.48.1:3000",
    "http://10.209.116.150:3000",
  ],
};

export default nextConfig;
