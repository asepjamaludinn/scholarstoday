import type { ElementType, HTMLAttributes, ReactNode } from "react";

type TextSize = "lg" | "body" | "small" | "xs";

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  size?: TextSize;
  as?: ElementType;
  className?: string;
};

const SIZE_STYLES: Record<TextSize, string> = {
  lg: "text-body-lg",
  body: "text-body",
  small: "text-small",
  xs: "text-xs",
};

export default function Text({
  children,
  size = "body",
  as: Tag = "p",
  className = "",
  ...props
}: TextProps) {
  return (
    <Tag className={`${SIZE_STYLES[size]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
