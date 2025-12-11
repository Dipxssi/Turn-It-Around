"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
      <section className="relative overflow-hidden bg-[#0f1c2e] px-6 py-16 text-white md:px-10 lg:px-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/blogs.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1c2e]/88 via-[#0f1c2e]/82 to-[#0f1c2e]/70" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-4 text-left">
          <p className="text-sm uppercase tracking-[0.35em] text-[#f39c12]">Resources</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-[3rem] lg:leading-[1.1]">
            {getPageTitle()}
          </h1>
          <p className="text-lg text-white/80 md:text-xl max-w-3xl">
            Explore our collection of {getPageTitle().toLowerCase()} covering governance, financial management, strategy, growth, and compliance to help mission-driven teams thrive.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 py-8 md:px-10 lg:px-16 bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-lg font-semibold text-[#2c3e50] mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedFilter("")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === category
                    ? "bg-[#f39c12] text-white"
                    : "bg-white text-[#2c3e50] border border-gray-300 hover:border-[#f39c12]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center py-12">
            <p className="text-[#4b5563] text-lg">
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

export default function BlogPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BlogContent />
    </Suspense>
  );
}
