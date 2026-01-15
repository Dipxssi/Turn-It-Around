"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConfirmModal } from "@/components/ConfirmModal";
import {
  getSupabaseContent,
  createSupabaseContent,
  updateSupabaseContent,
  deleteSupabaseContent,
  type ContentItem,
} from "@/lib/content";

type ContentType = "blog" | "case-study" | "insight";

const categoriesByType: Record<ContentType, string[]> = {
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

type ViewMode = "list" | "create" | "edit";

export default function WritePage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [contentType, setContentType] = useState<ContentType>("blog");
  const [existingContent, setExistingContent] = useState<ContentItem[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    author: "",
    imageUrl: "",
    imageFile: null as File | null,
    imagePreview: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Load existing content from Supabase
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await getSupabaseContent();
        setExistingContent(content);
      } catch (error) {
        console.error("Error loading content:", error);
        setNotification({
          message: "Failed to load content. Please refresh the page.",
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
      }
    };
    loadContent();
  }, []);

  // Handle image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setNotification({ message: "Please select an image file", type: "error" });
        setTimeout(() => setNotification(null), 3000);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setNotification({ message: "Image size should be less than 5MB", type: "error" });
        setTimeout(() => setNotification(null), 3000);
        return;
      }

      setFormData((prev) => ({ ...prev, imageFile: file, imageUrl: "" }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Parse tags from comma-separated string
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      // Determine image URL
      let imageUrl = formData.imageUrl;
      const shouldUploadImage = !!formData.imageFile;
      const shouldDeleteOldImage = editingId && formData.imageFile;

      if (editingId) {
        // Update existing content in Supabase
        const existingItem = existingContent.find((c) => c.id === editingId);
        if (!existingItem) {
          throw new Error("Content not found");
        }

        const updatedContent: Partial<ContentItem> = {
          type: contentType,
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt || formData.content.substring(0, 150) + "...",
          category: formData.category || categoriesByType[contentType][0],
          tags: tagsArray,
          author: formData.author,
          imageUrl: imageUrl || "",
          published: true,
        };

        await updateSupabaseContent(
          editingId,
          updatedContent,
          formData.imageFile || null,
          shouldDeleteOldImage
        );

        // Reload content list
        const refreshedContent = await getSupabaseContent();
        setExistingContent(refreshedContent);

        setSuccess(true);
        setNotification({
          message: "Content updated successfully!",
          type: "success",
        });
        setTimeout(() => {
          setViewMode("list");
          setEditingId(null);
          resetForm();
          setNotification(null);
        }, 1500);
      } else {
        // Create new content in Supabase
        const newContent: Omit<ContentItem, "id" | "createdAt"> = {
          type: contentType,
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt || formData.content.substring(0, 150) + "...",
          category: formData.category || categoriesByType[contentType][0],
          tags: tagsArray,
          author: formData.author,
          imageUrl: imageUrl || "",
          published: true,
        };

        await createSupabaseContent(newContent, formData.imageFile || null);

        // Reload content list
        const refreshedContent = await getSupabaseContent();
        setExistingContent(refreshedContent);

        setSuccess(true);
        setNotification({
          message: "Content created successfully!",
          type: "success",
        });
        setTimeout(() => {
          setViewMode("list");
          resetForm();
          setNotification(null);
        }, 1500);
      }
    } catch (error) {
      console.error("Error submitting content:", error);
      setNotification({
        message: error instanceof Error 
          ? error.message 
          : "There was an error submitting your content. Please try again.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setContentType(item.type);
    setFormData({
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      category: item.category,
      tags: item.tags.join(", "),
      author: item.author,
      imageUrl: item.imageUrl && !item.imageUrl.startsWith("data:") ? item.imageUrl : "",
      imageFile: null,
      imagePreview: item.imageUrl || "",
    });
    setViewMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (deleteModal.id) {
      try {
        const success = await deleteSupabaseContent(deleteModal.id);
        if (success) {
          // Reload content list
          const refreshedContent = await getSupabaseContent();
          setExistingContent(refreshedContent);
          setNotification({ message: "Content deleted successfully!", type: "success" });
          setTimeout(() => setNotification(null), 3000);
        } else {
          setNotification({ message: "Failed to delete content.", type: "error" });
          setTimeout(() => setNotification(null), 3000);
        }
      } catch (error) {
        console.error("Error deleting content:", error);
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

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: "",
      author: "",
      imageUrl: "",
      imageFile: null,
      imagePreview: "",
    });
    setEditingId(null);
    setSuccess(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  return (
    <div className="bg-white text-[#1f2937] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-0 py-12 md:py-16 text-white min-h-[30vh] md:min-h-[40vh] mt-16 md:mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/blogs.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/50 via-[#1e3a5f]/30 to-transparent" />
        <div className="relative mx-auto flex w-[90%] max-w-[1800px] flex-col gap-3 md:gap-4 text-left px-4 lg:px-12">
          <div className="relative backdrop-blur-sm bg-[#1e3a5f]/40 rounded-xl p-6 md:p-8 border border-white/10 shadow-2xl max-w-4xl">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.35em] text-[#f39c12] font-semibold drop-shadow-md">
              Content Management
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3rem] font-extrabold leading-tight lg:leading-[1.1] mt-2 md:mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.7)]">
              {viewMode === "list" && "Manage Your Content"}
              {viewMode === "create" && "Create New Content"}
              {viewMode === "edit" && "Edit Content"}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white font-medium max-w-3xl mt-3 md:mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.7)]">
              {viewMode === "list" &&
                "Create, edit, or delete your content submissions."}
              {(viewMode === "create" || viewMode === "edit") &&
                "Fill in the form below to submit your content."}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-0 py-12 md:py-16">
        <div className="mx-auto w-[90%] max-w-6xl px-4 lg:px-12">
          {/* Navigation Tabs */}
          {viewMode === "list" && (
            <div className="mb-8 flex gap-4">
              <button
                onClick={() => setViewMode("create")}
                className="px-6 py-3 bg-[#f39c12] text-white font-semibold rounded-lg hover:bg-[#e67e22] transition"
              >
                + Create New Content
              </button>
            </div>
          )}

          {(viewMode === "create" || viewMode === "edit") && (
            <div className="mb-8">
              <button
                onClick={() => {
                  setViewMode("list");
                  resetForm();
                }}
                className="flex items-center gap-2 text-[#f39c12] hover:underline"
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
                Back to List
              </button>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              <p className="font-semibold">
                Content {editingId ? "updated" : "created"} successfully!
              </p>
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div>
              {existingContent.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#4b5563] text-lg mb-4">
                    No content submitted yet.
                  </p>
                  <button
                    onClick={() => setViewMode("create")}
                    className="px-6 py-3 bg-[#f39c12] text-white font-semibold rounded-lg hover:bg-[#e67e22] transition"
                  >
                    Create Your First Content
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {existingContent.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {item.imageUrl && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-[#f39c12]/10 text-[#f39c12] text-xs font-semibold rounded-full">
                            {getTypeLabel(item.type)}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#2c3e50] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="text-xs text-gray-500 mb-4">
                          By {item.author} • {formatDate(item.createdAt)}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="flex-1 px-4 py-2 bg-[#f39c12] text-white text-sm font-semibold rounded-lg hover:bg-[#e67e22] transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Create/Edit Form */}
          {(viewMode === "create" || viewMode === "edit") && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Content Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-[#2c3e50] mb-3">
                  Content Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(["blog", "case-study", "insight"] as ContentType[]).map(
                    (type) => {
                      const labels: Record<ContentType, string> = {
                        blog: "Blog",
                        "case-study": "Case Study",
                        insight: "Industry Insight",
                      };
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setContentType(type);
                            setFormData((prev) => ({
                              ...prev,
                              category: categoriesByType[type][0],
                            }));
                          }}
                          className={`px-6 py-4 rounded-lg border-2 font-semibold transition ${
                            contentType === type
                              ? "bg-[#f39c12] text-white border-[#f39c12]"
                              : "bg-white text-[#2c3e50] border-gray-300 hover:border-[#f39c12]"
                          }`}
                        >
                          {labels[type]}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-[#2c3e50] mb-2"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none"
                  placeholder="Enter the title of your content"
                />
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-[#2c3e50] mb-2"
                >
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none resize-y"
                  placeholder="Write your content here..."
                />
              </div>

              {/* Excerpt */}
              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-semibold text-[#2c3e50] mb-2"
                >
                  Excerpt (Short Description)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none resize-y"
                  placeholder="A brief summary (will auto-generate if left empty)"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-[#2c3e50] mb-2"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none bg-white"
                >
                  <option value="">Select a category</option>
                  {categoriesByType[contentType].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold text-[#2c3e50] mb-2"
                >
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none"
                  placeholder="e.g., governance, strategy, finance"
                />
              </div>

              {/* Author */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-semibold text-[#2c3e50] mb-2"
                >
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-[#2c3e50] mb-2">
                  Image <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <div className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Upload from device:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#f39c12] file:text-white hover:file:bg-[#e67e22] file:cursor-pointer"
                    />
                    {formData.imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                          <Image
                            src={formData.imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              imageFile: null,
                              imagePreview: "",
                            }));
                          }}
                          className="mt-2 text-sm text-red-600 hover:underline"
                        >
                          Remove image
                        </button>
                      </div>
                    )}
                  </div>

                  {/* OR Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Enter image URL:
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      disabled={!!formData.imageFile}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.imageFile && (
                      <p className="mt-1 text-xs text-gray-500">
                        Clear uploaded image to use URL instead
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#f39c12] text-white font-semibold rounded-lg hover:bg-[#e67e22] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingId
                    ? "Update Content"
                    : "Create Content"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode("list");
                    resetForm();
                  }}
                  className="px-8 py-3 bg-gray-200 text-[#2c3e50] font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
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
          className={`fixed bottom-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 ${
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
