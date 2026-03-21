"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "./Button";

export function NavBar() {
  const pathname = usePathname();
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesCloseTimeoutRef = useRef<number | undefined>(undefined);
  const resourcesCloseTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen) return;
      const target = event.target as Node;

      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(target)
      ) {
        setServicesDropdownOpen(false);
      }

      if (
        resourcesDropdownRef.current &&
        !resourcesDropdownRef.current.contains(target)
      ) {
        setResourcesDropdownOpen(false);
      }
    };

    if ((servicesDropdownOpen || resourcesDropdownOpen) && !mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [servicesDropdownOpen, resourcesDropdownOpen, mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Who We Are" },
    {
      href: "/services",
      label: "Services",
      dropdownKey: "services",
      dropdown: [
        {
          href: "/services/capacity-building",
          label: "Capacity Building for NGOs",
        },
        {
          href: "/services/strategic-advisory",
          label: "Strategic Advisory & Turnaround",
        },
        {
          href: "/services/accounting",
          label: "Accounting & Financial Management",
        },
      ],
    },
    {
      href: "/blog?type=case-study",
      label: "Resources",
      dropdownKey: "resources",
      dropdown: [
        { href: "/blog?type=case-study", label: "Case Study" },
        { href: "/blog?type=blog", label: "Blog" },
      ],
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-3" : "bg-white py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="TBS Turnitaround Business Solutions"
            width={200}
            height={60}
            className="h-10 md:h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.dropdown) {
              const isServicesDropdown = link.dropdownKey === "services";
              const open = isServicesDropdown
                ? servicesDropdownOpen
                : resourcesDropdownOpen;

              return (
                <div
                  key={link.label}
                  className="relative"
                  ref={isServicesDropdown ? servicesDropdownRef : resourcesDropdownRef}
                  onMouseEnter={() => {
                    if (isServicesDropdown && servicesCloseTimeoutRef.current) {
                      window.clearTimeout(servicesCloseTimeoutRef.current);
                      servicesCloseTimeoutRef.current = undefined;
                    }
                    if (
                      !isServicesDropdown &&
                      resourcesCloseTimeoutRef.current
                    ) {
                      window.clearTimeout(resourcesCloseTimeoutRef.current);
                      resourcesCloseTimeoutRef.current = undefined;
                    }

                    if (isServicesDropdown) {
                      setServicesDropdownOpen(true);
                      setResourcesDropdownOpen(false);
                    } else {
                      setResourcesDropdownOpen(true);
                      setServicesDropdownOpen(false);
                    }
                  }}
                  onMouseLeave={() => {
                    // Small delay prevents "snap" closing while moving between
                    // the label, dropdown panel, and its shadow.
                    const CLOSE_DELAY_MS = 150;
                    if (isServicesDropdown) {
                      servicesCloseTimeoutRef.current = window.setTimeout(() => {
                        setServicesDropdownOpen(false);
                      }, CLOSE_DELAY_MS);
                    } else {
                      resourcesCloseTimeoutRef.current = window.setTimeout(() => {
                        setResourcesDropdownOpen(false);
                      }, CLOSE_DELAY_MS);
                    }
                  }}
                >
                  <Link
                    href={link.href}
                    className="font-body text-sm text-[#00338D] transition-colors inline-flex items-center gap-1 hover:text-[#0091DA]"
                  >
                    {link.label} ▾
                  </Link>

                  {open && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-[var(--border)]">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm font-body text-[#00338D] hover:text-[#0091DA] hover:bg-[#F2F2F2] transition-all"
                          onClick={() => {
                            if (isServicesDropdown) {
                              setServicesDropdownOpen(false);
                            } else {
                              setResourcesDropdownOpen(false);
                            }
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm transition-colors ${
                  pathname === link.href
                    ? "text-[#00338D] underline decoration-[#0091DA] decoration-2 underline-offset-8"
                    : "text-[#00338D] hover:text-[#0091DA]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              backgroundColor: "#0091DA",
              color: "#FFFFFF",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "14px",
              padding: "10px 24px",
              textDecoration: "none",
              borderRadius: "0",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            className="bg-[#0091DA] text-white font-body text-[14px] px-6 py-[10px] cursor-pointer whitespace-nowrap hover:bg-[#0077B8] transition-colors duration-200"
          >
            Contact Us Today
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#00338D] focus:outline-none"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 pt-20">
          <div className="mx-auto max-w-7xl px-4 space-y-6">
            {navLinks.map((link) => {
              if (link.dropdown) {
              const isServicesDropdown = link.dropdownKey === "services";
              const open = isServicesDropdown
                ? servicesDropdownOpen
                : resourcesDropdownOpen;

                return (
                  <div key={link.href} className="space-y-2">
                    <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setServicesDropdownOpen(false);
                        setResourcesDropdownOpen(false);
                      }}
                      className="font-body text-[32px] text-[#00338D]"
                    >
                      {link.label}
                    </Link>
                      <button
                        onClick={() =>
                        isServicesDropdown
                          ? setServicesDropdownOpen(!servicesDropdownOpen)
                          : setResourcesDropdownOpen(!resourcesDropdownOpen)
                        }
                        className="text-[#00338D] text-2xl"
                      >
                      {open ? "−" : "+"}
                      </button>
                    </div>
                  {open && (
                      <div className="ml-4 space-y-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block font-body text-[32px] text-[#00338D]/80 hover:text-[#0091DA] transition"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setServicesDropdownOpen(false);
                            setResourcesDropdownOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-body text-[32px] transition-colors ${
                    pathname === link.href
                      ? "text-[#0091DA]"
                      : "text-[#00338D] hover:text-[#0091DA]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-8">
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  backgroundColor: "#0091DA",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  padding: "10px 24px",
                  textDecoration: "none",
                  borderRadius: "0",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                className="bg-[#0091DA] text-white font-body text-[14px] px-6 py-[10px] cursor-pointer whitespace-nowrap hover:bg-[#0077B8] transition-colors duration-200 w-full text-center"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Backwards-compatible export for existing imports across the app.
export { NavBar as Navbar };
