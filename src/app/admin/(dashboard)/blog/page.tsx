"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdminAuth, type Resource } from "@/contexts/AdminAuthContext";
import { MediumLikeEditor } from "@/components/admin/MediumLikeEditor";
import { ConfirmModal } from "@/components/ConfirmModal";

function formatResourceType(t: string) {
  if (t === "case-study") return "Case study";
  if (t === "blog") return "Blog";
  return t;
}

export default function AdminBlogPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Resource | null>(null);

  const {
    loading,
    message,
    error,
    setMessage,
    setError,
    title,
    setTitle,
    type,
    setType,
    summary,
    setSummary,
    content,
    setContent,
    tags,
    setTags,
    setUploadedUrl,
    resources,
    handleSaveResource,
    handleDeleteResource,
    loadResources,
    token,
  } = useAdminAuth();

  const resetForm = useCallback(() => {
    setTitle("");
    setType("blog");
    setSummary("");
    setContent("");
    setTags("");
    setUploadedUrl("");
    setEditingId(null);
  }, [setTitle, setType, setSummary, setContent, setTags, setUploadedUrl]);

  useEffect(() => {
    if (!token) return;
    loadResources().catch(() => {});
  }, [token, loadResources]);

  const openNewResource = () => {
    resetForm();
    setShowAddForm(true);
    setMessage(null);
    setError(null);
  };

  const startEdit = (resource: Resource) => {
    setEditingId(resource.id);
    setTitle(resource.title);
    setType(resource.type === "case-study" ? "case-study" : "blog");
    setSummary(resource.summary || "");
    setContent(resource.content || "");
    setTags(
      Array.isArray(resource.tags) ? resource.tags.join(", ") : ""
    );
    setUploadedUrl("");
    setShowAddForm(true);
    setMessage(null);
    setError(null);
  };

  const closeForm = () => {
    setShowAddForm(false);
    resetForm();
    setMessage(null);
    setError(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const wasEditing = editingId === deleteTarget.id;
    const id = deleteTarget.id;
    setDeleteTarget(null);
    const ok = await handleDeleteResource(id);
    if (ok && wasEditing) closeForm();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#00338D] md:text-3xl">
            Blog management
          </h1>
          <p className="mt-1 text-sm text-[#4d5f80]">
            Create, edit, or delete resources.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (showAddForm) closeForm();
            else openNewResource();
          }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0091DA] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0077b8]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          {showAddForm ? "Close" : "Add resource"}
        </button>
      </div>

      {message && (
        <p className="rounded bg-green-100 px-3 py-2 text-green-800">{message}</p>
      )}
      {error && (
        <p className="rounded bg-red-100 px-3 py-2 text-red-800">{error}</p>
      )}

      {showAddForm && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const plain = content
              .replace(/<[^>]*>/g, " ")
              .replace(/&nbsp;/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            if (!plain) {
              setError("Please add some content.");
              return;
            }
            const ok = await handleSaveResource(e, editingId);
            if (ok) closeForm();
          }}
          className="rounded-md border border-[#e2e8f0] bg-white p-5 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold text-[#00338D]">
            {editingId ? "Edit resource" : "New resource"}
          </h2>

          <div className="mb-4 space-y-1.5">
            <label
              htmlFor="resource-type"
              className="block text-sm font-medium text-[#334155]"
            >
              Resource type
            </label>
            <select
              id="resource-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded border border-[#e2e8f0] bg-white px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#0091DA]"
            >
              <option value="blog">Blog</option>
              <option value="case-study">Case study</option>
            </select>
          </div>

          <div className="mb-4 space-y-1.5">
            <label
              htmlFor="resource-title"
              className="block text-sm font-medium text-[#334155]"
            >
              Title
            </label>
            <input
              id="resource-title"
              required
              className="w-full rounded border border-[#e2e8f0] px-3 py-2 text-sm"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4 space-y-1.5">
            <label
              htmlFor="resource-summary"
              className="block text-sm font-medium text-[#334155]"
            >
              Summary
            </label>
            <input
              id="resource-summary"
              className="w-full rounded border border-[#e2e8f0] px-3 py-2 text-sm"
              placeholder="Short summary (optional)"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="mb-4 space-y-1.5">
            <label
              htmlFor="resource-content"
              className="block text-sm font-medium text-[#334155]"
            >
              Content
            </label>
            <MediumLikeEditor
              key={editingId || "new"}
              id="resource-content"
              value={content}
              onChange={setContent}
              disabled={loading}
              placeholder="Start writing your story…"
              authToken={token}
            />
            <p className="text-xs text-[#64748b]">
              Use the toolbar for headings, quotes, lists, links, and images
              (from your computer or paste). Select text for quick formatting.
            </p>
          </div>

          <div className="mb-4 space-y-1.5">
            <label
              htmlFor="resource-tags"
              className="block text-sm font-medium text-[#334155]"
            >
              Tags
            </label>
            <input
              id="resource-tags"
              className="w-full rounded border border-[#e2e8f0] px-3 py-2 text-sm"
              placeholder="e.g. finance, NGO, strategy (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-xs text-[#64748b]">
              Separate multiple tags with commas.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-[#00338D] px-4 py-2 text-sm font-medium text-white hover:bg-[#002a6e] disabled:opacity-60"
            >
              {loading
                ? "Saving…"
                : editingId
                  ? "Save changes"
                  : "Publish resource"}
            </button>
            <button
              type="button"
              className="rounded border border-[#cbd5e1] bg-white px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              onClick={closeForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className="rounded-md border border-[#e2e8f0] bg-white p-5 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-[#00338D]">Resources</h2>
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setMessage(null);
              setError(null);
              loadResources()
                .then(() => setMessage("Resources refreshed."))
                .catch((e) =>
                  setError(e instanceof Error ? e.message : "Refresh failed.")
                );
            }}
            className="rounded bg-[#0091DA] px-3 py-2 text-sm text-white hover:bg-[#0077b8] disabled:opacity-60"
          >
            Refresh
          </button>
        </div>
        <div className="max-h-[28rem] overflow-auto rounded border border-[#e2e8f0] p-2">
          {resources.length === 0 ? (
            <p className="text-sm text-[#64748b]">No resources yet.</p>
          ) : (
            <ul className="divide-y divide-[#f1f5f9]">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  className="flex flex-col gap-2 py-3 first:pt-1 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-[#0f172a]">{resource.title}</p>
                    <p className="text-xs text-[#64748b]">
                      {formatResourceType(resource.type)} ·{" "}
                      {resource.createdAt || "n/a"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => startEdit(resource)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-medium text-[#00338D] hover:bg-[#f8fafc] disabled:opacity-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setDeleteTarget(resource)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete resource"
        message={
          deleteTarget
            ? `Delete “${deleteTarget.title}”? This cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
