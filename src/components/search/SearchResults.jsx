import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, MessageCircle, Eye } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { QuestionCardSkeleton } from '@/components/ui/Skeleton'
import EmptyState from '@/components/ui/EmptyState'

export default function SearchResults({ results = [], query, loading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <QuestionCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (query && results.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title={`No results found for "${query}"`}
        description="Try different keywords or check your spelling."
      />
    )
  }

  if (!query) return null

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {results.length} result{results.length !== 1 ? 's' : ''} for "<span className="font-medium text-slate-700 dark:text-slate-300">{query}</span>"
      </p>
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {results.map((result, index) => {
          const question = result.item || result
          return (
            <motion.div
              key={question.id || index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to={`/question/${question.id}`}
                className="block p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-300 group"
              >
                <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {question.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {question.description}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge variant="category">{question.category}</Badge>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {question.answer_count || 0}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {question.views || 0}
                  </span>
                  {result.score !== undefined && (
                    <span className="text-xs text-indigo-500 font-medium ml-auto">
                      {Math.round((1 - result.score) * 100)}% match
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
