# Security Audit Workflow

## Objective

Perform a focused security audit of the URL-Shortner application.

---

# Scope

Inspect:

### Authentication

- registration
- login
- logout
- refresh token
- access token
- password handling

### Authorization

- user ownership
- protected endpoints
- resource access

### Web Security

- CORS
- CSRF
- cookies
- headers
- validation

### Data

- database queries
- sensitive fields
- error responses
- logging

### URL Security

- URL validation
- redirects
- custom short codes
- open redirect risks

### Application Security

- rate limiting
- brute force protection
- input size
- abuse scenarios
- dependency risks
- secret management

---

# Method

For every finding identify:

```text
Finding
    ↓
Evidence
    ↓
Impact
    ↓
Severity
    ↓
Recommendation
```

Do not report speculative vulnerabilities without evidence.

---

# Severity

Use:

```text
CRITICAL
HIGH
MEDIUM
LOW
INFORMATIONAL
```

Severity should be based on demonstrated impact and exploitability.

---

# Authentication Review

Verify:

- password hashing
- JWT signature verification
- JWT expiration
- refresh token validation
- refresh token expiration
- logout behavior
- cookie attributes
- authentication context

---

# Authorization Review

Attempt to reason about:

```text
User A
   ↓
User B's URL
```

Check whether a user can:

- view another user's private data
- modify another user's link
- delete another user's link
- bypass protected endpoints

---

# Secrets

Search for:

- passwords
- API keys
- JWT secrets
- database credentials
- private keys
- tokens

Never expose discovered secrets in the final report.

Identify the file/location and recommend remediation without reproducing the secret.

---

# Output

## Executive Summary

Brief overview.

## Findings

For every finding:

```text
Severity:
Category:
Location:
Description:
Evidence:
Impact:
Recommendation:
```

## Positive Security Controls

Identify controls that are already implemented.

## Recommended Improvements

Prioritized remediation areas.

## Verification

List commands/tools actually used.

Never claim the application is secure merely because no obvious issues were found.
