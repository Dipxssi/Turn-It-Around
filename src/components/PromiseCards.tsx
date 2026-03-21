"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

type PromiseItem = {
  title: string;
  detail: string;
  image: string;
};

type Props = {
  items: PromiseItem[];
};

const bulletsByTitle: Record<string, string[]> = {
  "Expert-Led & Practice-Based": [
    "Hands-on guidance from seasoned turnaround leaders",
    "Playbooks tailored to NGOs and SMEs",
    "Actionable, results-first coaching",
  ],
  "Trusted Financial Stewardship": [
    "Transparent, audit-ready financial systems",
    "Optimized for grants, donor funding, and revenue",
    "Built for sustainability and stakeholder trust",
  ],
  "Holistic & Integrated Support": [
    "Strategy, governance, finance, and M&E in one stack",
    "Localized best practices, global standards",
    "Change that endures after implementation",
  ],
  "Impact-Focused, Growth-Driven": [
    "Measurable outcomes with clear KPIs",
    "Efficiency and resilience to scale",
    "Built for lasting social and business impact",
  ],
};

export function PromiseCards({ items }: Props) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const cardElements = sectionRef.current?.querySelectorAll("[data-index]");
    cardElements?.forEach((card) => observer.observe(card));

    return () => {
      cardElements?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div ref={sectionRef} className="mt-6 md:mt-12">
      <div className="mx-auto w-[90%] max-w-[1800px] grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 px-4 md:grid-cols-2 lg:px-12">
        {items.map((item, idx) => {
          const isVisible = visibleCards.has(idx);
          const bullets = bulletsByTitle[item.title];
          const accentColors = ["#0091DA", "#0077B8", "#002A6E"];
          const accent = accentColors[idx % accentColors.length];
          return (
            <article
              key={`${item.title}-${idx}`}
              data-index={idx}
              className={`flex h-full flex-col overflow-hidden rounded-xl md:rounded-2xl bg-white text-left text-[#00338D] shadow-[0_10px_32px_rgba(17,24,39,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_38px_rgba(17,24,39,0.16)] opacity-0 translate-y-6 ${
                isVisible ? "opacity-100 translate-y-0" : ""
              }`}
              style={{
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              <div className="relative w-full h-40 md:h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/0"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-0 left-0 h-1.5 w-full"
                  style={{ background: accent }}
                  aria-hidden="true"
                />
              </div>
              <div className="p-6 md:p-8 lg:p-10 space-y-3 md:space-y-4">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#1A1A1A]">{item.title}</h3>
                {bullets ? (
                  <>
                    <p className="text-base text-[#757575]">
                      {item.detail.split(".")[0] || item.detail}
                    </p>
                    <ul className="space-y-2 text-sm text-[#757575]">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-[2px] text-[#0091DA]">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-base text-[#757575] leading-relaxed">{item.detail}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}


