# Contact Form Email Setup

This document explains how the contact form email functionality works and how to configure it.

## Overview

The contact form uses **Resend** to send emails to your inbox with spam protection via honeypot and rate limiting.

## Features

✅ **Server-side sending** - Uses Next.js Server Actions
✅ **Spam protection** - Honeypot field + rate limiting (3 requests/minute per IP)
✅ **Reply-To header** - Replies go directly to the lead
✅ **Validation** - Zod schema with file upload support (5MB max)
✅ **Minimal cost** - Resend free tier: 3,000 emails/month, 100 emails/day

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Resend API Key
# Get yours from: https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# FROM address - must be verified in Resend
# Example: contact@goatlabs.dev
EMAIL_FROM=contact@goatlabs.dev

# TO address - your personal inbox
# This is where contact form submissions will be sent
EMAIL_TO=hello@goatlabs.dev
```

## File Structure

### Server Action
**`app/actions/send-email.ts`**
- Validates form data with Zod
- Checks honeypot field (rejects if filled)
- Rate limits by IP (3 requests/minute)
- Sends email via Resend
- Sets Reply-To to user's email

### Rate Limiting
**`lib/rate-limit.ts`**
- In-memory rate limiter (3 requests/minute default)
- TODO: Replace with Upstash Redis for multi-instance production
- Automatically cleans up expired entries

### Validation
**`lib/validations.ts`**
- Message: 10-1000 characters
- Email: Valid email format
- File: Optional, max 5MB, PDF/PNG/JPG/WEBP only
- Website: Honeypot field (must be empty)

### Form Component
**`components/CTASection.tsx`**
- Includes hidden honeypot field
- Handles file uploads
- Shows toast notifications
- Clears form on success

## Setup Instructions

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Verify your domain (or use Resend's sandbox for testing)

### 2. Get API Key

1. Go to [API Keys](https://resend.com/api-keys)
2. Create new API key
3. Copy to `.env.local` as `RESEND_API_KEY`

### 3. Configure Email Addresses

Update `.env.local`:

```env
# Must be verified in Resend
EMAIL_FROM=contact@goatlabs.dev

# Your personal inbox
EMAIL_TO=your-email@example.com
```

### 4. Verify Domain (Production)

For production, verify your domain in Resend:
1. Go to Resend dashboard → Domains
2. Add your domain (e.g., goatlabs.dev)
3. Add DNS records as instructed
4. Wait for verification
5. Use `contact@goatlabs.dev` as FROM address

### 5. Test Locally

```bash
# Start dev server
npm run dev

# Navigate to http://localhost:3000
# Fill out contact form
# Check console for any errors
# Check your EMAIL_TO inbox for the message
```

## Testing

### Test Valid Submission

1. Go to contact form
2. Fill in message (10+ chars) and valid email
3. Submit
4. Check your inbox at EMAIL_TO address

### Test Spam Protection

**Honeypot Test:**
- Open browser console
- Type: `document.querySelector('[name="website"]').value = "spam"`
- Submit form → Should be rejected

**Rate Limit Test:**
- Submit form 4 times quickly
- 4th submission should be rejected with "Too many requests"

### Test Email Reply

1. Receive contact form email in your inbox
2. Click "Reply" in your email client
3. Reply should go directly to the user's email (not your FROM address)

## Cost Breakdown

**Resend Pricing:**
- Free tier: 3,000 emails/month, 100 emails/day
- Pro: $20/month for 50,000 emails/month

**Expected costs:**
- Small site: Free tier is sufficient
- 10 submissions/day = 300/month = FREE
- 100 submissions/day = 3,000/month = FREE

## Rate Limiting Details

Current implementation:
- **Storage**: In-memory (single instance)
- **Limit**: 3 requests per minute per IP
- **Cleanup**: Automatic garbage collection

For production with multiple instances, replace with Upstash Redis:

```typescript
// lib/rate-limit.ts
// TODO: Replace with Upstash Redis
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 m"),
});
```

## Troubleshooting

### Email not sending

1. Check `RESEND_API_KEY` is set correctly
2. Check `EMAIL_FROM` domain is verified in Resend
3. Check browser console and terminal for errors
4. Check Resend dashboard → Logs for delivery status

### Rate limit errors

- Wait 60 seconds between submissions
- Check IP address is being correctly identified
- For development, increase limit in `send-email.ts`:
  ```typescript
  const rateLimitResult = await rateLimit(ip, {
    interval: 60000,
    maxRequests: 10  // Increased for testing
  });
  ```

### Honeypot false positives

- Ensure form doesn't auto-fill the `website` field
- Check browser extensions aren't filling hidden fields
- Verify field has `autocomplete="off"` and `tabIndex={-1}`

## Production Checklist

- [ ] Verify domain in Resend
- [ ] Set production `EMAIL_FROM` with verified domain
- [ ] Set production `EMAIL_TO` to your inbox
- [ ] Test form submission in production
- [ ] Monitor Resend logs for first week
- [ ] Consider upgrading to Upstash Redis for rate limiting
- [ ] Set up email forwarding rules if needed
- [ ] Add email notification preferences to your inbox

## Future Enhancements

- [ ] Replace in-memory rate limiter with Upstash Redis
- [ ] Add email templates with HTML formatting
- [ ] Add email notification to Slack/Discord
- [ ] Add attachment support (currently prepared, not active)
- [ ] Add CAPTCHA for additional spam protection
- [ ] Add auto-responder to sender
- [ ] Add email analytics/tracking
