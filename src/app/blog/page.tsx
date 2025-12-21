"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
      <section className="relative overflow-hidden px-0 py-12 md:py-16 text-white min-h-[30vh] md:min-h-[40vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/blogs.png')" }}
        />
        {/* Subtle gradient overlay - darker at top where text sits, more transparent at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/50 via-[#1e3a5f]/30 to-transparent" />
        <div className="relative mx-auto flex w-[90%] max-w-[1800px] flex-col gap-3 md:gap-4 text-left px-4 lg:px-12">
          {/* Semi-transparent dark box behind text with backdrop blur - only behind text area */}
          <div className="relative backdrop-blur-sm bg-[#1e3a5f]/40 rounded-xl p-6 md:p-8 border border-white/10 shadow-2xl max-w-4xl">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.35em] text-[#f39c12] font-semibold drop-shadow-md">
              Resources
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3rem] font-extrabold leading-tight lg:leading-[1.1] mt-2 md:mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)]">
              {getPageTitle()}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white font-medium max-w-3xl mt-3 md:mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.7)]">
              Explore our collection of {getPageTitle().toLowerCase()} covering governance, financial management, strategy, growth, and compliance to help mission-driven teams thrive.
            </p>
          </div>
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
