import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Turn it Around Business, our mission, values, and strategic approach to helping NGOs and SMEs grow sustainably.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
