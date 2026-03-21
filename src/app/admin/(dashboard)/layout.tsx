"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FileText, Inbox } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const nav = [
  {
    href: "/admin/blog/",
    label: "Blog management",
    icon: FileText,
  },
  {
    href: "/admin/inquiries/",
    label: "Inquiries",
    icon: Inbox,
  },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { token, authReady, logout } = useAdminAuth();

  useEffect(() => {
    if (!authReady) return;
    if (!token) {
      router.replace("/admin/");
    }
  }, [authReady, token, router]);

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb] text-[#64748b]">
        Loading…
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#f6f8fb]">
      <aside className="flex w-60 shrink-0 flex-col border-r border-[#e2e8f0] bg-white">
        <div className="border-b border-[#e2e8f0] px-4 py-5">
          <p className="font-heading text-lg font-semibold text-[#00338D]">
            Admin
          </p>
          <p className="mt-0.5 text-xs text-[#64748b]">Content &amp; leads</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map(({ href, label, icon: Icon }) => {
            const norm = (p: string) => p.replace(/\/$/, "") || "/";
            const active =
              pathname != null && norm(pathname) === norm(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#00338D]/10 text-[#00338D]"
                    : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#00338D]"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[#e2e8f0] p-3">
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/admin/");
            }}
            className="w-full rounded-lg border border-[#cbd5e1] bg-white px-3 py-2 text-sm font-medium text-[#00338D] hover:bg-[#f8fafc]"
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 overflow-auto">
        <main className="px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
