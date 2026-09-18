import { Outlet } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Sidebar } from "@/components/layout/Sidebar";

export function AppShell() {
  return (
    <div className="min-h-screen flex items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-275 flex flex-col rounded-2xl border border-border-soft bg-surface-1/60 backdrop-blur overflow-hidden shadow-2xl shadow-black/40">
        <Topbar />
        <div className="flex flex-1 min-h-160">
          <Sidebar />
          <main className="flex-1 min-w-0 p-6 md:p-8 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
