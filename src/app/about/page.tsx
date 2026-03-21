"use client";

import Link from "next/link";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutUs() {
  const missionVisionRef = useScrollReveal();
  const storyRef = useScrollReveal();
  const valuesRef = useScrollReveal();
  const differenceRef = useScrollReveal();
  const leadRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="bg-white text-[var(--navy)]">
      <NavBar />

      <main>
        {/* SECTION 1: HERO */}
        <PageHero
          eyebrow="Who We Are"
          headline="A Strategic Partner Built for Your Organization"
          subtext="Dedicated to strengthening NGOs, social enterprises, SMEs, and mission-driven businesses."
          imagePlaceholder="TBS Leadership Team"
          imageUrl="/about.png"
        />

        {/* SECTION 2: MISSION & VISION */}
        <section
          ref={missionVisionRef}
          className="bg-[var(--light-grey)] py-[100px] px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Mission */}
            <div className="reveal bg-[var(--navy)] p-12 flex flex-col justify-between">
              <div>
                <p className="font-body text-[11px] text-[#0091DA] uppercase tracking-[0.15em]">
                  Our Mission
                </p>
                <div className="h-[3px] w-10 bg-[#0091DA] mt-4 mb-8" />
                <p className="font-heading italic text-[26px] leading-[1.6] text-white">
                  Empowering vision. Strengthening systems. Sustaining success.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="reveal bg-[#0091DA] p-12 flex flex-col justify-between">
              <div>
                <p className="font-body text-[11px] text-[var(--navy)] uppercase tracking-[0.15em]">
                  Our Vision
                </p>
                <div className="h-[3px] w-10 bg-[var(--navy)] mt-4 mb-8" />
                <p className="font-heading italic text-[26px] leading-[1.6] text-[var(--navy)]">
                  To be the trusted partner that enables organizations to
                  achieve sustainable growth, measurable impact, and lasting
                  resilience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: OUR STORY */}
        <section
          ref={storyRef}
          className="bg-white py-[100px] px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[60%_40%] gap-12">
            {/* Left */}
            <div className="space-y-6">
              <p className="reveal font-body text-[12px] text-[#0091DA] uppercase">
                Our Story
              </p>
              <h2 className="reveal font-heading text-[40px] leading-[1.2] text-[var(--navy)]">
                Built for the Organizations That Matter Most
              </h2>
              <div className="reveal space-y-5 font-body text-[16px] text-[var(--text-muted)] leading-[1.8]">
                <p>
                  Turnitaround Business Solutions (TBS) is a strategic advisory
                  and capacity-building firm dedicated to strengthening NGOs,
                  social enterprises, SMEs, and mission-driven businesses
                  through robust systems, sustainable operational structures,
                  and transparent financial frameworks.
                </p>
                <p>
                  Our approach is rooted in a deep understanding of how
                  businesses evolve, adapt, and thrive in a fast-changing
                  environment. We don't believe in one-size-fits-all
                  solutions—instead, we immerse ourselves in your operations,
                  challenges, and goals to craft strategies that deliver real
                  transformation.
                </p>
                <p>
                  We value trust, confidentiality, and agility. Every member of
                  our team upholds the highest ethical standards, ensuring that
                  all client information is handled with absolute discretion.
                  Our culture is driven by excellence, accountability, and a
                  commitment to results.
                </p>
              </div>
              <div className="reveal pt-2">
                <Button href="/contact" variant="primary" className="h-12 px-7">
                  Contact Us Today
                </Button>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-8">
              <div className="reveal bg-[var(--navy)] p-8 border-l-4 border-[var(--blue)]">
                <p className="font-heading italic text-[20px] text-white leading-[1.7]">
                  \"Growth isn't accidental—it's intentional. It's powered by
                  clear strategies, actionable insights, and the right support.\"
                </p>
              </div>

              <div className="reveal space-y-4">
                {[
                  "ICPAK-Certified Financial Professionals",
                  "Ph.D.-Led Strategic Advisory",
                  "Serving NGOs, SMEs & Social Enterprises",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#0091DA] mt-0.5">✓</span>
                    <span className="font-body text-[14px] text-[var(--navy)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: OUR VALUES */}
        <section
          ref={valuesRef}
          style={{ backgroundColor: "#00338D", padding: "100px 0" }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "12px",
                  color: "#0091DA",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "12px",
                }}
              >
                Our Core Values
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "42px",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                What We Stand For
              </h2>
            </div>

            {/* 2x2 Card Grid */}
            <div
              className="values-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2px",
              }}
            >
              {[
                {
                  number: "01",
                  title: "Trust",
                  body: "We build lasting relationships grounded in honesty, reliability, and transparent communication with every client.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2L3 5.5v5c0 4.5 3.25 8.75 7 9.95 3.75-1.2 7-5.45 7-9.95v-5L10 2z"
                        stroke="#0091DA"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 10l2 2 4-4"
                        stroke="#0091DA"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  number: "02",
                  title: "Confidentiality",
                  body: "All client information is handled with absolute discretion. Our ethical standards are non-negotiable.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect
                        x="4"
                        y="9"
                        width="12"
                        height="9"
                        rx="1.5"
                        stroke="#0091DA"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M7 9V6.5a3 3 0 016 0V9"
                        stroke="#0091DA"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="10" cy="13.5" r="1.5" fill="#0091DA" />
                    </svg>
                  ),
                },
                {
                  number: "03",
                  title: "Agility",
                  body: "We adapt quickly to changing environments, delivering responsive strategies that meet you where you are.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 10h14M13 5l5 5-5 5"
                        stroke="#0091DA"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  number: "04",
                  title: "Excellence",
                  body: "Our culture is driven by accountability and a relentless commitment to results that matter.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 14.27l-4.78 2.53.91-5.32L2.27 7.62l5.34-.78L10 2z"
                        stroke="#0091DA"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((value) => (
                <div
                  key={value.title}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "48px 40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    borderTop: "3px solid #0091DA",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.backgroundColor = "#F2F2F2";
                    el.style.borderTopColor = "#00338D";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.backgroundColor = "#FFFFFF";
                    el.style.borderTopColor = "#0091DA";
                  }}
                >
                  {/* Top row — icon + number */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Icon box */}
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        backgroundColor: "#EEF4FB",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {value.icon}
                    </div>

                    {/* Number */}
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "12px",
                        color: "#E0E0E0",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {value.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "26px",
                      color: "#00338D",
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {value.title}
                  </h3>

                  {/* Blue divider */}
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
                      margin: 0,
                    }}
                  >
                    {value.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <style>{`
            @media (max-width: 768px) {
              .values-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

        {/* SECTION 5: WHY CHOOSE TBS */}
        <section
          ref={differenceRef}
          className="bg-[var(--light-grey)] py-[100px] px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="reveal font-heading text-[40px] text-center text-[var(--navy)] mb-16">
              The Turnitaround Difference
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Global Standards, Local Context",
                  body: "We apply international best practices but customize every strategy to your specific organizational context, sector, and region.",
                  icon: (
                    <span className="relative w-10 h-10 block">
                      <span className="absolute inset-0 rounded-full border-2 border-[var(--blue)]" />
                      <span className="absolute inset-2 rounded-full border border-[var(--blue)]/70" />
                      <span className="absolute left-1/2 top-0 bottom-0 w-px bg-[#0091DA]/70 -translate-x-1/2" />
                      <span className="absolute top-1/2 left-0 right-0 h-px bg-[#0091DA]/70 -translate-y-1/2" />
                    </span>
                  ),
                },
                {
                  title: "Data-Backed Decisions",
                  body: "Every strategy is grounded in fresh insight, evidence, and measurable outcomes. No guesswork.",
                  icon: (
                    <span className="relative w-10 h-10 block">
                      <span className="absolute bottom-0 left-1 w-2 h-4 bg-[#0091DA]" />
                      <span className="absolute bottom-0 left-4 w-2 h-7 bg-[#0091DA]/80" />
                      <span className="absolute bottom-0 left-7 w-2 h-10 bg-[#0091DA]/60" />
                    </span>
                  ),
                },
                {
                  title: "Ethical & Discreet",
                  body: "Every member of our team upholds the highest ethical standards. All client information is handled with absolute discretion.",
                  icon: (
                    <span
                      className="w-10 h-10 bg-[#0091DA] block"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 90% 30%, 90% 75%, 50% 100%, 10% 75%, 10% 30%)",
                      }}
                    />
                  ),
                },
              ].map((col) => (
                <div key={col.title} className="reveal">
                  <div className="w-10 h-[2px] bg-[#0091DA] mb-4" />
                  {col.icon}
                  <h3 className="font-heading text-[22px] text-[var(--navy)] mt-5">
                    {col.title}
                  </h3>
                  <p className="font-body text-[15px] text-[var(--text-muted)] leading-[1.7] mt-3">
                    {col.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: LEAD CONSULTANT */}
        <section
          ref={leadRef}
          className="bg-white py-20 px-4 md:px-6"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-12 items-start">
            {/* Left */}
            <div className="reveal">
              <div className="w-[280px] h-[320px] border-2 border-[var(--blue)] bg-[var(--navy)]/5 flex items-center justify-center">
                <p className="font-body text-[13px] text-[var(--text-muted)]">
                  Dr. Albert Simiyu
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-5">
              <p className="reveal font-body text-[12px] text-[#0091DA] uppercase">
                Meet Our Lead Consultant
              </p>
              <h2 className="reveal font-heading text-[36px] text-[var(--navy)]">
                Dr. Albert Simiyu
              </h2>
              <p className="reveal font-body text-[15px] text-[var(--text-muted)]">
                Ph.D. in Entrepreneurship &amp; Small Business Management
              </p>
              <div className="reveal h-[3px] w-10 bg-[#0091DA]" />
              <p className="reveal font-body text-[16px] text-[var(--text-muted)] leading-[1.8]">
                Dr. Albert Simiyu brings unmatched expertise and hands-on
                experience in guiding both NGOs and SMEs through strategic
                transformation and financial growth. As an ICPAK-certified
                professional, he leads every engagement with a commitment to
                practical, results-driven solutions tailored to your
                organization's unique needs.
              </p>
              <div className="reveal flex flex-wrap gap-3 pt-2">
                {["Ph.D. Entrepreneurship", "ICPAK Certified"].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center px-4 py-1 rounded-full border border-[var(--navy)] font-body text-[13px] text-[var(--navy)]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CTA */}
        <section
          ref={ctaRef}
          className="bg-[var(--navy)] py-20 px-4 md:px-6 text-white"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="reveal font-heading text-[40px] text-white">
              Ready to work with us?
            </h2>
            <p className="reveal font-body text-[17px] text-white/70">
              Let's build your organization's roadmap together.
            </p>
            <div className="reveal flex justify-center">
              <Button href="/contact" variant="primary" className="h-12 px-7">
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

