import type { ElementType, HTMLAttributes, ReactNode } from "react";

type HeadingLevel = "display" | "h1" | "h2" | "h3" | "h4";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
  level: HeadingLevel;
  as?: ElementType;
  className?: string;
};

const LEVEL_STYLES: Record<HeadingLevel, string> = {
  display: "text-display font-black tracking-tight",
  h1: "text-h1 font-black tracking-tight",
  h2: "text-h2 font-bold tracking-tight",
  h3: "text-h3 font-semibold",
  h4: "text-h4 font-semibold",
};

const DEFAULT_TAG: Record<HeadingLevel, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

export default function Heading({
  children,
  level,
  as,
  className = "",
  ...props
}: HeadingProps) {
  const Tag = as ?? DEFAULT_TAG[level];

  return (
    <Tag className={`${LEVEL_STYLES[level]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
