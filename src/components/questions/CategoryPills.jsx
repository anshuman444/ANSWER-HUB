import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Code, School, BookOpen, Home, FileText, Layers } from 'lucide-react'

const iconMap = {
  'Placements': Briefcase,
  'Internships': GraduationCap,
  'DSA': Code,
  'College FAQ': School,
  'Academics': BookOpen,
  'Hostel': Home,
  'Exams': FileText,
}

export default function CategoryPills({ categories = [], activeCategory, onSelect }) {
  const allCategories = [{ id: 'all', name: 'All' }, ...categories]

  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3">
      {allCategories.map((cat) => {
        const isActive = activeCategory === cat.name || (cat.name === 'All' && !activeCategory)
        const Icon = iconMap[cat.name] || Layers

        return (
          <motion.button
            key={cat.id}
            onClick={() => onSelect(cat.name === 'All' ? null : cat.name)}
            className={`
              flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap
              transition-all duration-300 shrink-0 cursor-pointer border backdrop-blur-md
              ${isActive
                ? 'bg-purple-500/15 border-purple-500/50 text-purple-700 dark:text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.1)] dark:shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                : 'bg-white/70 dark:bg-zinc-950/20 border-slate-200 dark:border-white/5 hover:border-purple-500/25 dark:hover:border-purple-500/30 text-slate-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-zinc-200 shadow-sm dark:shadow-none'
              }
            `}
            whileHover={{ scale: 1.04, y: -1.5 }}
            whileTap={{ scale: 0.96 }}
            layout
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-650 dark:text-purple-400' : 'text-slate-400 dark:text-zinc-500 group-hover:text-purple-500 transition-colors'}`} />
            {cat.name}
          </motion.button>
        )
      })}
    </div>
  )
}
