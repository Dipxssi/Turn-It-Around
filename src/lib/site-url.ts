const DEFAULT_SITE_URL = "https://turnitaroundbusiness.com";

function normalizeUrlString(value: string): string {
  return value.trim().replace(/\/$/, "");
}

export function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    DEFAULT_SITE_URL,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const normalized = normalizeUrlString(candidate);
    if (!normalized) continue;

    try {
      const parsed = new URL(normalized);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.origin;
      }
    } catch {
      // Ignore invalid values and continue to fallback candidates.
    }
  }

  return DEFAULT_SITE_URL;
}
