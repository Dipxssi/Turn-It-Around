import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Turn it Around Business for advisory, capacity building, and financial management support tailored to your organization.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
