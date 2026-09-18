# Feature Development Workflow

## Objective

Implement the requested feature in the URL-Shortner repository using a disciplined agentic development workflow.

---

## User Request

Replace this section with the requested feature.

```text
[FEATURE REQUEST]
```

---

# Phase 1 — Discovery

Before changing any code, inspect the repository.

Identify:

- Relevant backend packages
- Relevant frontend pages/components
- Existing API endpoints
- Related DTOs
- Related entities
- Repositories
- Services
- Hooks
- API functions
- Authentication requirements
- Existing tests
- Configuration/environment requirements

Search the repository for existing implementations that solve part of the problem.

Do not duplicate functionality that already exists.

---

# Phase 2 — Architecture Analysis

Explain:

```text
Current architecture
        ↓
Affected components
        ↓
Data flow
        ↓
API flow
        ↓
Database impact
```

Determine whether the feature requires:

- backend changes
- frontend changes
- database changes
- authentication changes
- configuration changes
- tests
- documentation

---

# Phase 3 — Implementation Plan

Create a concise plan before coding.

Use:

```text
1. Backend changes
2. Database changes
3. API changes
4. Frontend changes
5. Tests
6. Documentation
```

For every planned file, explain why it needs to change.

Prefer minimal changes.

---

# Phase 4 — Implementation

Follow project architecture.

Backend:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Frontend:

```text
Page / Component
    ↓
Hook
    ↓
API
    ↓
Axios
    ↓
Backend
```

Do not place business logic in controllers or UI components.

Do not introduce new libraries unless necessary.

---

# Phase 5 — Testing

Add or update appropriate tests.

Backend:

```text
Unit tests
Controller tests
Security tests
Integration tests where appropriate
```

Frontend:

```text
Component tests
Hook tests
API behavior tests
User-flow tests where appropriate
```

Run relevant tests.

Never claim a test passed unless it was executed.

---

# Phase 6 — Security Review

Check:

- authentication
- authorization
- input validation
- secrets
- token handling
- cookies
- CORS
- CSRF
- URL safety
- ownership checks

Do not weaken existing security controls.

---

# Phase 7 — Regression Review

Ask:

> What existing functionality could this feature break?

Check:

- existing APIs
- existing UI
- authentication
- URL creation
- URL redirection
- pagination
- filtering
- sorting
- status management
- expiration
- analytics

---

# Phase 8 — Diff Review

Review the final diff.

Remove:

- unused imports
- debug logs
- temporary code
- commented-out experiments
- unrelated changes
- generated files that should not be committed

---

# Final Response

Return:

## Feature Summary

What was implemented.

## Architecture

How the implementation works.

## Files Changed

List files.

## API Changes

List new/changed endpoints.

## Database Changes

List schema/entity changes.

## Tests

Commands executed and results.

## Security Review

Security considerations.

## Risks

Known limitations.

## Follow-ups

Optional future improvements.
