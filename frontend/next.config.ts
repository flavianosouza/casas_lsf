import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.casaslsf.com",
        pathname: "/blog/**",
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
