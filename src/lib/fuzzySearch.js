import Fuse from 'fuse.js'

/**
 * Default Fuse.js options for searching questions.
 */
const searchOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
}

/**
 * Fuse.js options for finding similar/duplicate questions.
 */
const similarOptions = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.3 },
  ],
  threshold: 0.2,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 3,
  ignoreLocation: true,
}

/**
 * Search questions using fuzzy matching.
 *
 * @param {Array} questions - Array of question objects to search through
 * @param {string} query - The search query string
 * @returns {Array} Array of matching results with item, score, and matches
 */
export function searchQuestions(questions, query) {
  if (!query || !query.trim()) {
    return questions.map((item) => ({ item, score: 0, matches: [] }))
  }

  const fuse = new Fuse(questions, searchOptions)
  const results = fuse.search(query.trim())

  return results.map((result) => ({
    item: result.item,
    score: result.score,
    matches: result.matches || [],
  }))
}

/**
 * Find questions similar to a given title (for duplicate detection).
 *
 * @param {Array} questions - Array of existing question objects
 * @param {string} title - The title to compare against
 * @returns {Array} Array of similar questions with score and match info
 */
export function findSimilarQuestions(questions, title) {
  if (!title || !title.trim() || questions.length === 0) {
    return []
  }

  const fuse = new Fuse(questions, similarOptions)
  const results = fuse.search(title.trim())

  return results.map((result) => ({
    item: result.item,
    score: result.score,
    matches: result.matches || [],
    isPotentialDuplicate: result.score < 0.2,
  }))
}
