import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read insights, updates, and practical guidance from Turn it Around Business on strategy, leadership, and organizational growth.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
