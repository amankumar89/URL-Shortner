import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDeleteLink, useLinks, useToggleLinkStatus } from "@/hooks/useLinks";
import { getStatus } from "@/helper";
import toast from "react-hot-toast";

const baseUrl =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.PROD ? "" : "http://localhost:3000");


export default function LinkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useLinks();
  const { mutate: toggleStatus, isPending: isTogglePending } = useToggleLinkStatus();
  const { mutate: deleteLink, isPending: isDeletePending } = useDeleteLink();

  const links = data?.links ?? [];

  const link = links.find((l) => l.id === Number(id));

  return (
    <div className="max-w-130 animate-fade-up">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-4 transition-colors cursor-pointer"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {!link ? (
        <Card className="p-6">
          <EmptyState
            title="Link not found"
            description="It may have been removed, or the ID is incorrect."
          />
        </Card>
      ) : (
        <Card className="p-6">
          <div className="flex flex-wrap items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <p className="font-mono text-lg font-medium text-accent">
                {link?.shortCode}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${baseUrl}/${link?.shortCode}`,
                  );
                  toast.success("Copied");
                }}
                className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Copy short link"
              >
                <Copy size={14} />
              </button>
              <a
                href={`${baseUrl}/${link?.shortCode}`}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-text-secondary break-all inline-flex items-center gap-1.5 hover:text-text-primary transition-colors mb-5"
              >
                <ExternalLink size={12} className="shrink-0" />
              </a>
            </div>
          </div>

          <p className="text-[13px] text-text-secondary break-all inline-flex items-center gap-1.5 hover:text-text-primary transition-colors mb-5 disabled">
            {link.targetUrl}
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-surface-2 rounded-lg px-3.5 py-3">
              <p className="text-xs text-text-secondary mb-1">Status</p>
              <StatusBadge status={link?.status} />
            </div>
            <div className="bg-surface-2 rounded-lg px-3.5 py-3">
              <p className="text-xs text-text-secondary mb-1">Clicks</p>
              <p className="text-sm font-medium">
                {link?.clickCount?.toLocaleString()}
              </p>
            </div>
            <div className="bg-surface-2 rounded-lg px-3.5 py-3">
              <p className="text-xs text-text-secondary mb-1">Created At</p>
              <p className="text-sm font-medium">
                {new Date(link.createdAt)?.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="bg-surface-2 rounded-lg px-3.5 py-3">
              <p className="text-xs text-text-secondary mb-1">Expired At</p>
              <p className="text-sm font-medium font-mono">
                {new Date(link.expirationDate)?.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            {/* <div className="bg-surface-2 rounded-lg px-3.5 py-3">
              <p className="text-xs text-text-secondary mb-1">Alias</p>
              <p className="text-sm font-medium font-mono">{link.code}</p>
            </div> */}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 justify-end">
            <Button
              size="sm"
              variant={link.status === "EXPIRED" ? "danger" : "secondary"}
              loading={isTogglePending}
              onClick={() => toggleStatus(link.id)}
              disabled={link.status === "EXPIRED"}
            >
              {getStatus(link.status)}
            </Button>
            <Button
              size="sm"
              variant="danger"
              loading={isDeletePending}
              onClick={() => deleteLink(link.id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
