# Code Review Workflow

## Objective

Perform a senior-level review of the current changes.

Review correctness before style.

---

# Review Priority

```text
1. Correctness
2. Security
3. Data integrity
4. API compatibility
5. Architecture
6. Error handling
7. Performance
8. Testing
9. Maintainability
10. Style
```

---

# Inspect

Review:

- git diff
- changed files
- surrounding code
- tests
- related APIs
- related entities
- frontend consumers

Do not review changed lines in isolation when surrounding context matters.

---

# Backend Review

Check:

```text
Controller
Service
Repository
DTO
Entity
Security
Exception handling
Transactions
```

Look for:

- business logic in controllers
- missing validation
- missing authorization
- inefficient queries
- transaction problems
- N+1 queries
- incorrect HTTP semantics
- exception leakage

---

# Frontend Review

Check:

```text
Components
Hooks
API functions
Axios
Routing
TanStack Query
Types
```

Look for:

- duplicated API logic
- incorrect query invalidation
- unnecessary requests
- stale state
- missing loading/error states
- unsafe authentication handling
- unnecessary `any`

---

# Security Review

Look for:

- authentication bypass
- authorization bypass
- token leakage
- secret exposure
- unsafe redirects
- missing server-side validation
- insecure cookies
- CORS problems

---

# Performance Review

Look for:

- unnecessary database queries
- unbounded queries
- missing pagination
- excessive API requests
- unnecessary React rerenders
- large payloads

Only recommend optimization when there is a reasonable technical basis.

---

# Findings

Use:

```text
BLOCKER
HIGH
MEDIUM
LOW
NIT
```

For each finding:

```text
Severity:
Location:
Problem:
Why it matters:
Recommendation:
```

Do not manufacture findings.

---

# Positive Observations

Mention good architectural or engineering decisions.

---

# Final Verdict

Do not give a numerical score.

Instead report:

```text
Blocking Issues
Non-blocking Issues
Positive Observations
Recommended Next Steps
```
