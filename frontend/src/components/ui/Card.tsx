import type { HTMLAttributes } from "react";

export function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-surface-1 border border-border-soft rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
