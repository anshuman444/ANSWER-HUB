import { CheckCircle, XCircle, Shield, Trash2, Flag } from 'lucide-react'
import Tooltip from '@/components/ui/Tooltip'

export default function ModerationActions({ answer, onVerify, onReject, onSpam, onDelete, onFlag }) {
  return (
    <div className="flex items-center gap-1">
      {answer.verification_status !== 'verified' && (
        <Tooltip content="Verify">
          <button
            onClick={() => onVerify?.(answer.id)}
            className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-emerald-500 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
          </button>
        </Tooltip>
      )}
      {answer.verification_status !== 'rejected' && (
        <Tooltip content="Reject">
          <button
            onClick={() => onReject?.(answer.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </Tooltip>
      )}
      <Tooltip content="Flag">
        <button
          onClick={() => onFlag?.(answer.id)}
          className="p-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/30 text-amber-500 transition-colors"
        >
          <Flag className="w-4 h-4" />
        </button>
      </Tooltip>
      <Tooltip content="Mark Spam">
        <button
          onClick={() => onSpam?.(answer.id)}
          className="p-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/30 text-orange-500 transition-colors"
        >
          <Shield className="w-4 h-4" />
        </button>
      </Tooltip>
      <Tooltip content="Delete">
        <button
          onClick={() => onDelete?.(answer.id)}
          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </Tooltip>
    </div>
  )
}
