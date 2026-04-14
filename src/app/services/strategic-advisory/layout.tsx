import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Advisory Services",
  description:
    "Build sustainable growth with strategic advisory and turnaround support tailored to organizations navigating change.",
  alternates: {
    canonical: "/services/strategic-advisory",
  },
};

export default function StrategicAdvisoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
