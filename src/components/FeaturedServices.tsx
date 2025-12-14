"use client";

import { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  Building2,
  Calculator,
  ChartLine,
  FileText,
  GraduationCap,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FeaturedService = {
  title: string;
  iconName: string;
};

type Props = {
  services: FeaturedService[];
};

const descriptions: Record<string, string> = {
  "Governance Training": "Workshops for boards and executives to strengthen oversight.",
  "Strategic Planning": "Clear roadmaps and metrics to guide your next phase of growth.",
  "Organizational Development": "Optimize structures, roles, and culture to scale effectively.",
  "Financial Audits Support": "Prepare, coordinate, and respond confidently to audits.",
  "Outsourced Accounting": "Day-to-day accounting handled with rigor and transparency.",
  "Virtual CFO & Financial Leadership": "Executive-level financial guidance without the overhead.",
  "Grant & Donor Reporting": "Compliant, timely reporting that keeps funders confident.",
  "M&E System Strengthening": "Build reliable monitoring systems for measurable impact.",
  "Program Reviews & Turnaround": "Rapid assessments and recovery plans for key programs.",
};

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  ChartLine,
  Building2,
  FileText,
  Calculator,
  Wallet,
  BookOpen,
  TrendingUp,
  Target,
};

export function FeaturedServices({ services }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
            setActiveIndex(0);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 2600); // slightly slower rotation

    return () => clearInterval(interval);
  }, [isVisible, services.length]);

  return (
    <section ref={sectionRef} className="bg-[#f8f9fa] px-0 py-12 md:py-16">
      <div className="mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
        <div className="text-center mb-8 md:mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2c3e50]">Featured Services</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 sm:grid-cols-3 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName];
            const isActive = activeIndex === index && isVisible;
            const description = descriptions[service.title];
            return (
              <div
                key={service.title}
                className={`group flex h-full flex-col items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl bg-white p-3 md:p-4 lg:p-6 text-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-500 ${
                  isActive
                    ? "bg-[#fff8f0] shadow-[0_10px_24px_rgba(243,156,18,0.18)] scale-[1.02]"
                    : "hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 md:h-12 md:w-14 lg:w-14 items-center justify-center rounded-full transition-all duration-500 ${
                    isActive
                      ? "bg-[#f39c12]/90 text-white"
                      : "bg-[#fff4e3] text-slate-600"
                  }`}
                >
                  <Icon
                    className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 transition-all duration-500"
                    strokeWidth={1.5}
                    color={isActive ? "#ffffff" : "#4b5563"}
                  />
                </div>
                <h4
                  className={`text-xs md:text-sm lg:text-base font-semibold transition-colors duration-500 text-center ${
                    isActive ? "text-[#d87a00]" : "text-[#2c3e50]"
                  }`}
                >
                  <span className="hidden sm:inline">{service.title}</span>
                  <span className="sm:hidden">{service.title.split(' ')[0]}</span>
                </h4>
                {description && (
                  <p className="hidden md:block text-xs lg:text-sm leading-relaxed text-[#4b5563] max-w-[220px]">
                    {description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

