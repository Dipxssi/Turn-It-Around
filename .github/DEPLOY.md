# GitHub Actions & hosting

## 1. Create these GitHub Secrets

**Repository → Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Required? | Notes |
|-------------|-----------|--------|
| `FIREBASE_WEB_API_KEY` | **Yes** (if not using the other) | Web `apiKey` from Firebase Console. |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | **Yes** (if not using the other) | Same value as above; needed for client + some API routes. You can set **both** to the same string. |
| `FIREBASE_PROJECT_ID` | **Yes** | Firebase project ID. |
| `FIREBASE_CLIENT_EMAIL` | **Yes** | Service account email (`…@….iam.gserviceaccount.com`). |
| `FIREBASE_PRIVATE_KEY` | **Yes** | Full private key; paste as one line with `\n` for newlines, or multiline in GitHub’s secret editor. |
| `FIREBASE_STORAGE_BUCKET` | Optional | e.g. `your-project-id.appspot.com` — only if you use admin file uploads to Storage. |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Only if you use Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Only if you use Supabase. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Production URL, e.g. `https://yourdomain.com` (no trailing slash). |
| `NEXT_PUBLIC_ADMIN_IMAGES_DATA_URL_ONLY` | Optional | Set to `true` if you skip Storage for inline images. |
| `STATIC_EXPORT` | Optional | Leave **empty** or `false` — this app needs **`/api/*`** routes; do **not** set `true` unless you know you’re not using API routes. |

The workflow [`.github/workflows/ci.yml`](./workflows/ci.yml) maps each secret to the same-named environment variable during `npm run build`.

## 2. What this repo’s workflow does

- Runs `npm ci` and `npm run build` on pushes to `main`, pull requests, and manual runs.
- It does **not** deploy by itself. Use your host’s integration (below) or add a deploy job.

## 3. FTP / static hosting (`SamKirkland/FTP-Deploy-Action`)

If you deploy to **shared hosting** (no Node.js), the workflow must:

1. Set **`STATIC_EXPORT=true`** during `npm run build` so Next.js writes to **`./out/`** (not only `.next/`).  
   Without this, FTP deploy fails with: **`ENOENT: no such file or directory, scandir './out/'`**.

2. Know the **tradeoff**: static export **does not include** `app/api/**` routes. Contact form, admin sign-in, Firestore admin APIs, etc. **will not run** on pure FTP unless you point the frontend at APIs hosted elsewhere.

See [`.github/workflows/deploy.yml`](./workflows/deploy.yml) — it sets `STATIC_EXPORT: "true"` and uploads `./out/`.

**Extra secrets for FTP:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

## 4. Hosting options

### Vercel (common for Next.js)

- Connect the GitHub repo in the Vercel dashboard.
- Add the **same** variables in **Vercel → Project → Settings → Environment Variables** (Production / Preview).
- You usually **do not** need to duplicate secrets in GitHub unless you use GitHub Actions for something else.

### Other Node hosts (Railway, Render, Fly.io, VPS + Docker)

- Set the same env vars in the host’s dashboard or `.env` on the server.
- Run `npm run build` then `npm run start` (or your process manager).

### GitHub Actions → your server

- Extend `.github/workflows/ci.yml` with an SSH/rsync or Docker push step; inject secrets like `SSH_PRIVATE_KEY`, `HOST`, etc. (not included by default).

## 5. PRs from forks

Secrets are **not** available to workflows triggered by pull requests from forks. Builds may fail or skip deploy — that’s expected. Run CI on `main` or use branches in the same repo for full secret access.
