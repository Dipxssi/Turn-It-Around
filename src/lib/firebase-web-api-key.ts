/**
 * Firebase Web API key (same value as Firebase Console → Project settings → Web app `apiKey`).
 * Prefer `FIREBASE_WEB_API_KEY` on the server — it loads reliably in API routes.
 * `NEXT_PUBLIC_FIREBASE_API_KEY` is also supported (for client + server).
 */
export function getFirebaseWebApiKey(): string | undefined {
  const fromServer =
    process.env.FIREBASE_WEB_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
  return fromServer || undefined;
}
