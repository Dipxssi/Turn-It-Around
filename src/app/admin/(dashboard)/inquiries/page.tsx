"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { ConfirmModal } from "@/components/ConfirmModal";

export default function AdminInquiriesPage() {
  const {
    loading,
    message,
    error,
    setMessage,
    setError,
    inquiries,
    loadInquiries,
    handleDeleteInquiry,
    token,
  } = useAdminAuth();

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string | null;
    name: string;
  }>({ isOpen: false, id: null, name: "" });

  useEffect(() => {
    if (!token) return;
    loadInquiries().catch(() => {});
  }, [token, loadInquiries]);

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    const ok = await handleDeleteInquiry(deleteModal.id);
    setDeleteModal({ isOpen: false, id: null, name: "" });
    if (ok) {
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, id: null, name: "" });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#00338D] md:text-3xl">
          Inquiries
        </h1>
        <p className="mt-1 text-sm text-[#4d5f80]">
          Contact form submissions from your website.
        </p>
      </div>

      {message && (
        <p className="rounded bg-green-100 px-3 py-2 text-green-800">{message}</p>
      )}
      {error && (
        <p className="rounded bg-red-100 px-3 py-2 text-red-800">{error}</p>
      )}

      <section className="rounded-md border border-[#e2e8f0] bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-[#00338D]">
            Inquiries ({inquiries.length})
          </h2>
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setMessage(null);
              setError(null);
              loadInquiries()
                .then(() => setMessage("Inquiries refreshed."))
                .catch((e) =>
                  setError(e instanceof Error ? e.message : "Refresh failed.")
                );
            }}
            className="rounded bg-[#0091DA] px-3 py-2 text-sm text-white hover:bg-[#0077b8] disabled:opacity-60"
          >
            Refresh
          </button>
        </div>
        <div className="max-h-[min(70vh,560px)] overflow-auto rounded border border-[#e2e8f0] p-3">
          {inquiries.length === 0 ? (
            <p className="text-sm text-[#64748b]">No inquiries yet.</p>
          ) : (
            <ul className="space-y-4">
              {inquiries.map((inquiry) => (
                <li
                  key={inquiry.id}
                  className="rounded-lg border border-[#f1f5f9] bg-[#fafafa] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[#0f172a]">
                        {inquiry.name}
                        {inquiry.email && (
                          <span className="font-normal text-[#64748b]">
                            {" "}
                            · {inquiry.email}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <time className="text-xs text-[#94a3b8]">
                        {inquiry.createdAt || "—"}
                      </time>
                      <button
                        type="button"
                        disabled={loading}
                        title="Delete inquiry"
                        onClick={() =>
                          setDeleteModal({
                            isOpen: true,
                            id: inquiry.id,
                            name: inquiry.name || inquiry.email || "this inquiry",
                          })
                        }
                        className="rounded-md p-2 text-[#94a3b8] transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                  {inquiry.organization && (
                    <p className="mt-1 text-sm text-[#64748b]">
                      Org: {inquiry.organization}
                    </p>
                  )}
                  {inquiry.phone && (
                    <p className="text-sm text-[#64748b]">Phone: {inquiry.phone}</p>
                  )}
                  {inquiry.service && (
                    <p className="text-sm text-[#0091DA]">
                      Service: {inquiry.service}
                    </p>
                  )}
                  <p className="mt-2 whitespace-pre-wrap text-sm text-[#334155]">
                    {inquiry.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete inquiry"
        message={`Remove inquiry from ${deleteModal.name}? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
