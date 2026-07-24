# Linkly — URL Shortener Dashboard

A modern, orange-accented dashboard for the Spring Boot URL Shortener API (see `URL-SHOTERNER.json`).

## Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- TanStack Query v5
- Axios

## Getting started

```bash
npm install
npm run dev
```

The app opens on `/login`. Sign in with any email/password — it currently runs in **mock mode**, so no backend is required to explore the UI.

## Connecting to the real Spring Boot backend

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your backend URL (defaults to `http://localhost:8080`, matching the Postman collection's `baseUrl` variable).
2. Open `src/lib/api.ts` and set `USE_MOCK = false`.
3. Make sure your backend exposes the endpoints from `URL-SHOTERNER.json`:
   - `POST /auth/register`
   - `POST /auth/login`
   - `GET /auth/me`
   - `POST /auth/refresh-token`
   - `POST /auth/logout`
   - `POST /url/shorten`

The JWT access token is stored in `localStorage` and attached to every request via an Axios interceptor. A 401 response triggers a silent refresh via `/auth/refresh-token` before retrying the original request.

## Project structure

```
src/
  components/
    layout/     AppShell, Sidebar, Topbar, ProtectedRoute
    ui/         Button, Badge, Card, Input, Select, Logo, PageHeader, EmptyState
    dashboard/  StatCard
    links/      LinksTable (sortable)
  pages/        Login, Register, Dashboard, Create URL, Link Detail,
                Analytics, My Links, Settings
  hooks/        useAuth, useLinks (TanStack Query)
  lib/          http.ts (axios client), api.ts (service layer), mockData.ts
  types/        shared TypeScript types
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — type-check + production build
- `npm run lint` — oxlint
- `npm run preview` — preview production build
