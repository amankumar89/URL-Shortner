import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe, login, logout, register, update } from "@/lib/api";
import { getAccessToken, setAccessToken } from "@/lib/http";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ME_QUERY_KEY = ["me"] as const;

export function useMe() {
  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: fetchMe,
    enabled: !!getAccessToken(),
    retry: false,
  });
}

export function useLogin() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (user) => {
      toast.success("Logged in successful");
      // queryClient.setQueryData(ME_QUERY_KEY, user);
    },
    onError: () => {
      toast.error("Failed to login");
      setAccessToken(null);
    },
  });
}

export function useRegister() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (user) => {
      toast.success("Registered Successfully");
      // queryClient.setQueryData(ME_QUERY_KEY, user);
    },
    onError: () => {
      toast.error("Failed to register");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast.success("Logged out");
      navigate("/login");
      // queryClient.setQueryData(ME_QUERY_KEY, null);
      queryClient.clear();
      setAccessToken(null);
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateUser) => update(payload),
    onSuccess: (user) => {
      toast.success("Updated");
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
    onError: () => {
      toast.error("Failed to update");
    },
  });
}
