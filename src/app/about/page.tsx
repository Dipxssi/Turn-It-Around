"use client";

import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Target, Eye, Globe, BarChart3, Shield, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AboutUs() {
  const missionRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);
  const approachRefs = useRef<(HTMLDivElement | null)[]>([]);
  const whoWeAreTextRef = useRef<HTMLDivElement | null>(null);

  const [missionVisible, setMissionVisible] = useState(false);
  const [visionVisible, setVisionVisible] = useState(false);
  const [missionBounce, setMissionBounce] = useState(false);
  const [visionBounce, setVisionBounce] = useState(false);
  const [approachVisible, setApproachVisible] = useState<boolean[]>([]);
  const [whoWeAreTextVisible, setWhoWeAreTextVisible] = useState(false);

  const approachSections = [
    {
      icon: Globe,
      title: "Global Standards, Local Execution",
      content: "Our methods are guided by global best practices, but our strength lies in our ability to localize these standards and customize them to your context.",
      bullets: [
        "Business process improvement",
        "Financial advisory",
        "Operations restructuring",
        "Strategic growth planning"
      ]
    },
    {
      icon: BarChart3,
      title: "Data-Backed Decision Making",
      content: "We approach every engagement with fresh insight and data-backed decision-making to craft strategies that deliver real transformation.",
      bullets: [
        "Comprehensive analysis",
        "Evidence-based solutions",
        "Measurable outcomes",
        "Continuous optimization"
      ]
    },
    {
      icon: Shield,
      title: "Trust & Confidentiality",
      content: "We value trust, confidentiality, and agility. Every member of our team upholds the highest ethical standards.",
      bullets: [
        "Absolute discretion",
        "Ethical standards",
        "Excellence-driven culture",
        "Accountability & results"
      ]
    },
    {
      icon: TrendingUp,
      title: "Growth with Intentional Strategy",
      content: "In today's competitive market, growth isn't accidental—it's intentional. It's powered by clear strategies, actionable insights, and the right support.",
      bullets: [
        "Targeted interventions",
        "Continuous optimization",
        "Strategic partnership",
        "Sustainable scaling"
      ]
    }
  ];

  useEffect(() => {
    setApproachVisible(new Array(approachSections.length).fill(false));
  }, [approachSections.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === missionRef.current && entry.isIntersecting) {
            setMissionVisible(true);
          }
          if (entry.target === visionRef.current && entry.isIntersecting) {
            setVisionVisible(true);
          }
          if (entry.target === whoWeAreTextRef.current && entry.isIntersecting) {
            setWhoWeAreTextVisible(true);
          }
          const idx = approachRefs.current.findIndex((node) => node === entry.target);
          if (idx !== -1 && entry.isIntersecting) {
            setApproachVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (visionRef.current) observer.observe(visionRef.current);
    if (whoWeAreTextRef.current) observer.observe(whoWeAreTextRef.current);
    approachRefs.current.forEach((node) => node && observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const handleMissionClick = () => {
    setMissionBounce(true);
    setTimeout(() => setMissionBounce(false), 500);
  };

  const handleVisionClick = () => {
    setVisionBounce(true);
    setTimeout(() => setVisionBounce(false), 500);
  };

  return (
    <div id="top" className="bg-white text-[#2c3e50]">
      <Navbar />

      <main className="bg-white pb-12 md:pb-24 pt-8 md:pt-16">
        {/* Who We Are Section */}
        <section className="relative px-0 py-12 md:py-16 lg:py-20 overflow-hidden flex items-center justify-center min-h-[40vh] md:min-h-[50vh]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/about.png')" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 mx-auto w-[90%] max-w-[1800px] px-4 text-center lg:px-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-100 drop-shadow-sm">
              <span className="text-gray-100">Who</span>{" "}
              <span className="text-amber-600">We</span>{" "}
              <span className="text-gray-100">Are</span>
            </h1>
          </div>
        </section>
        
        {/* Who We Are Text */}
        <section className="relative px-0 py-12 md:py-16 overflow-hidden bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f6] to-[#e9ecef]">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-[#f39c12]/10 rounded-full blur-3xl transition-all duration-1000 ${
              whoWeAreTextVisible ? "scale-100 opacity-30" : "scale-50 opacity-0"
            }`}></div>
            <div className={`absolute bottom-0 left-0 w-96 h-96 bg-[#2c3e50]/5 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
              whoWeAreTextVisible ? "scale-100 opacity-30" : "scale-50 opacity-0"
            }`}></div>
          </div>
          
          <div ref={whoWeAreTextRef} className="relative mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
            <div className={`relative bg-white/80 backdrop-blur-sm rounded-2xl border-l-4 border-[#f39c12] shadow-lg p-8 md:p-12 lg:p-16 transition-all duration-700 hover:shadow-xl hover:scale-[1.01] ${
              whoWeAreTextVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}>
              {/* Icon and decorative line */}
              <div className="flex items-start gap-6 mb-6">
                <div className={`flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#f39c12]/15 border-2 border-[#f39c12]/30 transition-all duration-700 delay-200 hover:scale-110 hover:bg-[#f39c12]/25 hover:border-[#f39c12]/50 ${
                  whoWeAreTextVisible 
                    ? "opacity-100 scale-100 rotate-0" 
                    : "opacity-0 scale-50 -rotate-12"
                }`}>
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-[#f39c12] transition-transform duration-300 hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1 pt-2">
                  <div className={`h-1 bg-gradient-to-r from-[#f39c12] to-[#f39c12]/50 rounded-full mb-4 transition-all duration-700 delay-300 ${
                    whoWeAreTextVisible 
                      ? "w-20 opacity-100" 
                      : "w-0 opacity-0"
                  }`}></div>
                </div>
              </div>
              
              <p className={`text-base md:text-xl lg:text-2xl text-[#2c3e50] leading-[1.6] md:leading-[1.7] text-left transition-all duration-700 delay-400 ${
                whoWeAreTextVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}>
                Turnitaround Business Solutions (TBS) is a strategic advisory and capacity-building firm dedicated to strengthening NGOs, social enterprises, SMEs, and mission-driven businesses through robust systems, sustainable operational structures, and transparent financial frameworks.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative px-0 py-12 md:py-16 overflow-hidden bg-[#f8f9fa]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(243,156,18,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(44,62,80,0.08),transparent_45%)]" />
          <div className="relative mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
            <div className="text-center mb-6 md:mb-10">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.35em] text-[#f39c12]">What Drives Us</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2c3e50] mt-1 md:mt-2">Mission & Vision</h2>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-4 md:gap-6 lg:gap-8 md:grid-cols-2">
            <div
              ref={missionRef}
              onClick={handleMissionClick}
              className={`group cursor-pointer h-full flex flex-col gap-4 md:gap-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white to-gray-100 p-[1px] transition-all duration-300 ${
                missionVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-[50px]"
              } ${missionBounce ? "animate-bounce-tap" : ""}`}
            >
              <div className="h-full flex flex-col rounded-2xl md:rounded-3xl bg-white/95 px-4 py-6 md:px-8 md:py-10 shadow-[0_25px_60px_rgba(17,24,39,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#f39c12]/20 text-[#f39c12] border border-gray-200">
                    <Target className="h-5 w-5 md:h-7 md:w-7" />
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2c3e50]">Our Mission</h2>
                </div>
                <p
                  className="text-base md:text-lg leading-6 md:leading-7 text-gray-700 tracking-wide opacity-0"
                  style={{ animation: missionVisible ? "fadeInUp 0.8s ease-out 0.2s forwards" : undefined }}
                >
                  Empowering vision. Strengthening systems. Sustaining success.
                </p>
              </div>
            </div>

            <div
              ref={visionRef}
              onClick={handleVisionClick}
              className={`group cursor-pointer h-full flex flex-col gap-4 md:gap-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white to-gray-100 p-[1px] transition-all duration-300 ${
                visionVisible ? "animate-slide-in-right" : "opacity-0 translate-x-[50px]"
              } ${visionBounce ? "animate-bounce-tap" : ""}`}
            >
              <div className="h-full flex flex-col rounded-2xl md:rounded-3xl bg-white/95 px-4 py-6 md:px-8 md:py-10 shadow-[0_25px_60px_rgba(17,24,39,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#2c3e50]/15 text-[#2c3e50] border border-gray-200">
                    <Eye className="h-5 w-5 md:h-7 md:w-7" />
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2c3e50]">Our Vision</h2>
                </div>
                <p
                  className="text-base md:text-lg leading-6 md:leading-7 text-gray-700 tracking-wide opacity-0"
                  style={{ animation: visionVisible ? "fadeInUp 0.8s ease-out 0.3s forwards" : undefined }}
                >
                  To be the trusted partner that enables organizations to achieve sustainable growth, measurable impact, and lasting resilience.
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="relative px-0 py-12 md:py-16 overflow-hidden min-h-[50vh] md:min-h-[60vh]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/approach.png')" }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative z-10 mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12 py-12 md:py-16 lg:py-20">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">Our Approach</h2>
              <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-2">
                At TurnItAround Business Solutions, our approach is rooted in a deep understanding of how businesses evolve, adapt, and thrive in a fast-changing environment. We don't believe in one-size-fits-all solutions—instead, we immerse ourselves in your operations, challenges, and goals to craft strategies that deliver real transformation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10 max-w-[1400px] mx-auto">
              {approachSections.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      approachRefs.current[idx] = el;
                    }}
                    className={`opacity-0 will-change-transform bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-xl ${
                      approachVisible[idx]
                        ? idx % 2 === 0
                          ? "animate-slide-in-left"
                          : "animate-slide-in-right"
                        : idx % 2 === 0
                        ? "-translate-x-[30px]"
                        : "translate-x-[30px]"
                    }`}
                    style={{ animationDelay: approachVisible[idx] ? `${idx * 0.15}s` : undefined }}
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#f39c12]/15 text-[#f39c12]">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#2c3e50]">{section.title}</h3>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-3 md:mb-4">
                      {section.content}
                    </p>
                    <ul className="space-y-1.5 md:space-y-2">
                      {section.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start gap-2 text-gray-700">
                          <span className="text-[#f39c12] mt-0.5 md:mt-1">•</span>
                          <span className="text-sm md:text-base leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-0 py-12 md:py-16">
          <div
            className="relative mx-auto w-[90%] max-w-[1800px] overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 px-4 py-8 md:px-6 md:py-12 lg:py-14 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] lg:px-12"
          >
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-white mb-3 md:mb-4">
                Professional Turnaround Services for Business Growth
              </h2>
              <p className="mt-3 md:mt-4 text-sm md:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
                Turnitaround offers structured, data-driven business solutions, enabling companies to overcome operational challenges, enhance performance, and achieve sustainable, long-term growth.
              </p>
            </div>
            <div className="text-center mt-6 md:mt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-medium text-white transition hover:bg-amber-600 shadow-md"
              >
                Contact Us Today <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

