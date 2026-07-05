import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo + Copyright */}
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="relative">
              <MessageCircle className="w-4 h-4 text-indigo-500" />
              <Sparkles className="w-2 h-2 text-violet-400 absolute -top-0.5 -right-0.5" />
            </div>
            <span>&copy; {new Date().getFullYear()} AnswerHub. Built for the community.</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              About
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
