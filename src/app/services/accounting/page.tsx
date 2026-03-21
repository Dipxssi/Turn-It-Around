"use client";

import Link from "next/link";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AccountingPage() {
  const heroRef = useScrollReveal();
  const contentRef = useScrollReveal();

  return (
    <div className="bg-white text-[var(--navy)]">
      <NavBar />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative bg-[var(--navy)] text-white min-h-[50vh] flex items-center"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(0,145,218,0.06) 0px, rgba(0,145,218,0.06) 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="max-w-4xl">
            <p className="reveal font-body text-xs text-[#0091DA] uppercase tracking-[0.18em] mb-4">
              Accounting & Finance
            </p>
            <h1 className="reveal font-heading text-[40px] md:text-[56px] leading-[1.15] text-white mb-6">
              Accounting & Financial Management
            </h1>
            <p className="reveal font-body text-[17px] text-white/80 leading-[1.8] max-w-2xl">
              From comprehensive bookkeeping to robust internal controls and
              donor reporting, we provide expert financial services tailored to
              the unique demands of non-profits and growing businesses.
            </p>
          </div>
        </div>
      </section>

      <main>
        {/* CONTENT SECTION */}
        <section
          ref={contentRef}
          className="bg-white py-[100px] px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-[#0091DA]" />
              <h2 className="font-heading text-[32px] md:text-[38px] text-[var(--navy)]">
                Comprehensive Financial Services
              </h2>
            </div>

            {/* Intro */}
            <p className="font-body text-[17px] text-[var(--text-muted)] max-w-[680px] mb-12 leading-[1.8]">
              Our financial management services are designed specifically for
              NGOs, social enterprises, and mission-driven organizations. We
              understand the unique financial challenges you face, from managing
              multiple funding sources to ensuring compliance with donor
              requirements and regulatory standards.
            </p>

            {/* Sub-services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "Bookkeeping & Accounting",
                  body: "Maintain accurate, up-to-date financial records with our comprehensive bookkeeping services. We handle day-to-day transactions, reconciliations, and financial reporting to keep your organization's finances in order.",
                },
                {
                  title: "Donor Reporting & Grant Management",
                  body: "Ensure compliance with donor requirements through timely, accurate reporting. We help you track grant funds, prepare financial reports, and maintain the documentation needed for successful grant management.",
                },
                {
                  title: "Virtual CFO & Financial Leadership",
                  body: "Access executive-level financial guidance without the overhead of a full-time CFO. Our virtual CFO services provide strategic financial leadership, budgeting, forecasting, and financial planning support.",
                },
                {
                  title: "Internal Controls & Audit Support",
                  body: "Strengthen your financial systems with robust internal controls. We help you prepare for audits, implement best practices, and ensure your financial operations meet the highest standards.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l border-[var(--blue)] pl-5 flex flex-col gap-2 hover:border-l-[3px] hover:translate-x-1 transition-all py-2"
                >
                  <h3 className="font-heading text-[20px] text-[var(--navy)]">
                    {item.title}
                  </h3>
                  <p className="font-body text-[15px] text-[var(--text-muted)] leading-[1.7]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 pt-12 border-t border-[var(--border)]">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-heading text-[28px] text-[var(--navy)] mb-3">
                    Ready to Strengthen Your Financial Management?
                  </h3>
                  <p className="font-body text-[16px] text-[var(--text-muted)]">
                    Let's discuss how our financial services can bring clarity
                    and confidence to your organization's finances.
                  </p>
                </div>
                <Button href="/contact" variant="primary" className="h-12 px-8">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-12">
              <Link
                href="/services"
                className="font-body text-[14px] text-[#0091DA] hover:underline inline-flex items-center gap-2"
              >
                ← Back to All Services
              </Link>
              </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
