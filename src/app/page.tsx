import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  Calculator,
  ChartLine,
  FileText,
  GraduationCap,
  Layers3,
  LineChart,
  LineChart as LineChartIcon,
  Quote,
  Shield,
  ShieldCheck,
  Target,
  TrendingUp,
  UsersRound,
  Wallet,
} from "lucide-react";
import { PartnersShowcase } from "@/components/PartnersShowcase";
import { FeaturedServices } from "@/components/FeaturedServices";
import { PromiseCards } from "@/components/PromiseCards";
import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";

const services = [
  {
    title: "Capacity Building for NGOs",
    description:
      "Equip your board and staff with the knowledge and skills in governance, strategic planning, and effective monitoring & evaluation to drive your mission forward with confidence.",
    focus: "Training & Governance",
    icon: GraduationCap,
  },
  {
    title: "Strategic Advisory & Turnaround",
    description:
      "Leverage our strategic insights for new business creation, organizational development, and effective turnaround strategies to optimize resources and achieve desired results.",
    focus: "Strategy & Transformation",
    icon: LineChart,
  },
  {
    title: "Accounting & Financial Management",
    description:
      "From comprehensive bookkeeping to robust internal controls and donor reporting, we provide expert financial services tailored to the unique demands of non-profits and growing businesses.",
    focus: "Finance & Stewardship",
    icon: ShieldCheck,
  },
];

const featuredServices = [
  { title: "Governance Training", iconName: "GraduationCap" },
  { title: "Strategic Planning", iconName: "ChartLine" },
  { title: "Organizational Development", iconName: "Building2" },
  { title: "Financial Audits Support", iconName: "FileText" },
  { title: "Outsourced Accounting", iconName: "Calculator" },
  { title: "Virtual CFO & Financial Leadership", iconName: "Wallet" },
  { title: "Grant & Donor Reporting", iconName: "BookOpen" },
  { title: "M&E System Strengthening", iconName: "TrendingUp" },
  { title: "Program Reviews & Turnaround", iconName: "Target" },
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
  image: string;
};

const promise: PromiseItem[] = [
  {
    title: "Expert-Led & Practice-Based",
    detail: "Leverage the unmatched expertise of our lead consultant, Dr. Albert Simiyu—a Ph.D. holder in Entrepreneurship and Small Business Management with hands-on experience in guiding both NGOs and SMEs through strategic transformation and financial growth.",
    image: "/promise1.png",
  },
  {
    title: "Trusted Financial Stewardship",
    detail: "Work with ICPAK-certified professionals who ensure your financial systems—whether for grants, donor funding, or business revenues—are transparent, compliant, and optimized for sustainability and stakeholder trust.",
    image: "/promise2.png",
  },
  {
    title: "Holistic & Integrated Support",
    detail: "From governance training and strategic planning to accounting, tax, and monitoring & evaluation, our solutions are built to support your entire organizational lifecycle—whether you're scaling a mission or growing a business.",
    image: "/promise3.png",
  },
  {
    title: "Impact-Focused, Growth-Driven",
    detail: "Whether you're a non-profit seeking lasting social impact or a business driving growth in your sector, our custom-built solutions focus on measurable outcomes, efficiency, and long-term sustainability.",
    image: "/promise4.png",
  },
];

const testimonials = [
  {
    quote:
      "The expertise brought by TBS was invaluable. They didn't just offer advice; they rolled up their sleeves and worked alongside our team. We saw tangible improvements in efficiency and profitability within a few months. Their practical solutions and dedicated support were crucial in navigating a critical period for our business. A truly effective partner.",
    author: "Daniel",
    role: "Chief Finance Officer",
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
    <div id="top" className="bg-white text-[#2c3e50]">
      <Navbar />

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
          <div className="absolute inset-0 bg-[#1e3a5f]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1320]/60 via-transparent to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 20%, rgba(243,156,18,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(243,156,18,0.2), transparent 30%), radial-gradient(circle at 50% 80%, rgba(243,156,18,0.15), transparent 35%)",
            }}
          />
          <div className="relative z-10 max-w-6xl px-8 text-center text-white sm:px-12 pb-24">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#f39c12]/70 bg-white/5 px-5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-white">
              <span className="h-2 w-2 rounded-full bg-[#f39c12]" />
              Empowering organizations to lead, grow, and thrive
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
              Strategic advisory, capacity building, and financial management for NGOs, SMEs and businesses ready to grow, scale and thrive.
            </h1>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <a
                href="#contact"
                className="inline-flex items-center rounded-none bg-[#f39c12] px-12 py-3 text-base font-semibold text-white transition hover:bg-[#e67e22] shadow-md"
              >
                Get Started
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-none border border-white/20 bg-white/90 px-12 py-3 text-base font-semibold text-[#2c3e50] transition hover:border-[#f39c12] hover:bg-[#f39c12] hover:text-white shadow-md"
              >
                Book a Consultation
              </a>
            </div>
          </div>
          
          {/* Trust Bar - Moving Text */}
          <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-white/10 bg-[#1e3a5f]/60 py-4">
            <div className="flex justify-center px-4">
              <p className="text-base font-medium text-white/90 text-center md:text-lg">
                Trusted by NGOs, SMEs, Foundations, Social Enterprises & Development Partners Across the Region.
              </p>
            </div>
          </div>
        </section>

      <main className="space-y-24 bg-white pb-24 pt-0">
        <section className="-mt-10 px-0 lg:-mt-16">
          <div className="bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f6] py-24 text-[#2c3e50]">
            <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-12">
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-[#f39c12]/25 shadow-[0_30px_60px_rgba(23,35,52,0.18)] min-h-[420px]">
                <Image
                  src="/values.png"
                  alt="Teams collaborating"
                  fill
                  sizes="(min-width: 1024px) 580px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 self-center space-y-6 rounded-2xl border border-slate-200 bg-white px-10 py-14 shadow-[0_30px_60px_rgba(20,30,48,0.12)] lg:px-14">
                <span className="absolute inset-x-0 top-0 h-3 rounded-t-2xl bg-[#f39c12]" />
                <p className="text-2xl font-semibold uppercase tracking-[0.35em] text-[#2c3e50]">
                  {valueBlock.heading}
                </p>
                <h2 className="text-[3.5rem] font-semibold leading-tight text-[#2c3e50] mt-2">{valueBlock.title}:</h2>
                <p className="text-xl italic text-[#4a5568] max-w-2xl">
                  {valueBlock.body}
                </p>
                <div className="flex gap-5 text-sm uppercase tracking-[0.25em] text-[#718096]">
                  {[Shield, LineChartIcon, UsersRound].map((Icon, idx) => (
                    <div
                      key={`value-icon-${idx}`}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f39c12]/25 bg-[#fff4e3]/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <Icon className="h-6 w-6 text-[#f39c12]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="px-0">
          <div className="bg-white py-24 text-[#2c3e50]">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
              <h2 className="text-5xl font-bold text-[#2c3e50] md:text-6xl">What We Do</h2>
            </div>

            <div className="mx-auto mt-16 grid w-full gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-8 lg:px-12">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                <a
                  key={service.title}
                  href="#contact"
                    className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-[#2c3e50]/40 bg-white p-6 text-center shadow-[0_10px_25px_rgba(28,46,68,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#f39c12] hover:shadow-[0_20px_50px_rgba(32,45,68,0.2)] animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                    }}
                >
                    <span className="h-1 w-12 rounded-full bg-[#f39c12]/70 transition-all duration-300 group-hover:w-24" />
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#2c3e50]/20 bg-[#fff7ec] transition-all duration-300 group-hover:bg-white group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-10 w-10 text-[#2c3e50] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                  </div>
                    <div className="text-2xl font-semibold text-[#2c3e50] transition-transform duration-300 group-hover:scale-110">{String(index + 1).padStart(2, "0")}</div>
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4a5568]">{service.focus}</div>
                    <h3 className="text-2xl font-semibold text-[#2c3e50] transition-colors duration-300 group-hover:text-[#f39c12]">{service.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-[#4a5568] max-w-[280px]">{service.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2c3e50] transition-all duration-300 group-hover:text-[#f39c12] group-hover:gap-3">
                    Learn more
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </a>
                );
              })}
            </div>
            <div className="mx-auto mt-16 text-center">
              <a
                href="#services"
                className="inline-flex items-center rounded-none border-2 border-[#f39c12] bg-transparent px-10 py-3 text-base font-semibold text-[#2c3e50] transition hover:bg-[#f39c12] hover:text-white"
              >
                View All Our Comprehensive Solutions
              </a>
            </div>
          </div>
        </section>

        {/* Partners in Your Progress Section */}
        <section className="bg-white px-0 py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
            <div className="text-center">
              <h2 className="text-4xl font-semibold text-[#2c3e50] md:text-5xl">
                Partners in Your Progress: The Turnitaround Advantage
              </h2>
            </div>
          </div>
          
          {/* Image Showcase - Full Width */}
          <PartnersShowcase steps={approach} />
        </section>

        {/* Featured Services Mini Cards */}
        <FeaturedServices services={featuredServices} />

        <section id="promise" className="bg-white px-0 py-24 text-[#2c3e50]">
          <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-semibold text-[#2c3e50] md:text-5xl">Our Promise</h2>
              <p className="mt-4 text-xl text-[#4a5568]">
                Empowering Vision. Strengthening Systems. Sustaining Success.
              </p>
            </div>
          </div>
          <PromiseCards items={promise} />
        </section>

        <section className="bg-[#f8f9fa] px-0 py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
          <p className="text-sm uppercase tracking-[0.35em] text-[#2c3e50]">results and trust</p>
          <p className="text-sm uppercase tracking-[0.35em] text-[#2c3e50] mt-2">clients feedback</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#2c3e50]">Partners who stay for the journey.</h2>
          <div className="mt-10 overflow-hidden">
            <div className="flex gap-6 animate-[promiseMarquee_12s_linear_infinite] min-w-max">
              {testimonials.concat(testimonials).map((testimonial, index) => (
                <figure
                  key={`${testimonial.author}-${index}`}
                  className="relative w-[520px] overflow-visible rounded-2xl border border-[#f39c12]/30 bg-[#fffaf3] p-10 shadow-[0_18px_45px_rgba(24,34,50,0.16)]"
                >
                  <Quote className="mb-4 block h-12 w-12 text-[#f39c12]/70" />
                  <p className="text-lg leading-relaxed text-[#2c3e50]">
                    {testimonial.quote}
                  </p>
                  <figcaption className="mt-6 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.25em] text-[#6b7280]">
                    <span>{testimonial.author}</span>
                    <span className="text-[#f39c12]">•</span>
                    <span>{testimonial.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-24 flex justify-center">
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2b3b52] via-[#223044] to-[#1b2535] px-6 py-10 text-white shadow-[0_30px_80px_rgba(10,15,25,0.55)] md:px-12"
          >
            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold md:text-4xl">Contact Us</h2>
                <p className="text-base md:text-lg text-white/80 text-left max-w-xl">
                  In today's fast-changing business world, staying competitive requires agility and innovation.
                  Turnitaround Business Solution is your trusted partner in driving transformation, growth, and sustainable success.
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <a href="mailto:hello@turnitaroundbusiness.com" className="flex items-center gap-2 hover:text-white">
                    <span className="text-[#f39c12]">✉</span> hello@turnitaroundbusiness.com
                  </a>
                  <a href="tel:+254751216699" className="flex items-center gap-2 hover:text-white">
                    <span className="text-[#f39c12]">☎</span> +254 751 216 699
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_-15px_rgba(10,15,25,0.35)]">
                <form className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#2c3e50] mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-lg border border-[#dfe3eb] bg-white px-4 py-3 text-[#2c3e50] placeholder-[#9aa6b8] focus:border-[#f39c12] focus:outline-none focus:ring-2 focus:ring-[#f39c12]/30"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#2c3e50] mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-lg border border-[#dfe3eb] bg-white px-4 py-3 text-[#2c3e50] placeholder-[#9aa6b8] focus:border-[#f39c12] focus:outline-none focus:ring-2 focus:ring-[#f39c12]/30"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#2c3e50] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full rounded-lg border border-[#dfe3eb] bg-white px-4 py-3 text-[#2c3e50] placeholder-[#9aa6b8] focus:border-[#f39c12] focus:outline-none focus:ring-2 focus:ring-[#f39c12]/30"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#2c3e50] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full rounded-lg border border-[#dfe3eb] bg-white px-4 py-3 text-[#2c3e50] placeholder-[#9aa6b8] focus:border-[#f39c12] focus:outline-none focus:ring-2 focus:ring-[#f39c12]/30 resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-[#f39c12] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#e67e22] shadow-[0_10px_30px_-12px_rgba(243,156,18,0.8)]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
