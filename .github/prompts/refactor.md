# Refactoring Workflow

## Objective

Improve code structure without changing externally observable behavior.

---

# Rules

The default goal is:

> Same behavior, better implementation.

Do not mix a large refactor with unrelated feature development.

---

# Phase 1 — Understand

Inspect:

- current implementation
- callers
- dependencies
- tests
- API contracts
- database interactions

Determine what behavior must remain unchanged.

---

# Phase 2 — Identify Problem

Classify the refactoring:

```text
Duplication
Complexity
Poor separation of concerns
Performance
Naming
Maintainability
Testability
Architecture
```

Provide evidence from the code.

Do not refactor merely because a different style is preferred.

---

# Phase 3 — Plan

Define:

```text
Current
   ↓
Problem
   ↓
Target structure
   ↓
Migration steps
```

---

# Phase 4 — Refactor

Preserve:

- API contracts
- authentication
- authorization
- database behavior
- response formats
- frontend behavior

Avoid unnecessary dependency additions.

---

# Phase 5 — Test

Run existing tests before and after the refactor when possible.

Add tests where existing coverage is insufficient.

---

# Phase 6 — Diff Review

Look specifically for:

- accidental behavior changes
- removed validation
- changed exception behavior
- changed query behavior
- broken authentication
- changed API responses
- unnecessary file modifications

---

# Final Response

## Refactoring Goal

## Before

## After

## Files Changed

## Behavior Preserved

## Tests

## Risks

## Follow-ups
