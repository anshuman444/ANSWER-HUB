import { useState, useCallback } from 'react'
import { supabase } from '@/config/supabase'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
      return data || []
    } catch (err) {
      console.error('Error fetching categories:', err)
      // Fallback categories
      const fallback = [
        { id: '1', name: 'Placements', icon: 'Briefcase' },
        { id: '2', name: 'Internships', icon: 'GraduationCap' },
        { id: '3', name: 'DSA', icon: 'Code' },
        { id: '4', name: 'College FAQ', icon: 'School' },
        { id: '5', name: 'Academics', icon: 'BookOpen' },
        { id: '6', name: 'Hostel', icon: 'Home' },
        { id: '7', name: 'Exams', icon: 'FileText' },
      ]
      setCategories(fallback)
      return fallback
    } finally {
      setLoading(false)
    }
  }, [])

  return { categories, loading, fetchCategories }
}
