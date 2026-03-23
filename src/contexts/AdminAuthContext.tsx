"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { apiUrl } from "@/lib/api-base-url";

export type ApiError = { error?: string };

export type Inquiry = {
  id: string;
  name?: string;
  organization?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  createdAt?: string;
};

export type Resource = {
  id: string;
  title: string;
  type: string;
  summary?: string | null;
  content: string;
  coverImageUrl?: string | null;
  attachmentUrl?: string | null;
  tags?: string[];
  createdAt?: string;
};

const TOKEN_KEY = "admin_access_token";

export async function adminFetchJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    const looksHtml =
      trimmed.startsWith("<!") ||
      trimmed.toLowerCase().startsWith("<html") ||
      trimmed.startsWith("<");
    throw new Error(
      looksHtml
        ? "No API on this host (the server returned HTML, not JSON). FTP/static hosting has no /api routes. Deploy this same Next.js app on Vercel (or Node), set NEXT_PUBLIC_API_BASE_URL to that URL, and rebuild your static site so admin & forms call the API."
        : `Server did not return JSON (${response.status}). Check NEXT_PUBLIC_API_BASE_URL and the API deployment.`
    );
  }
  return JSON.parse(text) as T;
}

type AdminAuthContextValue = {
  token: string;
  loading: boolean;
  message: string | null;
  error: string | null;
  setMessage: (v: string | null) => void;
  setError: (v: string | null) => void;
  authMode: "signin" | "signup";
  setAuthMode: (v: "signin" | "signup") => void;
  signupEmail: string;
  setSignupEmail: (v: string) => void;
  signupPassword: string;
  setSignupPassword: (v: string) => void;
  signupFullName: string;
  setSignupFullName: (v: string) => void;
  signinEmail: string;
  setSigninEmail: (v: string) => void;
  signinPassword: string;
  setSigninPassword: (v: string) => void;
  uploadFile: File | null;
  setUploadFile: (v: File | null) => void;
  uploadedUrl: string;
  setUploadedUrl: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  summary: string;
  setSummary: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  tags: string;
  setTags: (v: string) => void;
  resources: Resource[];
  inquiries: Inquiry[];
  isAuthenticated: boolean;
  authHeaders: Record<string, string>;
  persistToken: (value: string) => void;
  logout: () => void;
  handleSignup: (e: FormEvent) => Promise<void>;
  handleSignin: (e: FormEvent) => Promise<void>;
  handleUpload: (e: FormEvent) => Promise<void>;
  handleSaveResource: (
    e: FormEvent,
    resourceId?: string | null
  ) => Promise<boolean>;
  handleDeleteResource: (id: string) => Promise<boolean>;
  loadResources: () => Promise<void>;
  loadInquiries: () => Promise<void>;
  handleDeleteInquiry: (id: string) => Promise<boolean>;
  refreshBlogData: () => Promise<void>;
  refreshInquiriesData: () => Promise<void>;
  /** false until localStorage token has been read (avoid flash / wrong redirect). */
  authReady: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFullName, setSignupFullName] = useState("");

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const [title, setTitle] = useState("");
  /** Stored in Firestore: `blog` | `case-study` */
  const [type, setType] = useState("blog");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const [resources, setResources] = useState<Resource[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(TOKEN_KEY);
    if (savedToken) setToken(savedToken);
    setAuthReady(true);
  }, []);

  const authHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const persistToken = useCallback((value: string) => {
    setToken(value);
    window.localStorage.setItem(TOKEN_KEY, value);
  }, []);

  const logout = useCallback(() => {
    setToken("");
    setResources([]);
    setInquiries([]);
    window.localStorage.removeItem(TOKEN_KEY);
    setMessage(null);
    setError(null);
    setAuthMode("signin");
  }, []);

  const loadResources = useCallback(async () => {
    const response = await fetch(apiUrl("/api/admin/resources"), {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const payload = await adminFetchJson<ApiError & { resources?: Resource[] }>(
      response
    );
    if (!response.ok) {
      throw new Error(payload.error || "Failed to load resources.");
    }
    setResources(payload.resources || []);
  }, [token]);

  const loadInquiries = useCallback(async () => {
    const response = await fetch(apiUrl("/api/admin/inquiries"), {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const payload = await adminFetchJson<ApiError & { inquiries?: Inquiry[] }>(
      response
    );
    if (!response.ok) {
      throw new Error(payload.error || "Failed to load inquiries.");
    }
    setInquiries(payload.inquiries || []);
  }, [token]);

  const handleDeleteInquiry = useCallback(
    async (id: string): Promise<boolean> => {
      setLoading(true);
      setMessage(null);
      setError(null);
      try {
        const response = await fetch(apiUrl(`/api/admin/inquiries/${id}/`), {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const payload = await adminFetchJson<ApiError & { ok?: boolean }>(
          response
        );
        if (!response.ok) {
          throw new Error(payload.error || "Failed to delete inquiry.");
        }
        setMessage("Inquiry deleted.");
        await loadInquiries();
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token, loadInquiries]
  );

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(apiUrl("/api/admin/auth/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupEmail,
          password: signupPassword,
          fullName: signupFullName,
        }),
      });
      const payload = await adminFetchJson<
        ApiError & { session?: { access_token?: string } }
      >(response);
      if (!response.ok) {
        throw new Error(payload.error || "Signup failed.");
      }
      if (payload.session?.access_token) {
        persistToken(payload.session.access_token);
        setMessage(null);
      } else {
        setMessage(
          "Account created. Please sign in with your email and password."
        );
        setAuthMode("signin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(apiUrl("/api/admin/auth/signin"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signinEmail, password: signinPassword }),
      });
      const payload = await adminFetchJson<
        ApiError & { session?: { access_token?: string } }
      >(response);
      if (!response.ok || !payload.session?.access_token) {
        throw new Error(payload.error || "Signin failed.");
      }
      persistToken(payload.session.access_token);
      setMessage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signin failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setError("Select a file to upload.");
      return;
    }
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);

      const response = await fetch(apiUrl("/api/admin/upload"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const payload = await adminFetchJson<
        ApiError & { downloadUrl?: string; gsUrl?: string }
      >(response);
      if (!response.ok) {
        throw new Error(payload.error || "Upload failed.");
      }
      const fileUrl = payload.downloadUrl || payload.gsUrl || "";
      setUploadedUrl(fileUrl);
      setMessage("Upload completed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResource = async (
    e: FormEvent,
    resourceId?: string | null
  ): Promise<boolean> => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    const body = {
      title,
      type,
      summary,
      content,
      coverImageUrl: uploadedUrl || null,
      attachmentUrl: uploadedUrl || null,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    const isEdit = Boolean(resourceId);
    const url = isEdit
      ? apiUrl(`/api/admin/resources/${resourceId}/`)
      : apiUrl("/api/admin/resources");
    const method = isEdit ? "PATCH" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(body),
      });
      const payload = await adminFetchJson<ApiError>(response);
      if (!response.ok) {
        throw new Error(
          payload.error ||
            (isEdit ? "Failed to update resource." : "Failed to create resource.")
        );
      }
      setMessage(isEdit ? "Resource updated." : "Resource created.");
      setTitle("");
      setType("blog");
      setSummary("");
      setContent("");
      setTags("");
      setUploadedUrl("");
      await loadResources();
      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEdit
            ? "Update failed."
            : "Create resource failed."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (id: string): Promise<boolean> => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(apiUrl(`/api/admin/resources/${id}/`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = await adminFetchJson<ApiError & { ok?: boolean }>(
        response
      );
      if (!response.ok) {
        throw new Error(payload.error || "Failed to delete resource.");
      }
      setMessage("Resource deleted.");
      await loadResources();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshBlogData = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await loadResources();
      setMessage("Resources refreshed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh.");
    } finally {
      setLoading(false);
    }
  };

  const refreshInquiriesData = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await loadInquiries();
      setMessage("Inquiries refreshed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh.");
    } finally {
      setLoading(false);
    }
  };

  const value: AdminAuthContextValue = {
    token,
    loading,
    message,
    error,
    setMessage,
    setError,
    authMode,
    setAuthMode,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupFullName,
    setSignupFullName,
    signinEmail,
    setSigninEmail,
    signinPassword,
    setSigninPassword,
    uploadFile,
    setUploadFile,
    uploadedUrl,
    setUploadedUrl,
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
    resources,
    inquiries,
    isAuthenticated,
    authHeaders,
    persistToken,
    logout,
    handleSignup,
    handleSignin,
    handleUpload,
    handleSaveResource,
    handleDeleteResource,
    loadResources,
    loadInquiries,
    handleDeleteInquiry,
    refreshBlogData,
    refreshInquiriesData,
    authReady,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}
