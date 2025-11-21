import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  GraduationCap,
  Layers3,
  LineChart,
  LineChart as LineChartIcon,
  Shield,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import { ApproachShowcase } from "@/components/ApproachShowcase";

const services = [
  {
    title: "Capacity Building for NGOs",
    description:
      "Board and staff development in governance, strategic planning, and monitoring & evaluation so missions stay sharp.",
    focus: "Training & Governance",
    icon: GraduationCap,
  },
  {
    title: "Strategic Advisory & Turnaround",
    description:
      "Hands-on advisory for new ventures, organizational redesign, and recovery roadmaps that protect resources.",
    focus: "Strategy & Transformation",
    icon: LineChart,
  },
  {
    title: "Accounting & Financial Management",
    description:
      "Bookkeeping, donor compliance, internal controls, and reporting that build lasting stakeholder trust.",
    focus: "Finance & Stewardship",
    icon: ShieldCheck,
  },
];

const approach = [
  {
    title: "Diagnose realities",
    detail: "Immersive discovery and financial clarity dashboards surface the constraints that matter most.",
    image: "/collaboration.jpg",
  },
  {
    title: "Co-create solutions",
    detail: "We design practical playbooks, operating rhythms, and learning journeys alongside your teams.",
    image: "/strategy.jpg",
  },
  {
    title: "Embed capability",
    detail: "Coaching, training, and systems implementation ensure change lives on after the engagement.",
    image: "/workspace.jpg",
  },
];

type PromiseItem = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

const promise: PromiseItem[] = [
  {
    title: "Expert-led & practice-based",
    detail: "Engage Dr. Albert Simiyu and senior specialists with decades of NGO & SME turnaround experience.",
    icon: BadgeCheck,
  },
  {
    title: "Trusted financial stewardship",
    detail: "ICPAK-certified professionals engineer transparent, compliant, and stress-tested controls.",
    icon: Shield,
  },
  {
    title: "Holistic integrated support",
    detail: "Governance, accounting, tax, and M&E live under one roof for every stage of the mission.",
    icon: Layers3,
  },
  {
    title: "Impact-focused, growth-driven",
    detail: "Every roadmap is built around measurable outcomes, efficiency, and sustainable scale.",
    icon: Target,
  },
];

const testimonials = [
  {
    quote:
      "TurnItAround rolled up their sleeves beside our finance office—we saw measurable efficiency and profitability gains within months.",
    author: "Daniel",
    role: "Chief Finance Officer",
  },
  {
    quote:
      "Their structured advisory experience rivals top firms, yet we still get boutique attention and rapid responses.",
    author: "CPA Gerald Githuku",
    role: "Partner, Tax Advisory",
  },
];

const valueBlock = {
  heading: "The Value of",
  title: "TBS in your company",
  body:
    "We help NGOs, SMEs, and mission-driven teams unlock their full potential through practical training, results-based systems, and financial clarity—so they can lead with purpose, manage with excellence, and scale with confidence.",
};

export default function Home() {
  return (
    <div className="bg-white text-black">
      <header className="pb-16 pt-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm uppercase tracking-wide text-slate-600 md:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="TBS Limited logo"
              width={72}
              height={32}
              priority
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="hidden gap-6 md:flex">
            <a className="hover:text-amber-600" href="#services">
              Services
            </a>
            <a className="hover:text-amber-600" href="#approach">
              Approach
            </a>
            <a className="hover:text-amber-600" href="#promise">
              Promise
            </a>
            <a className="hover:text-amber-600" href="#contact">
              Contact
            </a>
          </div>
          <a
            href="mailto:hello@turnitaroundbusiness.com"
            className="border border-slate-300 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700 transition hover:border-[#1f3347] hover:text-[#1f3347]"
          >
            Talk to us
          </a>
        </div>

        <section className="relative isolate mt-8 flex min-h-[80vh] w-full items-center justify-center overflow-hidden rounded-none">
          <video
            src="/videos/home.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="relative z-10 max-w-4xl px-6 text-center text-white sm:px-10">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Empowering organizations to lead, grow, and thrive
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.45em] text-white/80">Have a vision to grow?</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
              Join the changemakers
              <br />
              building impactful businesses
              <br />
              and organizations.
            </h1>
            <p className="mt-6 text-lg text-white/85">Empowering Organizations to Lead, Grow, and Thrive</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#services"
                className="inline-flex items-center bg-[#1f3347] px-10 py-3 text-base font-semibold text-white transition hover:bg-[#27435f]"
              >
                Learn More
              </a>
              <a
                href="#services"
                className="inline-flex items-center border border-slate-300 px-10 py-3 text-base font-semibold text-slate-900 transition hover:border-[#1f3347] hover:text-[#1f3347]"
              >
                View Services
              </a>
            </div>
          </div>
        </section>

      </header>

      <main className="space-y-24 bg-white pb-24 pt-0">
        <section className="-mt-10 px-0 lg:-mt-16">
          <div className="bg-white py-20 text-black">
            <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:px-12">
              <div className="relative flex-1 overflow-hidden rounded-[32px] border border-slate-200 shadow-lg min-h-[520px]">
                <Image
                  src="/values.png"
                  alt="Teams collaborating"
                  fill
                  sizes="(min-width: 1024px) 580px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-6 px-6 py-10 text-black lg:px-12">
                <p className="text-3xl font-semibold uppercase tracking-[0.6em] text-black">
                  {valueBlock.heading}
                </p>
                <h2 className="text-[3.75rem] font-semibold leading-tight">{valueBlock.title}:</h2>
                <p className="text-xl italic text-slate-700">{valueBlock.body}</p>
                <div className="flex gap-4 text-sm uppercase tracking-[0.3em] text-slate-600">
                  {[Shield, LineChartIcon, UsersRound].map((Icon, idx) => (
                    <div key={`value-icon-${idx}`} className="rounded-full border border-slate-300 p-3">
                      <Icon className="h-6 w-6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="px-0">
          <div className="bg-white py-20 text-black">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#1f3347]">Carefully designed</p>
              <h2 className="text-4xl font-semibold md:text-5xl text-black">Our Services</h2>
              <p className="max-w-3xl text-base text-slate-600">
                We layer strategic insight, operational rigor, and financial stewardship so you can scale with confidence.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                <a
                  key={service.title}
                  href="#contact"
                    className="group flex h-full flex-col items-center gap-4 rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#1f3347] hover:shadow-lg"
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                      <Icon className="h-9 w-9 text-[#1f3347]" strokeWidth={1.5} />
                  </div>
                    <div className="text-2xl font-semibold text-[#1f3347]">{String(index + 1).padStart(2, "0")}</div>
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{service.focus}</div>
                    <h3 className="text-2xl font-semibold text-black">{service.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1f3347]">
                    Learn more
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
                );
              })}
            </div>
          </div>
        </section>

        <ApproachShowcase steps={approach} />

        <section id="promise" className="bg-white px-0 py-20 text-black">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#1f3347]">Our promise</p>
              <h2 className="mt-3 text-[3rem] font-semibold text-black md:text-[3.5rem]">
                What it is like to work with TurnItAround.
              </h2>
            </div>
            <p className="text-lg italic text-slate-600 md:max-w-xl">
              We bring expert-led training, holistic support, and measurable impact—so your team can lead with purpose
              and manage with excellence.
            </p>
          </div>
          <div className="mt-12 px-6 lg:px-12">
            <div className="mx-auto flex max-w-7xl gap-6">
              {promise.map((item, idx) => {
                const Icon = item.icon;
                return (
                <article
                  key={`${item.title}-${idx}`}
                  className="flex-1 border border-slate-200 bg-white p-8 text-left text-black shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-[#1f3347]" strokeWidth={1.5} />
                    <h3 className="text-2xl font-semibold text-black">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-base text-slate-600">{item.detail}</p>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 lg:px-12">
          <p className="text-lg uppercase tracking-[0.4em] text-[#1f3347]">Why leaders choose us</p>
          <ul className="mt-6 space-y-6 text-lg text-slate-800">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-3 w-3 rounded-full bg-[#1f3347]" />
              Advisory rigor comparable to global audit firms, delivered with boutique care.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-3 w-3 rounded-full bg-[#1f3347]" />
              End-to-end support across auditing, tax, outsourced accounting, and leadership enablement.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-3 w-3 rounded-full bg-[#1f3347]" />
              Toolkits, templates, and training pathways you can reuse long after the engagement.
            </li>
          </ul>
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Need rapid response?</p>
            <p className="mt-3 text-3xl font-semibold text-black">+254 751 216 699</p>
            <p className="text-slate-400">or</p>
            <p className="text-xl font-semibold text-black">+254 789 217 201</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 lg:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#1f3347]">Client voices</p>
          <h2 className="mt-4 text-3xl font-semibold text-black">Partners who stay for the journey.</h2>
          <div className="mt-10 overflow-hidden">
            <div className="flex gap-6 animate-[promiseMarquee_18s_linear_infinite] min-w-max">
              {testimonials.concat(testimonials).map((testimonial, index) => (
                <figure
                  key={`${testimonial.author}-${index}`}
                  className="w-[520px] rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
                >
                  <p className="text-lg leading-relaxed text-slate-700">
                    <span className="text-3xl text-[#1f3347]">&ldquo;</span>
                    {testimonial.quote}
                    <span className="text-3xl text-[#1f3347]">&rdquo;</span>
                  </p>
                  <figcaption className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-500">
                    {testimonial.author} · {testimonial.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-[#1f3347]">Let&apos;s work together</p>
            <h2 className="mt-4 text-3xl font-semibold text-black md:text-4xl">Have a vision to grow? Join the changemakers.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
              Share your brief and we will respond within two business days with a tailored scope, proposed facilitation team, and a roadmap to unlock capacity.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:hello@turnitaroundbusiness.com"
                className="bg-[#1f3347] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#27435f]"
              >
                hello@turnitaroundbusiness.com
              </a>
              <a
                href="tel:+254751216699"
                className="border border-slate-300 px-8 py-3 text-base font-semibold text-black transition hover:border-[#1f3347] hover:text-[#1f3347]"
              >
                +254 751 216 699
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Turn it Around Business. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.turnitaroundbusiness.com/" className="hover:text-[#1f3347]">
              Website
            </a>
            <a href="https://www.linkedin.com" className="hover:text-[#1f3347]">
              LinkedIn
            </a>
            <a href="https://gmkaccountants.com/" className="hover:text-[#1f3347]">
              Inspiration
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
