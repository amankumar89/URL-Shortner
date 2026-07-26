# Linkly — URL Shortener

<div align="center">

**Create, manage, and track short links** with a Spring Boot API and a React dashboard.

[![Java](https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [API reference](#api-reference)
- [Frontend application](#frontend-application)
- [Authentication](#authentication)
- [Docker](#docker)
- [Scripts & commands](#scripts--commands)

---

## Overview

**Linkly** is a full-stack URL shortening platform. Authenticated users can shorten URLs with optional custom codes, pause or resume links, browse paginated link lists with search and filters, and follow redirects for active, non-expired short codes. The backend exposes a REST API secured with JWT access tokens and HTTP-only refresh-token cookies; the frontend (**Linkly** dashboard) consumes that API with automatic token refresh.

| Layer        | Location   | Role                                      |
|-------------|------------|-------------------------------------------|
| API         | `backend/` | Spring Boot 4, JPA, Security, PostgreSQL  |
| Dashboard   | `frontend/`| React 19 SPA (Vite + Tailwind CSS v4)     |

---

## Features

### Backend

- User registration and login with BCrypt password hashing
- JWT access tokens + refresh tokens stored in secure cookies
- CRUD-style URL management per user (create, list, delete, toggle status)
- Public redirect endpoint for short codes (`302` to target URL)
- Link statuses: `ACTIVE`, `PAUSED`, `EXPIRED`
- Default link expiration (24 hours from creation) with a nightly scheduler to mark overdue links as expired
- Click counting on successful redirects
- Paginated link listing with sort, search, and status filter
- Unified `ApiResponse` envelope for success and error payloads
- Global exception handling and validation on request DTOs
- CORS configured for local frontend dev servers

### Frontend

- Login and registration flows
- Protected dashboard shell (sidebar, top bar, theme support)
- Dashboard overview, create link, my links (sortable table), link detail, analytics, and settings pages
- TanStack Query for server state; Axios client with interceptors
- Access token in `localStorage`; silent refresh via `/auth/refresh-token` on `401`/`403`

---

## Architecture

```mermaid
flowchart LR
  subgraph client [Browser]
    SPA[Linkly React SPA]
  end

  subgraph api [Spring Boot API :8080]
    Auth[/api/auth/*]
    Url[/api/url/*]
    JWT[JWT + Refresh Cookie]
  end

  subgraph data [Data]
    PG[(PostgreSQL)]
  end

  SPA -->|Bearer JWT + credentials| Auth
  SPA -->|Bearer JWT| Url
  Auth --> JWT
  Url --> PG
  Auth --> PG
  User[Anonymous visitor] -->|GET /api/url/{code}| Url
  Url -->|302 redirect| Target[Target URL]
```

---

## Tech stack

| Area | Technologies |
|------|----------------|
| **Backend** | Java 17, Spring Boot 4.1, Spring Security, Spring Data JPA, Validation, ModelMapper, JJWT, Lombok, PostgreSQL |
| **Frontend** | React 19, TypeScript, Vite 8, Tailwind CSS v4, React Router 7, TanStack Query 5, Axios, Lucide React, React Hot Toast |
| **Tooling** | Maven Wrapper, Oxlint, Docker (multi-stage backend image) |

---

## Repository layout

```
URL-Shortner/
├── backend/                    # Spring Boot application
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/java/com/aman/urlshortner/
│       ├── config/             # Security, CORS, scheduling, beans
│       ├── controller/         # REST endpoints
│       ├── dto/                  # Request/response DTOs
│       ├── entity/               # JPA entities (Users, Url, RefreshToken, …)
│       ├── filter/               # JWT authentication filter
│       ├── repository/           # Spring Data repositories
│       ├── service/              # Business logic
│       └── exception/            # Custom exceptions + global handler
├── frontend/                   # Linkly dashboard
│   ├── src/
│   │   ├── components/         # layout, ui, dashboard, links
│   │   ├── pages/              # Route-level views
│   │   ├── hooks/              # useAuth, useLinks, useTheme
│   │   └── lib/                # http.ts, api.ts
│   ├── .env.example
│   └── package.json
└── README.md                   # This file
```

---

## Prerequisites

- **JDK 17+**
- **Node.js 20+** and npm (for the frontend)
- **PostgreSQL** (local or remote)
- **Maven** (optional; use `./mvnw` in `backend/`)

---

## Getting started

### 1. Database

Create a PostgreSQL database for the application (name and credentials are defined in your profile config).

### 2. Backend

The active profile is **`dev`**, configured in `backend/src/main/resources/application.yaml`. Profile-specific settings (datasource, JWT secrets, token TTLs) live in **`application-dev.yaml`**, which is gitignored — create it locally under `backend/src/main/resources/`.

Example shape (adjust values for your environment):

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/url_shortener
    username: postgres
    password: your_password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false

jwt:
  secret: your-256-bit-or-longer-secret-key
  access-token-expiration: 900000      # ms (e.g. 15 minutes)
  refresh-token-expiration: 604800000  # ms (e.g. 7 days)
```

From the `backend` directory:

```bash
./mvnw spring-boot:run
```

The API listens on **port 8080** by default. Health check: `GET http://localhost:8080/`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Set **`VITE_API_BASE_URL`** to the API base including the `/api` prefix, for example:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Open the URL Vite prints (typically `http://localhost:5173`). Register a user or log in, then use the dashboard.

---

## Configuration

### Backend

| Item | Location / notes |
|------|------------------|
| Active profile | `application.yaml` → `spring.profiles.active: dev` |
| Secrets & DB | `application-dev.yaml` (local, not committed) |
| CORS origins | `WebSecurityConfig` — `http://localhost:3000`, `http://localhost:5173` |
| Public routes | Register, login, refresh-token, and `GET /api/url/{shortCode}` |

### Frontend

| Variable | Purpose |
|----------|---------|
| `VITE_API_BASE_URL` | Axios `baseURL` (must include `/api`) |

The HTTP client sends **`withCredentials: true`** so refresh-token cookies are included on auth requests.

---

## API reference

All JSON responses use the envelope:

```json
{
  "success": true,
  "message": "Human-readable message",
  "data": { }
}
```

Base path for authenticated resources: **`/api`**.

### Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/` | No | Server health message |

### Auth — `/api/auth`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/register` | No | Create account |
| `POST` | `/login` | No | Login; sets refresh cookie; returns access token in body |
| `POST` | `/refresh-token` | Cookie | Issue new access token |
| `POST` | `/logout` | Cookie | Invalidate refresh session |
| `GET` | `/me` | Yes | Current user profile |
| `PUT` | `/me` | Yes | Update profile |

**Register body (example):** `firstName`, `lastName`, `email`, `password`

**Login body:** `email`, `password`

### URLs — `/api/url`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/shorten` | Yes | Create short link |
| `GET` | `/codes` | Yes | Paginated list (`page`, `size`, `sortBy`, `orderBy`, `search`, `status`) |
| `GET` | `/{shortCode}` | No* | Redirect to target URL (`302`) or error if expired/invalid |
| `DELETE` | `/{id}` | Yes | Delete link by id |
| `PATCH` | `/{id}/toggle-status` | Yes | Toggle between active/paused (etc.) |

\* Public redirect; other URL operations require authentication.

**Shorten body (example):**

```json
{
  "targetUrl": "https://example.com/long/path",
  "shortCode": "optional-custom-code",
  "status": "ACTIVE"
}
```

`targetUrl` must be a valid URL. `shortCode` is optional. `status` is optional (`ACTIVE`, `PAUSED`, `EXPIRED`).

---

## Frontend application

### Routes

| Path | Page | Notes |
|------|------|--------|
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/` | Dashboard | Protected |
| `/create` | Create link | Protected |
| `/links` | My links | Protected |
| `/links/:id` | Link detail | Protected |
| `/analytics` | Analytics | Protected |
| `/settings` | Settings | Protected |

### Key modules

- **`src/lib/http.ts`** — Axios instance, token storage, refresh interceptor
- **`src/lib/api.ts`** — Auth and URL service functions
- **`src/hooks/useAuth.ts`**, **`src/hooks/useLinks.ts`** — Data and session hooks
- **`src/components/layout/`** — `AppShell`, `Sidebar`, `Topbar`, `ProtectedRoute`

---

## Authentication

1. **Login** — Client receives JWT access token in the response body and stores it in `localStorage` (`linkly_access_token`). Refresh token is set as an HTTP-only cookie by the server.
2. **API calls** — `Authorization: Bearer <access_token>` on protected routes.
3. **Refresh** — On `401` or `403`, the client calls `POST /api/auth/refresh-token` once (deduplicated), updates the access token, and retries the failed request.
4. **Logout** — Clears server refresh state and client access token.

Security is **stateless** for API sessions (`SessionCreationPolicy.STATELESS`); CSRF is disabled for the JWT API style used here.

---

## Docker

Build and run the backend from `backend/`:

```bash
docker build -t url-shortener-api .
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=dev \
  url-shortener-api
```

Pass database and JWT settings via environment variables or mounted `application-dev.yaml` as required for your deployment. The image uses a multi-stage build (JDK 17 Alpine → JRE 17 Alpine) and exposes **8080**.

---

## Scripts & commands

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `./mvnw spring-boot:run` | Run locally |
| `./mvnw clean package` | Build JAR |
| `./mvnw test` | Run tests |

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Oxlint |

---

## License

No license file is included in this repository yet. Add one if you plan to open-source or distribute the project.

---

<div align="center">

**Linkly** — shorten smarter.

</div>
