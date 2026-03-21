"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type TabKey = "capacity" | "strategy" | "finance";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("capacity");
  const [servicesGlanceActiveIndex, setServicesGlanceActiveIndex] =
    useState(0);

  const capacityRef = useRef<HTMLElement | null>(null);
  const strategyRef = useRef<HTMLElement | null>(null);
  const financeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return;

    // Total boxes across the 3 columns (5 + 5 + 5).
    const total = 15;
    const stepMs = 1800;

    const id = window.setInterval(() => {
      setServicesGlanceActiveIndex((prev) => (prev + 1) % total);
    }, stepMs);

    return () => window.clearInterval(id);
  }, []);

  // Keep the tabs in sync with the section currently in view.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const capacityEl = capacityRef.current;
    const strategyEl = strategyRef.current;
    const financeEl = financeRef.current;

    if (!capacityEl || !strategyEl || !financeEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestKey: TabKey | null = null;
        let bestRatio = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const el = entry.target as HTMLElement;
          let key: TabKey | null = null;
          if (el === capacityEl) key = "capacity";
          if (el === strategyEl) key = "strategy";
          if (el === financeEl) key = "finance";

          if (!key) continue;

          if (entry.intersectionRatio >= bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestKey = key;
          }
        }

        // If nothing is intersecting, don't change state.
        if (bestKey) setActiveTab(bestKey);
      },
      {
        // Adjusts the "active area" to account for the sticky tab bar.
        rootMargin: "-120px 0px -40% 0px",
        threshold: [0.01, 0.05, 0.1, 0.2, 0.35],
      }
    );

    observer.observe(capacityEl);
    observer.observe(strategyEl);
    observer.observe(financeEl);

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
    const section =
      tab === "capacity"
        ? capacityRef.current
        : tab === "strategy"
        ? strategyRef.current
        : financeRef.current;

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "capacity", label: "Capacity Building" },
    { key: "strategy", label: "Strategic Advisory" },
    { key: "finance", label: "Accounting & Finance" },
  ];

  const overviewLeft = [
    "Governance Training",
    "Strategic Planning",
    "Organizational Development",
    "Financial Audits Support",
    "Outsourced Accounting",
  ];
  const overviewRight = [
    "Virtual CFO & Financial Leadership",
    "Grant & Donor Reporting",
    "M&E System Strengthening",
    "Program Reviews & Turnaround",
  ];

  return (
    <div className="bg-white text-[var(--navy)]">
      <NavBar />

      {/* HERO */}
      <PageHero
        eyebrow="What We Do"
        headline="Solutions Designed to Turn Around Your Organization From the Inside Out"
        subtext="Tailored advisory, capacity building, and financial management for organizations ready to grow."
        imagePlaceholder="TBS Advisory Session"
        imageUrl="/services.png"
      />

      {/* TABS */}
      <section
        className="bg-white border-b border-[var(--border)] sticky top-14 md:top-16 z-30"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex gap-6 overflow-x-auto py-3 md:py-4 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabClick(tab.key)}
                className={`whitespace-nowrap pb-2 font-body text-sm border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "border-[var(--blue)] text-[var(--navy)]"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--navy)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main>
        {/* SERVICE A */}
        <section
          ref={capacityRef}
          id="capacity-building"
          className="relative bg-white py-[100px] px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute -top-6 left-0 text-[120px] font-heading text-[#0091DA] opacity-[0.08] pointer-events-none select-none">
              A
            </div>

            {/* Header row */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 bg-[#0091DA]"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 90% 30%, 90% 75%, 50% 100%, 10% 75%, 10% 30%)",
                  }}
                />
                <h2 className="font-heading text-[32px] md:text-[38px] text-[var(--navy)]">
                  Capacity Building for NGOs
                </h2>
              </div>
              <span className="inline-flex items-center px-4 py-1 rounded-full border border-[var(--blue)] font-body text-[12px] text-[#0091DA] uppercase tracking-[0.12em]">
                NGO-Focused
              </span>
            </div>

            {/* Intro */}
            <p className="font-body text-[17px] text-[var(--text-muted)] max-w-[680px] mb-12 leading-[1.8]">
              Equip your board and staff with the knowledge and skills in
              governance, strategic planning, and effective monitoring &amp;
              evaluation to drive your mission forward with confidence.
            </p>

            {/* Sub-services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {[
                {
                  title: "Governance Training & Board Development",
                  body: "Equip your board with clarity, structure, and accountability practices that enhance effectiveness.",
                },
                {
                  title: "Strategic Planning Workshops",
                  body: "Facilitate long-term planning that aligns resources with mission priorities.",
                },
                {
                  title: "Monitoring & Evaluation Strengthening",
                  body: "Build frameworks, tools, and systems that help you measure and communicate impact.",
                },
                {
                  title: "Staff Capacity Development",
                  body: "Training on financial literacy, program management, leadership, and organizational systems.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l border-[var(--blue)] pl-5 flex flex-col gap-1 hover:border-l-[3px] hover:translate-x-1 transition-all"
                >
                  <h3 className="font-heading text-[18px] text-[var(--navy)]">
                    {item.title}
                  </h3>
                  <p className="font-body text-[14px] text-[var(--text-muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/services/capacity-building"
              className="font-body text-[14px] text-[#0091DA] hover:underline"
            >
              Learn more about Capacity Building →
            </Link>

            <div className="mt-10 h-px bg-[#0091DA]/40" />
          </div>
        </section>

        {/* SERVICE B */}
        <section
          ref={strategyRef}
          id="strategic-advisory"
          className="relative bg-[var(--light-grey)] py-[100px] px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute -top-6 left-0 text-[120px] font-heading text-[#0091DA] opacity-[0.08] pointer-events-none select-none">
              B
            </div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 bg-[#0091DA]"
                  style={{
                    clipPath:
                      "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
                  }}
                />
                <h2 className="font-heading text-[32px] md:text-[38px] text-[var(--navy)]">
                  Strategic Advisory &amp; Turnaround Solutions
                </h2>
              </div>
              <span className="inline-flex items-center px-4 py-1 rounded-full border border-[var(--blue)] font-body text-[12px] text-[#0091DA] uppercase tracking-[0.12em]">
                Business Growth
              </span>
            </div>

            <p className="font-body text-[17px] text-[var(--text-muted)] max-w-[680px] mb-12 leading-[1.8]">
              Leverage our strategic insights for new business creation,
              organizational development, and effective turnaround strategies to
              optimize resources and achieve desired results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {[
                {
                  title: "Organizational Development",
                  body: "Assess and redesign internal systems to improve efficiency and mission alignment.",
                },
                {
                  title: "Turnaround & Change Management",
                  body: "Support for organizations experiencing stagnation, financial uncertainty, or structural inefficiency.",
                },
                {
                  title:
                    "New Business Creation & Social Enterprise Development",
                  body: "Help NGOs build income-generating units and sustainability models.",
                },
                {
                  title: "Program Reviews & Optimization",
                  body: "Evaluate project performance and design improvements to enhance impact.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l border-[var(--blue)] pl-5 flex flex-col gap-1 hover:border-l-[3px] hover:translate-x-1 transition-all"
                >
                  <h3 className="font-heading text-[18px] text-[var(--navy)]">
                    {item.title}
                  </h3>
                  <p className="font-body text-[14px] text-[var(--text-muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/services/strategic-advisory"
              className="font-body text-[14px] text-[#0091DA] hover:underline"
            >
              Learn more about Strategic Advisory →
            </Link>

            <div className="mt-10 h-px bg-[#0091DA]/40" />
          </div>
        </section>

        {/* SERVICE C */}
        <section
          ref={financeRef}
          id="accounting-finance"
          className="relative bg-white py-[100px] px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute -top-6 left-0 text-[120px] font-heading text-[#0091DA] opacity-[0.08] pointer-events-none select-none">
              C
            </div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0091DA]" />
                <h2 className="font-heading text-[32px] md:text-[38px] text-[var(--navy)]">
                  Accounting &amp; Financial Management
                </h2>
              </div>
              <span className="inline-flex items-center px-4 py-1 rounded-full border border-[var(--blue)] font-body text-[12px] text-[#0091DA] uppercase tracking-[0.12em]">
                Financial Clarity
              </span>
            </div>

            <p className="font-body text-[17px] text-[var(--text-muted)] max-w-[680px] mb-12 leading-[1.8]">
              From comprehensive bookkeeping to robust internal controls and
              donor reporting, we provide expert financial services tailored to
              the unique demands of non-profits and growing businesses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {[
                {
                  title: "Outsourced Accounting Services",
                  body: "Reliable bookkeeping, financial statements, compliance support.",
                },
                {
                  title: "Internal Controls & Risk Management",
                  body: "Set up systems that protect resources and ensure accountability.",
                },
                {
                  title: "Donor Reporting & Grant Management",
                  body: "Prepare donor-compliant reports, track budgets, and support audit requirements.",
                },
                {
                  title: "Virtual CFO Services",
                  body: "High-level financial leadership for organizations that want strategic financial direction without hiring full-time.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l border-[var(--blue)] pl-5 flex flex-col gap-1 hover:border-l-[3px] hover:translate-x-1 transition-all"
                >
                  <h3 className="font-heading text-[18px] text-[var(--navy)]">
                    {item.title}
                  </h3>
                  <p className="font-body text-[14px] text-[var(--text-muted)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Full-width row */}
            <div className="border-l border-[var(--blue)] pl-5 flex flex-col gap-1 mb-10 hover:border-l-[3px] hover:translate-x-1 transition-all">
              <h3 className="font-heading text-[18px] text-[var(--navy)]">
                Financial Systems Setup
              </h3>
              <p className="font-body text-[14px] text-[var(--text-muted)]">
                Design and implement budgeting, reporting, and accounting
                structures tailored to mission organizations.
              </p>
            </div>

            <Link
              href="/services/accounting"
              className="font-body text-[14px] text-[#0091DA] hover:underline"
            >
              Learn more about Financial Management →
            </Link>

            <div className="mt-10 h-px bg-[#0091DA]/40" />
          </div>
        </section>

        {/* ALL SERVICES OVERVIEW */}
        <section style={{ backgroundColor: "#00338D", padding: "100px 0" }}>
          <div
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "12px",
                }}
              >
                Everything We Offer
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "42px",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                  margin: "0 0 16px 0",
                }}
              >
                All Services at a Glance
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.6)",
                  maxWidth: "480px",
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                Explore the services we provide to help organizations grow with
                confidence.
              </p>
            </div>

            {/* 3 category columns */}
            <div
              className="services-glance"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "2px",
              }}
            >
              {/* Column 1 — Capacity Building */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {/* Category header */}
                <div
                  style={{
                    backgroundColor: "#0091DA",
                    padding: "20px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1L2 4v4c0 3.6 2.6 7 6 8C14.6 15 18 12 18 8V4L8 1z"
                        stroke="#fff"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "13px",
                      color: "#FFFFFF",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                    }}
                  >
                    Capacity Building
                  </span>
                </div>

                {/* Services */}
                {[
                  "Governance Training",
                  "Strategic Planning",
                  "M&E System Strengthening",
                  "Staff Capacity Development",
                  "Program Reviews & Turnaround",
                ].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      backgroundColor:
                        servicesGlanceActiveIndex === i
                          ? "rgba(0,145,218,0.15)"
                          : "rgba(255,255,255,0.05)",
                      padding: "16px 28px",
                      paddingLeft:
                        servicesGlanceActiveIndex === i ? "36px" : "28px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#0091DA",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Column 2 — Strategic Advisory */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <div
                  style={{
                    backgroundColor: "#0091DA",
                    padding: "20px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 14l4-8 3 4 2-3 3 7"
                        stroke="#fff"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "13px",
                      color: "#FFFFFF",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                    }}
                  >
                    Strategic Advisory
                  </span>
                </div>

                {[
                  "Organizational Development",
                  "Turnaround & Change Management",
                  "New Business Creation",
                  "Social Enterprise Development",
                  "Program Reviews & Optimization",
                ].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      backgroundColor:
                        servicesGlanceActiveIndex === 5 + i
                          ? "rgba(0,145,218,0.15)"
                          : "rgba(255,255,255,0.05)",
                      padding: "16px 28px",
                      paddingLeft:
                        servicesGlanceActiveIndex === 5 + i ? "36px" : "28px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#0091DA",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Column 3 — Financial Management */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <div
                  style={{
                    backgroundColor: "#0091DA",
                    padding: "20px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="9" width="3" height="5" fill="#fff" />
                      <rect x="6.5" y="6" width="3" height="8" fill="#fff" opacity="0.7" />
                      <rect x="11" y="3" width="3" height="11" fill="#fff" opacity="0.4" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "13px",
                      color: "#FFFFFF",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                    }}
                  >
                    Financial Management
                  </span>
                </div>

                {[
                  "Outsourced Accounting Services",
                  "Internal Controls & Risk Management",
                  "Donor Reporting & Grant Management",
                  "Virtual CFO Services",
                  "Financial Systems Setup",
                ].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      backgroundColor:
                        servicesGlanceActiveIndex === 10 + i
                          ? "rgba(0,145,218,0.15)"
                          : "rgba(255,255,255,0.05)",
                      padding: "16px 28px",
                      paddingLeft:
                        servicesGlanceActiveIndex === 10 + i
                          ? "36px"
                          : "28px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s ease",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#0091DA",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <style>{`
            @media (max-width: 1024px) {
              .services-glance {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

        {/* CTA BANNER */}
        <section className="bg-[#F2F2F2] text-[var(--navy)] py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-[32px] md:text-[38px] text-[var(--navy)]">
              Not sure where to start?
            </h2>
            <p className="font-body text-[16px] text-[var(--text-muted)] max-w-2xl mx-auto">
              Let's talk about your organization's needs and find the right
              solution together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Button
                href="/contact"
                variant="primary"
                className="h-12 px-7"
              >
                Book a Discovery Call
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
