# Admin API

## Environment variables

**Core (Auth + Firestore)**

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

**Firebase Storage (optional)**

- `FIREBASE_STORAGE_BUCKET` — only needed if you use `POST /api/admin/upload` for file hosting (cover images, etc.).

**Admin editor: images without Storage (base64 in Firestore)**

- `NEXT_PUBLIC_ADMIN_IMAGES_DATA_URL_ONLY=true` — **recommended** if you do not use a Storage bucket (e.g. Spark plan). The rich-text editor will **not** call `/api/admin/upload` for inline images; it uses `FileReader.readAsDataURL()` and stores **data URLs** in the `content` HTML field in Firestore (same idea as embedding base64 in a document field). **Tradeoff:** a whole Firestore document is ~**1MB** max — keep images small (default embed cap ~350KB per image in the editor).

Restart `npm run dev` after changing env.

## Endpoints

- `POST /api/admin/auth/signup`
  - Body: `{ "email": "admin@example.com", "password": "password123", "fullName": "Admin Name" }`
- `POST /api/admin/auth/signin`
  - Body: `{ "email": "admin@example.com", "password": "password123" }`
  - Returns `session.access_token` (Firebase ID token)
- `POST /api/admin/upload`
  - Headers: `Authorization: Bearer <access_token>`
  - FormData: `file` (required), `bucket` (optional; defaults to `FIREBASE_STORAGE_BUCKET`)
- `GET /api/admin/resources`
  - Headers: `Authorization: Bearer <access_token>`
- `GET /api/admin/inquiries`
  - Headers: `Authorization: Bearer <access_token>`
- `DELETE /api/admin/inquiries/[id]`
  - Headers: `Authorization: Bearer <access_token>`
  - Deletes one inquiry document (any signed-in admin)
- `POST /api/admin/resources`
  - Headers: `Authorization: Bearer <access_token>`
  - Body:
    `{ "title":"...", "type":"blog", "summary":"...", "content":"...", "coverImageUrl":"...", "attachmentUrl":"...", "tags":["finance","ngo"] }`
- `PATCH /api/admin/resources/[id]`
  - Headers: `Authorization: Bearer <access_token>`
  - Same body as POST (only the resource owner can update)
- `DELETE /api/admin/resources/[id]`
  - Headers: `Authorization: Bearer <access_token>`
  - Only the resource owner can delete

## Public endpoint

- `POST /api/inquiries`
  - Body:
    `{ "name":"...", "organization":"...", "email":"...", "phone":"...", "service":"...", "message":"..." }`

### Terminology

- **Firestore** stores **documents/fields** (your HTML string can contain `data:image/...;base64,...` in `<img src>`).
- **Firebase Storage** uses **buckets** for binary files; that is separate from Firestore. If you don’t use Storage, you’re not using a bucket for those images.

### `POST /api/admin/upload` returns 401 / “Unauthorized” / “Invalid or expired session”

That error is **not** Firebase Storage refusing the file. It means **Firebase Admin could not verify your ID token** (the `Authorization: Bearer …` header). Common causes:

1. **Session expired** — sign out of `/admin` and sign in again.
2. **Wrong project** — the web app must use the **same Firebase project** as `FIREBASE_PROJECT_ID` / service account in `.env.local`. Mismatch → verification fails.
3. **Clock skew** — rare; fix system time.
4. **Stale tab** — refresh the admin page after long idle.

### Image uploads not working? (when using Storage)

If you **do** want hosted URLs from Storage and uploads fail **after** auth succeeds (e.g. 500 with logs):

1. Set **`FIREBASE_STORAGE_BUCKET`** in `.env.local` (often `your-project-id.appspot.com`). Restart dev.
2. Enable **Storage** in the Firebase console.
3. **Blaze** may be required in some projects.
4. Ensure the **service account** has permission to write objects and create signed URLs (e.g. **Storage Admin** on the bucket, or Editor on the project).
5. Check the Next.js terminal for `Admin upload failed:` logs.
