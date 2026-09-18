# Backend AI Agent Instructions

## Scope

These instructions apply to everything inside:

```text
backend/
```

The backend is a Spring Boot REST API using Java 17, Spring Security, JPA/Hibernate and PostgreSQL.

---

## Architecture

Follow:

```text
Controller
    ↓
DTO
    ↓
Service
    ↓
Repository
    ↓
Entity
    ↓
PostgreSQL
```

### Controller

Controllers should:

- Handle HTTP concerns.
- Validate request input.
- Delegate business logic.
- Return appropriate HTTP responses.

Controllers should NOT contain complex business logic.

### Service

Services contain:

- Business rules
- Authorization checks
- Entity orchestration
- Transactions
- Validation that depends on business rules

### Repository

Repositories handle persistence.

Do not put business logic in repositories.

---

## Dependency Injection

Prefer constructor injection.

Avoid field injection.

Use Spring stereotypes according to responsibility:

```text
@RestController
@Service
@Repository
@Configuration
@Component
```

---

## DTOs

Do not expose entities directly from public APIs when a DTO is appropriate.

Use request DTOs for incoming data and response DTOs for outgoing data.

Never return sensitive fields such as passwords.

---

## Validation

Validate external input.

Examples include:

- required fields
- email format
- URL format
- string length
- allowed status values
- custom short-code constraints

Do not rely only on frontend validation.

Backend validation is authoritative.

---

## Security

Authentication and authorization must be preserved.

When modifying security code, inspect:

```text
Security configuration
JWT filter
Authentication service
Refresh-token flow
CORS configuration
Cookie configuration
```

Never disable authentication simply to simplify testing.

---

## JWT

Treat access and refresh tokens as sensitive credentials.

Never log them.

When modifying token handling, verify:

- signing key
- expiration
- token parsing
- authentication context
- refresh behavior
- logout behavior

---

## Transactions

Use transactions deliberately.

A transaction should represent a meaningful business operation.

Avoid unnecessarily wrapping read-only operations in write transactions.

---

## JPA

Watch for:

- N+1 queries
- unnecessary eager relationships
- missing indexes
- inefficient pagination
- unintended cascading
- entity serialization problems

Do not blindly change fetch strategies.

---

## URL Shortening

When modifying URL logic, preserve:

```text
shortCode uniqueness
URL validation
ownership
status validation
expiration
click counting
redirect behavior
```

For redirect operations, verify the URL exists and is usable before redirecting.

---

## Scheduled Jobs

The project uses scheduled processing for expiration.

When modifying scheduled jobs:

- make operations idempotent where possible
- avoid expensive full-table operations
- consider database indexing
- handle failures safely
- do not silently swallow exceptions

---

## Exceptions

Use the existing exception architecture.

Do not expose internal stack traces or database errors through API responses.

Use appropriate HTTP semantics.

Examples:

```text
400 → invalid request
401 → unauthenticated
403 → unauthorized
404 → resource not found
409 → conflict
500 → unexpected server failure
```

Use the project's existing conventions when they differ.

---

## Database Changes

Before modifying an entity:

1. Search all references.
2. Inspect repositories.
3. Inspect DTOs.
4. Inspect services.
5. Inspect controllers.
6. Consider existing database records.

Never perform destructive migrations without explicit instruction.

---

## Testing

For backend changes, prefer tests at the appropriate layer.

Examples:

```text
Service logic
    → unit tests

Controller/API
    → MockMvc/controller tests

Security
    → authentication/authorization tests

Database behavior
    → integration tests
```

Run:

```bash
./mvnw test
```

or:

```bash
mvn test
```

Never report tests as passing without executing them.

---

## Backend Definition of Done

Before declaring backend work complete:

- Code compiles.
- Tests pass or failures are explicitly reported.
- API contracts remain compatible unless intentionally changed.
- Security has been considered.
- Database impact has been considered.
- No secrets were introduced.
- No unnecessary dependencies were added.
- Diff contains only relevant changes.
