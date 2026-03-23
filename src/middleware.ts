import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lets the browser call /api/* from a different origin (static site + API on Vercel).
 * Uses request Origin when present so Authorization + CORS work together.
 */
export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const origin = request.headers.get("origin");
  const res = NextResponse.next();

  if (origin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Vary", "Origin");
  } else {
    res.headers.set("Access-Control-Allow-Origin", "*");
  }

  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, DELETE, PUT"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type"
  );
  res.headers.set("Access-Control-Max-Age", "86400");

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: "/api/:path*",
};
