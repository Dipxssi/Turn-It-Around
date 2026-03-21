import { NextRequest, NextResponse } from "next/server";
import { getFirebaseWebApiKey } from "@/lib/firebase-web-api-key";

type SigninBody = {
  email?: string;
  password?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SigninBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const apiKey = getFirebaseWebApiKey();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Missing Firebase Web API key. Add FIREBASE_WEB_API_KEY or NEXT_PUBLIC_FIREBASE_API_KEY to .env.local (same value as Firebase Console → Web app apiKey), then restart npm run dev.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = (await response.json()) as {
      localId?: string;
      email?: string;
      displayName?: string;
      idToken?: string;
      refreshToken?: string;
      expiresIn?: string;
      error?: { message?: string };
    };

    if (!response.ok || !data.idToken) {
      return NextResponse.json(
        { error: data.error?.message || "Invalid credentials." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        user: {
          uid: data.localId,
          email: data.email,
          fullName: data.displayName || null,
        },
        session: {
          access_token: data.idToken,
          refresh_token: data.refreshToken,
          expires_in: data.expiresIn,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin signin failed:", error);
    return NextResponse.json(
      { error: "Failed to sign in." },
      { status: 500 }
    );
  }
}
