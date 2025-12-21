"use client";

import {
  Building2,
  ChartLine,
  ClipboardList,
  FileText,
  GraduationCap,
  Layers3,
  ShieldCheck,
  Target,
  Wallet,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

const hero = {
  title: "Solutions Designed to Turn Around Your Organization From the Inside Out",
  subtitle:
    "Practical, end-to-end support that helps NGOs, SMEs, and mission-driven teams build the systems, skills, and financial clarity to scale with confidence.",
};

type ServiceGroup = {
  title: string;
  description: string;
  items: { title: string; detail: string; icon: React.ElementType }[];
};

const groups: ServiceGroup[] = [
  {
    title: "Capacity Building for NGOs",
    description:
      "Strengthen governance, leadership, and delivery so your mission can move faster and farther.",
    items: [
      {
        title: "Governance Training & Board Development",
        detail: "Equip boards with clarity, structure, and accountability to enhance effectiveness.",
        icon: GraduationCap,
      },
      {
        title: "Strategic Planning Workshops",
        detail: "Facilitate long-term planning that aligns resources with mission priorities.",
        icon: Target,
      },
      {
        title: "Monitoring & Evaluation Strengthening",
        detail: "Build frameworks, tools, and systems to measure and communicate impact.",
        icon: ClipboardList,
      },
      {
        title: "Staff Capacity Development",
        detail: "Training on financial literacy, program management, leadership, and systems.",
        icon: Layers3,
      },
    ],
  },
  {
    title: "Strategic Advisory & Turnaround Solutions",
    description: "Unblock growth, redesign operations, and build resilient organizations.",
    items: [
      {
        title: "Organizational Development",
        detail: "Assess and redesign internal systems to improve efficiency and mission alignment.",
        icon: Building2,
      },
      {
        title: "Turnaround & Change Management",
        detail: "Support for organizations facing stagnation, financial uncertainty, or inefficiency.",
        icon: ChartLine,
      },
      {
        title: "New Business Creation & Social Enterprise Development",
        detail: "Help NGOs build income-generating units and sustainability models.",
        icon: FileText,
      },
      {
        title: "Program Reviews & Optimization",
        detail: "Evaluate performance and design improvements to enhance impact.",
        icon: Target,
      },
    ],
  },
  {
    title: "Accounting & Financial Management",
    description: "Trusted financial stewardship that keeps you compliant, transparent, and agile.",
    items: [
      {
        title: "Outsourced Accounting Services",
        detail: "Bookkeeping, financial statements, compliance support, and month-end reports.",
        icon: Wallet,
      },
      {
        title: "Internal Controls & Risk Management",
        detail: "Set up systems that protect resources and ensure accountability.",
        icon: ShieldCheck,
      },
      {
        title: "Donor Reporting & Grant Management",
        detail: "Prepare donor-compliant reports, track budgets, and support audits.",
        icon: FileText,
      },
      {
        title: "Virtual CFO Services & Financial Systems Setup",
        detail: "Strategic financial leadership plus budgeting, reporting, and accounting structures.",
        icon: ChartLine,
      },
    ],
  },
];

export default function ServicesPage() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute("data-card-id");
            if (cardId) {
              setVisibleCards((prev) => new Set([...prev, cardId]));
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const setCardRef = (id: string, element: HTMLDivElement | null) => {
    if (element) {
      cardRefs.current.set(id, element);
    } else {
      cardRefs.current.delete(id);
    }
  };

  return (
    <div id="top" className="bg-white text-[#2c3e50]">
      <Navbar />
      <section className="relative overflow-hidden bg-[#0f1c2e] px-0 py-12 md:py-16 lg:py-20 text-white min-h-[30vh] md:min-h-[40vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/services.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c2e]/85 via-[#0f1c2e]/80 to-[#0f1c2e]/70" />
        <div className="relative mx-auto flex w-[90%] max-w-[1800px] items-center justify-center px-4 lg:px-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem] font-bold leading-tight text-center lg:leading-[1.1]">
            What We Do Best
          </h1>
        </div>
      </section>

      <section className="px-0 py-12 md:py-16 text-[#1f2937]">
        <div className="mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
          <p className="text-base md:text-xl lg:text-2xl text-[#333333] leading-[1.6] md:leading-[1.7] text-left">
            <span className="font-bold">Turnitaround Business Solutions (TBS)</span> delivers <span className="font-semibold">solutions designed to turn around your organization from the inside out</span>. We provide practical, end-to-end support that helps NGOs, SMEs, and mission-driven teams build the systems, skills, and <span className="font-semibold">financial clarity to scale with confidence</span>.
          </p>
        </div>
      </section>

      <section className="px-0 py-6 md:py-8 text-[#1f2937]">
        <div className="mx-auto flex w-[90%] max-w-[1800px] items-center justify-center rounded-lg md:rounded-xl bg-[#f6f7fb] px-3 py-2.5 md:px-4 md:py-3 text-center text-xs md:text-sm lg:text-base font-medium text-[#2c3e50] lg:px-12">
          <span className="hidden sm:inline">Trusted by NGOs, SMEs, Foundations, Social Enterprises & Development Partners Across the Region.</span>
          <span className="sm:hidden">Trusted by NGOs, SMEs & Development Partners</span>
        </div>
      </section>

      <section className="px-0 py-12 md:py-16">
        <div className="mx-auto flex w-[90%] max-w-[1800px] flex-col gap-8 md:gap-12 lg:gap-14 px-4 lg:px-12">
          {groups.map((group, groupIdx) => {
            const groupId = `group-${groupIdx}`;
            const isGroupVisible = visibleCards.has(groupId);
            return (
            <div key={group.title} className="space-y-6">
              <div
                ref={(el) => setCardRef(groupId, el)}
                data-card-id={groupId}
                className={`space-y-2 transition-all duration-700 ${
                  isGroupVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <p className="text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#f39c12]/90">0{groupIdx + 1}</p>
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1f2937]">{group.title}</h2>
                <p className="text-sm md:text-base lg:text-lg text-[#4b5563]">{group.description}</p>
              </div>

              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                {group.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const cardId = `${groupIdx}-${itemIdx}`;
                  const isVisible = visibleCards.has(cardId);
                  return (
                    <div
                      key={item.title}
                      ref={(el) => setCardRef(cardId, el)}
                      data-card-id={cardId}
                      className={`h-full rounded-xl md:rounded-2xl bg-white p-4 md:p-6 shadow-[0_10px_28px_-12px_rgba(17,24,39,0.18)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(17,24,39,0.24)] ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${itemIdx * 100}ms` : "0ms",
                      }}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#fff4e3] text-[#f39c12]">
                          <Icon className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <div className="space-y-1.5 md:space-y-2 min-w-0">
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-[#1f2937]">{item.title}</h3>
                          <p className="text-sm md:text-base text-[#4b5563] leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-0 py-12 md:py-16">
        <div className="mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
          <div
            className="relative mx-auto overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 px-4 py-8 md:px-6 md:py-12 lg:py-14 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] lg:px-12"
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
        </div>
      </section>

      <Footer />
    </div>
  );
}

