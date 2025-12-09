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
import { BackToTop } from "@/components/BackToTop";

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
  return (
    <div id="top" className="bg-white text-[#2c3e50]">
      <Navbar />
      <section className="relative overflow-hidden bg-[#0f1c2e] px-6 py-20 text-white md:px-10 lg:px-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/services.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c2e]/85 via-[#0f1c2e]/80 to-[#0f1c2e]/70" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 text-left">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-[3.2rem] lg:leading-[1.1]">
            {hero.title}
          </h1>
          <p className="text-lg text-white/80 md:text-xl max-w-4xl">{hero.subtitle}</p>
        </div>
      </section>

      <section className="px-6 py-6 text-[#1f2937] md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl items-center justify-center rounded-xl bg-[#f6f7fb] px-4 py-3 text-center text-sm font-medium text-[#2c3e50] md:text-base">
          Trusted by NGOs, SMEs, Foundations, Social Enterprises & Development Partners Across the Region.
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-14">
          {groups.map((group, groupIdx) => (
            <div key={group.title} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-[#f39c12]/90">0{groupIdx + 1}</p>
                <h2 className="text-3xl font-bold text-[#1f2937] md:text-4xl">{group.title}</h2>
                <p className="text-base text-[#4b5563] md:text-lg">{group.description}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="h-full rounded-2xl bg-white p-6 shadow-[0_10px_28px_-12px_rgba(17,24,39,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(17,24,39,0.24)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4e3] text-[#f39c12]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-[#1f2937]">{item.title}</h3>
                          <p className="text-base text-[#4b5563] leading-relaxed">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

