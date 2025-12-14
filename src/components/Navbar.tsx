"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
  ];

  const resourcesLinks = [
    { href: "/blog", label: "Blogs" },
    { href: "/blog?type=case-study", label: "Case Studies" },
    { href: "/blog?type=insight", label: "Industry Insights" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href.startsWith("/#")) {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href.split("?")[0]);
  };

  const isResourcesActive = pathname === "/blog";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResourcesDropdownOpen(false);
      }
    };

    if (resourcesDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resourcesDropdownOpen]);

  return (
    <header className="bg-[#2c3e50] pb-8 pt-4 text-white shadow-[0_10px_30px_rgba(12,20,33,0.35)] md:pb-16 md:pt-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-sm uppercase tracking-[0.4em] text-white/80 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="/logo.png"
            alt="TBS Limited logo"
            width={72}
            height={32}
            priority
            className="h-8 w-auto object-contain md:h-12"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden gap-6 md:flex items-center">
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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
              className={`uppercase tracking-[0.4em] transition hover:text-[#f39c12] hover:underline hover:decoration-[#f39c12] hover:underline-offset-4 ${
                isResourcesActive ? "text-[#f39c12] underline decoration-[#f39c12] underline-offset-4" : ""
              }`}
            >
              Resources
            </button>
            {resourcesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                {resourcesLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm normal-case tracking-normal text-[#2c3e50] hover:bg-[#f39c12] hover:text-white transition"
                    onClick={() => setResourcesDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/contact"
            className="rounded-none bg-[#f39c12] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#2c3e50] transition hover:bg-[#e67e22]"
          >
            Contact
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Contact Button */}
        <Link
          href="/contact"
          className="hidden md:inline-flex rounded-none bg-[#f39c12] px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#2c3e50] transition hover:bg-[#e67e22]"
        >
          Talk to us
        </Link>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 mt-4 pt-4 pb-4">
          <div className="mx-auto max-w-6xl px-4 space-y-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm uppercase tracking-[0.3em] transition ${
                    active
                      ? "text-[#f39c12] underline decoration-[#f39c12] underline-offset-4"
                      : "text-white/80 hover:text-[#f39c12]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
                className={`block w-full text-left py-2 text-sm uppercase tracking-[0.3em] transition ${
                  isResourcesActive
                    ? "text-[#f39c12] underline decoration-[#f39c12] underline-offset-4"
                    : "text-white/80 hover:text-[#f39c12]"
                }`}
              >
                Resources
              </button>
              {resourcesDropdownOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  {resourcesLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        setResourcesDropdownOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="block py-1.5 text-sm normal-case tracking-normal text-white/70 hover:text-[#f39c12] transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

