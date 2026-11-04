/**
 * Security utilities: sanitization, safe string comparison, and query injection prevention
 */

/**
 * Sanitizes search query string to prevent NoSQL regex injection or operator injection
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query || typeof query !== "string") return "";
  // Escape regex special characters: \ ^ $ * + ? . ( ) | { } [ ]
  return query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();
}

/**
 * Strips dangerous HTML tags and script injection attempts
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "");
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function getClientAddress(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function checkPublicRateLimit(
  key: string,
  limit = 60,
  windowMs = 60_000
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const current = rateLimitStore.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
