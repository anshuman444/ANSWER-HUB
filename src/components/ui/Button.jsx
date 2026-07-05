import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variantStyles = {
  primary:
    'bg-gradient-to-r from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-500 hover:to-violet-400 disabled:from-indigo-400 disabled:to-violet-300 disabled:shadow-none',
  secondary:
    'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-400',
  ghost:
    'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 disabled:text-slate-300 dark:disabled:text-slate-600',
  danger:
    'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:from-red-500 hover:to-rose-400 disabled:from-red-400 disabled:to-rose-300 disabled:shadow-none',
  outline:
    'bg-transparent border-2 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 disabled:border-indigo-300 disabled:text-indigo-300 dark:disabled:border-indigo-700 dark:disabled:text-indigo-700',
};

const sizeStyles = {
  sm: 'px-3.5 py-1.5 text-sm gap-1.5 rounded-lg',
  md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-7 py-3.5 text-base gap-2.5 rounded-xl',
};

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
};

const Button = forwardRef(
  (
    {
      children,
      onClick,
      disabled = false,
      loading = false,
      icon: Icon,
      className = '',
      type = 'button',
      variant = 'primary',
      size = 'md',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        whileHover={isDisabled ? {} : { scale: 1.02 }}
        whileTap={isDisabled ? {} : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`
          inline-flex items-center justify-center font-semibold
          transition-all duration-300 cursor-pointer
          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
          dark:focus-visible:ring-offset-slate-900
          disabled:cursor-not-allowed disabled:opacity-70
          ${variantStyles[variant] || variantStyles.primary}
          ${sizeStyles[size] || sizeStyles.md}
          ${className}
        `}
        {...rest}
      >
        {loading ? (
          <Loader2
            size={iconSizes[size]}
            className="animate-spin"
          />
        ) : Icon ? (
          <Icon size={iconSizes[size]} />
        ) : null}
        {children && <span>{children}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export { Button };
