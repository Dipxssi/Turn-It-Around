"use client";

import Link from "next/link";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CapacityBuildingPage() {
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
              Capacity Building
            </p>
            <h1 className="reveal font-heading text-[40px] md:text-[56px] leading-[1.15] text-white mb-6">
              Capacity Building for NGOs
            </h1>
            <p className="reveal font-body text-[17px] text-white/80 leading-[1.8] max-w-2xl">
              Equip your board and staff with the knowledge and skills in
              governance, strategic planning, and effective monitoring &
              evaluation to drive your mission forward with confidence.
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
                    "polygon(50% 0%, 90% 30%, 90% 75%, 50% 100%, 10% 75%, 10% 30%)",
                }}
              />
              <h2 className="font-heading text-[32px] md:text-[38px] text-[var(--navy)]">
                Comprehensive Capacity Building Solutions
              </h2>
            </div>

            {/* Intro */}
            <p className="font-body text-[17px] text-[var(--text-muted)] max-w-[680px] mb-12 leading-[1.8]">
              Our capacity building programs are designed to strengthen your
              organization's ability to achieve its mission effectively. We work
              with NGOs, social enterprises, and mission-driven organizations to
              build robust systems, enhance leadership capabilities, and create
              sustainable operational frameworks.
            </p>

            {/* Sub-services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  title: "Governance Training & Board Development",
                  body: "Equip your board with clarity, structure, and accountability practices that enhance effectiveness. We provide comprehensive training on board roles, fiduciary responsibilities, strategic oversight, and best practices in nonprofit governance.",
                },
                {
                  title: "Strategic Planning Workshops",
                  body: "Facilitate long-term planning that aligns resources with mission priorities. Our workshops help organizations develop clear strategic directions, set measurable goals, and create actionable implementation plans.",
                },
                {
                  title: "Monitoring & Evaluation Strengthening",
                  body: "Build frameworks, tools, and systems that help you measure and communicate impact. We design M&E systems that are practical, donor-compliant, and focused on learning and improvement.",
                },
                {
                  title: "Staff Capacity Development",
                  body: "Training on financial literacy, program management, leadership, and organizational systems. Our programs enhance the skills and knowledge of your team members at all levels.",
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
                    Ready to Strengthen Your Organization?
                  </h3>
                  <p className="font-body text-[16px] text-[var(--text-muted)]">
                    Let's discuss how our capacity building services can help
                    your organization achieve its mission.
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
