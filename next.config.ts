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
  async redirects() {
    return [
      { source: "/directory/:slug", destination: "/business/:slug", permanent: true },
      { source: "/blog", destination: "/guides", permanent: true },
      { source: "/blog/:slug", destination: "/guides/:slug", permanent: true },
      { source: "/category/:slug", destination: "/categories/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
