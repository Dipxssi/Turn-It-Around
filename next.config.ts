import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.plane.so",
      },
      {
        protocol: "http",
        hostname: "app.plane.so",
      },
      {
        protocol: "https",
        hostname: "*.plane.so",
      },
      // Add more domains as needed
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
