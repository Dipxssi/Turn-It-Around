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
    <div className="mt-6 md:mt-12 relative w-full overflow-hidden bg-[#2c3e50] min-h-[300px] sm:min-h-[350px] md:min-h-[420px]">
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
      <div className="relative z-10 mx-auto flex w-[90%] max-w-[1800px] min-h-[300px] sm:min-h-[350px] md:min-h-[420px] items-center justify-center text-white px-4 py-8 md:py-12 lg:py-14 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-3 md:space-y-4 lg:space-y-5">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] md:tracking-[0.35em] text-white/85 lg:text-base">our approach</p>
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 leading-6 md:leading-7 lg:leading-8 xl:text-[1.9rem] xl:leading-9 px-2">
            At Turnitaround Business Solution, we believe in building enduring capacity. We go beyond conventional consulting, offering tailored strategies and hands-on support that resonate with your organization's unique needs. Our approach is rooted in practical experience and deep strategic insight, ensuring sustainable growth and tangible results.
          </p>
          <div className="mt-4 md:mt-6 lg:mt-7">
            <a
              href="#contact"
              className="inline-flex items-center rounded-none bg-[#f39c12] px-8 py-2.5 md:px-10 md:py-3 lg:px-12 lg:py-3.5 text-sm md:text-base font-semibold text-white transition hover:bg-[#e67e22] shadow-lg shadow-black/25"
            >
              Contact Us Today!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

