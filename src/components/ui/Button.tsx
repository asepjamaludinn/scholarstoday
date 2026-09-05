import { Icon } from "@iconify/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "dark" | "warning" | "outline";
type IconVariant = "badge" | "inline" | "none";
type IconPosition = "left" | "right";
type ButtonSize = "md" | "sm" | "xs";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: string;
  iconClassName?: string;
  iconVariant?: IconVariant;
  iconPosition?: IconPosition;
  size?: ButtonSize;
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
  outline: {
    button: "border border-slate-200 text-slate-600 hover:bg-slate-50",
    circle: "bg-slate-100 text-slate-600",
  },
};

const BADGE_CONTAINER =
  "group flex items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-bold tracking-tight transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70";

const BADGE_ICON_WRAPPER =
  "flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:-rotate-45";

const INLINE_CONTAINER: Record<ButtonSize, string> = {
  md: "inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",

  sm: "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm",

  xs: "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:py-2.5 sm:text-sm",
};

const NONE_CONTAINER: Record<ButtonSize, string> = {
  md: "cursor-pointer rounded-full py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",

  sm: "cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",

  xs: "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
};

export default function Button({
  children,
  variant = "primary",
  icon = "lucide:arrow-up-right",
  iconClassName = "text-base",
  iconVariant = "badge",
  iconPosition = "left",
  size = "md",
  loading = false,
  loadingText,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const styles = VARIANT_STYLES[variant];

  const content = loading && loadingText ? loadingText : children;

  const isDisabled = disabled || loading;

  const inlineIconNode = loading ? (
    <Icon icon="lucide:loader-2" className={`animate-spin ${iconClassName}`} />
  ) : (
    <Icon icon={icon} className={iconClassName} />
  );

  if (iconVariant === "badge") {
    return (
      <button
        type={type}
        disabled={isDisabled}
        className={`${BADGE_CONTAINER} ${styles.button} ${className}`}
        {...props}
      >
        <span>{content}</span>

        <span className={`${BADGE_ICON_WRAPPER} ${styles.circle}`}>
          {loading ? (
            <Icon icon="lucide:loader-2" className="animate-spin text-base" />
          ) : (
            <Icon icon={icon} className="text-base" />
          )}
        </span>
      </button>
    );
  }

  if (iconVariant === "inline") {
    return (
      <button
        type={type}
        disabled={isDisabled}
        className={`${INLINE_CONTAINER[size]} ${styles.button} ${className}`}
        {...props}
      >
        {iconPosition === "left" && inlineIconNode}

        <span>{content}</span>

        {iconPosition === "right" && inlineIconNode}
      </button>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${NONE_CONTAINER[size]} ${styles.button} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
