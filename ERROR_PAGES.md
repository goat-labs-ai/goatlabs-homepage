# Error Pages Documentation

Production-grade error handling pages for Next.js App Router.

## Files Added

### 1. [app/not-found.tsx](app/not-found.tsx) - 404 Page
- **Trigger**: Any non-existent route (e.g., `/non-existent-page`)
- **Style**: Matches brand (dark theme, minimal, professional)
- **Features**:
  - Error code display with mono font
  - Clear, helpful message
  - Two CTAs: "Back to home" (primary) and "Get in touch" (secondary)
  - Responsive design

### 2. [app/error.tsx](app/error.tsx) - Runtime Error Page
- **Trigger**: Any unhandled error in page components
- **Type**: Client component (required by Next.js)
- **Style**: Matches brand with subtle red accent for errors
- **Features**:
  - Friendly error message (no technical details exposed)
  - "Try again" button (resets error boundary)
  - "Back to home" link
  - Error digest shown only in development
  - Console logging in development mode

### 3. [app/test-error/page.tsx](app/test-error/page.tsx) - Test Page
- **Purpose**: Test route to trigger error.tsx
- **⚠️ DELETE BEFORE PRODUCTION**: This is for local testing only

## Visual Style

Both pages match your site's aesthetic:
- **Dark background** (`bg-background`)
- **Minimal, professional layout**
- **Centered content with max-width**
- **Primary button** (orange/gold) with hover effects
- **Secondary button** (subtle card style)
- **Monospace error codes** for technical feel
- **No technical jargon** in user-facing messages

## How to Test Locally

### Test 404 Page (not-found.tsx)

```bash
# Start dev server
npm run dev

# Navigate to any non-existent route:
# Method 1: Direct URL
http://localhost:3000/this-does-not-exist
http://localhost:3000/random-page
http://localhost:3000/foo/bar

# Method 2: In browser, type invalid path
```

**Expected behavior:**
- Should see 404 page with:
  - "ERROR 404" label
  - "Page not found." heading
  - Helpful message
  - "Back to home" and "Get in touch" buttons

### Test Error Page (error.tsx)

```bash
# Start dev server
npm run dev

# Navigate to test error page:
http://localhost:3000/test-error
```

**Expected behavior:**
- Should see error page with:
  - "ERROR" label (red accent)
  - "Something went wrong." heading
  - Friendly message
  - "Try again" and "Back to home" buttons
  - Error ID shown in dev mode

**Test retry button:**
1. Click "Try again" button
2. Error should re-throw (page reloads to same error)
3. This is expected - in production, transient errors would be resolved

### Test in Production Mode

```bash
# Build for production
npm run build
npm start

# Test both pages:
http://localhost:3000/non-existent
http://localhost:3000/test-error
```

**Differences from dev:**
- No error digest shown on error page
- No console logging
- Faster page loads

## Customization

### Change Error Messages

**404 Page** ([app/not-found.tsx](app/not-found.tsx)):
```typescript
<h1>Page not found.</h1>  // Change heading
<p>This path doesn't exist...</p>  // Change message
```

**Error Page** ([app/error.tsx](app/error.tsx)):
```typescript
<h1>Something went wrong.</h1>  // Change heading
<p>An unexpected error occurred...</p>  // Change message
```

### Add Analytics Tracking

**404 Page:**
```typescript
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    // Track 404 in analytics
    analytics.track("404_page_view", {
      path: window.location.pathname,
    });
  }, []);
  // ... rest of component
}
```

**Error Page:**
```typescript
useEffect(() => {
  // Track error in analytics
  analytics.track("error_page_view", {
    message: error.message,
    digest: error.digest,
  });
}, [error]);
```

### Add Error Reporting (Sentry, etc.)

**Error Page:**
```typescript
import * as Sentry from "@sentry/nextjs";

useEffect(() => {
  // Report to Sentry
  Sentry.captureException(error);
}, [error]);
```

## Production Checklist

Before deploying:

- [ ] Test 404 page on various invalid routes
- [ ] Test error page with test-error route
- [ ] **DELETE** `app/test-error/` directory
- [ ] Verify error messages are user-friendly (no stack traces)
- [ ] Verify styling matches site design
- [ ] Test responsive design on mobile
- [ ] Consider adding error tracking (Sentry, LogRocket, etc.)
- [ ] Test that "Back to home" links work
- [ ] Test that "Get in touch" anchor works (#contact)

## Cleanup Before Production

**IMPORTANT**: Delete the test error page before deploying:

```bash
rm -rf app/test-error
```

Or manually delete the `app/test-error/` directory.

## Next.js Error Handling Hierarchy

Next.js has multiple error handling layers:

1. **error.tsx** (App Router) - Catches errors in page components
2. **not-found.tsx** (App Router) - Handles 404s
3. **global-error.tsx** (Optional) - Catches errors in root layout
4. **500.tsx** (Pages Router, deprecated) - Not used in App Router

Your implementation covers the two most common cases (404 and runtime errors).

## Troubleshooting

### 404 page not showing
- Check that file is at `app/not-found.tsx` (not in subdirectory)
- Verify no conflicting catch-all routes
- Check Next.js version supports App Router

### Error page not showing
- Verify file is at `app/error.tsx`
- Must be a client component (`"use client"`)
- Check error is being thrown in component render
- Errors in Server Components may need different handling

### Styling not applying
- Check Tailwind classes are in `tailwind.config.ts`
- Verify CSS variables are defined in `globals.css`
- Check `className` props are correct

## Reference

- [Next.js Error Handling Docs](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [App Router not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [App Router error](https://nextjs.org/docs/app/api-reference/file-conventions/error)
