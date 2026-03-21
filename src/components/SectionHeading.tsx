import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-navy ${className}`}
    >
      {children}
    </h2>
  );
}
