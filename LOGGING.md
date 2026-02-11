# Contact Form Observability

This document explains the structured logging implemented for contact form submissions.

## Overview

All contact form submissions are logged with structured data for monitoring and debugging. Logs are output to stdout and automatically collected by Vercel.

## Implementation

**Files:**
- [lib/logger.ts](lib/logger.ts) - Structured logger utility
- [app/actions/send-email.ts](app/actions/send-email.ts) - Email action with logging

**Format:**
- Production: JSON logs (easily parseable)
- Development: Pretty-printed logs

## What Gets Logged

### 1. Submission Received (INFO)

**When:** Every form submission attempt

```json
{
  "timestamp": "2026-02-10T12:34:56.789Z",
  "level": "info",
  "message": "Contact form submission received",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "hasFile": false,
  "messageLength": 245,
  "emailProvided": true
}
```

**Fields:**
- `requestId` - Unique UUID for this submission (track across logs)
- `hasFile` - Whether file was attached
- `messageLength` - Character count (not content)
- `emailProvided` - Whether email field was filled

**Privacy:** No message content, no email addresses

---

### 2. Honeypot Triggered (WARN)

**When:** Bot detected via honeypot field

```json
{
  "timestamp": "2026-02-10T12:34:56.789Z",
  "level": "warn",
  "message": "Honeypot triggered - bot detected",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "errorType": "honeypot"
}
```

**Actionable:** Track bot traffic patterns. High volume may indicate targeted spam.

---

### 3. Rate Limit Exceeded (WARN)

**When:** User exceeds 3 submissions per minute

```json
{
  "timestamp": "2026-02-10T12:34:56.789Z",
  "level": "warn",
  "message": "Rate limit exceeded",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "errorType": "rate_limit",
  "ip": "203.0.113.42...",
  "waitSeconds": 45
}
```

**Fields:**
- `ip` - Partial IP (first 12 chars for privacy)
- `waitSeconds` - How long until retry allowed

**Actionable:** Repeated rate limits from same IP may indicate abuse.

---

### 4. Validation Failed (WARN)

**When:** Form data fails Zod schema validation

```json
{
  "timestamp": "2026-02-10T12:34:56.789Z",
  "level": "warn",
  "message": "Form validation failed",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "errorType": "validation",
  "validationError": "message"
}
```

**Fields:**
- `validationError` - Which field failed (e.g., "message", "email", "file")

**Actionable:** High validation errors may indicate:
- Frontend validation bug
- Malicious submission attempts
- User confusion with form fields

---

### 5. Email Configuration Missing (ERROR)

**When:** Required environment variables not set

```json
{
  "timestamp": "2026-02-10T12:34:56.789Z",
  "level": "error",
  "message": "Email configuration missing",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "errorType": "config",
  "hasEmailFrom": true,
  "hasEmailTo": false
}
```

**Actionable:** CRITICAL - Fix environment variables immediately:
- `EMAIL_FROM` - Sender address (Resend verified domain)
- `EMAIL_TO` - Recipient address (your inbox)

---

### 6. Email Provider Error (ERROR)

**When:** Resend API returns error

```json
{
  "timestamp": "2026-02-10T12:34:56.789Z",
  "level": "error",
  "message": "Email provider error",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "errorType": "provider",
  "providerError": "Invalid API key"
}
```

**Common provider errors:**
- "Invalid API key" → Check `RESEND_API_KEY` env var
- "Rate limit exceeded" → Upgrade Resend plan or wait
- "Invalid from address" → Verify domain in Resend dashboard

**Actionable:** Check Resend dashboard for account issues.

---

### 7. Submission Successful (INFO)

**When:** Email sent successfully

```json
{
  "timestamp": "2026-02-10T12:34:56.789Z",
  "level": "info",
  "message": "Contact form submission successful",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "emailId": "re_abc123xyz",
  "hasFile": false
}
```

**Fields:**
- `emailId` - Resend email ID (for tracking in Resend dashboard)
- `hasFile` - Whether attachment was included

**Privacy:** No message content, no email addresses

---

### 8. Unexpected Error (ERROR)

**When:** Unhandled exception occurs

```json
{
  "timestamp": "2026-02-10T12:34:56.789Z",
  "level": "error",
  "message": "Unexpected error during email sending",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "errorType": "unexpected",
  "error": "Network timeout"
}
```

**Actionable:** Investigate immediately - indicates code bug or infrastructure issue.

---

## Viewing Logs

### Development

Logs appear in terminal:
```bash
npm run dev

# Example output:
[2026-02-10T12:34:56.789Z] INFO: Contact form submission received { requestId: '550e8400...', ... }
```

### Production (Vercel)

**Option 1: Vercel Dashboard**
1. Go to project → Deployments
2. Click deployment → Runtime Logs
3. Filter by level: `error`, `warn`, `info`
4. Search by requestId to track specific submission

**Option 2: Vercel CLI**
```bash
vercel logs
vercel logs --follow  # Live tail
vercel logs --since 1h --filter "error"
```

**Option 3: Export to external service (optional)**
- Datadog: Use Vercel integration
- Logtail: Add to Vercel project
- Custom: Parse JSON logs via webhook

---

## Privacy & Security

**What's NOT logged:**
- ❌ Message content
- ❌ Full email addresses
- ❌ Full IP addresses (only partial)
- ❌ File contents

**What IS logged:**
- ✅ Metadata (length, presence, timestamps)
- ✅ Error types and messages
- ✅ Request IDs for correlation
- ✅ Success/failure counts

---

## Monitoring Queries

### Count submissions by status

```bash
# In Vercel logs or log aggregation tool
# Success rate:
grep "Contact form submission successful" | wc -l

# Error rate:
grep "errorType" | wc -l
```

### Track specific submission

```bash
# Find all logs for requestId
grep "550e8400-e29b-41d4-a716-446655440000"
```

### Identify bot traffic

```bash
# Count honeypot triggers
grep "Honeypot triggered" | wc -l
```

### Monitor rate limiting

```bash
# Find rate-limited IPs
grep "Rate limit exceeded" | grep -o '"ip":"[^"]*"'
```

---

## Error Types Summary

| Error Type | Level | Meaning | Action |
|------------|-------|---------|--------|
| `honeypot` | WARN | Bot detected | Normal, track volume |
| `rate_limit` | WARN | Too many requests | Normal, may indicate abuse |
| `validation` | WARN | Invalid form data | Check frontend validation |
| `config` | ERROR | Missing env vars | **FIX IMMEDIATELY** |
| `provider` | ERROR | Resend API issue | Check Resend dashboard |
| `unexpected` | ERROR | Code/infra bug | **INVESTIGATE IMMEDIATELY** |

---

## Alert Recommendations

Set up alerts for:

1. **Critical errors** (config, unexpected)
   - Alert: Immediate (PagerDuty, SMS)
   - Threshold: 1 occurrence

2. **Provider errors**
   - Alert: Within 15 minutes (email, Slack)
   - Threshold: 3 occurrences in 5 minutes

3. **High validation errors**
   - Alert: Daily summary
   - Threshold: >10% of submissions

4. **Honeypot spikes**
   - Alert: Hourly
   - Threshold: >50 triggers/hour

---

## Request ID Usage

Every submission gets a unique `requestId` (UUID v4). Use it to:

1. **Correlate logs:** Track a submission across multiple log entries
2. **Support:** User reports issue → search logs by approximate timestamp → find requestId
3. **Debugging:** Follow request through entire lifecycle

Example tracking:
```
INFO: Contact form submission received { requestId: "abc-123" }
WARN: Rate limit exceeded { requestId: "abc-123" }
```

Both logs are for the same submission attempt.

---

## Future Enhancements

Consider adding:

1. **Metrics endpoint**
   - `/api/metrics` with success/failure counts
   - Track average response time

2. **Structured metrics**
   - Use Vercel Analytics
   - Custom metrics for submission funnel

3. **User journey tracking**
   - Log time-on-page before submission
   - Track form field interactions (non-PII)

4. **External logging service**
   - Migrate to Datadog, Logtail, or similar
   - Add dashboards and alerting
