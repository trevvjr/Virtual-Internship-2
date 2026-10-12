import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["localhost", "127.0.0.1", "10.0.0.71"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
