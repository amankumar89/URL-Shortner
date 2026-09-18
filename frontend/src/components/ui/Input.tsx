import { forwardRef } from "react";
import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", prefix, ...props }, ref) => {
    if (prefix) {
      return (
        <div className="flex items-stretch rounded-lg border border-border bg-surface-2 focus-within:ring-2 focus-within:ring-accent-ring focus-within:border-accent transition-colors">
          <span className="flex items-center pl-3 pr-1 text-sm font-mono text-text-muted select-none [&>svg]:font-sans">
            {prefix}
          </span>
          <input
            ref={ref}
            className={`flex-1 min-w-0 bg-transparent py-2 pr-3 text-sm text-text-primary placeholder:text-text-muted outline-none ${className}`}
            {...props}
          />
        </div>
      );
    }
    return (
      <input
        ref={ref}
        className={`w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:ring-2 focus:ring-accent-ring focus:border-accent transition-colors ${className}`}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className = "", children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary outline-none focus:ring-2 focus:ring-accent-ring focus:border-accent transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

export function Label({ children }: { children: ReactNode }) {
  return (
    <label className="block text-xs font-medium text-text-secondary mb-1.5">
      {children}
    </label>
  );
}
