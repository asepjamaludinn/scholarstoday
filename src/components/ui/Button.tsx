import { Icon } from "@iconify/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "dark" | "warning";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: string;
  loading?: boolean;
  loadingText?: string;
};

const VARIANT_STYLES: Record<
  ButtonVariant,
  { button: string; circle: string }
> = {
  primary: {
    button: "bg-primary text-white",
    circle: "bg-white text-primary",
  },
  dark: {
    button: "bg-black text-white hover:bg-slate-900",
    circle: "bg-white/10 text-white",
  },
  warning: {
    button: "bg-amber-500 text-white hover:bg-amber-600",
    circle: "bg-white text-amber-600",
  },
};

export default function Button({
  children,
  variant = "primary",
  icon = "lucide:arrow-up-right",
  loading = false,
  loadingText,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`group flex cursor-pointer items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-bold tracking-tight transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${styles.button} ${className}`}
      {...props}
    >
      <span>{loading && loadingText ? loadingText : children}</span>

      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:-rotate-45 ${styles.circle}`}
      >
        {loading ? (
          <Icon icon="lucide:loader-2" className="animate-spin text-base" />
        ) : (
          <Icon icon={icon} className="text-base" />
        )}
      </span>
    </button>
  );
}
