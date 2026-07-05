import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(
  (
    {
      label,
      error,
      icon: Icon,
      placeholder,
      type = 'text',
      register,
      className = '',
      id,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-') || undefined;

    const baseInputStyles = `
      w-full bg-white dark:bg-slate-800/90 
      text-slate-900 dark:text-slate-100 
      placeholder:text-slate-400 dark:placeholder:text-slate-500
      border border-slate-200 dark:border-slate-700
      rounded-xl transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 
      dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:bg-slate-50 dark:disabled:bg-slate-900
    `;

    const errorStyles = error
      ? 'border-red-400 dark:border-red-500 focus:ring-red-500/50 focus:border-red-500 dark:focus:ring-red-400/50 dark:focus:border-red-400'
      : '';

    const paddingStyles = Icon ? 'pl-11 pr-4' : 'px-4';

    // Merge react-hook-form register props with our ref
    const registerProps = register || {};

    const sharedProps = {
      id: inputId,
      placeholder,
      disabled,
      ...registerProps,
      ...rest,
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
              <Icon size={18} />
            </div>
          )}

          {type === 'textarea' ? (
            <textarea
              ref={ref}
              rows={4}
              className={`${baseInputStyles} ${errorStyles} ${paddingStyles} py-3 resize-y min-h-[100px]`}
              {...sharedProps}
            />
          ) : (
            <input
              ref={ref}
              type={type}
              className={`${baseInputStyles} ${errorStyles} ${paddingStyles} py-2.5 h-11`}
              {...sharedProps}
            />
          )}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <AlertCircle size={14} className="text-red-500 dark:text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
export { Input };
