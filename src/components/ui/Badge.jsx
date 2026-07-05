const variantStyles = {
  default:
    'bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/60',
  success:
    'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60',
  warning:
    'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60',
  danger:
    'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200/60 dark:border-red-800/60',
  info:
    'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60',
  category:
    'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-violet-400 border border-indigo-200/60 dark:border-indigo-800/60',
};

function Badge({ children, variant = 'default', className = '', icon: Icon }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5
        text-xs font-semibold rounded-full
        transition-colors duration-200
        ${variantStyles[variant] || variantStyles.default}
        ${className}
      `}
    >
      {Icon && <Icon size={12} className="flex-shrink-0" />}
      {children}
    </span>
  );
}

export default Badge;
export { Badge };
