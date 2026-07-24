import { useMemo, useState } from "react";
import {
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FolderSearch } from "lucide-react";

type SortKey = "targetUrl" | "shortCode" | "status" | "clicks" | null;

interface LinksTableProps {
  links: ShortLink[];
  onRowClick: (link: ShortLink) => void;
  onToggleStatus?: (link: ShortLink) => void;
  showActions?: boolean;
  emptyLabel?: string;
}

export function LinksTable({
  links,
  onRowClick,
  onToggleStatus,
  showActions = false,
  emptyLabel = "No links yet.",
}: LinksTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<1 | -1>(1);

  const sorted = useMemo(() => {
    if (!sortKey) return links;
    const copy = [...links];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string") {
        return av.toLowerCase().localeCompare(bv?.toLowerCase()) * sortDir;
      }
      if (av < bv) return -1 * sortDir;
      if (av > bv) return 1 * sortDir;
      return 0;
    });
    return copy;
  }, [links, sortKey, sortDir]);

  function handleSort(key: Exclude<SortKey, null>) {
    if (sortKey === key) {
      setSortDir((d) => (d === 1 ? -1 : 1));
    } else {
      setSortKey(key);
      setSortDir(1);
    }
  }

  const columns: {
    key: Exclude<SortKey, null>;
    label: string;
    align: "left" | "right";
  }[] = [
    { key: "targetUrl", label: "Original URL", align: "left" },
    { key: "shortCode", label: "Short URL", align: "left" },
    { key: "status", label: "Status", align: "left" },
    { key: "clicks", label: "Clicks", align: "right" },
  ];

  if (!sorted.length) {
    return (
      <div className="border border-border-soft rounded-xl">
        <EmptyState
          icon={<FolderSearch size={20} />}
          title={emptyLabel}
          description="Links you create will show up here."
        />
      </div>
    );
  }

  return (
    <div className="border border-border-soft rounded-xl overflow-hidden">
      <table className="w-full border-collapse text-[13px] table-fixed">
        <colgroup>
          <col className="w-[38%]" />
          <col className="w-[20%]" />
          <col className="w-[15%]" />
          <col className="w-[12%]" />
          <col className="w-[15%]" />
        </colgroup>
        <thead>
          <tr className="bg-surface-2">
            {columns.map((c) => (
              <th
                key={c.key}
                onClick={() => handleSort(c.key)}
                className={`px-3 py-2.5 font-medium text-text-secondary cursor-pointer select-none text-${c.align}`}
              >
                <div
                  className={`flex items-center gap-1 ${
                    c.align === "right" ? "justify-end" : "justify-start"
                  }`}
                >
                  {c.label}
                  <SortIcon active={sortKey === c.key} dir={sortDir} />
                </div>
              </th>
            ))}
            <th className="px-3 py-2.5 text-right font-medium text-text-secondary">
              {showActions ? "Actions" : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted?.map((link) => (
            <tr
              key={link?.id}
              className="border-t border-border-soft hover:bg-surface-2/60 transition-colors"
            >
              <td
                onClick={() => onRowClick(link)}
                className="px-3 py-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-text-secondary cursor-pointer"
                title={link?.targetUrl}
              >
                {link?.targetUrl}
              </td>
              <td
                onClick={() => onRowClick(link)}
                className="px-3 py-2.5 text-accent font-mono cursor-pointer"
              >
                {link?.shortCode}
              </td>
              <td className="px-3 py-2.5">
                <StatusBadge status={link?.status} />
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums">
                {link?.clicks?.toLocaleString()}
              </td>
              <td className="px-3 py-2.5 text-right">
                {showActions ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onToggleStatus?.(link)}
                  >
                    {link?.status === "ACTIVE" ? "Pause" : "Activate"}
                  </Button>
                ) : (
                  <button
                    onClick={() => onRowClick(link)}
                    className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                    aria-label="View details"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: 1 | -1 }) {
  if (!active) return <ChevronsUpDown size={13} className="text-text-muted" />;
  return dir === 1 ? <ChevronUp size={13} /> : <ChevronDown size={13} />;
}
