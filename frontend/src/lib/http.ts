import axios from "axios";

const apiHost =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.PROD ? "" : "http://localhost:3000");

export let API_BASE_URL = `${apiHost}/api`;

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const ACCESS_TOKEN_KEY = "linkly_access_token";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string | null) {
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
  else localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function shouldSkipTokenRefresh(url: string | undefined): boolean {
  if (!url) return false;

  const authEndpoints = [
    "/auth/login",
    "/auth/register",
    "/auth/refresh-token",
  ];

  return authEndpoints.some((endpoint) => url.includes(endpoint));
}

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      [401, 403].includes(error.response?.status) &&
      !original._retry &&
      !shouldSkipTokenRefresh(original.url)
    ) {
      original._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = http
            .post("/auth/refresh-token")
            .then((res) => {
              const token = res.data?.data?.token ?? null;
              setAccessToken(token);
              return token;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }
        const token = await refreshPromise;
        if (token) {
          original.headers.Authorization = `Bearer ${token}`;
          return http(original);
        } else setAccessToken(null);
      } catch {
        setAccessToken(null);
      }
    }
    return Promise.reject(error);
  },
);
