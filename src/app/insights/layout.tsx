import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Discover expert insights from Turn it Around Business on advisory, operations, governance, and sustainable growth.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
