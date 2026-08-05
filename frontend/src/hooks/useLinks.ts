import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLink, deleteLink, fetchLinks, toggleLinkStatus } from "@/lib/api";
import toast from "react-hot-toast";
import { getMessage } from "@/helper";

export const LINKS_QUERY_KEY = ["links"] as const;

export function useLinks() {
  return useQuery({
    queryKey: LINKS_QUERY_KEY,
    queryFn: fetchLinks,
  });
}

export function useCreateLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateLinkPayload) => createLink(payload),
    onSuccess: () => {
      toast.success("Link created");
      queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY });
    },
    onError: (error: any) => {
      toast.error(getMessage("Failed to create link", error));
    },
  });
}

export function useToggleLinkStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => toggleLinkStatus(id),
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY });
    },
    onError: (error: any) => {
      toast.error(getMessage("Failed to update status", error));
    },
  });
}

export function useDeleteLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteLink(id),
    onSuccess: () => {
      toast.success("Link deleted");
      queryClient.invalidateQueries({ queryKey: LINKS_QUERY_KEY });
    },
    onError: (error: any) => {
      toast.error(getMessage("Failed to delete link", error));
    },
  });
}
