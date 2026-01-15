import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🔑 Required for Hosting Africa (static hosting)
  output: "export",
  trailingSlash: true,

  // 🔑 Required because next/image optimization
  // does NOT work on shared hosting
  images: {
    unoptimized: true,
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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
