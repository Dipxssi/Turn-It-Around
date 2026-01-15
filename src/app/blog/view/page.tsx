"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  getAllContent,
  type ContentItem,
} from "@/lib/content";
import staticContentData from "@/data/content.json";

function BlogViewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.push("/blog");
      return;
    }

    const loadContent = () => {
      try {
        const staticContent = staticContentData as ContentItem[];
        const allContent = getAllContent(staticContent);
        const found = allContent.find((item) => item.id === id);

        if (found) {
          setContent(found);
        } else {
          // Content not found
          setContent(null);
        }
      } catch (error) {
        console.error("Error loading content:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();

    // Listen for content updates
    const handleUpdate = () => loadContent();
    window.addEventListener("contentUpdated", handleUpdate);
    return () => window.removeEventListener("contentUpdated", handleUpdate);
  }, [id, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "case-study":
        return "Case Study";
      case "insight":
        return "Industry Insight";
      default:
        return "Blog";
    }
  };

  const getBackUrl = () => {
    if (!content) return "/blog";
    switch (content.type) {
      case "case-study":
        return "/blog?type=case-study";
      case "insight":
        return "/blog?type=insight";
      default:
        return "/blog";
    }
  };

  if (loading) {
    return (
      <div className="bg-white text-[#1f2937] min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[#4b5563]">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-white text-[#1f2937] min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#2c3e50] mb-4">
              Content Not Found
            </h1>
            <Link
              href="/blog"
              className="text-[#f39c12] hover:underline"
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-[#1f2937] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      {content.imageUrl && (
        <section className="relative overflow-hidden px-0 py-12 md:py-16 text-white min-h-[40vh] md:min-h-[50vh] mt-16 md:mt-20">
          <div className="absolute inset-0">
            <Image
              src={content.imageUrl}
              alt={content.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/70 via-[#1e3a5f]/50 to-transparent" />
        </section>
      )}

      {/* Content Section */}
      <section className={`px-0 ${content.imageUrl ? "py-12 md:py-16" : "py-12 md:py-16 mt-16 md:mt-20"}`}>
        <div className="mx-auto w-[90%] max-w-4xl px-4 lg:px-12">
          {/* Back Button */}
          <Link
            href={getBackUrl()}
            className="inline-flex items-center gap-2 text-[#f39c12] hover:underline mb-6"
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
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to {getTypeLabel(content.type)}
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#f39c12]/10 text-[#f39c12] text-sm font-semibold rounded-full">
                {getTypeLabel(content.type)}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full">
                {content.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2c3e50] mb-4">
              {content.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>By {content.author}</span>
              <span>•</span>
              <span>{formatDate(content.createdAt)}</span>
            </div>
          </div>

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
              {content.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {content.content.split("\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Footer Actions */}
          <div className="pt-8 border-t border-gray-200 flex gap-4">
            <Link
              href={getBackUrl()}
              className="px-6 py-3 bg-gray-200 text-[#2c3e50] font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              View More {getTypeLabel(content.type)}s
            </Link>
            <Link
              href="/write"
              className="px-6 py-3 bg-[#f39c12] text-white font-semibold rounded-lg hover:bg-[#e67e22] transition"
            >
              Write Your Own
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function BlogViewPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white text-[#1f2937] min-h-screen">
          <Navbar />
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-[#4b5563]">Loading...</p>
          </div>
          <Footer />
        </div>
      }
    >
      <BlogViewContent />
    </Suspense>
  );
}
