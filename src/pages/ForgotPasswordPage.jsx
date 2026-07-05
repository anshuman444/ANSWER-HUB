import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, ArrowLeft } from 'lucide-react'
import ForgotPassword from '@/components/auth/ForgotPassword'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function ForgotPasswordPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 px-4 py-12 relative overflow-hidden"
    >
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              AnswerHub
            </span>
          </Link>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
            Reset your password to regain access.
          </p>
        </motion.div>

        {/* Forgot Password Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl shadow-indigo-500/5 p-8"
        >
          <ForgotPassword />
        </motion.div>

        {/* Back to Login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center mt-6"
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
