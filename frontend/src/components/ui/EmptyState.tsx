import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {icon && (
        <div className="h-11 w-11 rounded-full bg-surface-2 flex items-center justify-center text-text-muted mb-3">
          {icon}
        </div>
      )}
      <p className="text-sm font-medium text-text-primary">{title}</p>
      {description && (
        <p className="text-xs text-text-secondary mt-1 max-w-[280px]">
          {description}
        </p>
      )}
    </div>
  );
}
