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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, isFirebaseClientConfigured } from "@/lib/firebase-client";

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

function toIso(value: unknown): string | undefined {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return undefined;
}

function mapResource(docSnap: QueryDocumentSnapshot): Resource {
  const data = docSnap.data() as {
    title?: string;
    type?: string;
    summary?: string | null;
    content?: string;
    coverImageUrl?: string | null;
    attachmentUrl?: string | null;
    tags?: string[];
    createdAt?: unknown;
  };

  return {
    id: docSnap.id,
    title: data.title || "",
    type: data.type || "blog",
    summary: data.summary ?? "",
    content: data.content || "",
    coverImageUrl: data.coverImageUrl ?? null,
    attachmentUrl: data.attachmentUrl ?? null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    createdAt: toIso(data.createdAt),
  };
}

function mapInquiry(docSnap: QueryDocumentSnapshot): Inquiry {
  const data = docSnap.data() as {
    name?: string;
    organization?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
    createdAt?: unknown;
  };

  return {
    id: docSnap.id,
    name: data.name,
    organization: data.organization,
    email: data.email,
    phone: data.phone,
    service: data.service,
    message: data.message,
    createdAt: toIso(data.createdAt),
  };
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
    if (!isFirebaseClientConfigured()) {
      setToken("");
      setResources([]);
      setInquiries([]);
      setError(
        "Admin is not configured: missing NEXT_PUBLIC_FIREBASE_API_KEY / NEXT_PUBLIC_FIREBASE_PROJECT_ID."
      );
      setAuthReady(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), async (user) => {
      if (!user) {
        setToken("");
        window.localStorage.removeItem(TOKEN_KEY);
        setResources([]);
        setInquiries([]);
        setAuthReady(true);
        return;
      }
      const idToken = await user.getIdToken();
      setToken(idToken);
      window.localStorage.setItem(TOKEN_KEY, idToken);
      setAuthReady(true);
    });
    return unsubscribe;
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
    signOut(getFirebaseAuth()).finally(() => {
      setToken("");
      setResources([]);
      setInquiries([]);
      window.localStorage.removeItem(TOKEN_KEY);
      setMessage(null);
      setError(null);
      setAuthMode("signin");
    });
  }, []);

  const loadResources = useCallback(async () => {
    const q = query(
      collection(getFirebaseDb(), "resources"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    setResources(snapshot.docs.map(mapResource));
  }, []);

  const loadInquiries = useCallback(async () => {
    const q = query(
      collection(getFirebaseDb(), "inquiries"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    setInquiries(snapshot.docs.map(mapInquiry));
  }, []);

  const handleDeleteInquiry = useCallback(
    async (id: string): Promise<boolean> => {
      setLoading(true);
      setMessage(null);
      setError(null);
      try {
        await deleteDoc(doc(getFirebaseDb(), "inquiries", id));
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
    [loadInquiries]
  );

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(
        getFirebaseAuth(),
        signupEmail.trim(),
        signupPassword
      );
      if (signupFullName.trim()) {
        await updateProfile(credential.user, { displayName: signupFullName.trim() });
      }
      const idToken = await credential.user.getIdToken();
      persistToken(idToken);
      setMessage(null);
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
      const credential = await signInWithEmailAndPassword(
        getFirebaseAuth(),
        signinEmail.trim(),
        signinPassword
      );
      const idToken = await credential.user.getIdToken();
      persistToken(idToken);
      setMessage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signin failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    void e;
    if (uploadFile) {
      setUploadFile(null);
    }
    setError("Direct file upload is disabled. Insert images directly in the editor.");
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
    try {
      if (isEdit) {
        await updateDoc(doc(getFirebaseDb(), "resources", resourceId!), {
          ...body,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(getFirebaseDb(), "resources"), {
          ...body,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
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
      await deleteDoc(doc(getFirebaseDb(), "resources", id));
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
