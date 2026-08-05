import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { useLinks } from "@/hooks/useLinks";
import { MousePointerClick, Trophy, Activity, Percent } from "lucide-react";
import { statusSoftBg, statusStyles } from "@/helper";

export default function AnalyticsPage() {
  const { data, isLoading } = useLinks();
  const links = data?.links ?? [];
  const total = links.length;

  const totalClicks = links.reduce((s, l) => s + (l.clickCount ?? 0), 0);
  const top = [...links].sort((a, b) => b.clickCount - a.clickCount)[0];
  const active = links.filter((l) => l.status === "ACTIVE").length;
  const activeRate = total ? Math.round((active / total) * 100) : 0;

  const maxClicks = Math.max(1, ...links.map((l) => l.clickCount));
  const sortedByClicks = [...links].sort((a, b) => b.clickCount - a.clickCount);

  const statusCounts: Record<LinkStatus, number> = {
    ACTIVE: 0,
    PAUSED: 0,
    EXPIRED: 0,
  };

  links.forEach((l) => statusCounts[l.status]++);

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Analytics"
        subtitle="How your links are performing over time."
      />

      {isLoading ? null : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <StatCard
              label="Total clicks"
              value={totalClicks.toLocaleString()}
              icon={<MousePointerClick size={16} />}
            />
            <StatCard
              label="Top link"
              value={top ? top.shortCode : "—"}
              icon={<Trophy size={16} />}
            />
            <StatCard
              label="Active links"
              value={active.toLocaleString()}
              icon={<Activity size={16} />}
            />
            <StatCard
              label="Active rate"
              value={`${activeRate}%`}
              icon={<Percent size={16} />}
            />
          </div>

          <p className="text-sm font-medium mb-3">Clicks by link</p>
          <Card className="p-4 mb-8">
            <div className="flex flex-col gap-3.5">
              {sortedByClicks.map((link) => {
                const pct = Math.round((link?.clickCount / maxClicks) * 100);
                return (
                  <div key={link?.id}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-text-secondary font-mono">
                        {link?.shortCode}
                      </span>
                      <span className="font-medium tabular-nums">
                        {link?.clickCount?.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <p className="text-sm font-medium mb-3">Status breakdown</p>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(statusCounts) as LinkStatus[]).map((status) => (
              <div
                key={status}
                className={`${statusSoftBg[status]} rounded-xl px-4 py-4 text-center`}
              >
                <p
                  className={`font-display text-2xl font-semibold ${statusStyles[status].text}`}
                >
                  {statusCounts[status]}
                </p>
                <p className={`text-xs mt-1 ${statusStyles[status].text}`}>
                  {status}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
