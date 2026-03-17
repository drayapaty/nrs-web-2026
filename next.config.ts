import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.amazonaws.com" },
      { protocol: "https", hostname: "*.cloudfront.net" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "backend.niranjanaswami.net" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
