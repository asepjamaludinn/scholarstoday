import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "form" | "highlight" | "dark" | "subtle";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
};

const VARIANT_STYLES: Record<CardVariant, string> = {
  form: "rounded-[28px] bg-white shadow-2xl",
  highlight:
    "rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 transition-transform duration-500 hover:-translate-y-1",
  dark: "rounded-[2.5rem] bg-slate-900 shadow-2xl",
  subtle: "rounded-[2.5rem] bg-white shadow-sm ring-1 ring-slate-100",
};

export default function Card({
  children,
  variant = "form",
  className = "",
  ...props
}: CardProps) {
  return (
    <div className={`${VARIANT_STYLES[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
