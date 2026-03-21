import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { getFirebaseWebApiKey } from "@/lib/firebase-web-api-key";

type SignupBody = {
  email?: string;
  password?: string;
  fullName?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignupBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    const fullName = body.fullName?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    await getAdminAuth().createUser({
      email,
      password,
      displayName: fullName || undefined,
    });

    const apiKey = getFirebaseWebApiKey();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Missing Firebase Web API key. Add FIREBASE_WEB_API_KEY or NEXT_PUBLIC_FIREBASE_API_KEY to .env.local, then restart npm run dev.",
        },
        { status: 500 }
      );
    }

    const signInResponse = await fetch(
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

    const signInData = (await signInResponse.json()) as {
      localId?: string;
      email?: string;
      idToken?: string;
      refreshToken?: string;
      expiresIn?: string;
      error?: { message?: string };
    };

    if (!signInResponse.ok || !signInData.idToken) {
      return NextResponse.json(
        { error: signInData.error?.message || "Failed to sign in after signup." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        user: {
          uid: signInData.localId,
          email: signInData.email,
          fullName: fullName || null,
        },
        session: {
          access_token: signInData.idToken,
          refresh_token: signInData.refreshToken,
          expires_in: signInData.expiresIn,
        },
        message: "Signup successful.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin signup failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to complete signup.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
