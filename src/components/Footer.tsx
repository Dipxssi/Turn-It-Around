import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-[#f39c12]/40 bg-[#172230] py-8 md:py-12 text-[#f8f9fa]/80">
      <div className="mx-auto flex w-[90%] max-w-[1800px] flex-col gap-6 md:gap-8 lg:gap-10 px-4 md:flex-row md:justify-between lg:px-12">
        <div className="flex-1 space-y-2 md:space-y-3">
          <div className="flex items-center gap-2 md:gap-3 text-white">
            <Image src="/logo.png" alt="TBS Limited logo" width={56} height={36} className="h-8 w-auto object-contain md:h-10" />
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] md:tracking-[0.35em]">Turn It Around</span>
          </div>
          <p className="text-xs md:text-sm text-[#f8f9fa]/70 max-w-xs">
            Turning organizations around with strategy, stewardship, and sustainable growth.
          </p>
          <div className="flex items-center gap-2 md:gap-3 text-white">
            <a href="https://www.linkedin.com" className="hover:text-[#f39c12] transition" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
            </a>
            <a href="https://twitter.com" className="hover:text-[#f39c12] transition" aria-label="Twitter">
              <Twitter className="h-4 w-4 md:h-5 md:w-5" />
            </a>
            <a href="https://facebook.com" className="hover:text-[#f39c12] transition" aria-label="Facebook">
              <Facebook className="h-4 w-4 md:h-5 md:w-5" />
            </a>
            <a href="https://instagram.com" className="hover:text-[#f39c12] transition" aria-label="Instagram">
              <Instagram className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </div>
        </div>

        <div className="flex-1 space-y-1.5 md:space-y-2">
          <h4 className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] md:tracking-[0.25em] text-white">Company</h4>
          <div className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm">
            <a href="/about" className="hover:text-[#f39c12] transition">About</a>
            <a href="/about#team" className="hover:text-[#f39c12] transition">Team</a>
            <a href="/blog" className="hover:text-[#f39c12] transition">Insights</a>
          </div>
        </div>

        <div className="flex-1 space-y-1.5 md:space-y-2">
          <h4 className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] md:tracking-[0.25em] text-white">Services</h4>
          <div className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm">
            <a href="/services#capacity-building-for-ngos" className="hover:text-[#f39c12] transition">Capacity Building for NGOs</a>
            <a href="/services#strategic-advisory-turnaround" className="hover:text-[#f39c12] transition">Strategic Advisory</a>
            <a href="/services#accounting-financial" className="hover:text-[#f39c12] transition">Accounting & Financial Mgmt</a>
          </div>
        </div>

        <div className="flex-1 space-y-1.5 md:space-y-2">
          <h4 className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] md:tracking-[0.25em] text-white">Contact</h4>
          <div className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm">
            <a href="tel:+254751216699" className="hover:text-[#f39c12] transition break-all">+254 751 216 699</a>
            <a href="tel:+2540789217201" className="hover:text-[#f39c12] transition break-all">+254 0789 217 201</a>
            <a href="mailto:info@turnitaroundbusiness.com" className="hover:text-[#f39c12] transition break-all">info@turnitaroundbusiness.com</a>
            <p className="text-[#f8f9fa]/60 text-[10px] md:text-xs leading-relaxed">Utalii House, 2nd Floor, Tower 3 Waiyaki Way, Westlands. Nairobi, Kenya.</p>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-8 mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] md:text-xs text-[#f8f9fa]/50">
        <p>© {new Date().getFullYear()} Turn it Around Business. All rights reserved.</p>
        <p className="text-center sm:text-left">
          Developed and maintained by{" "}
          <a
            href="https://diginowsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f39c12] hover:text-[#f8f9fa] transition"
          >
            DigiNowSolutions
          </a>
        </p>
      </div>
    </footer>
  );
}

