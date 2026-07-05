import { useState, useCallback } from 'react'
import { supabase } from '@/config/supabase'
import { useAuth } from './useAuth'

export function useUpvote() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const toggleQuestionUpvote = useCallback(async (questionId) => {
    if (!user) throw new Error('Must be logged in')
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc('toggle_question_upvote', {
        q_id: questionId,
        u_id: user.id,
      })
      if (error) throw error
      return data
    } catch (err) {
      console.error('Upvote error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [user])

  const toggleAnswerUpvote = useCallback(async (answerId) => {
    if (!user) throw new Error('Must be logged in')
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc('toggle_answer_upvote', {
        a_id: answerId,
        u_id: user.id,
      })
      if (error) throw error
      return data
    } catch (err) {
      console.error('Upvote error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [user])

  const hasUpvotedQuestion = useCallback(async (questionId) => {
    if (!user) return false
    try {
      const { data, error } = await supabase
        .from('question_upvotes')
        .select('question_id')
        .eq('question_id', questionId)
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) throw error
      return !!data
    } catch {
      return false
    }
  }, [user])

  const hasUpvotedAnswer = useCallback(async (answerId) => {
    if (!user) return false
    try {
      const { data, error } = await supabase
        .from('answer_upvotes')
        .select('answer_id')
        .eq('answer_id', answerId)
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) throw error
      return !!data
    } catch {
      return false
    }
  }, [user])

  return {
    loading,
    toggleQuestionUpvote,
    toggleAnswerUpvote,
    hasUpvotedQuestion,
    hasUpvotedAnswer,
  }
}
