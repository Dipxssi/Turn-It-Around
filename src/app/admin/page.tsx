"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const {
    authReady,
    isAuthenticated,
    loading,
    message,
    error,
    authMode,
    setAuthMode,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupFullName,
    setSignupFullName,
    signinEmail,
    setSigninEmail,
    signinPassword,
    setSigninPassword,
    setError,
    setMessage,
    handleSignup,
    handleSignin,
  } = useAdminAuth();

  useEffect(() => {
    if (!authReady || !isAuthenticated) return;
    router.replace("/admin/blog/");
  }, [authReady, isAuthenticated, router]);

  if (!authReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f4f8] text-[#64748b]">
        Loading…
      </main>
    );
  }

  if (isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f4f8] text-[#64748b]">
        Redirecting…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f4f8] px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-2xl font-semibold text-[#00338D] md:text-3xl">
            Admin
          </h1>
          <p className="mt-2 text-sm text-[#4d5f80]">
            {authMode === "signin"
              ? "Sign in to manage blog content and inquiries."
              : "Create an account, then sign in to continue."}
          </p>
        </div>

        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm">
          {error && (
            <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          )}
          {message && (
            <p className="mb-4 rounded bg-green-50 px-3 py-2 text-sm text-green-800">
              {message}
            </p>
          )}

          {authMode === "signin" ? (
            <form onSubmit={handleSignin} className="space-y-4">
              <h2 className="text-lg font-semibold text-[#00338D]">Sign in</h2>
              <input
                required
                className="w-full rounded border border-[#e2e8f0] px-3 py-2.5 text-[15px] outline-none focus:border-[#0091DA]"
                placeholder="Email"
                type="email"
                autoComplete="email"
                value={signinEmail}
                onChange={(e) => setSigninEmail(e.target.value)}
              />
              <input
                required
                className="w-full rounded border border-[#e2e8f0] px-3 py-2.5 text-[15px] outline-none focus:border-[#0091DA]"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                value={signinPassword}
                onChange={(e) => setSigninPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-[#00338D] py-2.5 text-[15px] font-medium text-white transition hover:bg-[#002a6e] disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
              <p className="text-center text-sm text-[#4d5f80]">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-[#0091DA] underline hover:no-underline"
                  onClick={() => {
                    setError(null);
                    setMessage(null);
                    setAuthMode("signup");
                  }}
                >
                  Create account
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <h2 className="text-lg font-semibold text-[#00338D]">
                Create account
              </h2>
              <input
                className="w-full rounded border border-[#e2e8f0] px-3 py-2.5 text-[15px] outline-none focus:border-[#0091DA]"
                placeholder="Full name"
                value={signupFullName}
                onChange={(e) => setSignupFullName(e.target.value)}
              />
              <input
                required
                className="w-full rounded border border-[#e2e8f0] px-3 py-2.5 text-[15px] outline-none focus:border-[#0091DA]"
                placeholder="Email"
                type="email"
                autoComplete="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <input
                required
                minLength={8}
                className="w-full rounded border border-[#e2e8f0] px-3 py-2.5 text-[15px] outline-none focus:border-[#0091DA]"
                placeholder="Password (min 8 characters)"
                type="password"
                autoComplete="new-password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-[#0091DA] py-2.5 text-[15px] font-medium text-white transition hover:bg-[#0077b8] disabled:opacity-60"
              >
                {loading ? "Creating account…" : "Create account"}
              </button>
              <p className="text-center text-sm text-[#4d5f80]">
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-[#0091DA] underline hover:no-underline"
                  onClick={() => {
                    setError(null);
                    setMessage(null);
                    setAuthMode("signin");
                  }}
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
