import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-body text-sm transition-[all_0.3s_ease] rounded-none";
  
  const variants = {
    primary: "bg-[#0091DA] text-white hover:bg-[#0077B8]",
    secondary:
      "bg-transparent text-[#00338D] border border-[#00338D] hover:bg-[#00338D] hover:text-white",
    outline:
      "bg-transparent text-white border border-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.1)]",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
