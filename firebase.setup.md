# Firebase setup for admin APIs

Add these keys to `.env.local`:

```env
# Web API key (Firebase Console → Project settings → General → Web app)
# Either name works; FIREBASE_WEB_API_KEY is read first on the server.
FIREBASE_WEB_API_KEY=your_web_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_web_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
```

## Required Firebase services

- Firebase Authentication
  - Enable Email/Password sign-in method.
- Cloud Firestore
  - Collections are created automatically:
    - `inquiries`
    - `resources`
- Cloud Storage
  - Bucket should match `FIREBASE_STORAGE_BUCKET`.

## Dev server: use Webpack (not Turbopack)

`firebase-admin` can crash **Turbopack** during `/api` routes (`FATAL: An unexpected Turbopack error`), which returns **500 HTML** instead of JSON.

This project uses `npm run dev` → `next dev --webpack`. Use `npm run dev:turbo` only if you don’t hit that bug.

## Next.js static export vs API routes

If `STATIC_EXPORT=true` is set when building, Next.js outputs a static site and **`/api/*` routes are not included**. Admin signup and Firestore API routes need a **normal** build (`next build` + `next start`) or hosting like **Vercel**, not pure static hosting, unless you move auth to the client.

Default in this repo: **no** static export unless you set `STATIC_EXPORT=true`.

## API behavior

- `POST /api/admin/auth/signup`: creates user and returns ID token.
- `POST /api/admin/auth/signin`: returns ID token.
- `POST /api/inquiries`: saves inquiry document to Firestore.
- `GET/POST /api/admin/resources`: reads/writes Firestore resources (auth required).
- `GET /api/admin/inquiries`: reads inquiry submissions (auth required).
- `POST /api/admin/upload`: uploads file to Firebase Storage (auth required).

## Recommended Firestore rules

Use strict rules and only allow server access through Admin SDK:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Recommended Storage rules

```txt
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```
