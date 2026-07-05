import { motion } from 'framer-motion'
import { FileText, FileImage, FileArchive, Download, ExternalLink } from 'lucide-react'

function getFileType(url) {
  if (!url) return 'unknown'
  const ext = url.split('.').pop()?.toLowerCase().split('?')[0]
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image'
  if (ext === 'pdf') return 'pdf'
  if (['zip', 'rar', '7z'].includes(ext)) return 'archive'
  return 'unknown'
}

function getFileName(url) {
  if (!url) return 'Attachment'
  return decodeURIComponent(url.split('/').pop()?.split('?')[0] || 'Attachment')
}

const iconMap = {
  image: FileImage,
  pdf: FileText,
  archive: FileArchive,
  unknown: FileText,
}

const colorMap = {
  image: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30',
  pdf: 'text-red-500 bg-red-50 dark:bg-red-900/30',
  archive: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30',
  unknown: 'text-slate-500 bg-slate-50 dark:bg-slate-800',
}

export default function FilePreview({ url, filename, type }) {
  if (!url) return null

  const fileType = type || getFileType(url)
  const displayName = filename || getFileName(url)
  const Icon = iconMap[fileType] || FileText

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800"
    >
      {fileType === 'image' ? (
        <div className="relative group">
          <img
            src={url}
            alt={displayName}
            className="w-full max-h-64 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-white/90 rounded-full"
            >
              <ExternalLink className="w-5 h-5 text-slate-700" />
            </a>
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-3 p-3">
        <div className={`p-2 rounded-lg ${colorMap[fileType]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
            {displayName}
          </p>
          <p className="text-xs text-slate-400 uppercase">{fileType}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <Download className="w-4 h-4 text-slate-500" />
        </a>
      </div>
    </motion.div>
  )
}
