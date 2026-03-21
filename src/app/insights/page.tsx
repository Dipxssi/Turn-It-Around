"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

type CategoryFilter =
  | "All"
  | "Governance & Leadership"
  | "NGO Financial Management"
  | "Strategic Planning"
  | "SME Growth"
  | "Compliance";

type Article = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
};

const articles: Article[] = [
  {
    id: 1,
    category: "Governance & Leadership",
    title: "5 Board Governance Practices Every NGO Should Adopt",
    excerpt:
      "Strong governance is the backbone of any effective NGO. Without clear accountability structures, even well-funded organizations struggle.",
    date: "January 2025",
  },
  {
    id: 2,
    category: "NGO Financial Management",
    title: "How to Build Donor-Compliant Financial Systems",
    excerpt:
      "Donor compliance starts with the right financial infrastructure. Here's what NGOs need to put in place before approaching institutional funders.",
    date: "February 2025",
  },
  {
    id: 3,
    category: "SME Growth & Turnaround",
    title: "When to Call a Turnaround Advisor: 7 Warning Signs",
    excerpt:
      "Most business owners wait too long. These seven signals indicate your organization may need external strategic intervention now.",
    date: "February 2025",
  },
  {
    id: 4,
    category: "Strategic Planning",
    title: "Why Your 3-Year Strategy Is Already Outdated",
    excerpt:
      "Strategic plans must evolve with your environment. Here's how mission-driven organizations can build adaptive, living strategic frameworks.",
    date: "March 2025",
  },
  {
    id: 5,
    category: "Compliance & Internal Controls",
    title: "Internal Controls That Actually Work for Small NGOs",
    excerpt:
      "Many NGOs implement internal controls that look good on paper but fail in practice. Here's what actually protects your organization.",
    date: "March 2025",
  },
  {
    id: 6,
    category: "NGO Financial Management",
    title: "Virtual CFO Services: Is It Right for Your Organization?",
    excerpt:
      "Not every organization needs a full-time CFO. Here's how a virtual CFO model delivers strategic financial leadership at a fraction of the cost.",
    date: "April 2025",
  },
];

const filters: CategoryFilter[] = [
  "All",
  "Governance & Leadership",
  "NGO Financial Management",
  "Strategic Planning",
  "SME Growth",
  "Compliance",
];

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = useMemo(() => {
    if (activeFilter === "All") return articles;

    return articles.filter((article) => {
      switch (activeFilter) {
        case "Governance & Leadership":
          return article.category === "Governance & Leadership";
        case "NGO Financial Management":
          return article.category === "NGO Financial Management";
        case "Strategic Planning":
          return article.category === "Strategic Planning";
        case "SME Growth":
          return article.category.includes("SME Growth");
        case "Compliance":
          return article.category.includes("Compliance");
        default:
          return true;
      }
    });
  }, [activeFilter]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  const featured = articles[0];

  return (
    <div className="bg-white text-[var(--navy)]">
      <NavBar />

      {/* SECTION 1: HERO */}
      <PageHero
        eyebrow="Knowledge Hub"
        headline="Insights &amp; Perspectives"
        subtext="Thought leadership on governance, finance, and organizational growth."
        imagePlaceholder="TBS Research & Insights"
      />

      {/* SECTION 2: CATEGORY FILTER */}
      <section className="bg-white sticky top-14 md:top-16 z-30 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-end">
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-none">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap pb-2 font-body text-[14px] border-b-[3px] transition-all ${
                  activeFilter === filter
                    ? "border-[var(--blue)] text-[#0091DA]"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--navy)]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main>
        {/* SECTION 3: FEATURED ARTICLE */}
        <section className="bg-white py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto bg-white shadow-sm border border-[var(--border)] flex flex-col md:flex-row overflow-hidden">
            {/* Left placeholder visual */}
            <div className="bg-[var(--navy)] text-white w-full md:w-[40%] p-8 flex items-center">
              <div className="space-y-4">
                <p className="font-body text-[12px] text-[#0091DA] uppercase tracking-[0.15em]">
                  Governance &amp; Leadership
                </p>
                <h2 className="font-heading text-[26px] md:text-[30px] leading-[1.3]">
                  5 Board Governance Practices Every NGO Should Adopt
                </h2>
              </div>
            </div>

            {/* Right content */}
            <div className="w-full md:w-[60%] p-8 md:p-12 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--blue)] font-body text-[12px] text-[#0091DA] uppercase tracking-[0.12em]">
                  Governance &amp; Leadership
                </span>
                <span className="font-body text-[12px] text-[var(--text-muted)] uppercase tracking-[0.16em]">
                  Featured Article
                </span>
              </div>
              <h3 className="font-heading text-[28px] md:text-[32px] text-[var(--navy)] leading-[1.3]">
                {featured.title}
              </h3>
              <p className="font-body text-[16px] text-[var(--text-muted)] leading-[1.7]">
                Strong governance is the backbone of any effective NGO. Without
                clear accountability structures, even the most well-funded
                organizations struggle to deliver impact. Here are five practices
                that leading NGOs use to strengthen their boards.
              </p>

              <div className="flex items-center gap-3 pt-4">
                <div className="w-8 h-8 rounded-full bg-[var(--navy)] flex items-center justify-center">
                  <span className="font-body text-[11px] text-[#0091DA] font-semibold">
                    TBS
                  </span>
                </div>
                <p className="font-body text-[14px] text-[var(--navy)]">
                  TBS Editorial Team
                </p>
                <span className="text-[var(--text-muted)]">•</span>
                <p className="font-body text-[13px] text-[var(--text-muted)]">
                  January 2025
                </p>
              </div>

              <button
                type="button"
                className="mt-4 font-body text-[14px] text-[#0091DA] hover:underline"
              >
                Read Article →
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 4: ARTICLE GRID */}
        <section className="bg-[var(--light-grey)] py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="font-heading text-[32px] md:text-[36px] text-[var(--navy)]">
              Latest Insights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white flex flex-col overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="bg-[var(--navy)] h-[180px] p-5 flex items-start">
                    <span className="font-body text-[11px] text-[#0091DA] uppercase tracking-[0.16em]">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex-1 p-7 flex flex-col">
                    <h3 className="font-heading text-[20px] text-[var(--navy)] leading-[1.35] group-hover:text-[#0091DA]">
                      {article.title}
                    </h3>
                    <p
                      className="font-body text-[14px] text-[var(--text-muted)] leading-[1.6] mt-2"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.excerpt}
                    </p>
                    <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                      <span className="font-body text-[12px] text-[var(--text-muted)]">
                        {article.date}
                      </span>
                      <button
                        type="button"
                        className="font-body text-[13px] text-[#0091DA] hover:underline"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: NEWSLETTER CTA */}
        <section className="bg-[#00338D] text-white py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-[32px] md:text-[36px] text-white">
              Stay Informed
            </h2>
            <p className="font-body text-[17px] text-white/75">
              Get our latest insights on governance, finance, and organizational
              growth delivered to your inbox.
            </p>

            {!subscribed ? (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto max-w-[480px] flex flex-col sm:flex-row items-stretch gap-3 pt-2"
              >
                <input
                  type="email"
                  required
                  placeholder="you@example.org"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 h-[52px] bg-white/10 text-white placeholder:text-white/60 font-body text-[15px] px-4 outline-none border border-white/20"
                />
                <button
                  type="submit"
                  className="h-[52px] px-6 bg-[#0091DA] text-white font-body text-[15px] whitespace-nowrap hover:bg-[#0077B8] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <p className="font-body text-[15px] text-white">
                ✓ You're subscribed!
              </p>
            )}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-[var(--navy)] text-white py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-[40px] text-white">
              Ready to work with us?
            </h2>
            <p className="font-body text-[17px] text-white/70">
              Let's build your organization's roadmap together.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  backgroundColor: "#0091DA",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  padding: "14px 32px",
                  textDecoration: "none",
                }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

