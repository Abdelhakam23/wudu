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
