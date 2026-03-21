import { NextRequest } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";

export async function getAuthenticatedUser(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Missing bearer token", status: 401 as const };
  }

  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return { error: "Invalid bearer token", status: 401 as const };
  }

  try {
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    return { user: { id: decodedToken.uid, email: decodedToken.email }, status: 200 as const };
  } catch {
    // Not Storage — ID token missing/invalid/expired or wrong Firebase project vs server env.
    return {
      error:
        "Invalid or expired session token. Sign out of admin and sign in again. If it persists, ensure the app uses the same Firebase project as FIREBASE_PROJECT_ID on the server.",
      status: 401 as const,
    };
  }
}
