"use client";

import Link from "next/link";
import React, { useEffect, useState, FormEvent } from "react";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  BookOpen,
  Calculator,
  ChartLine,
  ChevronRight,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Target,
  TrendingUp,
  Wallet,
  Building2,
} from "lucide-react";

// SECTION 1: HERO — KPMG-STYLE LAYOUT
function Hero() {
  return (
    <section
      style={{
        height: "100vh",
        backgroundColor: "#00338D",
      }}
      className="text-white overflow-hidden"
    >
      {/* Two-column grid */}
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "100%",
        }}
      >
        {/* LEFT COLUMN — content */}
        <div
          className="hero-left"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 64px 80px 120px",
            position: "relative",
          }}
        >
          {/* Background stock chart line */}
          <svg
            style={{
              position: "absolute",
              bottom: "60px",
              left: "80px",
              right: "40px",
              width: "calc(100% - 120px)",
              height: "180px",
              opacity: 0.06,
              pointerEvents: "none",
              zIndex: 0,
            }}
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {[0, 37, 75, 112, 150].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="500"
                y2={y}
                stroke="#0091DA"
                strokeWidth="0.5"
              />
            ))}

            {/* Vertical grid lines */}
            {[0, 100, 200, 300, 400, 500].map((x) => (
              <line
                key={x}
                x1={x}
                y1="0"
                x2={x}
                y2="150"
                stroke="#0091DA"
                strokeWidth="0.5"
              />
            ))}

            {/* Area fill under the line */}
            <path
              d="M0,140 L30,135 L60,138 L90,125 L120,128 
                 L150,115 L180,118 L210,100 L240,105 
                 L270,88 L300,75 L330,60 L360,50 
                 L390,35 L420,25 L450,15 L480,8 L500,4
                 L500,150 L0,150 Z"
              fill="url(#stockGradient)"
            />

            {/* The line itself */}
            <path
              d="M0,140 L30,135 L60,138 L90,125 L120,128 
                 L150,115 L180,118 L210,100 L240,105 
                 L270,88 L300,75 L330,60 L360,50 
                 L390,35 L420,25 L450,15 L480,8 L500,4"
              fill="none"
              stroke="#0091DA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Upward arrow at the end of the line */}
            <g transform="translate(492, -4)">
              <line
                x1="0"
                y1="12"
                x2="0"
                y2="0"
                stroke="#0091DA"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <polyline
                points="-5,6 0,0 5,6"
                fill="none"
                stroke="#0091DA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Gradient definition */}
            <defs>
              <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0091DA" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0091DA" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Foreground text content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Headline */}
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "42px",
                color: "#FFFFFF",
                lineHeight: 1.15,
                marginBottom: "32px",
                maxWidth: "800px",
                opacity: 0,
                animation: "fadeSlideUp 0.7s ease forwards",
                animationDelay: "150ms",
              }}
            >
              Strategic advisory, capacity building, and financial management
              for NGOs, SMEs and businesses ready to grow, scale and thrive.
            </h1>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "48px",
                opacity: 0,
                animation: "fadeSlideUp 0.7s ease forwards",
                animationDelay: "400ms",
              }}
              className="hero-ctas"
            >
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0091DA",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  padding: "0 32px",
                  height: "48px",
                  textDecoration: "none",
                }}
                className="hero-primary-btn"
              >
                Get Started
              </Link>
            </div>

            {/* Stats row */}
            {/* (Hero stats removed) */}
          </div>
        </div>

        {/* RIGHT COLUMN — abstract visual */}
        <div
          className="hero-right"
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#00338D",
          }}
        >
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              zIndex: 0,
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlay to blend into left navy column */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #00338D 0%, #00338D 25%, rgba(0,51,141,0.75) 50%, rgba(0,51,141,0.4) 70%, rgba(0,51,141,0.25) 100%)",
              zIndex: 1,
            }}
          />

          {/* Soft dim overlay over the video */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              background: "rgba(0,51,141,0.15)",
              zIndex: 1,
            }}
          />

          {/* Diagonal line pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(135deg, rgba(0,145,218,0.06) 0px, rgba(0,145,218,0.06) 1px, transparent 1px, transparent 48px)",
              zIndex: 2,
            }}
          />

          {/* Gold accent block */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "6px",
              height: "100%",
              backgroundColor: "#0091DA",
              zIndex: 2,
            }}
          />

          {/* (Concentric circle overlays removed) */}


          {/* Bottom strip */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              backgroundColor: "rgba(0,145,218,0.08)",
              display: "flex",
              alignItems: "center",
              padding: "0 40px",
              gap: "24px",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              zIndex: 2,
            }}
          >
            <span>NGOs</span>
            <span>·</span>
            <span>SMEs</span>
            <span>·</span>
            <span>Social Enterprises</span>
            <span>·</span>
            <span>Development Partners</span>
            </div>
                </div>
                </div>
          
      {/* Animations & mobile responsive tweaks */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .hero-left h1 {
            font-size: 32px !important;
          }
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-right {
            display: none !important;
          }
          .hero-left {
            padding: 100px 24px 60px 24px !important;
          }
          .hero-left h1 {
            font-size: 28px !important;
          }
          .hero-ctas {
            flex-direction: column !important;
          }
          .hero-stats {
            flex-wrap: wrap !important;
            gap: 16px !important;
          }
        }
      `}</style>
      <style>{`
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// SECTION 2: TRUST BAR
function TrustBar() {
  return (
    <section
      style={{
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.15)",
        backgroundColor: "#FFFFFF",
      }}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "24px",
            fontWeight: 700,
            color: "#111111",
            letterSpacing: "-0.01em",
            marginBottom: "24px",
          }}
        >
          Trusted by NGOs, SMEs, Foundations, Social Enterprises & Development
          Partners Across the Region
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {[
            "NGOs",
            "SMEs",
            "Foundations",
            "Social Enterprises",
            "Development Partners",
          ].map((badge) => (
            <span
              key={badge}
              style={{
                border: "1px solid #00338D",
                color: "#00338D",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "12px",
                padding: "6px 16px",
                borderRadius: "20px",
              }}
            >
              {badge}
            </span>
          ))}
            </div>
          </div>
      <style>{`
        @media (max-width: 768px) {
          .rings-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// SECTION 3: VALUE PROPOSITION
function ValueProposition() {
  const revealRef = useScrollReveal();

  return (
    <section
      className="relative overflow-hidden py-[100px]"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          filter: "blur(1px) saturate(1.05) contrast(1.05)",
          transform: "scale(1.03)",
        }}
      >
        <source src="/videos/finance2.mp4" type="video/mp4" />
      </video>

      {/* Clean overlay to keep text readable */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.90) 38%, rgba(255,255,255,0.82) 62%, rgba(255,255,255,0.90) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(circle at 20% 30%, rgba(0,145,218,0.10), transparent 60%), radial-gradient(circle at 85% 70%, rgba(0,51,141,0.08), transparent 55%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        ref={revealRef}
        className="reveal relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
          {/* Left: TBS + heading */}
          <div className="relative">
            <div className="font-heading text-[100px] leading-none text-[var(--navy)] opacity-[0.05]">
              TBS
            </div>
            <h2 className="font-heading text-[40px] leading-[1.2] text-[var(--navy)] absolute top-0 left-0">
              The Value of TBS in your organization
            </h2>
          </div>

          {/* Right: body + enhanced stats with mini bar chart */}
          <div className="space-y-8">
            <p className="font-body text-[18px] text-[#111111] leading-[1.8]">
              We help NGOs, SMEs, and mission-driven teams unlock their full
              potential through practical training, results-based systems, and
              financial clarity—so they can lead with purpose, manage with
              excellence, and scale with confidence.
            </p>
            <div style={{ marginTop: "40px" }}>
              {/* Stats row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "0",
                  borderTop: "1px solid #F2F2F2",
                  paddingTop: "24px",
                }}
              >
                {[
                  { number: "10+", label: "Years of expertise" },
                  { number: "50+", label: "Organizations supported" },
                  { number: "3", label: "Integrated service areas" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    style={{
                      paddingRight: "24px",
                      paddingLeft: i > 0 ? "24px" : "0",
                      borderRight:
                        i < 2 ? "1px solid #F2F2F2" : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "36px",
                        color: "#0091DA",
                        lineHeight: 1,
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "13px",
                        color: "#757575",
                        marginTop: "6px",
                      }}
                    >
                      {stat.label}
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
            </div>
        </section>
  );
}

// SECTION 4: SERVICES
function Services() {
  const revealRef = useScrollReveal();

  const services = [
    {
      number: "01",
      title: "Capacity Building for NGOs",
      description:
        "Equip your board and staff with the knowledge and skills in governance, strategic planning, and effective monitoring & evaluation to drive your mission forward with confidence.",
      tags: ["Governance", "Strategic Planning", "M&E"],
      image: "/promise1.png",
      href: "/services/capacity-building",
    },
    {
      number: "02",
      title: "Strategic Advisory & Turnaround",
      description:
        "Leverage our strategic insights for new business creation, organizational development, and effective turnaround strategies to optimize resources and achieve desired results.",
      tags: ["Org Development", "Turnaround", "Growth"],
      image: "/promise2.png",
      href: "/services/strategic-advisory",
    },
    {
      number: "03",
      title: "Accounting & Financial Management",
      description:
        "From comprehensive bookkeeping to robust internal controls and donor reporting, we provide expert financial services tailored to the unique demands of non-profits and growing businesses.",
      tags: ["Bookkeeping", "Donor Reporting", "CFO"],
      image: "/promise4.png",
      href: "/services/accounting",
    },
  ];

                return (
    <section style={{ backgroundColor: "#1E49E2", padding: "120px 0" }}>
      <div
        ref={revealRef}
        className="reveal"
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "80px" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "16px",
              fontWeight: 500,
            }}
          >
            What We Do
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "48px",
                color: "#FFFFFF",
                lineHeight: 1.15,
                margin: 0,
                fontWeight: 400,
              }}
            >
              Our Core Services
            </h2>
            <Link
              href="/services"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.6)",
                paddingBottom: "4px",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0091DA";
                e.currentTarget.style.borderBottomColor = "#0091DA";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.6)";
              }}
            >
              View All Solutions →
            </Link>
          </div>
        </div>

        {/* Service cards */}
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {services.map((service, i) => (
            <Link
              key={service.number}
              href={service.href}
              className="service-card"
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "12px",
                padding: "0",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-8px)";
                el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
                el.style.borderColor = "rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  height: "190px",
                  background: "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
                  backgroundImage: service.image ? `url(${service.image})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="service-media"
              />

              <div
                style={{
                  position: "relative",
                  padding: "28px 28px 26px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* Left accent */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "28px",
                    width: "4px",
                    height: "44px",
                    backgroundColor: "#48D1CC",
                  }}
                />

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "22px",
                    color: "#111111",
                    lineHeight: 1.25,
                    margin: 0,
                    fontWeight: 700,
                    paddingLeft: "10px",
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "15px",
                    color: "#111111",
                    lineHeight: 1.7,
                    margin: 0,
                    opacity: 0.75,
                    flexGrow: 1,
                  }}
                >
                  {service.description}
                </p>

                {/* CTA */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "15px",
                    color: "#1E49E2",
                    fontWeight: 600,
                    marginTop: "10px",
                  }}
                >
                  Read now
                  <span
                    style={{
                      transition: "transform 0.3s ease",
                      display: "inline-block",
                      fontSize: "18px",
                      lineHeight: 1,
                    }}
                    className="service-arrow"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
          
      {/* Styles */}
      <style>{`
        .service-card:hover .service-number {
          background-color: rgba(0,145,218,0.15);
          transform: scale(1.05);
        }
        .service-card:hover .service-arrow {
          transform: translateX(4px);
        }
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .service-card {
            padding: 32px 24px !important;
          }
        }
      `}</style>
        </section>
  );
}

// SECTION 5: FEATURED SERVICES
function FeaturedServices() {
  const revealRef = useScrollReveal()

  const services = [
    { title: "Governance Training", icon: GraduationCap },
    { title: "Strategic Planning", icon: Target },
    { title: "Organizational Development", icon: Building2 },
    { title: "Financial Audits Support", icon: FileText },
    { title: "Outsourced Accounting", icon: Calculator },
    { title: "Virtual CFO & Financial Leadership", icon: Wallet },
    { title: "Grant & Donor Reporting", icon: BookOpen },
    { title: "M&E System Strengthening", icon: ChartLine },
    { title: "Program Reviews & Turnaround", icon: TrendingUp },
  ]

  return (
    <section className="relative overflow-hidden bg-navy py-[100px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,145,218,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(0,145,218,0.12),transparent_50%)]"
      />

      <div
        ref={revealRef}
        className="reveal relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-10 md:mb-14">
          <p className="font-body text-xs uppercase tracking-[0.18em] text-white/60 mb-4">
            The Turnitaround Advantage
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Featured Services
          </h2>
          <p className="mt-4 max-w-2xl font-body text-[17px] text-white/70 leading-relaxed tracking-[0.02em]">
            A premium suite of services built to help your leadership teams move faster with confidence, clarity, and measurable outcomes.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon
            const number = String(idx + 1).padStart(2, "0")

            return (
              <li key={service.title}>
                <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_18px_60px_-20px_rgba(0,145,218,0.45)]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -top-2 right-2 text-7xl font-bold text-blue/10 leading-none"
                  >
                    {number}
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-blue/20 bg-blue/10 transition-colors duration-300 group-hover:bg-blue/15">
                      <Icon className="h-5 w-5 text-blue" strokeWidth={1.6} />
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="font-body text-xs uppercase tracking-[0.18em] text-blue">
                          {number}
                        </span>
                        <span className="h-px flex-1 bg-white/10" />
                      </div>

                      <h3 className="mt-3 font-body text-lg md:text-xl font-semibold leading-snug tracking-tight text-white">
                        {service.title}
                      </h3>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="h-[2px] w-12 bg-blue/70 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-16" />
                        <span className="inline-flex items-center text-blue/90 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <ChevronRight className="h-4 w-4" strokeWidth={2} />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

      </div>
    </section>
  )
}

// SECTION 6: OUR APPROACH
function OurApproach() {
  const revealRef = useScrollReveal();
  const bgImages = ["/collaboration.jpg", "/strategy.jpg", "/workspace.jpg"] as const;
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setBgIndex((i) => (i + 1) % bgImages.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [bgImages.length]);

  const pillars = [
    {
      number: "01",
      title: "Immerse",
      body: "We dive deep into your operations and goals before recommending anything.",
    },
    {
      number: "02",
      title: "Localize",
      body: "Global best practices, customized to your specific context.",
    },
    {
      number: "03",
      title: "Transform",
      body: "Data-backed strategies with measurable, tangible results.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-[100px]">
      {/* Rotating background images */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        {bgImages.map((src, i) => (
          <div
            key={src}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "opacity 900ms ease",
              opacity: i === bgIndex ? 1 : 0,
              transform: "scale(1.02)",
              filter: "saturate(1.05) contrast(1.05)",
            }}
          />
        ))}
      </div>

      {/* Clean overlay for readability */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0.86) 66%, rgba(255,255,255,0.92) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(circle at 20% 35%, rgba(0,145,218,0.10), transparent 60%), radial-gradient(circle at 85% 70%, rgba(0,51,141,0.08), transparent 55%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        ref={revealRef}
        className="reveal relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-start">
          {/* Left */}
          <div>
            <div className="font-body text-[12px] text-[#0091DA] uppercase tracking-[0.15em] mb-2">
              Our Approach
            </div>
            <h2 className="font-heading text-[40px] text-[#00338D] mb-4">
              Building Enduring Capacity
              </h2>
            <p className="font-body text-[16px] text-[#1A1A1A] leading-[1.8] mb-6">
              At Turnitaround Business Solution, we believe in building enduring
              capacity. We go beyond conventional consulting, offering tailored
              strategies and hands-on support that resonate with your
              organization's unique needs. Our approach is rooted in practical
              experience and deep strategic insight, ensuring sustainable growth
              and tangible results.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#0091DA] text-white font-body text-[14px] px-6 py-3"
            >
              Contact Us Today
            </Link>
            </div>

          {/* Right: pillars */}
          <div className="space-y-8">
            {pillars.map((pillar) => (
              <div key={pillar.number} className="relative pl-12">
                <div
                  className="font-heading"
                  style={{
                    position: "relative",
                    fontSize: "64px",
                    opacity: 0.08,
                    color: "#00338D",
                    overflow: "visible",
                    whiteSpace: "nowrap",
                    marginLeft: "-8px",
                    marginTop: "-24px",
                    lineHeight: 1,
                  }}
                >
                  {pillar.number}
                  </div>
                <h3 className="font-heading text-[22px] text-[#00338D] mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-[15px] text-[#1A1A1A]">
                  {pillar.body}
                </p>
                <div className="h-[2px] w-10 bg-[#0091DA] mt-4" />
                  </div>
                ))}
                </div>
              </div>
          </div>
        </section>
  );
}

// SECTION 7: OUR PROMISE
function OurPromise() {
  const revealRef = useScrollReveal();

  const rows = [
    {
      number: "01",
      title: "Expert-Led & Practice-Based",
      body:
        "Leverage the unmatched expertise of our lead consultant, Dr. Albert Simiyu—a Ph.D. holder in Entrepreneurship and Small Business Management with hands-on experience in guiding both NGOs and SMEs through strategic transformation and financial growth.",
      tag: "Expert-Led",
    },
    {
      number: "02",
      title: "Trusted Financial Stewardship",
      body:
        "Work with ICPAK-certified professionals who ensure your financial systems—whether for grants, donor funding, or business revenues—are transparent, compliant, and optimized for sustainability and stakeholder trust.",
      tag: "Financial Stewardship",
    },
    {
      number: "03",
      title: "Holistic & Integrated Support",
      body:
        "From governance training and strategic planning to accounting, tax, and monitoring & evaluation, our solutions are built to support your entire organizational lifecycle—whether you're scaling a mission or growing a business.",
      tag: "Holistic Support",
    },
    {
      number: "04",
      title: "Impact-Focused, Growth-Driven",
      body:
        "Whether you're a non-profit seeking lasting social impact or a business driving growth in your sector, our custom-built solutions focus on measurable outcomes, efficiency, and long-term sustainability.",
      tag: "Impact-Focused",
    },
  ];

  return (
    <section className="bg-[#1E49E2] py-[100px]">
      <div
        ref={revealRef}
        className="reveal max-w-7xl mx-auto px-4 md:px-6 lg:px-8"
      >
        <div className="text-center mb-10">
          <h2 className="font-heading text-[42px] text-white mb-3">
            Our Promise
          </h2>
          <p className="font-heading italic text-[22px] text-white/85">
            Empowering Vision. Strengthening Systems. Sustaining Success.
          </p>
        </div>

        {/* Circular progress rings strip */}
        <div
          className="rings-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            marginBottom: "2px",
          }}
        >
          {[
            { percent: 98, label: "Client Satisfaction" },
            { percent: 99, label: "Accuracy" },
            { percent: 75, label: "Repeat Engagement" },
          ].map((item) => {
            const radius = 36;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (item.percent / 100) * circumference;

            return (
              <div
                key={item.label}
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* SVG Ring */}
                <svg
                  width="88"
                  height="88"
                  viewBox="0 0 88 88"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  {/* Background ring */}
                  <circle
                    cx="44"
                    cy="44"
                    r={radius}
                    fill="none"
                    stroke="rgba(0,145,218,0.15)"
                    strokeWidth="6"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="44"
                    cy="44"
                    r={radius}
                    fill="none"
                    stroke="#0091DA"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="ring-progress"
                  />
                </svg>

                {/* Percentage — overlaid on ring using negative margin */}
                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "22px",
                    color: "#00338D",
                    marginTop: "-76px",
                    marginBottom: "44px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {item.percent}%
                </div>

                {/* Label */}
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "12px",
                    color: "#757575",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Promise cards — 2x2 grid of square cards */}
        <div
          className="promise-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
          }}
        >
          {rows.map((row) => (
            <div
              key={row.title}
              className="promise-card"
              style={{
                backgroundColor: "#FFFFFF",
                borderTop: "3px solid #0091DA",
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                minHeight: "280px",
                cursor: "default",
                transition: "border-color 0.3s ease",
              }}
            >
              {/* Number top left */}
              <div
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  color: "#0091DA",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {row.number}
            </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "24px",
                  color: "#00338D",
                  lineHeight: 1.3,
                }}
              >
                {row.title}
              </h3>

              {/* Gold divider line */}
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  backgroundColor: "#0091DA",
                }}
              />

              {/* Body */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "15px",
                  color: "#757575",
                  lineHeight: 1.75,
                  flex: 1,
                }}
              >
                {row.body}
              </p>

              {/* Tag pill bottom */}
              <div
                style={{
                  alignSelf: "flex-start",
                  border: "1px solid #0091DA",
                  color: "#0091DA",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "11px",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {row.tag}
              </div>
            </div>
              ))}
            </div>
          </div>
    </section>
  );
}

// SECTION 8: TESTIMONIAL
function Testimonial() {
  const revealRef = useScrollReveal();

  const testimonials = [
    {
      quote: `The expertise brought by TBS was invaluable. They didn't just offer
advice; they rolled up their sleeves and worked alongside our team. We
saw tangible improvements in efficiency and profitability within a few
months. Their practical solutions and dedicated support were crucial
in navigating a critical period for our business. A truly effective
partner.`,
      author: `Daniel — Chief Finance Officer`,
    },
    {
      quote: `Working with TBS helped us clarify priorities and move faster.
Their practical guidance improved decision-making across teams,
and their support kept the implementation on track throughout the process.`,
      author: `Name — Job Title`,
    },
    {
      quote: `TBS delivered a structured approach and responsive support.
Their recommendations strengthened our operations and gave us confidence
to sustain growth long after the engagement ended.`,
      author: `Name — Job Title`,
    },
  ];

  const FADE_MS = 600;
  const DISPLAY_MS = 3800;

  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (reduced) return;

    let active = true;
    let fadeTimeoutId: number | undefined;
    let nextTimeoutId: number | undefined;

    const cycle = () => {
      if (!active) return;
      setVisible(false);

      fadeTimeoutId = window.setTimeout(() => {
        if (!active) return;
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setVisible(true);

        nextTimeoutId = window.setTimeout(cycle, DISPLAY_MS);
      }, FADE_MS);
    };

    nextTimeoutId = window.setTimeout(cycle, DISPLAY_MS);

    return () => {
      active = false;
      if (fadeTimeoutId) window.clearTimeout(fadeTimeoutId);
      if (nextTimeoutId) window.clearTimeout(nextTimeoutId);
    };
  }, [testimonials.length]);

  const { quote, author } = testimonials[current];

  return (
    <section className="bg-[#00338D] py-20 text-white">
      <div
        ref={revealRef}
        className="reveal max-w-3xl mx-auto px-4 md:px-6 text-center"
      >
        {/* Stars */}
        <div className="flex justify-center mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                margin: "0 3px",
                backgroundColor: "#0091DA",
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            />
              ))}
            </div>

        {/* Quote mark */}
        <div className="font-heading text-[96px] text-[#0091DA] opacity-20 leading-none mb-2">
          "
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease`,
            minHeight: 220, // keep the content stable while fading
          }}
          aria-live="polite"
        >
          <p className="font-heading italic text-[22px] text-white leading-[1.7] mb-6">
            {quote}
          </p>

          <div className="h-[3px] w-10 bg-[#0091DA] mx-auto mb-3" />

          <div className="font-body text-[14px] text-white/75" style={{ minHeight: 18 }}>
            {author}
          </div>
        </div>
          </div>
        </section>
  );
}

// SECTION 9: CONTACT TEASER
function ContactTeaser() {
  const revealRef = useScrollReveal();

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-white py-20">
      <div
        ref={revealRef}
        className="reveal max-w-7xl mx-auto px-4 md:px-6 lg:px-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left */}
          <div>
            <div className="font-body text-[12px] text-[#0091DA] uppercase tracking-[0.15em] mb-2">
              Get In Touch
            </div>
            <h2 className="font-heading text-[36px] text-[var(--navy)] mb-4">
              We are happy to answer all your questions
            </h2>
            <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.8] mb-6">
              In today's fast-changing business world, staying competitive
              requires agility and innovation. Turnitaround Business Solution is
              your trusted partner in driving transformation, growth, and
              sustainable success.
            </p>
            <div className="space-y-3 font-body text-[14px] text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#0091DA]" aria-hidden="true" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#0091DA]" aria-hidden="true" />
                <span>(+254) 0751 216 699</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#0091DA]" aria-hidden="true" />
                <span>info@turnitaroundbusiness.com</span>
              </div>
                </div>
              </div>

          {/* Right: form */}
          <div className="md:border-l md:border-[var(--border)] md:pl-10">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                  <label className="block font-body text-[13px] text-[var(--text-muted)] mb-1">
                    For any inquiry
                      </label>
                    </div>
                    <div>
                  <label className="block font-body text-[13px] text-[var(--text-muted)] mb-1">
                    Full Name
                      </label>
                      <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-[var(--text-muted)] bg-transparent py-2 focus:outline-none focus:border-[var(--blue)]"
                      />
                  </div>
                  <div>
                  <label className="block font-body text-[13px] text-[var(--text-muted)] mb-1">
                    Email Address
                    </label>
                    <input
                        type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-[var(--text-muted)] bg-transparent py-2 focus:outline-none focus:border-[var(--blue)]"
                    />
                  </div>
                  <div>
                  <label className="block font-body text-[13px] text-[var(--text-muted)] mb-1">
                    Subject
                    </label>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full border-b border-[var(--text-muted)] bg-transparent py-2 focus:outline-none focus:border-[var(--blue)]"
                    />
                  </div>
                  <div>
                  <label className="block font-body text-[13px] text-[var(--text-muted)] mb-1">
                      Message
                    </label>
                    <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-b border-[var(--text-muted)] bg-transparent py-2 focus:outline-none focus:border-[var(--blue)] resize-y"
                    />
                  </div>
                  <button
                    type="submit"
                  className="w-full bg-[#0091DA] text-white font-body text-[14px] h-12"
                  >
                  Get in Touch
                  </button>
                </form>
            ) : (
              <div className="text-center py-10">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    border: "3px solid #0091DA",
                    margin: "0 auto 16px",
                  }}
                />
                <h3 className="font-heading text-[24px] text-[var(--navy)] mb-2">
                  Thank you! We'll be in touch within 48 hours.
                </h3>
              </div>
            )}
              </div>
            </div>
          </div>
        </section>
  );
}

// HOME EXPORT
export default function Home() {
  return (
    <div className="bg-white">
      <NavBar />
      <main>
        <div className="card-stack">
          <Hero />
          <TrustBar />
          <ValueProposition />
        </div>
        <Services />
        <FeaturedServices />
        <OurApproach />
        <OurPromise />
        <Testimonial />
        <ContactTeaser />
      </main>
      <Footer />
    </div>
  );
}

