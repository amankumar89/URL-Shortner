import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/lib/http";
import { useMe } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data } = useMe();
  const token = getAccessToken();

  if (data?.id && !token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
