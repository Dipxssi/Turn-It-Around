import { getSiteUrl } from "@/lib/site-url";

/**
 * When the marketing site is static (FTP) but APIs run on another origin (Vercel, etc.),
 * set NEXT_PUBLIC_API_BASE_URL to that origin, e.g. https://your-app.vercel.app
 * (no trailing slash). Then all fetches use that base for /api/... routes.
 */
export function getApiOrigin(): string {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/$/, "");
  if (apiBase) return apiBase;

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return getSiteUrl();
}

/** Absolute or same-origin URL for an API path (must start with /api/...). */
export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/$/, "");
  if (base) return `${base}${p}`;
  return p;
}
