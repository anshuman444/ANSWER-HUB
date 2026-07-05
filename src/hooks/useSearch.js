import { useState, useCallback } from 'react'
import { supabase } from '@/config/supabase'
import { useAuth } from './useAuth'
import { searchQuestions as fuzzySearch } from '@/lib/fuzzySearch'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [trendingSearches, setTrendingSearches] = useState([])
  const { user } = useAuth()

  const searchQuestions = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([])
      return []
    }

    setLoading(true)
    try {
      // Fetch all active questions for fuzzy search
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          users:user_id (id, name, email, avatar),
          answers:answers (id, verification_status)
        `)
        .eq('status', 'active')

      if (error) throw error

      const enriched = (data || []).map(q => ({
        ...q,
        verified_answer_count: (q.answers || []).filter(a => a.verification_status === 'verified').length,
        answer_count: (q.answers || []).length,
      }))

      // Run fuzzy search locally
      const searchResults = fuzzySearch(enriched, searchQuery)
      setResults(searchResults)

      // Log search term for analytics
      await supabase.from('search_analytics').insert({
        search_term: searchQuery.toLowerCase().trim(),
        user_id: user?.id || null,
      })

      return searchResults
    } catch (err) {
      console.error('Search error:', err)
      return []
    } finally {
      setLoading(false)
    }
  }, [user])

  const fetchTrendingSearches = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_trending_searches')

      if (error) {
        // Fallback: manual query
        const { data: rawData, error: rawError } = await supabase
          .from('search_analytics')
          .select('search_term')
          .order('created_at', { ascending: false })
          .limit(100)

        if (rawError) throw rawError

        // Count occurrences manually
        const counts = {}
        ;(rawData || []).forEach(item => {
          counts[item.search_term] = (counts[item.search_term] || 0) + 1
        })

        const sorted = Object.entries(counts)
          .map(([term, count]) => ({ term, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)

        setTrendingSearches(sorted)
        return sorted
      }

      setTrendingSearches(data || [])
      return data || []
    } catch (err) {
      console.error('Error fetching trending searches:', err)
      return []
    }
  }, [])

  return {
    query,
    setQuery,
    results,
    loading,
    trendingSearches,
    searchQuestions,
    fetchTrendingSearches,
  }
}
