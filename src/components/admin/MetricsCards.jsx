import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, Flag, Shield, HelpCircle } from 'lucide-react'

const metricConfig = [
  { key: 'pendingReviews', label: 'Pending Reviews', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { key: 'verifiedAnswers', label: 'Verified Answers', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { key: 'flaggedContent', label: 'Flagged Content', icon: Flag, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { key: 'spamRemoved', label: 'Spam Removed', icon: Shield, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { key: 'totalQuestions', label: 'Total Questions', icon: HelpCircle, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
]

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 1000
    const steps = 30
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return <span>{count.toLocaleString()}</span>
}

export default function MetricsCards({ metrics = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metricConfig.map((config, index) => {
        const Icon = config.icon
        const value = metrics[config.key] || 0

        return (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${config.bg}`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              <AnimatedCounter value={value} />
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{config.label}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
