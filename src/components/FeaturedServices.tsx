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
  ChevronLeft,
  ChevronRight,
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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

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

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentCardIndex < services.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    }
    if (isRightSwipe && currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentCardIndex < services.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  return (
    <section ref={sectionRef} className="bg-[#f8f9fa] px-0 py-12 md:py-16">
      <div className="mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
        <div className="text-center mb-8 md:mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2c3e50]">Featured Services</h2>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 sm:grid-cols-3 lg:grid-cols-3">
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
                  {service.title}
                </h4>
                {description && (
                  <p className="text-xs lg:text-sm leading-relaxed text-[#4b5563] max-w-[220px]">
                    {description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Swipeable Card Deck */}
        <div className="md:hidden relative">
          <div
            ref={cardContainerRef}
            className="relative h-[400px] w-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {services.map((service, index) => {
              const Icon = iconMap[service.iconName];
              const description = descriptions[service.title];
              const isCurrent = currentCardIndex === index;
              const offset = index - currentCardIndex;
              
              // Calculate card position and scale
              const scale = isCurrent ? 1 : 0.9;
              const opacity = Math.abs(offset) > 1 ? 0 : isCurrent ? 1 : 0.5;
              const translateX = offset * 20;
              const zIndex = services.length - Math.abs(offset);

              return (
                <div
                  key={service.title}
                  className="absolute inset-0 transition-all duration-300 ease-out"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: isCurrent ? 'auto' : 'none',
                  }}
                >
                  <div className="h-full w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f39c12]/90 text-white">
                      <Icon
                        className="h-8 w-8"
                        strokeWidth={1.5}
                        color="#ffffff"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-[#2c3e50]">
                      {service.title}
                    </h4>
                    {description && (
                      <p className="text-sm leading-relaxed text-[#4b5563] px-2">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={goToPrevious}
              disabled={currentCardIndex === 0}
              className={`p-2 rounded-full transition ${
                currentCardIndex === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#f39c12] text-white hover:bg-[#e67e22]"
              }`}
              aria-label="Previous card"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCardIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentCardIndex
                      ? "w-8 bg-[#f39c12]"
                      : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              disabled={currentCardIndex === services.length - 1}
              className={`p-2 rounded-full transition ${
                currentCardIndex === services.length - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#f39c12] text-white hover:bg-[#e67e22]"
              }`}
              aria-label="Next card"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Swipe left or right to explore
          </p>
        </div>
      </div>
    </section>
  );
}

