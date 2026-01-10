// Simple in-memory rate limiter (for serverless)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS = 3 // 3 requests per minute per IP

export function rateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
    return true
  }

  if (record.count >= MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip)
    }
  }
}, WINDOW_MS)
