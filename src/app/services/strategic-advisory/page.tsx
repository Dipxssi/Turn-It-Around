"use client";

import Link from "next/link";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function StrategicAdvisoryPage() {
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
              Strategic Advisory
            </p>
            <h1 className="reveal font-heading text-[40px] md:text-[56px] leading-[1.15] text-white mb-6">
              Strategic Advisory & Turnaround Solutions
            </h1>
            <p className="reveal font-body text-[17px] text-white/80 leading-[1.8] max-w-2xl">
              Leverage our strategic insights for new business creation,
              organizational development, and effective turnaround strategies to
              optimize resources and achieve desired results.
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
              <div
                className="w-10 h-10 bg-[#0091DA]"
                style={{
                  clipPath:
                    "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
                }}
              />
              <h2 className="font-heading text-[32px] md:text-[38px] text-[var(--navy)]">
                Strategic Transformation & Growth
              </h2>
            </div>

            {/* Intro */}
            <p className="font-body text-[17px] text-[var(--text-muted)] max-w-[680px] mb-12 leading-[1.8]">
              Our strategic advisory services help organizations navigate
              challenges, seize opportunities, and build sustainable growth
              models. Whether you're facing operational challenges, seeking to
              expand, or looking to create new revenue streams, we provide the
              strategic guidance and practical support you need.
            </p>

            {/* Sub-services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "Organizational Development",
                  body: "Assess and redesign internal systems to improve efficiency and mission alignment. We help organizations optimize their structures, processes, and culture to support sustainable growth and impact.",
                },
                {
                  title: "Turnaround & Change Management",
                  body: "Support for organizations experiencing stagnation, financial uncertainty, or structural inefficiency. We develop comprehensive turnaround plans and guide implementation to restore organizational health.",
                },
                {
                  title: "New Business Creation & Social Enterprise Development",
                  body: "Help NGOs build income-generating units and sustainability models. We assist in identifying opportunities, developing business plans, and launching social enterprises that align with your mission.",
                },
                {
                  title: "Program Reviews & Optimization",
                  body: "Evaluate project performance and design improvements to enhance impact. Our reviews provide actionable insights to strengthen program delivery and maximize outcomes.",
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
                    Ready to Transform Your Organization?
                  </h3>
                  <p className="font-body text-[16px] text-[var(--text-muted)]">
                    Let's discuss how our strategic advisory services can help
                    you achieve your goals.
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
