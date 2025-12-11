import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// In production, use environment variables and proper password hashing
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@turnitaround.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create a simple session token (in production, use JWT or proper session management)
      const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString("base64");
      
      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}

