export const getStatus = (status: LinkStatus) => {
  switch (status) {
    case "ACTIVE":
      return "Pause";
    case "PAUSED":
      return "Activate";
    case "EXPIRED":
      return "Expired";
    default:
      return "Expired";
  }
};

export const statusStyles: Record<LinkStatus, { bar: string; text: string }> = {
  ACTIVE: { bar: "bg-success", text: "text-success" },
  PAUSED: { bar: "bg-warning", text: "text-warning" },
  EXPIRED: { bar: "bg-danger", text: "text-danger" },
};

export const statusSoftBg: Record<LinkStatus, string> = {
  ACTIVE: "bg-success-soft",
  PAUSED: "bg-warning-soft",
  EXPIRED: "bg-danger-soft",
};

export function getMessage(msg: string, error: any) {
  return error?.response?.data?.message ?? msg;
}
