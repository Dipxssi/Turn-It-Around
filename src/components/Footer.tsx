import Link from "next/link";
import Image from "next/image";
import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#00338D] border-t-[3px] border-[#0091DA] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="TBS Turnitaround Business Solutions"
                width={200}
                height={60}
                className="h-10 md:h-12 w-auto"
              />
            </div>
            <p className="text-sm font-body text-white/65">
              Empowering Vision. Strengthening Systems. Sustaining Success.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-white">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-sm font-body text-white/75 hover:text-[#0091DA] transition-[all_0.3s_ease]"
              >
                Who We Are
              </Link>
              <Link
                href="/about#approach"
                className="text-sm font-body text-white/75 hover:text-[#0091DA] transition-[all_0.3s_ease]"
              >
                Our Approach
              </Link>
              <Link
                href="/blog?type=case-study"
                className="text-sm font-body text-white/75 hover:text-[#0091DA] transition-[all_0.3s_ease]"
              >
                Case Studies
              </Link>
              <Link
                href="/contact"
                className="text-sm font-body text-white/75 hover:text-[#0091DA] transition-[all_0.3s_ease]"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-white">
              Services
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/services#capacity-building"
                className="text-sm font-body text-white/75 hover:text-[#0091DA] transition-[all_0.3s_ease]"
              >
                Capacity Building for NGOs
              </Link>
              <Link
                href="/services#strategic-advisory"
                className="text-sm font-body text-white/75 hover:text-[#0091DA] transition-[all_0.3s_ease]"
              >
                Strategic Advisory & Turnaround
              </Link>
              <Link
                href="/services#accounting-finance"
                className="text-sm font-body text-white/75 hover:text-[#0091DA] transition-[all_0.3s_ease]"
              >
                Accounting & Financial Management
              </Link>
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-white">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-sm font-body text-white/65">
              <p className="flex items-start gap-2">
                <FaLocationDot className="mt-1 h-4 w-4 shrink-0 text-[#0091DA]" />
                <span>Utalii House, Utalii Street, Central Business District (CBD), Nairobi, Kenya.</span>
              </p>
              <a
                href="tel:+254751216699"
                className="flex items-center gap-2 hover:text-[#0091DA] transition-[all_0.3s_ease]"
              >
                <FaPhone className="h-4 w-4 shrink-0 text-[#0091DA]" />
                (+254) 751 216 699
              </a>
              <a
                href="mailto:info@turnitaroundbusiness.com"
                className="flex items-center gap-2 hover:text-[#0091DA] transition-[all_0.3s_ease]"
              >
                <FaEnvelope className="h-4 w-4 shrink-0 text-[#0091DA]" />
                info@turnitaroundbusiness.com
              </a>
              <p className="mt-2 flex items-center gap-2 text-xs">
                <FaClock className="h-3.5 w-3.5 shrink-0 text-[#0091DA]" />
                Mon–Fri 8am–4pm
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10">
          <div className="bg-[#002A6E] -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-5 text-center">
            <p className="text-xs font-body text-white/50">
              © {currentYear} Turnitaround Business Solutions. All rights reserved. Developed by{" "}
              <a
                href="https://diginowsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/75 hover:text-[#0091DA] underline transition-[all_0.3s_ease]"
              >
                DigiNowSoulutions
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
