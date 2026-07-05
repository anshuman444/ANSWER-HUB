/**
 * Promotional keywords that indicate spam content.
 */
const SPAM_KEYWORDS = [
  'buy now',
  'click here',
  'free money',
  'guaranteed',
  'act now',
  'limited time',
  'winner',
  'congratulations',
  'earn money',
  'work from home',
]

/**
 * Detect spam content in text using multiple heuristic checks.
 *
 * @param {string} text - The text content to analyze
 * @returns {{ isSpam: boolean, score: number, reasons: string[] }}
 */
export function detectSpam(text) {
  if (!text || typeof text !== 'string') {
    return { isSpam: false, score: 0, reasons: [] }
  }

  const reasons = []
  let score = 0

  // Check 1: Very short content (< 10 characters)
  if (text.trim().length < 10) {
    score += 0.25
    reasons.push('Content is too short (less than 10 characters)')
  }

  // Check 2: Repeated characters (5+ same char in a row)
  const repeatedCharsPattern = /(.)\1{4,}/g
  const repeatedMatches = text.match(repeatedCharsPattern)
  if (repeatedMatches) {
    score += 0.2
    reasons.push(
      `Repeated characters detected: "${repeatedMatches[0].substring(0, 10)}..."`
    )
  }

  // Check 3: Excessive URLs (3+ links)
  const urlPattern = /https?:\/\/[^\s]+/gi
  const urlMatches = text.match(urlPattern)
  if (urlMatches && urlMatches.length >= 3) {
    score += 0.3
    reasons.push(`Excessive URLs detected (${urlMatches.length} links found)`)
  }

  // Check 4: ALL CAPS (>50% uppercase, minimum 20 characters)
  if (text.length >= 20) {
    const letters = text.replace(/[^a-zA-Z]/g, '')
    if (letters.length > 0) {
      const uppercaseLetters = letters.replace(/[^A-Z]/g, '')
      const uppercaseRatio = uppercaseLetters.length / letters.length
      if (uppercaseRatio > 0.5) {
        score += 0.2
        reasons.push(
          `Excessive uppercase text (${Math.round(uppercaseRatio * 100)}% caps)`
        )
      }
    }
  }

  // Check 5: Promotional/spam keywords
  const lowerText = text.toLowerCase()
  const foundKeywords = SPAM_KEYWORDS.filter((keyword) =>
    lowerText.includes(keyword)
  )
  if (foundKeywords.length > 0) {
    score += Math.min(0.15 * foundKeywords.length, 0.45)
    reasons.push(`Spam keywords detected: ${foundKeywords.join(', ')}`)
  }

  // Check 6: Excessive exclamation or question marks (5+)
  const exclamationCount = (text.match(/!/g) || []).length
  const questionCount = (text.match(/\?/g) || []).length
  if (exclamationCount >= 5 || questionCount >= 5) {
    score += 0.15
    reasons.push(
      `Excessive punctuation (${exclamationCount} exclamation marks, ${questionCount} question marks)`
    )
  }

  // Cap score at 1.0
  score = Math.min(score, 1.0)
  // Round to 2 decimal places
  score = Math.round(score * 100) / 100

  return {
    isSpam: score > 0.6,
    score,
    reasons,
  }
}
