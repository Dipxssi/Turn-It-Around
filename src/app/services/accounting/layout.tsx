import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounting and Financial Management Services",
  description:
    "Get expert accounting, reporting, and financial leadership support designed for NGOs, SMEs, and growing organizations.",
  alternates: {
    canonical: "/services/accounting",
  },
};

export default function AccountingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
