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
    <>
      <nav className="hidden md:flex w-50 shrink-0 border-r border-border-soft p-3 flex-col gap-0.5 h-screen sticky top-0">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors relative ${isActive
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
      {/* MOBILE BOTTOM NAV - Uses identical styling tokens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border-soft bg-background p-2 pb-safe">
        <div className="flex items-center justify-around gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `group flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-lg text-[10px] transition-colors relative flex-1 ${isActive
                  ? "bg-accent-soft text-accent"
                  : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute top-0 left-1.5 right-1.5 h-0.75 rounded-full bg-accent" />
                  )}
                  <Icon size={14} strokeWidth={2} />
                  {/* <span className="leading-none">{label}</span> */}
                </>
              )}
            </NavLink>
          ))}
          <button
            onClick={() => logout()}
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-lg text-[10px] text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors cursor-pointer flex-1"
          >
            <LogOut size={14} strokeWidth={2} />
            {/* <span className="leading-none">Log out</span> */}
          </button>
        </div>
      </nav>
    </>
  );
}