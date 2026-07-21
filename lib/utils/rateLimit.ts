interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const cache = new Map<string, RateLimitEntry>();

/**
 * Simple In-Memory Rate Limiter for serverless route handlers.
 * Checks requests per client identifier (IP or Session ID).
 * Default: Max 3 requests per minute.
 */
export function rateLimit(identifier: string, limit = 3, durationMs = 60000): boolean {
  const now = Date.now();
  const entry = cache.get(identifier);

  if (!entry) {
    cache.set(identifier, { count: 1, resetTime: now + durationMs });
    return true;
  }

  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + durationMs;
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}
