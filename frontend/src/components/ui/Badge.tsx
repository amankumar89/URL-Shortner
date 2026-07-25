import { statusSoftBg, statusStyles } from "@/helper";

export function StatusBadge({ status }: { status: LinkStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md ${statusSoftBg[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full bg-current ${statusStyles[status].text}`}
      />
      {status}
    </span>
  );
}
