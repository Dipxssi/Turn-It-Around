"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Step = {
  title: string;
  detail: string;
  image: string;
};

type Props = {
  steps: Step[];
};

export function PartnersShowcase({ steps }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="mt-12 relative w-full overflow-hidden bg-[#2c3e50] min-h-[420px]">
      {steps.map((step, index) => (
        <Image
          key={step.title}
          src={step.image}
          alt={step.title}
          fill
          sizes="100vw"
          priority={index === 0}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-out ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/30 backdrop-blur-[1px]" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl min-h-[420px] items-center justify-center text-white px-6 py-14 md:px-8 lg:px-12 md:py-18">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/85 md:text-base">our approach</p>
          <p className="text-xl text-white/90 leading-8 md:text-2xl lg:text-[1.9rem] lg:leading-9">
            At Turnitaround Business Solution, we believe in building enduring capacity. We go beyond conventional consulting, offering tailored strategies and hands-on support that resonate with your organization's unique needs. Our approach is rooted in practical experience and deep strategic insight, ensuring sustainable growth and tangible results.
          </p>
          <div className="mt-7">
            <a
              href="#contact"
              className="inline-flex items-center rounded-none bg-[#f39c12] px-12 py-3.5 text-base font-semibold text-white transition hover:bg-[#e67e22] shadow-lg shadow-black/25"
            >
              Contact Us Today!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

