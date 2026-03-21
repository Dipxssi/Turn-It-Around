import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * API routes (`/api/*`) are NOT included in static export builds.
   * Set STATIC_EXPORT=true only when you need `out/` for static hosting
   * (then admin APIs won't be in the build — use a Node host or Firebase for admin).
   */
  ...(process.env.STATIC_EXPORT === "true"
    ? { output: "export" as const }
    : {}),
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
