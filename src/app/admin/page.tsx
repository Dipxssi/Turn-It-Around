"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { FileText, BookOpen, Briefcase, TrendingUp, LogOut } from "lucide-react";

type ContentType = "blog" | "case-study" | "insight";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ContentType>("blog");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/check-auth");
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        router.push("/admin/signin");
      }
    } catch (err) {
      router.push("/admin/signin");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await fetch("/api/admin/signout", { method: "POST" });
    router.push("/admin/signin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          title,
          content,
          excerpt,
          category,
          tags: tags.split(",").map((t) => t.trim()),
          author,
          imageUrl,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(`Successfully created ${activeTab}!`);
        // Reset form
        setTitle("");
        setContent("");
        setExcerpt("");
        setCategory("");
        setTags("");
        setAuthor("");
        setImageUrl("");
      } else {
        setSubmitMessage(data.error || "Failed to create content");
      }
    } catch (err) {
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-[#2c3e50]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: "blog" as ContentType, label: "Blog Post", icon: BookOpen },
    { id: "case-study" as ContentType, label: "Case Study", icon: Briefcase },
    { id: "insight" as ContentType, label: "Industry Insight", icon: TrendingUp },
  ];

  const categories = {
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
    insight: [
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
  };

  return (
    <div id="top" className="bg-white text-[#2c3e50] min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12 md:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#2c3e50]">Content Management</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSubmitMessage("");
                }}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                  activeTab === tab.id
                    ? "text-[#f39c12] border-b-2 border-[#f39c12]"
                    : "text-gray-600 hover:text-[#2c3e50]"
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {submitMessage && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm ${
                submitMessage.includes("Successfully")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {submitMessage}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[#2c3e50] mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none"
                placeholder="Enter the title"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-[#2c3e50] mb-2">
                Excerpt/Summary *
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none resize-none"
                placeholder="Brief summary of the content"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-[#2c3e50] mb-2">
                Content *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none resize-none font-mono text-sm"
                placeholder="Write your content here (supports markdown)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-[#2c3e50] mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none"
                >
                  <option value="">Select a category</option>
                  {categories[activeTab].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-[#2c3e50] mb-2">
                  Author *
                </label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none"
                  placeholder="Author name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-[#2c3e50] mb-2">
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-[#2c3e50] mb-2">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#f39c12] text-white py-3 rounded-lg font-semibold hover:bg-[#e67e22] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Publishing..." : `Publish ${tabs.find((t) => t.id === activeTab)?.label}`}
            </button>
          </div>
        </form>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

