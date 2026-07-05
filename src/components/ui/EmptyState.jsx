import { motion } from 'framer-motion';
import Button from './Button';

function EmptyState({
  icon: Icon,
  title = 'Nothing here yet',
  description = '',
  action,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      {Icon && (
        <div className="mb-5 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
          <Icon
            size={40}
            strokeWidth={1.5}
            className="text-slate-400 dark:text-slate-500"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          <Button
            variant="primary"
            size="md"
            onClick={action.onClick}
            icon={action.icon}
          >
            {action.label}
          </Button>
        </div>
      )}
    </motion.div>
  );
}

export default EmptyState;
export { EmptyState };
