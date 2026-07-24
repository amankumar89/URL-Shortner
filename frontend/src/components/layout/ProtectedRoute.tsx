import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/lib/http";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
