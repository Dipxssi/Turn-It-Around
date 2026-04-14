import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how Turn it Around Business supports organizations with practical strategy, capacity strengthening, and financial systems.",
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
