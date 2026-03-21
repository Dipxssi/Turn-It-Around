import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <a
      href="#top"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/70 bg-[#0091DA] text-white shadow-[0_14px_32px_-12px_rgba(0,145,218,0.55)] transition hover:bg-[#0077B8] hover:shadow-[0_18px_40px_-14px_rgba(0,94,184,0.55)] active:scale-95"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
    </a>
  );
}

