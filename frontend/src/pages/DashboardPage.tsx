import { useNavigate } from "react-router-dom";
import {
  Plus,
  Link2,
  MousePointerClick,
  Activity,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/dashboard/StatCard";
import { LinksTable } from "@/components/links/LinksTable";
import { useLinks, useToggleLinkStatus } from "@/hooks/useLinks";
import { useMe } from "@/hooks/useAuth";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useLinks();
  const { data: user } = useMe();
  const { mutate: toggleStatus } = useToggleLinkStatus();

  const name = `${user?.firstName} ${user?.lastName ?? ""}`;
  const links = data?.links ?? [];

  const total = links?.length;
  const totalClicks = links?.reduce((s, l) => s + (l?.clickCount ?? 0), 0);
  const active = links?.filter((l) => l.status === "ACTIVE").length;
  const avg = total ? Math.round(totalClicks / total) : 0;

  function handleRowClick(link: ShortLink) {
    navigate(`/links/${link?.id}`);
  }

  return (
    <div className="animate-fade-up">
      <PageHeader
        title={`Welcome back, ${name ?? "there"}`}
        subtitle="Here's how your links are performing."
        action={
          <Button icon={<Plus size={16} />} onClick={() => navigate("/create")}>
            Create URL
          </Button>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard
          label="Total links"
          value={total?.toLocaleString()}
          icon={<Link2 size={16} />}
        />
        <StatCard
          label="Total clicks"
          value={totalClicks?.toLocaleString()}
          icon={<MousePointerClick size={16} />}
        />
        <StatCard
          label="Active links"
          value={active?.toLocaleString()}
          icon={<Activity size={16} />}
        />
        <StatCard
          label="Avg. clicks / link"
          value={avg?.toLocaleString()}
          icon={<TrendingUp size={16} />}
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium">Recent short URLs</p>
        <span className="text-xs text-text-muted">
          Click a row for details · click a header to sort
        </span>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <LinksTable
          links={links?.slice(0, 6)}
          onRowClick={handleRowClick}
          onToggleStatus={(l) => toggleStatus(l.id)}
        />
      )}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="border border-border-soft rounded-xl overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-11 border-t border-border-soft first:border-t-0 bg-surface-1 animate-pulse"
          style={{ opacity: 1 - i * 0.12 }}
        />
      ))}
    </div>
  );
}
