"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blogs" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href.startsWith("/#")) {
      return pathname === "/";
    }
    return pathname === href;
  };

  return (
    <header className="bg-[#2c3e50] pb-16 pt-6 text-white shadow-[0_10px_30px_rgba(12,20,33,0.35)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm uppercase tracking-[0.4em] text-white/80 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="TBS Limited logo"
            width={72}
            height={32}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>
        <div className="hidden gap-6 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-[#f39c12] hover:underline hover:decoration-[#f39c12] hover:underline-offset-4 ${
                  active ? "text-[#f39c12] underline decoration-[#f39c12] underline-offset-4" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <Link
          href="/contact"
          className="rounded-none bg-[#f39c12] px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#2c3e50] transition hover:bg-[#e67e22]"
        >
          Talk to us
        </Link>
      </div>
    </header>
  );
}

