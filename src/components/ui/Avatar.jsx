const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
};

const avatarColors = [
  'bg-indigo-500',
  'bg-violet-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-fuchsia-500',
  'bg-teal-500',
  'bg-orange-500',
];

function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({ src, name = '', size = 'md', className = '' }) {
  const sizeClass = sizeStyles[size] || sizeStyles.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'User avatar'}
        className={`
          ${sizeClass}
          rounded-full object-cover
          ring-2 ring-white dark:ring-slate-800
          flex-shrink-0
          ${className}
        `}
        onError={(e) => {
          // Fallback to initials on image load error
          e.target.style.display = 'none';
          e.target.nextSibling?.classList.remove('hidden');
        }}
      />
    );
  }

  const colorClass = getColorFromName(name);
  const initials = getInitials(name);

  return (
    <div
      className={`
        ${sizeClass} ${colorClass}
        rounded-full flex items-center justify-center
        font-semibold text-white
        ring-2 ring-white dark:ring-slate-800
        flex-shrink-0 select-none
        ${className}
      `}
      aria-label={name || 'User avatar'}
    >
      {initials}
    </div>
  );
}

export default Avatar;
export { Avatar };
