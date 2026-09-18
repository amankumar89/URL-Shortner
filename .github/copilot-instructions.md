# GitHub Copilot Instructions

## Project

This repository is a full-stack URL shortening application.

Backend:

- Java 17
- Spring Boot 4.x
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT

Frontend:

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Tailwind CSS

---

## Before Making Changes

Always:

1. Inspect relevant files.
2. Understand the existing architecture.
3. Search for existing implementations.
4. Identify dependencies and side effects.
5. Form a concise implementation plan.
6. Implement the smallest correct change.
7. Run relevant tests/build.
8. Review the resulting diff.

Do not blindly rewrite existing code.

---

## Architecture

Backend:

```text
Controller → Service → Repository → Database
```

Frontend:

```text
Component/Page → Hook → API → Axios → Backend
```

Preserve these boundaries.

---

## Backend Rules

- Use constructor dependency injection.
- Keep controllers thin.
- Keep business logic in services.
- Use DTOs at API boundaries.
- Use repositories for persistence.
- Validate external input.
- Preserve Spring Security behavior.
- Never expose passwords or tokens.
- Consider transaction boundaries.
- Consider JPA performance.
- Do not introduce unnecessary dependencies.

---

## Frontend Rules

- Use TypeScript strongly.
- Avoid `any`.
- Use TanStack Query for server state.
- Keep API communication in the API layer.
- Keep Axios authentication logic centralized.
- Preserve protected routes.
- Handle loading, error and empty states.
- Follow existing Tailwind conventions.

---

## Security

Never:

- hardcode secrets
- commit credentials
- log JWTs
- log refresh tokens
- log passwords
- disable authentication to bypass a problem
- weaken authorization

Treat authentication changes as security-sensitive.

---

## Testing

New functionality should include appropriate tests.

Do not claim tests passed unless they were actually executed.

---

## Changes

Prefer minimal, focused changes.

Do not refactor unrelated code.

Do not change public API contracts without considering frontend consumers.

When an API changes, update:

```text
Backend
 ↓
DTO
 ↓
Controller
 ↓
Frontend API
 ↓
Hooks
 ↓
Components
 ↓
Tests
```

---

## Final Response

Summarize:

- what changed
- files changed
- tests executed
- security considerations
- assumptions/limitations

Be precise and concise.
