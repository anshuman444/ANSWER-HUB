import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Trash2, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function BulkActions({ selectedCount, onBulkVerify, onBulkDelete, onBulkSpam }) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 mb-4"
        >
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              icon={CheckCircle}
              onClick={onBulkVerify}
              className="text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
            >
              Verify All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={Shield}
              onClick={onBulkSpam}
              className="text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/30"
            >
              Mark Spam
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={onBulkDelete}
            >
              Delete All
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
