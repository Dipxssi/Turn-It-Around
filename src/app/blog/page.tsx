import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

const categories = [
  { title: "Governance & Leadership", description: "Board dynamics, decision-making, and leadership practices for mission-driven teams." },
  { title: "NGO Financial Management", description: "Grant compliance, donor reporting, budgeting, and financial stewardship for nonprofits." },
  { title: "Strategic Planning", description: "Frameworks, workshops, and tools to align vision, resources, and measurable outcomes." },
  { title: "SME Growth & Turnaround", description: "Practical growth playbooks, turnaround stories, and operational excellence for SMEs." },
  { title: "Compliance & Internal Controls", description: "Risk management, controls, and audit readiness to keep your organization secure." },
];

export default function BlogPage() {
  return (
    <div id="top" className="bg-white text-[#1f2937]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#0f1c2e] px-6 py-16 text-white md:px-10 lg:px-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/blogs.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c2e]/88 via-[#0f1c2e]/82 to-[#0f1c2e]/70" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-4 text-left">
          <p className="text-sm uppercase tracking-[0.35em] text-[#f39c12]">Insights</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-[3rem] lg:leading-[1.1]">
            Insights & Blog
          </h1>
          <p className="text-lg text-white/80 md:text-xl max-w-3xl">
            SEO-focused articles on governance, financial management, strategy, growth, and compliance to help mission-driven teams thrive.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_28px_-12px_rgba(17,24,39,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(17,24,39,0.24)]"
            >
              <h2 className="text-xl font-semibold text-[#1f2937]">{cat.title}</h2>
              <p className="mt-3 text-base text-[#4b5563] leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <BackToTop />
    </div>
  );
}

