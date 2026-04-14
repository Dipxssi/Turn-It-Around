import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capacity Building Services",
  description:
    "Strengthen governance, planning, and team capability through our capacity building services for NGOs and mission-driven organizations.",
  alternates: {
    canonical: "/services/capacity-building",
  },
};

export default function CapacityBuildingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
