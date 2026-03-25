# GitHub Actions & hosting

## 1. Create these GitHub Secrets

**Repository → Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Required? | Notes |
|-------------|-----------|--------|
| `FIREBASE_WEB_API_KEY` | **Yes** (if not using the other) | Web `apiKey` from Firebase Console. |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | **Yes** (if not using the other) | Same value as above; needed for client + some API routes. You can set **both** to the same string. |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | **Yes** for client-only admin/contact | Firebase project ID exposed to browser Firebase SDK. |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Recommended | Usually `your-project-id.firebaseapp.com`. |
| `FIREBASE_PROJECT_ID` | **Yes** | Firebase project ID. |
| `FIREBASE_CLIENT_EMAIL` | **Yes** | Service account email (`…@….iam.gserviceaccount.com`). |
| `FIREBASE_PRIVATE_KEY` | **Yes** | Full private key; paste as one line with `\n` for newlines, or multiline in GitHub’s secret editor. |
| `FIREBASE_STORAGE_BUCKET` | Optional | e.g. `your-project-id.appspot.com` — only if you use admin file uploads to Storage. |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Only if you use Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Only if you use Supabase. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Production URL, e.g. `https://yourdomain.com` (no trailing slash). |
| `NEXT_PUBLIC_API_BASE_URL` | Optional | Needed only for split deploy (static frontend + separate Node API host). |
| `NEXT_PUBLIC_ADMIN_IMAGES_DATA_URL_ONLY` | Optional | Set to `true` if you skip Storage for inline images. |
| `STATIC_EXPORT` | Optional | Leave **empty** or **false** for full-stack deploys. For FTP-only static output, **`build:static`** sets this during the build script. |

The workflow [`.github/workflows/ci.yml`](./workflows/ci.yml) maps each secret to the same-named environment variable during `npm run build`.

## 2. What this repo’s workflow does

- Runs `npm ci` and `npm run build` on pushes to `main`, pull requests, and manual runs.
- It does **not** deploy by itself. Use your host’s integration (below) or add a deploy job.

## 3. FTP / static hosting (`SamKirkland/FTP-Deploy-Action`)

If you deploy to **shared hosting** (no Node.js), the workflow must:

1. Produce **`./out/`** — Next only writes there when **`output: "export"`**, which this repo enables with **`STATIC_EXPORT=true`** (see `next.config.ts`).  
   Without that, FTP deploy fails with **`ENOENT: scandir './out/'`**.

2. **Route Handlers are incompatible with static export** — Next.js will error on `app/api/**` (e.g. missing `generateStaticParams`). This repo uses **`npm run build:static`** ([`scripts/build-static.mjs`](../scripts/build-static.mjs)), which **temporarily moves `src/app/api` to `.api-static-stash/`** at the project root (not under `app/`, or Next would still compile it), clears `.next`, runs `next build --webpack`, then restores. Your deployed **FTP site has no `/api` routes**.

3. **Two ways to make admin & contact work**
   - **Client-only mode (cPanel/FTP only):** admin auth + resources + inquiries are handled directly with Firebase Web SDK from the browser (no `/api/*` required for these flows).  
   - **Split deploy mode:** Deploy the **same Next.js repo** again on **Vercel** (or any Node host) with a normal **`next build` + `next start`** (or Vercel default) — **do not** use `STATIC_EXPORT` there. That deployment serves **`/api/*`**.  
   - Add GitHub secret **`NEXT_PUBLIC_API_BASE_URL`** = that deployment’s origin, e.g. `https://your-project.vercel.app`.  
   - **Rebuild** the static FTP build so the env is inlined — then the browser calls `https://your-project.vercel.app/api/...` for admin, contact, and public blog JSON.  
   - CORS is handled by [`src/middleware.ts`](../src/middleware.ts) on the API deployment.

**Extra secrets for FTP:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

See [`.github/workflows/deploy.yml`](./workflows/deploy.yml) — it runs **`npm run build:static`** and uploads **`./out/`**.

## 3.1 Production admin checklist

Before expecting `/admin` to work in production, verify all 4:

1. `NEXT_PUBLIC_FIREBASE_API_KEY` and `NEXT_PUBLIC_FIREBASE_PROJECT_ID` are set for the static build.
2. Firebase Authentication Email/Password is enabled.
3. Firestore security rules allow only authenticated admins to write `resources` and read/delete `inquiries`.
4. You trigger a **fresh FTP deploy** after any env var change (env values are baked in at build time).

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
