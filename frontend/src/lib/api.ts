import { http, setAccessToken } from "@/lib/http";

export async function login(payload: LoginPayload): Promise<User> {
  const res = await http.post("/auth/login", payload);
  const token = res.data?.data?.token;
  setAccessToken(token ?? null);
  return res.data.data;
}

export async function register(payload: RegisterPayload): Promise<User> {
  const res = await http.post("/auth/register", payload);
  return res.data.data;
}

export async function update(payload: UpdateUser): Promise<User> {
  const res = await http.put(`/auth/me`, payload);
  return res.data.data;
}

export async function fetchMe(): Promise<User> {
  const res = await http.get("/auth/me");
  return res.data.data;
}

export async function logout(): Promise<void> {
  await http.post("/auth/logout");
}

export async function fetchLinks(): Promise<PaginatedResponse<ShortLink>> {
  const res = await http.get("/url/codes");
  return res.data.data;
}

export async function createLink(
  payload: CreateLinkPayload,
): Promise<ShortLink> {
  const res = await http.post("/url/shorten", {
    targetUrl: payload.url,
    shortCode: payload.code,
    status: payload.status,
  });
  return res.data.data;
}

export async function toggleLinkStatus(id: number): Promise<ShortLink> {
  const res = await http.patch(`/url/${id}/toggle-status`);
  return res.data.data;
}
