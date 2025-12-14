"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

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
];

function BlogContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "blog";
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  // Reset filter and scroll to top when component mounts or type changes
  useEffect(() => {
    setSelectedFilter("");
    // Scroll to top when type changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [type]);

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

  return (
    <div id="top" className="bg-white text-[#1f2937]">
      <Navbar />

      {/* Hero Section - Same for all types */}
      <section className="relative overflow-hidden bg-[#0f1c2e] px-0 py-12 md:py-16 text-white min-h-[30vh] md:min-h-[40vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/blogs.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c2e]/88 via-[#0f1c2e]/82 to-[#0f1c2e]/70" />
        <div className="relative mx-auto flex w-[90%] max-w-[1800px] flex-col gap-3 md:gap-4 text-left px-4 lg:px-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.35em] text-[#f39c12]">Resources</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3rem] font-bold leading-tight lg:leading-[1.1]">
            {getPageTitle()}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl">
            Explore our collection of {getPageTitle().toLowerCase()} covering governance, financial management, strategy, growth, and compliance to help mission-driven teams thrive.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-0 py-6 md:py-8 bg-gray-50 border-b border-gray-200">
        <div className="mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
          <h2 className="text-base md:text-lg font-semibold text-[#2c3e50] mb-3 md:mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => setSelectedFilter("")}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                selectedFilter === ""
                  ? "bg-[#f39c12] text-white"
                  : "bg-white text-[#2c3e50] border border-gray-300 hover:border-[#f39c12]"
              }`}
            >
              All Categories
            </button>
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                  selectedFilter === category
                    ? "bg-[#f39c12] text-white"
                    : "bg-white text-[#2c3e50] border border-gray-300 hover:border-[#f39c12]"
                }`}
              >
                <span className="hidden sm:inline">{category}</span>
                <span className="sm:hidden">{category.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-0 py-12 md:py-14">
        <div className="mx-auto w-[90%] max-w-[1800px] px-4 lg:px-12">
          <div className="text-center py-8 md:py-12">
            <p className="text-[#4b5563] text-base md:text-lg">
              Stay tuned, coming soon
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div id="top" className="bg-white text-[#1f2937]">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#4b5563]">Loading...</p>
      </div>
      <Footer />
    </div>
  );
}

function BlogPageContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
