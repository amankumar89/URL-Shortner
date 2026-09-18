# URL-Shortner — AI Agent Development Guide

## 1. Project Overview

URL-Shortner is a full-stack URL shortening application.

The project consists of:

- Spring Boot backend
- React + TypeScript frontend
- PostgreSQL database
- JWT-based authentication
- Refresh-token authentication using HTTP-only cookies
- URL creation and management
- Short-code based redirection
- Link status management
- Link expiration
- Click tracking
- Pagination
- Filtering
- Sorting
- Search
- Docker support

The application should be treated as a production-style full-stack application.

AI agents must understand and preserve the existing architecture before introducing changes.

---

## 2. Technology Stack

### Backend

- Java 17
- Spring Boot 4.x
- Spring MVC
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- JWT/JJWT
- Maven
- Lombok
- ModelMapper
- Bean Validation
- Docker

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Tailwind CSS

---

## 3. Repository Structure

```text
URL-Shortner/
│
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           └── java/com/aman/urlshortner/
│               ├── config/
│               ├── controller/
│               ├── dto/
│               ├── entity/
│               ├── exception/
│               ├── filter/
│               ├── repository/
│               └── service/
│
├── frontend/
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── lib/
│
└── .github/
```

Do not reorganize this structure unless there is a clear architectural reason.

---

# 4. Core Architecture

The backend follows:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

The frontend follows:

```text
Page / Component
       ↓
Custom Hook
       ↓
API Layer
       ↓
Axios HTTP Client
       ↓
Backend API
```

Agents must preserve these boundaries.

---

# 5. Agent Workflow

Every non-trivial task must follow this workflow.

## Step 1 — Understand

Before writing code:

1. Inspect the repository.
2. Identify the relevant files.
3. Understand existing implementation patterns.
4. Identify affected APIs, entities, services and components.
5. Check existing tests.
6. Check configuration and environment variables.

Do not modify code during the discovery phase.

---

## Step 2 — Plan

Create a concise implementation plan.

The plan should identify:

- Files to change
- Files to create
- API changes
- Database changes
- Frontend changes
- Security implications
- Testing requirements
- Potential backwards-compatibility concerns

Prefer the smallest change that correctly solves the problem.

---

## Step 3 — Implement

Follow existing project conventions.

Do not introduce a new framework, library, pattern or architecture when the existing stack already solves the problem.

Avoid unnecessary refactoring.

Do not rewrite unrelated code.

---

## Step 4 — Test

After implementation:

### Backend

Run the appropriate Maven tests/build.

```bash
cd backend
./mvnw test
```

If Maven Wrapper is unavailable:

```bash
mvn test
```

### Frontend

Run the appropriate package-manager commands based on the existing project configuration.

At minimum, run:

```bash
npm run build
```

and the available test/lint commands.

Never claim tests passed unless they were actually executed.

---

## Step 5 — Review

Before finishing:

1. Review the diff.
2. Look for accidental changes.
3. Check security implications.
4. Check API compatibility.
5. Check null/error handling.
6. Check validation.
7. Check database implications.
8. Check frontend loading/error states.
9. Check tests.
10. Remove unused imports and dead code.

---

# 6. General Coding Rules

## Prefer

- Small focused classes
- Clear method names
- Explicit business logic
- DTOs at API boundaries
- Constructor injection
- Validation
- Meaningful exceptions
- Reusable frontend hooks
- TanStack Query for server state
- Centralized Axios configuration
- Tests for business logic

## Avoid

- Huge controllers
- Business logic inside controllers
- Business logic inside React components
- Duplicate API calls
- Duplicate authentication logic
- Hardcoded secrets
- Hardcoded production URLs
- Unnecessary global state
- Premature abstractions
- Unrelated refactoring

---

# 7. API Rules

Existing API contracts must be preserved unless the task explicitly requires an API change.

Important authentication endpoints include:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
GET  /api/auth/me
PUT  /api/auth/me
```

URL operations include:

```text
POST   /api/url/shorten
GET    /api/url/codes
GET    /api/url/{shortCode}
DELETE /api/url/{id}
PATCH  /api/url/{id}/toggle-status
```

When changing an API:

1. Update backend DTO/controller/service code.
2. Update frontend API functions.
3. Update hooks/components.
4. Update tests.
5. Update documentation where appropriate.

---

# 8. Authentication Rules

Authentication is security-sensitive.

Do not weaken authentication or authorization to make a feature work.

The application uses:

- JWT access tokens
- Refresh tokens
- HTTP-only refresh-token cookies
- Spring Security
- Axios authentication handling

Never:

- Log passwords
- Log JWTs
- Log refresh tokens
- Commit secrets
- Store secrets directly in source code
- Disable authentication for convenience

When modifying authentication, explicitly review:

- Token expiration
- Cookie security
- CORS
- CSRF implications
- Authorization
- Token refresh
- Logout
- Error handling

---

# 9. Database Rules

Use the existing JPA/repository architecture.

Before changing an entity:

1. Understand existing relationships.
2. Check how the entity is used.
3. Check DTOs.
4. Check repository queries.
5. Check service logic.
6. Consider existing database data.

Avoid destructive schema changes unless explicitly requested.

Consider:

- indexes
- uniqueness
- nullability
- foreign keys
- transaction boundaries
- query performance

---

# 10. URL Shortening Rules

The URL shortener must correctly handle:

- unique short codes
- custom short codes
- duplicate codes
- URL validation
- link ownership
- link status
- expiration
- click counting
- redirect behavior

A redirect must not bypass:

- existence checks
- status checks
- expiration checks

---

# 11. Frontend Rules

Use:

- React components
- TypeScript
- TanStack Query
- Axios
- React Router
- Tailwind CSS

Prefer:

```text
Component
    ↓
Hook
    ↓
API function
    ↓
HTTP client
```

Do not put large API implementations directly inside components.

Handle:

- loading states
- error states
- empty states
- authentication failures
- mutation success/failure
- optimistic updates only when appropriate

Avoid using `any` unless there is a documented reason.

---

# 12. Error Handling

Backend errors should use the existing exception-handling architecture.

Do not expose:

- stack traces
- database credentials
- internal implementation details
- secrets

Frontend errors should present useful user-facing messages without exposing internal backend details.

---

# 13. Configuration

Never hardcode:

- passwords
- JWT secrets
- database credentials
- API keys
- production tokens

Use configuration/environment variables.

Never commit `.env` files containing real credentials.

---

# 14. Testing Philosophy

Tests should validate behavior, not implementation details.

Prioritize:

### Backend

- Service tests
- Controller tests
- Security tests
- Repository tests where useful
- Integration tests for important flows

### Frontend

- Component behavior
- Hook behavior
- API behavior
- Authentication flows
- Important user interactions

Every meaningful new feature should include appropriate tests.

---

# 15. Performance

Do not optimize prematurely.

When performance is relevant, investigate first.

Consider:

- database indexes
- N+1 queries
- pagination
- unnecessary API calls
- React rerenders
- TanStack Query caching
- large payloads
- repeated computations

Use measurements or profiling when possible.

---

# 16. Dependency Policy

Do not add dependencies unless necessary.

Before adding a dependency:

1. Check whether the existing stack already solves the problem.
2. Check whether the functionality can reasonably be implemented without it.
3. Consider maintenance and security.
4. Explain why the dependency is needed.

---

# 17. Definition of Done

A task is not complete merely because code was written.

A task is complete when:

- Requirements are implemented.
- Existing behavior is preserved.
- Appropriate tests are added/updated.
- Build/tests pass where possible.
- Security implications were reviewed.
- No secrets were introduced.
- No unrelated files were modified.
- The diff was reviewed.
- Documentation was updated when necessary.

---

# 18. Final Agent Response

After completing a task, report:

```text
## Summary

What was implemented.

## Files Changed

List changed/created files.

## Architecture

Explain the important design decisions.

## Tests

List commands executed and their results.

## Security

Mention relevant security considerations.

## Notes

Mention assumptions, limitations or follow-up work.
```

Do not claim a test/build passed if it was not executed.

---

# 19. Golden Rule

> Understand first. Plan second. Implement third. Test fourth. Review last.

The goal is not to generate the maximum amount of code.

The goal is to make the smallest correct, maintainable and production-safe change.
