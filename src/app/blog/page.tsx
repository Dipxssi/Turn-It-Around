"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  getAllContent,
  filterContentByType,
  filterContentByCategory,
  type ContentItem,
  exportContentAsJSON,
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
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
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
          <span className="px-3 py-1 bg-[#f39c12]/10 text-[#f39c12] text-xs font-semibold rounded-full">
            {item.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#2c3e50] mb-2 group-hover:text-[#f39c12] transition">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {item.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>By {item.author}</span>
          <span>{formatDate(item.createdAt)}</span>
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-base md:text-lg font-semibold text-[#2c3e50]">
              Filter by Category
            </h2>
            <div className="flex gap-3">
              <Link
                href="/write"
                className="px-4 py-2 bg-[#f39c12] text-white text-sm font-semibold rounded-lg hover:bg-[#e67e22] transition"
              >
                + Write Content
              </Link>
              <button
                onClick={async () => {
                  try {
                    const supabaseContent = await getSupabaseContent();
                    if (supabaseContent.length > 0) {
                      exportContentAsJSON(supabaseContent);
                    }
                  } catch (error) {
                    console.error('Error exporting content:', error);
                    setNotification({
                      message: 'Failed to export content.',
                      type: 'error',
                    });
                    setTimeout(() => setNotification(null), 3000);
                  }
                }}
                className="px-4 py-2 bg-gray-200 text-[#2c3e50] text-sm font-semibold rounded-lg hover:bg-gray-300 transition"
                title="Export submitted content as JSON"
              >
                Export Content
              </button>
            </div>
          </div>
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
            {getCategoriesForType().map((category) => (
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
              <p className="text-[#4b5563] text-base md:text-lg">Loading content...</p>
            </div>
          ) : displayedContent.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <p className="text-[#4b5563] text-base md:text-lg mb-4">
                No content found.
              </p>
              <Link
                href="/write"
                className="inline-block px-6 py-3 bg-[#f39c12] text-white font-semibold rounded-lg hover:bg-[#e67e22] transition"
              >
                Be the first to write!
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-gray-600">
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
