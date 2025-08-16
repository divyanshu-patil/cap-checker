import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "http://localhost:3000", // Replace with your machine's IPv4
    "http://172.26.48.1:3000", // The IP from the warning
    "http://10.209.116.150:3000",
  ],
};

export default nextConfig;
