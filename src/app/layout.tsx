import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Turn it Around Business | Advisory & Capacity Building",
    template: "%s | Turn it Around Business",
  },
  description:
    "Next.js experience for Turn it Around Business—strategic advisory, capacity building, and financial stewardship for NGOs and SMEs.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Turn it Around Business",
    title: "Turn it Around Business | Advisory & Capacity Building",
    description:
      "Strategic advisory, capacity building, and financial management for NGOs, SMEs, and mission-driven organizations.",
    images: [
      {
        url: "/logo.png",
        alt: "Turn it Around Business",
      },
    ],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
