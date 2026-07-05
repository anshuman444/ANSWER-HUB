import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Card = forwardRef(
  ({ children, className = '', hover = false, onClick, ...rest }, ref) => {
    const Component = hover || onClick ? motion.div : 'div';

    const motionProps =
      hover || onClick
        ? {
            whileHover: { y: -2, boxShadow: '0 20px 40px -12px rgba(99, 102, 241, 0.15)' },
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }
        : {};

    return (
      <Component
        ref={ref}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        className={`
          bg-white/80 dark:bg-slate-800/80
          backdrop-blur-xl
          border border-slate-200/50 dark:border-slate-700/50
          rounded-2xl
          shadow-lg shadow-slate-900/5 dark:shadow-slate-900/30
          transition-all duration-300
          ${onClick ? 'cursor-pointer' : ''}
          ${className}
        `}
        {...motionProps}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export default Card;
export { Card };
