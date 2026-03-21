"use client";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 border border-[#E0E0E0]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0]">
          <h3 className="text-lg font-semibold text-[#00338D]">{title}</h3>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-[#1A1A1A]">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white text-[#00338D] border border-[#00338D] font-semibold rounded-lg hover:bg-[#00338D] hover:text-white transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#0091DA] text-white font-semibold rounded-lg hover:bg-[#0077B8] transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
