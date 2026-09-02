import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Size = "sm" | "md";
type Variant = "ghost" | "solid";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AsButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AsAnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type IconButtonProps = AsButtonProps | AsAnchorProps;

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-9 w-9",
  md: "h-12 w-12",
};

const VARIANT_CLASSES: Record<Variant, string> = {
  ghost:
    "text-slate-500 ring-1 ring-slate-300 hover:bg-primary hover:text-white hover:ring-primary",
  solid:
    "bg-white text-slate-600 shadow-sm ring-1 ring-slate-900/5 hover:bg-slate-100 hover:text-slate-900",
};

export default function IconButton({
  children,
  variant = "ghost",
  size = "sm",
  className = "",
  as = "button",
  ...props
}: IconButtonProps) {
  const classes = `flex items-center justify-center rounded-full transition-colors ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${className}`;

  if (as === "a") {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
