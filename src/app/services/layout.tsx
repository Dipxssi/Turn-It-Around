import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our services in capacity building, strategic advisory, and financial management for NGOs, SMEs, and social enterprises.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
