import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  BarChart3,
  FolderOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { useLogout } from "@/hooks/useAuth";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/create", label: "Create URL", icon: Plus, end: false },
  { to: "/analytics", label: "Analytics", icon: BarChart3, end: false },
  { to: "/links", label: "My links", icon: FolderOpen, end: false },
  { to: "/settings", label: "Settings", icon: Settings, end: false },
];

export function Sidebar() {
  const { mutate: logout } = useLogout();

  return (
    <nav className="w-50 shrink-0 border-r border-border-soft p-3 flex flex-col gap-0.5">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors relative ${
              isActive
                ? "bg-accent-soft text-accent"
                : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-0.75 rounded-full bg-accent" />
              )}
              <Icon size={16} strokeWidth={2} />
              {label}
            </>
          )}
        </NavLink>
      ))}

      <div className="border-t border-border-soft my-2" />

      <button
        onClick={() => logout()}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors cursor-pointer"
      >
        <LogOut size={16} strokeWidth={2} />
        Log out
      </button>
    </nav>
  );
}
