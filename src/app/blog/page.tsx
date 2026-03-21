"use client";

import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  getAllContent,
  filterContentByType,
  filterContentByCategory,
  type ContentItem,
  getSupabaseContent,
  deleteSupabaseContent,
} from "@/lib/content";
import { ConfirmModal } from "@/components/ConfirmModal";
import staticContentData from "@/data/content.json";

const filterCategories = [
  "Governance Training",
  "Strategic Planning",
  "Organizational Development",
  "Financial Audits Support",
  "Outsourced Accounting",
  "Virtual CFO & Financial Leadership",
  "Grant & Donor Reporting",
  "M&E System Strengthening",
  "Program Reviews & Turnaround",
  "Success Story",
  "NGO Transformation",
  "SME Growth",
  "Financial Turnaround",
  "Capacity Building",
  "Industry News",
  "Regulatory Updates",
  "Best Practices",
  "Financial Trends",
  "Governance",
  "Compliance",
];

const categoryMapByType: Record<string, string[]> = {
  blog: [
    "Governance Training",
    "Strategic Planning",
    "Organizational Development",
    "Financial Audits Support",
    "Outsourced Accounting",
    "Virtual CFO & Financial Leadership",
    "Grant & Donor Reporting",
    "M&E System Strengthening",
    "Program Reviews & Turnaround",
  ],
  "case-study": [
    "Success Story",
    "NGO Transformation",
    "SME Growth",
    "Financial Turnaround",
    "Capacity Building",
    "Strategic Planning",
  ],
  insight: [
    "Industry News",
    "Regulatory Updates",
    "Best Practices",
    "Financial Trends",
    "Governance",
    "Compliance",
  ],
};

function ContentCard({
  item,
  onDelete,
  isLocalContent,
}: {
  item: ContentItem;
  onDelete?: (id: string) => void;
  isLocalContent?: boolean;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && isLocalContent) {
      onDelete(item.id);
    }
  };

  return (
    <div className="group relative bg-white border border-[#E0E0E0] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <Link
        href={`/blog/view?id=${item.id}`}
        className="block"
      >
      {item.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-[#0091DA]/10 text-[#0091DA] text-xs font-semibold rounded-full">
            {item.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#00338D] mb-2 group-hover:text-[#0091DA] transition">
          {item.title}
        </h3>
        <p className="text-[#757575] text-sm mb-4 line-clamp-3">
          {item.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-[#757575]">
          <span>By {item.author}</span>
          <span>{formatDate(item.createdAt)}</span>
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#E0E0E0]">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-[#F2F2F2] text-[#757575] text-xs rounded border border-[#E0E0E0]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      </Link>
      {/* Delete Button - Only show for local content */}
      {isLocalContent && onDelete && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
          title="Delete this content"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Helper function to strip HTML tags
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

// Type definition for Case Study API response
type CaseStudy = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  date: string;
  acf?: {
    sector?: string;
    challenge?: string;
    approach?: string;
    result?: string;
    stat_number?: string;
    stat_label?: string;
    tag?: string;
    category?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
};

function CaseStudies() {
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [cases, setCases] = React.useState<CaseStudy[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  // Fetch case studies using the same content loading mechanism
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        setError(false);
        // Use the same content loading functions as BlogContent
        const staticContent = staticContentData as ContentItem[];
        const allContent = await getAllContent(staticContent);
        let caseStudies = filterContentByType(
          allContent,
          "case-study"
        );
        
        // Filter out test data
        caseStudies = caseStudies.filter(
          (item) => !item.title.toLowerCase().includes("test")
        );
        
        // Map ContentItem to CaseStudy format
        // Extract category info - categories like "NGO Transformation", "SME Growth" etc.
        const mappedCases: CaseStudy[] = caseStudies.map((item) => {
          // Determine category from item.category
          let category = "NGO";
          if (item.category.includes("NGO") || item.category === "Success Story") {
            category = "NGO";
          } else if (item.category.includes("SME")) {
            category = "SME";
          } else if (item.category.includes("Social Enterprise")) {
            category = "Social Enterprise";
          } else if (item.category.includes("Foundation")) {
            category = "Foundation";
          }
          
          return {
            id: parseInt(item.id.replace(/\D/g, "")) || 0,
            title: { rendered: item.title || "" },
            excerpt: { rendered: item.excerpt || "" },
            content: { rendered: item.content || "" },
            slug: item.id || "",
            date: item.createdAt || new Date().toISOString(),
            acf: {
              sector: category ? `${category} · Kenya` : "NGO · Kenya",
              challenge: "",
              approach: "",
              result: item.excerpt || "",
              stat_number: "",
              stat_label: "Impact achieved",
              tag: item.category || "Case Study",
              category: category,
            },
          };
        });
        
        // Log the data structure for debugging
        console.log("Case Studies Data:", JSON.stringify(mappedCases, null, 2));
        console.log("Raw ContentItems:", JSON.stringify(caseStudies, null, 2));
        
        setCases(mappedCases);
      } catch (err) {
        console.error("Failed to fetch case studies:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  // Dynamic filters with counts
  const filters = [
    { label: "All", count: cases.length },
    {
      label: "NGO",
      count: cases.filter((c) => (c.acf?.category || "NGO") === "NGO").length,
    },
    {
      label: "SME",
      count: cases.filter((c) => (c.acf?.category || "NGO") === "SME").length,
    },
    {
      label: "Social Enterprise",
      count: cases.filter(
        (c) => (c.acf?.category || "NGO") === "Social Enterprise"
      ).length,
    },
    {
      label: "Foundation",
      count: cases.filter(
        (c) => (c.acf?.category || "NGO") === "Foundation"
      ).length,
    },
  ];

  // Filter cases based on active filter
  const filteredCases =
    activeFilter === "All"
      ? cases.filter((c) => !stripHtml(c.title?.rendered || "").toLowerCase().includes("test"))
      : cases.filter(
          (c) =>
            (c.acf?.category || "NGO") === activeFilter &&
            !stripHtml(c.title?.rendered || "").toLowerCase().includes("test")
        );

  // Featured case study (first item from API)
  const featuredCase = cases[0];

  return (
    <div className="bg-white text-[var(--navy)]">
      <NavBar />
      <main>
        {/* SECTION 1: HERO */}
          <PageHero
            eyebrow="Client Impact"
            headline="Real Results. Real Organizations."
            subtext="Stories of organizations we've helped stabilize, scale, and succeed across East Africa."
            imagePlaceholder="Client Success Stories"
            imageUrl="/blogs.png"
          />

        {/* SECTION 2: FILTER BAR */}
        <section className="bg-white border-b border-[var(--border)] sticky top-[72px] z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex gap-0 overflow-x-auto">
              {filters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => setActiveFilter(filter.label)}
                  className={`font-body text-sm px-6 py-5 whitespace-nowrap transition-all border-b-2 ${
                    activeFilter === filter.label
                      ? "text-[var(--navy)] border-[var(--navy)]"
                      : "text-[var(--text-muted)] border-transparent hover:text-[var(--navy)]"
                  }`}
                >
                  {filter.label}{" "}
                  {filter.count > 0 && (
                    <span
                      className={`inline-block ml-1.5 font-body text-[11px] px-2 py-0.5 rounded-full ${
                        activeFilter === filter.label
                          ? "bg-white text-[var(--navy)]"
                          : "bg-[var(--light-grey)] text-[var(--text-muted)]"
                      }`}
                    >
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURED CASE STUDY */}
        {!loading && !error && featuredCase && (
          <section className="bg-[var(--light-grey)] py-[100px] px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Featured label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-0.5 bg-[#0091DA]" />
                <span className="font-body text-xs text-[#0091DA] uppercase tracking-[0.15em]">
                  Featured Case Study
                </span>
              </div>

              {/* Card */}
              <div className="featured-card grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden shadow-lg">
                {/* Left — navy panel */}
                <div className="bg-[var(--navy)] p-12 md:p-14 flex flex-col justify-between">
                  {/* Sector tag */}
                  <div>
                    <span className="font-body text-[11px] text-white/50 uppercase tracking-[0.12em]">
                      {featuredCase.acf?.sector || "NGO · Kenya"}
                    </span>
                    <span className="inline-block ml-3 border border-[var(--blue)]/40 text-[#0091DA] font-body text-[11px] px-2.5 py-0.5 rounded-full">
                      {featuredCase.acf?.tag || "Case Study"}
                    </span>
                  </div>

                  <h2 className="font-heading text-[32px] text-white leading-[1.3] my-8">
                    {stripHtml(featuredCase.title?.rendered || "")}
                  </h2>

                  {/* Stats */}
                  {featuredCase.acf?.stat_number && (
                    <div className="flex flex-col gap-5 pt-8 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="font-heading text-[28px] text-[#0091DA] leading-none min-w-[80px]">
                          {featuredCase.acf.stat_number}
                        </div>
                        <div className="font-body text-[13px] text-white/60">
                          {featuredCase.acf.stat_label || "Impact achieved"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right — white content panel */}
                <div className="p-12 md:p-14 flex flex-col gap-8">
                  {featuredCase.acf?.challenge && (
                    <div>
                      <p className="font-body text-[11px] text-[#0091DA] uppercase tracking-[0.12em] mb-3">
                        The Challenge
                      </p>
                      <p className="font-body text-[15px] text-[var(--text-muted)] leading-[1.75] m-0">
                        {featuredCase.acf.challenge}
                      </p>
                    </div>
                  )}

                  {featuredCase.acf?.approach && (
                    <div>
                      <p className="font-body text-[11px] text-[#0091DA] uppercase tracking-[0.12em] mb-3">
                        Our Approach
                      </p>
                      <p className="font-body text-[15px] text-[var(--text-muted)] leading-[1.75] m-0">
                        {featuredCase.acf.approach}
                      </p>
                    </div>
                  )}

                  {featuredCase.acf?.result && (
                    <div>
                      <p className="font-body text-[11px] text-[#0091DA] uppercase tracking-[0.12em] mb-3">
                        The Result
                      </p>
                      <p className="font-body text-[15px] text-[var(--text-muted)] leading-[1.75] m-0">
                        {featuredCase.acf.result}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-[var(--navy)] text-white font-body text-sm px-7 py-3.5 no-underline hover:bg-[#002A6E] transition-colors"
                    >
                      Work With Us →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: CASE STUDIES GRID */}
        <section className="bg-white py-[100px] px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="font-body text-xs text-[#0091DA] uppercase tracking-[0.15em] mb-2">
                  {activeFilter === "All" ? "All Case Studies" : activeFilter}
                </p>
                <h2 className="font-heading text-[36px] text-[var(--navy)] m-0">
                  {filteredCases.length}{" "}
                  {filteredCases.length === 1 ? "Story" : "Stories"} Found
                </h2>
              </div>
            </div>

            {/* Cards grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-[var(--light-grey)] h-[320px] animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="font-body text-base text-[var(--text-muted)]">
                  Unable to load case studies. Please try again later.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-[var(--navy)] text-white font-body text-sm px-6 py-3 border-none cursor-pointer hover:bg-[#002A6E] transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : filteredCases.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-body text-base text-[var(--text-muted)]">
                  No case studies found for this category.
                </p>
              </div>
            ) : (
              <div className="cases-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
                {filteredCases.map((c, i) => (
                  <Link
                    key={c.id || i}
                    href={`/blog/view?id=${c.slug || c.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="bg-[var(--light-grey)] flex flex-col transition-all cursor-pointer h-full group"
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.backgroundColor =
                          "var(--navy)";
                        const texts =
                          e.currentTarget.querySelectorAll("[data-hover]");
                        texts.forEach((el: Element) => {
                          (el as HTMLElement).style.color =
                            "rgba(255,255,255,0.7)";
                        });
                        const titles =
                          e.currentTarget.querySelectorAll("[data-title]");
                        titles.forEach((el: Element) => {
                          (el as HTMLElement).style.color = "#FFFFFF";
                        });
                        const stats =
                          e.currentTarget.querySelectorAll("[data-stat]");
                        stats.forEach((el: Element) => {
                          (el as HTMLElement).style.color = "var(--blue)";
                        });
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.backgroundColor =
                          "";
                        const texts =
                          e.currentTarget.querySelectorAll("[data-hover]");
                        texts.forEach((el: Element) => {
                          (el as HTMLElement).style.color = "";
                        });
                        const titles =
                          e.currentTarget.querySelectorAll("[data-title]");
                        titles.forEach((el: Element) => {
                          (el as HTMLElement).style.color = "";
                        });
                        const stats =
                          e.currentTarget.querySelectorAll("[data-stat]");
                        stats.forEach((el: Element) => {
                          (el as HTMLElement).style.color = "";
                        });
                      }}
                    >
                      {/* Top bar */}
                      <div className="h-0.5 bg-[#0091DA]" />

                      <div className="p-8 md:p-9 flex-1 flex flex-col gap-4">
                        {/* Sector + tag */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            data-hover
                            className="font-body text-[11px] text-[var(--text-muted)] uppercase tracking-[0.1em]"
                          >
                            {c.acf?.sector || "NGO · Kenya"}
                          </span>
                        </div>

                        {/* Tag pill */}
                        <span className="self-start border border-[var(--blue)]/30 text-[#0091DA] font-body text-[11px] px-2.5 py-0.5 rounded-full">
                          {c.acf?.tag || "Case Study"}
                        </span>

                        {/* Headline */}
                        <h3
                          data-title
                          className="font-heading text-[20px] text-[var(--navy)] leading-[1.35] m-0"
                        >
                          {stripHtml(c.title?.rendered || "")}
                        </h3>

                        {/* Result */}
                        <p
                          data-hover
                          className="font-body text-sm text-[var(--text-muted)] leading-[1.7] m-0 flex-1"
                        >
                          {c.acf?.result ||
                            stripHtml(c.excerpt?.rendered || "")}
                        </p>

                        {/* Stat */}
                        {c.acf?.stat_number && (
                          <div className="pt-5 border-t border-[var(--navy)]/8 flex items-center gap-4">
                            <div
                              data-stat
                              className="font-heading text-[26px] text-[var(--navy)] leading-none"
                            >
                              {c.acf.stat_number}
                            </div>
                            <div
                              data-hover
                              className="font-body text-xs text-[var(--text-muted)] leading-[1.4]"
                            >
                              {c.acf.stat_label || "Impact achieved"}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5: CTA BANNER */}
        <section className="bg-[var(--navy)] py-20 px-4 md:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-[42px] text-white leading-[1.2] mb-4">
              Work with us to write your own success story.
            </h2>
            <p className="font-body text-base text-white/65 leading-[1.7] mb-10">
              Whether you're an NGO, SME, or social enterprise — we have the
              expertise to help you stabilize, scale, and succeed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-[#0091DA] text-white font-body text-sm px-8 py-3.5 no-underline hover:bg-[#0077B8] transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/services"
                className="inline-block border border-white/30 text-white font-body text-sm px-8 py-3.5 no-underline hover:bg-white/10 transition-colors"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .cases-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .featured-card {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .cases-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}

function BlogContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "blog";
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [displayedContent, setDisplayedContent] = useState<ContentItem[]>([]);
  const [supabaseContentIds, setSupabaseContentIds] = useState<Set<string>>(new Set());
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load and combine content from Supabase
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const staticContent = staticContentData as ContentItem[];
        const combined = await getAllContent(staticContent);
        
        // Get IDs of content from Supabase (for delete button display)
        const supabaseContent = await getSupabaseContent();
        const supabaseIds = new Set(supabaseContent.map((item) => item.id));
        setSupabaseContentIds(supabaseIds);
        
        setAllContent(combined);
      } catch (error) {
        console.error('Error loading content:', error);
        setNotification({
          message: 'Failed to load content. Please refresh the page.',
          type: 'error',
        });
        setTimeout(() => setNotification(null), 5000);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, []);

  // Filter content when type or filter changes
  useEffect(() => {
    let filtered = filterContentByType(
      allContent,
      type as "blog" | "case-study" | "insight"
    );

    // Filter out test data (case-insensitive check)
    filtered = filtered.filter(
      (item) => {
        const titleLower = item.title.toLowerCase();
        const excerptLower = (item.excerpt || "").toLowerCase();
        const contentLower = (item.content || "").toLowerCase();

        // Hide "test" content even if it doesn't appear in the title.
        const isTest =
          titleLower.includes("test") ||
          excerptLower.includes("test") ||
          contentLower.includes("test");

        if (isTest) console.log("Filtering out test item:", item.title);
        return !isTest;
      }
    );
    console.log(`Filtered ${type} content: ${filtered.length} items (removed test data)`);

    if (selectedFilter) {
      filtered = filterContentByCategory(filtered, selectedFilter);
    }

    setDisplayedContent(filtered);
  }, [allContent, type, selectedFilter]);

  // Reset filter and scroll to top when component mounts or type changes
  useEffect(() => {
    setSelectedFilter("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [type]);

  const handleDelete = (id: string) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (deleteModal.id) {
      try {
        const success = await deleteSupabaseContent(deleteModal.id);
        if (success) {
          // Reload content from Supabase
          const staticContent = staticContentData as ContentItem[];
          const combined = await getAllContent(staticContent);
          setAllContent(combined);
          
          // Update Supabase content IDs
          const supabaseContent = await getSupabaseContent();
          const supabaseIds = new Set(supabaseContent.map((item) => item.id));
          setSupabaseContentIds(supabaseIds);
          
          setNotification({ message: "Content deleted successfully!", type: "success" });
          setTimeout(() => setNotification(null), 3000);
        } else {
          setNotification({ message: "Failed to delete content.", type: "error" });
          setTimeout(() => setNotification(null), 3000);
        }
      } catch (error) {
        console.error('Error deleting content:', error);
        setNotification({ 
          message: "An error occurred while deleting content.", 
          type: "error" 
        });
        setTimeout(() => setNotification(null), 3000);
      }
    }
    setDeleteModal({ isOpen: false, id: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  // Refresh content when page comes into focus (for new submissions from other tabs/pages)
  useEffect(() => {
    const refreshContent = async () => {
      try {
        const staticContent = staticContentData as ContentItem[];
        const combined = await getAllContent(staticContent);
        setAllContent(combined);
        
        // Update Supabase content IDs
        const supabaseContent = await getSupabaseContent();
        const supabaseIds = new Set(supabaseContent.map((item) => item.id));
        setSupabaseContentIds(supabaseIds);
      } catch (error) {
        console.error('Error refreshing content:', error);
      }
    };

    // Refresh on focus (when user comes back to tab/window)
    const handleFocus = () => {
      refreshContent();
    };

    // Refresh when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshContent();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const getPageTitle = () => {
    switch (type) {
      case "case-study":
        return "Case Studies";
      case "insight":
        return "Industry Insights";
      default:
        return "Blogs";
    }
  };

  const getCategoriesForType = () => {
    return categoryMapByType[type] || filterCategories;
  };

  return (
    <div id="top" className="bg-white text-[#1A1A1A]">
      <NavBar />

      {/* Hero Section - Same for all types */}
      <PageHero
        eyebrow="Resources"
        headline={getPageTitle()}
        subtext={`Explore our collection of ${getPageTitle().toLowerCase()} covering governance, financial management, strategy, growth, and compliance to help mission-driven teams thrive.`}
        imagePlaceholder="TBS Resources"
        imageUrl="/blogs.png"
      />

      {/* Filter Section */}
      <section className="px-0 py-6 md:py-8 bg-[#F2F2F2] border-b border-[#E0E0E0]">
        <div className="mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
          <div className="mb-4">
            <h2 className="text-base md:text-lg font-semibold text-[#00338D]">
              Filter by Category
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => setSelectedFilter("")}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                selectedFilter === ""
                  ? "bg-[#0091DA] text-white"
                  : "bg-white text-[#00338D] border border-[#E0E0E0] hover:border-[#0091DA]"
              }`}
            >
              All Categories
            </button>
            {getCategoriesForType().map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                  selectedFilter === category
                    ? "bg-[#0091DA] text-white"
                    : "bg-white text-[#00338D] border border-[#E0E0E0] hover:border-[#0091DA]"
                }`}
              >
                <span className="hidden sm:inline">{category}</span>
                <span className="sm:hidden">{category.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-0 py-12 md:py-14">
        <div className="mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
          {isLoading ? (
            <div className="text-center py-12 md:py-16">
              <p className="text-[#757575] text-base md:text-lg">Loading content...</p>
            </div>
          ) : displayedContent.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <p className="text-[#757575] text-base md:text-lg">
                No content found.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-[#757575]">
                Showing {displayedContent.length} item
                {displayedContent.length !== 1 ? "s" : ""}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayedContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                    isLocalContent={supabaseContentIds.has(item.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Content"
        message="Are you sure you want to delete this content? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {notification.type === "success" ? (
              <path d="M5 13l4 4L19 7" />
            ) : (
              <path d="M6 18L18 6M6 6l12 12" />
            )}
          </svg>
          <span className="font-medium">{notification.message}</span>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div id="top" className="bg-white text-[#1A1A1A]">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#757575]">Loading...</p>
      </div>
      <Footer />
    </div>
  );
}

function BlogPageContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const type = searchParams.get("type") || "blog";
  
  // Render CaseStudies component if type is case-study
  if (type === "case-study") {
    return <CaseStudies />;
  }
  
  // Use pathname + search params as key to force re-render on any change
  const searchParamsKey = searchParams.toString();
  const componentKey = `${pathname}?${searchParamsKey}`;
  
  return <BlogContent key={componentKey} />;
}

export default function BlogPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BlogPageContent />
    </Suspense>
  );
}
