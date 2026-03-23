"use client";

import {
  useEffect,
  useCallback,
  useRef,
  useState,
  useId,
  type ReactNode,
} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  Bold,
  Italic,
  Heading2,
  Quote,
  List,
  ListOrdered,
  Minus,
  Link as LinkIcon,
  ImageIcon,
} from "lucide-react";
import { apiUrl } from "@/lib/api-base-url";

const DEFAULT_MAX_EMBED_BYTES = 350 * 1024;

/**
 * When `true` (set `NEXT_PUBLIC_ADMIN_IMAGES_DATA_URL_ONLY=true` in `.env.local`),
 * images are never uploaded to Firebase Storage — only `FileReader.readAsDataURL()`
 * into the HTML, same as storing base64 in Firestore fields (no bucket).
 */
const DATA_URL_ONLY_IMAGES =
  process.env.NEXT_PUBLIC_ADMIN_IMAGES_DATA_URL_ONLY === "true";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

type Props = {
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  /** When set, images are uploaded via `POST /api/admin/upload` (Firebase Storage). */
  authToken?: string | null;
  /** Max image size when embedding as data URL if upload is unavailable (Firestore ~1MB doc limit). */
  maxEmbeddedImageBytes?: number;
  /**
   * If true, skip Storage and always embed as data URL (overrides env for this instance).
   * Usually use `NEXT_PUBLIC_ADMIN_IMAGES_DATA_URL_ONLY` instead.
   */
  dataUrlOnly?: boolean;
};

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-md p-2 text-[#334155] transition hover:bg-[#f1f5f9] ${
        active ? "bg-[#e2e8f0] text-[#00338D]" : ""
      }`}
    >
      {children}
    </button>
  );
}

export function MediumLikeEditor({
  value,
  onChange,
  disabled = false,
  placeholder = "Tell your story…",
  id,
  authToken,
  maxEmbeddedImageBytes = DEFAULT_MAX_EMBED_BYTES,
  dataUrlOnly: dataUrlOnlyProp,
}: Props) {
  const dataUrlOnly = dataUrlOnlyProp ?? DATA_URL_ONLY_IMAGES;
  const fileInputId = useId();
  const insertImageRef = useRef<(file: File) => Promise<void>>(async () => {});
  const [uploadHint, setUploadHint] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        bulletList: { HTMLAttributes: { class: "ml-4 list-disc" } },
        orderedList: { HTMLAttributes: { class: "ml-4 list-decimal" } },
      }),
      Placeholder.configure({ placeholder }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-[#0091DA] underline underline-offset-2",
        },
      }),
      Underline,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4 block",
        },
      }),
    ],
    content: value || "",
    editable: !disabled,
    editorProps: {
      attributes: {
        id: id ?? "",
        class:
          "medium-like-editor__content focus:outline-none max-w-none px-4 py-6 md:px-8",
      },
      handlePaste(_view, event) {
        const items = Array.from(event.clipboardData?.items || []);
        for (const item of items) {
          if (item.kind === "file" && item.type.startsWith("image/")) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) void insertImageRef.current(file);
            return true;
          }
        }
        return false;
      },
      handleDrop(_view, event) {
        const dt = event.dataTransfer;
        if (!dt?.files?.length) return false;
        const images = Array.from(dt.files).filter((f) =>
          f.type.startsWith("image/")
        );
        if (!images.length) return false;
        event.preventDefault();
        void insertImageRef.current(images[0]);
        return true;
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  const insertImageFromFile = useCallback(
    async (file: File) => {
      if (!editor) return;
      if (!file.type.startsWith("image/")) {
        setUploadHint("Please choose an image file.");
        return;
      }
      setUploadHint(null);
      let url: string;
      const maxBytes = maxEmbeddedImageBytes;
      const maxKb = Math.round(maxBytes / 1024);

      /* No Storage bucket — same pattern as blogApi.uploadImage + Firestore field */
      if (dataUrlOnly) {
        if (file.size > maxBytes) {
          setUploadHint(
            `Image too large for inline storage (max ~${maxKb}KB). Firestore documents are ~1MB total including HTML.`
          );
          return;
        }
        url = await readFileAsDataUrl(file);
        setUploadHint(null);
        editor.chain().focus().setImage({ src: url, alt: file.name }).run();
        return;
      }

      if (authToken) {
        let uploadErrorMessage = "Upload failed";
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch(apiUrl("/api/admin/upload"), {
            method: "POST",
            headers: { Authorization: `Bearer ${authToken}` },
            body: formData,
          });
          let data: { downloadUrl?: string; error?: string } = {};
          try {
            data = (await res.json()) as typeof data;
          } catch {
            /* non-JSON body */
          }
          if (res.ok && data.downloadUrl) {
            url = data.downloadUrl!;
          } else {
            uploadErrorMessage = data.error || `HTTP ${res.status}`;
            throw new Error(uploadErrorMessage);
          }
        } catch (e) {
          if (e instanceof Error && e.message !== uploadErrorMessage) {
            uploadErrorMessage = e.message;
          }
          if (file.size > maxBytes) {
            setUploadHint(
              `Could not upload (${uploadErrorMessage}). File too large to embed (max ~${maxKb}KB). Configure Firebase Storage or use a smaller image.`
            );
            return;
          }
          url = await readFileAsDataUrl(file);
          setUploadHint(null);
        }
      } else {
        if (file.size > maxBytes) {
          setUploadHint(
            `Without Storage, use images under ~${maxKb}KB, or sign in with Storage configured.`
          );
          return;
        }
        url = await readFileAsDataUrl(file);
        setUploadHint(null);
      }

      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    },
    [editor, authToken, maxEmbeddedImageBytes, dataUrlOnly]
  );

  useEffect(() => {
    insertImageRef.current = insertImageFromFile;
  }, [insertImageFromFile]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (next === current) return;
    editor.commands.setContent(next, { emitUpdate: false });
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="min-h-[280px] rounded-xl border border-[#e2e8f0] bg-[#fafafa] animate-pulse" />
    );
  }

  return (
    <div className="medium-like-editor rounded-xl border border-[#e2e8f0] bg-white shadow-sm transition focus-within:border-[#0091DA] focus-within:ring-2 focus-within:ring-[#0091DA]/20">
      {/* Top toolbar — Medium-style quick blocks */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[#f1f5f9] bg-[#fafafa] px-2 py-1.5 md:px-3">
        <ToolbarButton
          title="Heading"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="h-4 w-4" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          title="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          title="Divider"
          active={false}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" strokeWidth={2} />
        </ToolbarButton>
        {/* Label + file input: reliable file picker (avoids prompt() / broken programmatic click). */}
        <label
          htmlFor={fileInputId}
          title="Insert image from your computer"
          className={`inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-[#334155] transition hover:bg-[#f1f5f9] ${
            disabled ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <ImageIcon className="h-4 w-4" strokeWidth={2} aria-hidden />
          <span className="sr-only">Insert image from computer</span>
        </label>
        <input
          id={fileInputId}
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={disabled}
          tabIndex={-1}
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (f) void insertImageFromFile(f);
          }}
        />
        <ToolbarButton
          title="Add link (URL)"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <LinkIcon className="h-4 w-4" strokeWidth={2} />
        </ToolbarButton>
      </div>
      {uploadHint && (
        <p className="border-b border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          {uploadHint}
        </p>
      )}

      <BubbleMenu
        editor={editor}
        className="flex items-center gap-0.5 rounded-lg border border-[#e2e8f0] bg-white p-1 shadow-lg"
      >
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-3.5 w-3.5" strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-3.5 w-3.5" strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          title="Add link (URL)"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <LinkIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
        </ToolbarButton>
      </BubbleMenu>

      <EditorContent editor={editor} />
    </div>
  );
}
