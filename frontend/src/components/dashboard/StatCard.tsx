import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[13px] text-text-secondary">{label}</p>
        {icon && <span className="text-accent/70">{icon}</span>}
      </div>
      <p className="font-display text-2xl font-semibold text-text-primary truncate">
        {value}
      </p>
    </Card>
  );
}
