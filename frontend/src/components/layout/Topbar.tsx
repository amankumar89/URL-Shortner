import { LogoMark } from "@/components/ui/Logo";
import { useMe } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const { data: user } = useMe();
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "AC";
  let workspace = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-border-soft">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-accent-soft flex items-center justify-center">
          <LogoMark size={16} />
        </div>
        <span className="font-display font-semibold text-[15px] tracking-tight">
          Linkly
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-[13px] text-text-secondary">{workspace}</span>
        <div className="h-7 w-7 rounded-full bg-accent-soft flex items-center justify-center text-[11px] font-medium text-accent">
          {initials}
        </div>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="h-7 w-7 rounded-md flex items-center justify-center text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors cursor-pointer"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
