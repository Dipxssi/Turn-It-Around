"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  getAllContent,
  getContentById,
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

    const loadContent = async () => {
      try {
        const staticContent = staticContentData as ContentItem[];
        const found = await getContentById(id, staticContent);

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

  const contentLooksLikeHtml = (text: string) =>
    typeof text === "string" && /<[a-z][\s\S]*>/i.test(text);

  if (loading) {
    return (
      <div className="bg-white text-[#1A1A1A] min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[#757575]">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-white text-[#1A1A1A] min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#00338D] mb-4">
              Content Not Found
            </h1>
            <Link
              href="/blog"
              className="text-[#0091DA] hover:underline"
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
    <div className="bg-white text-[#1A1A1A] min-h-screen">
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#002A6E]/70 via-[#002A6E]/50 to-transparent" />
        </section>
      )}

      {/* Content Section */}
      <section className={`px-0 ${content.imageUrl ? "py-12 md:py-16" : "py-12 md:py-16 mt-16 md:mt-20"}`}>
        <div className="mx-auto w-[90%] max-w-4xl px-4 lg:px-12">
          {/* Back Button */}
          <Link
            href={getBackUrl()}
            className="inline-flex items-center gap-2 text-[#0091DA] hover:underline mb-6"
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
              <span className="px-3 py-1 bg-[#0091DA]/10 text-[#0091DA] text-sm font-semibold rounded-full">
                {getTypeLabel(content.type)}
              </span>
              <span className="px-3 py-1 bg-[#F2F2F2] text-[#757575] text-sm font-semibold rounded-full border border-[#E0E0E0]">
                {content.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00338D] mb-4">
              {content.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#757575]">
              <span>By {content.author}</span>
              <span>•</span>
              <span>{formatDate(content.createdAt)}</span>
            </div>
          </div>

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-[#E0E0E0]">
              {content.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#F2F2F2] text-[#757575] text-sm rounded-full border border-[#E0E0E0]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content — admin/Tiptap posts are HTML */}
          {contentLooksLikeHtml(content.content) ? (
            <article
              className="prose prose-lg max-w-none mb-12 prose-headings:text-[#00338D] prose-a:text-[#0091DA] prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          ) : (
            <article className="prose prose-lg max-w-none mb-12">
              <div className="text-[#1A1A1A] leading-relaxed whitespace-pre-line">
                {content.content.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          )}

          {/* Footer Actions */}
          <div className="pt-8 border-t border-[#E0E0E0] flex gap-4">
            <Link
              href={getBackUrl()}
              className="px-6 py-3 bg-white text-[#00338D] border border-[#00338D] font-semibold rounded-lg hover:bg-[#00338D] hover:text-white transition"
            >
              View More {getTypeLabel(content.type)}s
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
        <div className="bg-white text-[#1A1A1A] min-h-screen">
          <Navbar />
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-[#757575]">Loading...</p>
          </div>
          <Footer />
        </div>
      }
    >
      <BlogViewContent />
    </Suspense>
  );
}
