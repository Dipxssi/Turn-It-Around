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

export function ApproachShowcase({ steps }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section id="approach" className="w-full bg-white py-20">
      <div className="relative flex w-full overflow-hidden bg-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.15)] min-h-[520px]">
        {steps.map((step, index) => (
          <Image
            key={step.title}
            src={step.image}
            alt={step.title}
            fill
            sizes="100vw"
            priority={index === 0}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-8 py-20 text-white lg:flex-row lg:items-end lg:gap-16">
          <div className="flex-1 space-y-3">
            <p className="text-lg uppercase tracking-[0.55em] text-white/85">Our Approach</p>
            <h2 className="text-[3rem] font-semibold leading-tight md:text-[3.75rem]">
              Turnaround playbooks that build enduring capacity.
            </h2>
            <p className="text-lg text-white/85">
              We adapt the methodical, insight-led rigor of firms like GMK Accountants to the realities of
              purpose-driven organizations. Expect clear diagnostics, co-created strategies, and embedded
              learning loops.
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-lg uppercase tracking-[0.55em] text-white/85">
              {String(activeIndex + 1).padStart(2, "0")} · Approach
            </p>
            <h3 className="text-[2.4rem] font-semibold">{steps[activeIndex].title}</h3>
            <p className="text-lg text-white/85">{steps[activeIndex].detail}</p>
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-10 rounded-full transition ${
                    activeIndex === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

