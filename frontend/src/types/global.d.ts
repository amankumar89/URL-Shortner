type LinkStatus = "ACTIVE" | "PAUSED" | "EXPIRED";

interface PaginatedResponse<T> {
  links: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

interface ShortLink {
  id: number;
  targetUrl: string;
  shortCode: string;
  code: string;
  status: LinkStatus;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateUser {
  firstName: string;
  lastName: string;
  password: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}
interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface CreateLinkPayload {
  url: string;
  code?: string;
  status?: LinkStatus;
}
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}
// interface WorkspaceSettings {
//   workspaceName: string;
//   defaultDomain: string;
//   weeklyDigest: boolean;
//   autoExpire: boolean;
// }
