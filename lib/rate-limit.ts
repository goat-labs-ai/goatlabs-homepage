// Simple in-memory rate limiter
// TODO: Replace with Upstash Redis for production multi-instance deployments
// https://github.com/upstash/ratelimit

type RateLimitStore = Map<string, { count: number; resetAt: number }>;

const store: RateLimitStore = new Map();

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 60000, maxRequests: 3 } // 3 per minute default
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const now = Date.now();
  const key = identifier;

  // Clean up expired entries periodically
  if (Math.random() < 0.1) {
    for (const [k, v] of store.entries()) {
      if (v.resetAt < now) {
        store.delete(k);
      }
    }
  }

  const record = store.get(key);

  // No record or expired - create new
  if (!record || record.resetAt < now) {
    store.set(key, {
      count: 1,
      resetAt: now + config.interval,
    });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      reset: now + config.interval,
    };
  }

  // Existing record - check limit
  if (record.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      reset: record.resetAt,
    };
  }

  // Increment count
  record.count += 1;
  store.set(key, record);

  return {
    success: true,
    remaining: config.maxRequests - record.count,
    reset: record.resetAt,
  };
}
