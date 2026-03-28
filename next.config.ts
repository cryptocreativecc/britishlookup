import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pb.britishlookup.co.uk",
      },
    ],
  },
};

export default nextConfig;
