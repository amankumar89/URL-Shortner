# Frontend AI Agent Instructions

## Scope

These instructions apply to:

```text
frontend/
```

The frontend is a React 19 + TypeScript application using:

- Vite
- React Router
- TanStack Query
- Axios
- Tailwind CSS

---

## Architecture

Prefer:

```text
Page
 ↓
Component
 ↓
Custom Hook
 ↓
API function
 ↓
Axios client
 ↓
Backend
```

Keep responsibilities separated.

---

## Components

Components should focus on UI and user interaction.

Avoid placing large API implementations inside components.

Avoid large components with unrelated responsibilities.

Extract reusable UI or business behavior when it provides clear value.

Do not over-abstract simple components.

---

## TypeScript

Prefer strong types.

Avoid:

```typescript
any;
```

unless there is a legitimate reason.

Prefer:

```typescript
interface;
type;
unknown;
generics;
```

Use types for:

- API responses
- API requests
- query parameters
- form data
- component props
- mutation results

---

## TanStack Query

Use TanStack Query for server state.

Examples:

```text
Fetching URLs
Fetching user profile
Creating URLs
Deleting URLs
Updating link status
Refreshing server data
```

Do not duplicate server state unnecessarily in local React state.

---

## Axios

Keep HTTP configuration centralized.

The Axios layer is responsible for concerns such as:

- base URL
- authentication headers
- credentials
- token refresh
- request/response handling

Do not duplicate authentication logic throughout components.

---

## Authentication

When modifying authentication, understand the complete flow:

```text
Login
 ↓
Access token
 ↓
Authenticated API request
 ↓
Expired access token
 ↓
Refresh token
 ↓
New access token
 ↓
Retry original request
```

Do not introduce a second authentication mechanism.

Do not expose refresh tokens to JavaScript if the backend expects an HTTP-only cookie.

---

## Routing

Protected routes must remain protected.

When adding a route:

1. Determine whether it is public or authenticated.
2. Follow existing routing patterns.
3. Handle unauthorized users correctly.

---

## UI States

Every server interaction should consider:

```text
Loading
Success
Error
Empty
```

For mutations also consider:

```text
Submitting
Success feedback
Failure feedback
Invalid input
```

---

## Forms

Validate user input on the frontend for UX.

Do not assume frontend validation replaces backend validation.

Display useful validation messages.

Avoid submitting obviously invalid requests.

---

## Styling

Use the existing Tailwind CSS conventions.

Do not introduce another styling framework without explicit approval.

Preserve existing visual language.

Avoid unnecessary redesigns when implementing functional changes.

---

## Performance

Avoid unnecessary:

- rerenders
- API requests
- expensive calculations
- duplicated query subscriptions

Use TanStack Query caching appropriately.

Do not add memoization everywhere without evidence it helps.

---

## Accessibility

New UI should consider:

- semantic HTML
- keyboard navigation
- labels
- focus states
- accessible buttons
- useful error messages
- sufficient interaction feedback

---

## Error Handling

Do not display raw backend exceptions to users.

Convert errors into useful user-facing messages.

Handle authentication failures consistently with the existing Axios/authentication architecture.

---

## Frontend Testing

Prioritize user behavior over implementation details.

Test:

- authentication
- forms
- URL creation
- URL deletion
- status changes
- important navigation
- error states

Run the existing test/build commands defined by the project.

---

## Frontend Definition of Done

Before completing frontend work:

- TypeScript compiles.
- Production build succeeds where possible.
- Tests pass where available.
- Loading/error/empty states are handled.
- Authentication behavior remains correct.
- No unnecessary dependencies are introduced.
- Existing UI behavior is preserved.
- No unrelated refactoring is included.
