# Bug Fix Workflow

## Objective

Diagnose and fix a reported bug without introducing regressions.

---

## Bug Report

```text
[BUG DESCRIPTION]
```

---

# Phase 1 — Reproduce

First understand the reported behavior.

Identify:

- expected behavior
- actual behavior
- reproduction steps
- affected API/page
- affected user flow

Do not immediately modify code.

---

# Phase 2 — Trace

Trace the complete execution path.

For backend issues:

```text
HTTP Request
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

For frontend issues:

```text
Page
 ↓
Component
 ↓
Hook
 ↓
API
 ↓
Axios
 ↓
Backend
```

For authentication issues:

```text
Browser
 ↓
Access Token
 ↓
Axios
 ↓
JWT Filter
 ↓
Security Context
 ↓
Controller
```

---

# Phase 3 — Root Cause

Determine the actual root cause.

Do not fix symptoms when the underlying cause can be identified.

Explain:

```text
Observed behavior
        ↓
Incorrect behavior
        ↓
Root cause
        ↓
Correct fix
```

---

# Phase 4 — Minimal Fix

Implement the smallest change that correctly fixes the issue.

Do not perform unrelated refactoring.

Do not change public APIs unless necessary.

---

# Phase 5 — Regression Test

Add a test reproducing the bug.

The test should fail before the fix and pass after the fix whenever practical.

Also test adjacent functionality.

---

# Phase 6 — Security

If the bug affects authentication, authorization, URLs, cookies, input validation or user data, perform an explicit security review.

---

# Phase 7 — Verification

Run:

- relevant tests
- backend build where applicable
- frontend build where applicable

Inspect the final diff.

---

# Final Response

## Bug

What was broken.

## Root Cause

Why it happened.

## Fix

What changed.

## Files

Files modified.

## Tests

Tests executed.

## Regression Risk

Potential affected areas.

## Security

Security implications.
