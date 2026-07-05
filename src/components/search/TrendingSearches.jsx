import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

export default function TrendingSearches({ searches = [], onSearch }) {
  if (!searches || searches.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-indigo-500" />
        Trending Searches
      </h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((item, index) => (
          <motion.button
            key={item.term || index}
            onClick={() => onSearch?.(item.term)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {item.term}
            {item.count && (
              <span className="ml-1.5 text-slate-400">·{item.count}</span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
